const express = require('express');
const router = express.Router();
const { HTTP_STATUS, RESPONSE_CODES, ERROR_MESSAGES } = require('../constants');
const { pool } = require('../config/config');
const { optionalAuth, authenticateToken } = require('../middleware/auth');
const NotificationHelper = require('../utils/notificationHelper');
const { extractMentionedUsers, hasMentions } = require('../utils/mentionParser');

// 获取笔记列表
router.get('/', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const category = req.query.category;
    const isDraft = req.query.is_draft !== undefined ? parseInt(req.query.is_draft) : 0;
    const userId = req.query.user_id ? parseInt(req.query.user_id) : null;
    const currentUserId = req.user ? req.user.id : null;

    if (isDraft === 1) {
      if (!currentUserId) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ code: RESPONSE_CODES.UNAUTHORIZED, message: '查看草稿需要登录' });
      }
      const forcedUserId = currentUserId;

      let query = `
        SELECT p.*, u.nickname, u.avatar as user_avatar, u.user_id as author_account, u.id as author_auto_id, u.location, u.verified, c.name as category
        FROM posts p
        LEFT JOIN users u ON p.user_id = u.id
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.is_draft = ? AND p.user_id = ?
      `;
      let queryParams = [isDraft.toString(), forcedUserId.toString()];

      if (category) {
        query += ` AND p.category_id = ?`;
        queryParams.push(category);
      }

      query += ` ORDER BY p.created_at DESC LIMIT ? OFFSET ?`;
      queryParams.push(limit.toString(), offset.toString());


      const [rows] = await pool.execute(query, queryParams);

      // 获取每个草稿的图片和标签
      for (let post of rows) {
        // 获取笔记图片
        const [images] = await pool.execute('SELECT image_url FROM post_images WHERE post_id = ?', [post.id]);
        post.images = images.map(img => img.image_url);

        // 获取笔记标签
        const [tags] = await pool.execute(
          'SELECT t.id, t.name FROM tags t JOIN post_tags pt ON t.id = pt.tag_id WHERE pt.post_id = ?',
          [post.id]
        );
        post.tags = tags;

        // 草稿不需要点赞收藏状态
        post.liked = false;
        post.collected = false;
      }

      // 获取草稿总数
      const [countResult] = await pool.execute(
        'SELECT COUNT(*) as total FROM posts p WHERE p.is_draft = ? AND p.user_id = ?' + (category ? ' AND p.category_id = ?' : ''),
        category ? [isDraft.toString(), forcedUserId.toString(), category] : [isDraft.toString(), forcedUserId.toString()]
      );
      const total = countResult[0].total;
      const pages = Math.ceil(total / limit);

      return res.json({
        code: RESPONSE_CODES.SUCCESS,
        message: 'success',
        data: {
          posts: rows,
          pagination: {
            page,
            limit,
            total,
            pages
          }
        }
      });
    }

    let query = `
      SELECT p.*, u.nickname, u.avatar as user_avatar, u.user_id as author_account, u.id as author_auto_id, u.location, u.verified, c.name as category
      FROM posts p
      LEFT JOIN users u ON p.user_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_draft = ?
    `;
    let queryParams = [isDraft.toString()];

    // 特殊处理推荐频道：显示浏览量前20%的笔记，但支持分页
    if (category === 'recommend') {
      // 先获取总笔记数（只计算指定状态的笔记）
      const [totalCountResult] = await pool.execute('SELECT COUNT(*) as total FROM posts WHERE is_draft = ?', [isDraft.toString()]);
      const totalPosts = totalCountResult[0].total;
      const topPostsCount = Math.ceil(totalPosts * 0.2); // 前20%的笔记数量

      // 直接获取前20%浏览量的笔记，然后进行分页（只包含指定状态的笔记）
      query = `
        SELECT p.*, u.nickname, u.avatar as user_avatar, u.user_id as author_account, u.id as author_auto_id, u.location, c.name as category
        FROM (
          SELECT * FROM posts WHERE is_draft = ? ORDER BY view_count DESC LIMIT ?
        ) p
        LEFT JOIN users u ON p.user_id = u.id
        LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.view_count DESC
        LIMIT ? OFFSET ?
      `;
      queryParams = [isDraft.toString(), topPostsCount.toString(), limit.toString(), offset.toString()];
    } else {
      let whereConditions = [];
      let additionalParams = [];

      if (category) {
        whereConditions.push('p.category_id = ?');
        additionalParams.push(category);
      }

      if (userId) {
        whereConditions.push('p.user_id = ?');
        additionalParams.push(userId);
      }

      if (whereConditions.length > 0) {
        query += ` AND ${whereConditions.join(' AND ')}`;
      }

      query += ` ORDER BY p.created_at DESC LIMIT ? OFFSET ?`;
      queryParams = [isDraft.toString(), ...additionalParams, limit.toString(), offset.toString()];
    }
    const [rows] = await pool.execute(query, queryParams);


    // 获取每个笔记的图片、标签和用户点赞收藏状态
    for (let post of rows) {
      // 获取笔记图片
      const [images] = await pool.execute('SELECT image_url FROM post_images WHERE post_id = ?', [post.id]);
      post.images = images.map(img => img.image_url);

      // 获取笔记标签
      const [tags] = await pool.execute(
        'SELECT t.id, t.name FROM tags t JOIN post_tags pt ON t.id = pt.tag_id WHERE pt.post_id = ?',
        [post.id]
      );
      post.tags = tags;

      // 检查当前用户是否已点赞（仅在用户已登录时检查）
      if (currentUserId) {
        const [likeResult] = await pool.execute(
          'SELECT id FROM likes WHERE user_id = ? AND target_type = 1 AND target_id = ?',
          [currentUserId, post.id]
        );
        post.liked = likeResult.length > 0;

        // 检查当前用户是否已收藏
        const [collectResult] = await pool.execute(
          'SELECT id FROM collections WHERE user_id = ? AND post_id = ?',
          [currentUserId, post.id]
        );
        post.collected = collectResult.length > 0;
      } else {
        post.liked = false;
        post.collected = false;
      }
    }

    // 获取总数
    let total;
    if (category === 'recommend') {
      // 推荐频道的总数就是前20%的笔记数量
      const [totalCountResult] = await pool.execute('SELECT COUNT(*) as total FROM posts WHERE is_draft = ?', [isDraft.toString()]);
      const totalPosts = totalCountResult[0].total;
      total = Math.ceil(totalPosts * 0.2);
    } else {
      let countQuery = 'SELECT COUNT(*) as total FROM posts WHERE is_draft = ?';
      let countParams = [isDraft.toString()];
      let countWhereConditions = [];

      if (category) {
        countQuery = 'SELECT COUNT(*) as total FROM posts p LEFT JOIN categories c ON p.category_id = c.id WHERE p.is_draft = ?';
        countWhereConditions.push('p.category_id = ?');
        countParams.push(category);
      }

      if (userId) {
        countWhereConditions.push('user_id = ?');
        countParams.push(userId);
      }

      if (countWhereConditions.length > 0) {
        countQuery += ` AND ${countWhereConditions.join(' AND ')}`;
      }

      const [countResult] = await pool.execute(countQuery, countParams);
      total = countResult[0].total;
    }

    res.json({
      code: RESPONSE_CODES.SUCCESS,
      message: 'success',
      data: {
        posts: rows,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('获取笔记列表失败:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODES.ERROR, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

// 获取笔记详情
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const currentUserId = req.user ? req.user.id : null;

    // 获取笔记基本信息
    const [rows] = await pool.execute(
      `SELECT p.*, u.nickname, u.avatar as user_avatar, u.user_id as author_account, u.id as author_auto_id, u.location, u.verified, c.name as category
       FROM posts p
       LEFT JOIN users u ON p.user_id = u.id
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [postId]
    );

    if (rows.length === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ code: RESPONSE_CODES.NOT_FOUND, message: '笔记不存在' });
    }

    const post = rows[0];

    // 获取笔记图片
    const [images] = await pool.execute('SELECT image_url FROM post_images WHERE post_id = ?', [postId]);
    post.images = images.map(img => img.image_url);

    // 获取笔记标签
    const [tags] = await pool.execute(
      'SELECT t.id, t.name FROM tags t JOIN post_tags pt ON t.id = pt.tag_id WHERE pt.post_id = ?',
      [postId]
    );
    post.tags = tags;

    // 检查当前用户是否已点赞和收藏（仅在用户已登录时检查）
    if (currentUserId) {
      const [likeResult] = await pool.execute(
        'SELECT id FROM likes WHERE user_id = ? AND target_type = 1 AND target_id = ?',
        [currentUserId, postId]
      );
      post.liked = likeResult.length > 0;

      const [collectResult] = await pool.execute(
        'SELECT id FROM collections WHERE user_id = ? AND post_id = ?',
        [currentUserId, postId]
      );
      post.collected = collectResult.length > 0;
    } else {
      post.liked = false;
      post.collected = false;
    }

    // 检查是否跳过浏览量增加
    const skipViewCount = req.query.skipViewCount === 'true';

    if (!skipViewCount) {
      // 增加浏览量
      await pool.execute('UPDATE posts SET view_count = view_count + 1 WHERE id = ?', [postId]);
      post.view_count = post.view_count + 1;
    }


    res.json({
      code: RESPONSE_CODES.SUCCESS,
      message: 'success',
      data: post
    });
  } catch (error) {
    console.error('获取笔记详情失败:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODES.ERROR, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

// 创建笔记
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, content, category_id, images, tags, is_draft } = req.body;
    const userId = req.user.id;

    // 验证必填字段：发布时要求标题和内容，草稿时不强制要求
    if (!is_draft && (!title || !content)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ code: RESPONSE_CODES.VALIDATION_ERROR, message: '发布时标题和内容不能为空' });
    }

    // 插入笔记
    const [result] = await pool.execute(
      'INSERT INTO posts (user_id, title, content, category_id, is_draft) VALUES (?, ?, ?, ?, ?)',
      [userId, title || '', content || '', category_id || null, is_draft ? 1 : 0]
    );

    const postId = result.insertId;

    // 处理图片
    if (images && images.length > 0) {
      const validUrls = []

      // 处理所有有效的URL
      for (const imageUrl of images) {
        if (imageUrl && typeof imageUrl === 'string') {
          validUrls.push(imageUrl)
        }
      }

      // 插入所有有效的图片URL
      for (const imageUrl of validUrls) {
        await pool.execute(
          'INSERT INTO post_images (post_id, image_url) VALUES (?, ?)',
          [postId.toString(), imageUrl]
        );
      }
    }

    // 处理标签
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        // 检查标签是否存在，不存在则创建
        let [tagRows] = await pool.execute('SELECT id FROM tags WHERE name = ?', [tagName]);
        let tagId;

        if (tagRows.length === 0) {
          const [tagResult] = await pool.execute('INSERT INTO tags (name) VALUES (?)', [tagName]);
          tagId = tagResult.insertId;
        } else {
          tagId = tagRows[0].id;
        }

        // 关联笔记和标签
        await pool.execute('INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)', [postId.toString(), tagId.toString()]);

        // 更新标签使用次数
        await pool.execute('UPDATE tags SET use_count = use_count + 1 WHERE id = ?', [tagId.toString()]);
      }
    }

    // 处理@用户通知（仅在发布笔记时，不是草稿时）
    if (!is_draft && content && hasMentions(content)) {
      const mentionedUsers = extractMentionedUsers(content);

      for (const mentionedUser of mentionedUsers) {
        try {
          // 根据小石榴号查找用户的自增ID
          const [userRows] = await pool.execute('SELECT id FROM users WHERE user_id = ?', [mentionedUser.userId]);

          if (userRows.length > 0) {
            const mentionedUserId = userRows[0].id;

            // 不给自己发通知
            if (mentionedUserId !== userId) {
              // 创建@用户通知
              const mentionNotificationData = NotificationHelper.createNotificationData({
                userId: mentionedUserId,
                senderId: userId,
                type: NotificationHelper.TYPES.MENTION,
                targetId: postId
              });

              await NotificationHelper.insertNotification(pool, mentionNotificationData);
            }
          }
        } catch (error) {
          console.error(`处理@用户通知失败 - 用户: ${mentionedUser.userId}:`, error);
        }
      }
    }

    console.log(`创建笔记成功 - 用户ID: ${userId}, 笔记ID: ${postId}`);

    res.json({
      code: RESPONSE_CODES.SUCCESS,
      message: '发布成功',
      data: { id: postId }
    });
  } catch (error) {
    console.error('创建笔记失败:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODES.ERROR, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

// 搜索笔记
router.get('/search', optionalAuth, async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const currentUserId = req.user ? req.user.id : null;

    if (!keyword) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ code: RESPONSE_CODES.VALIDATION_ERROR, message: '请输入搜索关键词' });
    }

    console.log(`🔍 搜索笔记 - 关键词: ${keyword}, 页码: ${page}, 每页: ${limit}, 当前用户ID: ${currentUserId}`);

    // 搜索笔记：支持标题和内容搜索（只搜索已激活的笔记）
    const [rows] = await pool.execute(
      `SELECT p.*, u.nickname, u.avatar as user_avatar, u.user_id as author_account, u.id as author_auto_id, u.location, u.verified
       FROM posts p
       LEFT JOIN users u ON p.user_id = u.id
       WHERE p.is_draft = 0 AND (p.title LIKE ? OR p.content LIKE ?)
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      [`%${keyword}%`, `%${keyword}%`, limit.toString(), offset.toString()]
    );

    // 获取每个笔记的图片、标签和用户点赞收藏状态
    for (let post of rows) {
      // 获取笔记图片
      const [images] = await pool.execute('SELECT image_url FROM post_images WHERE post_id = ?', [post.id]);
      post.images = images.map(img => img.image_url);

      // 获取笔记标签
      const [tags] = await pool.execute(
        'SELECT t.id, t.name FROM tags t JOIN post_tags pt ON t.id = pt.tag_id WHERE pt.post_id = ?',
        [post.id]
      );
      post.tags = tags;

      // 检查当前用户是否已点赞和收藏（仅在用户已登录时检查）
      if (currentUserId) {
        const [likeResult] = await pool.execute(
          'SELECT id FROM likes WHERE user_id = ? AND target_type = 1 AND target_id = ?',
          [currentUserId, post.id]
        );
        post.liked = likeResult.length > 0;

        const [collectResult] = await pool.execute(
          'SELECT id FROM collections WHERE user_id = ? AND post_id = ?',
          [currentUserId, post.id]
        );
        post.collected = collectResult.length > 0;
      } else {
        post.liked = false;
        post.collected = false;
      }
    }

    // 获取总数（只统计已激活的笔记）
    const [countResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM posts 
       WHERE is_draft = 0 AND (title LIKE ? OR content LIKE ?)`,
      [`%${keyword}%`, `%${keyword}%`]
    );
    const total = countResult[0].total;

    console.log(`  搜索笔记结果 - 找到 ${total} 个笔记，当前页 ${rows.length} 个`);

    res.json({
      code: RESPONSE_CODES.SUCCESS,
      message: 'success',
      data: {
        posts: rows,
        keyword,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('搜索笔记失败:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODES.ERROR, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

// 获取笔记评论列表
router.get('/:id/comments', optionalAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const sort = req.query.sort || 'desc'; // 排序方式：desc（降序）或 asc（升序）
    const currentUserId = req.user ? req.user.id : null;

    console.log(`获取笔记评论列表 - 笔记ID: ${postId}, 页码: ${page}, 每页: ${limit}, 排序: ${sort}, 当前用户ID: ${currentUserId}`);

    // 验证笔记是否存在
    const [postRows] = await pool.execute('SELECT id FROM posts WHERE id = ?', [postId.toString()]);
    if (postRows.length === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ code: RESPONSE_CODES.NOT_FOUND, message: '笔记不存在' });
    }

    // 获取顶级评论（parent_id为NULL）
    const orderBy = sort === 'asc' ? 'ASC' : 'DESC';
    const [rows] = await pool.execute(
      `SELECT c.*, u.nickname, u.avatar as user_avatar, u.id as user_auto_id, u.user_id as user_display_id, u.location as user_location, u.verified
       FROM comments c
       LEFT JOIN users u ON c.user_id = u.id
       WHERE c.post_id = ? AND c.parent_id IS NULL
       ORDER BY c.created_at ${orderBy}
       LIMIT ? OFFSET ?`,
      [postId, limit.toString(), offset.toString()]
    );

    // 为每个评论检查点赞状态
    for (let comment of rows) {
      if (currentUserId) {
        const [likeResult] = await pool.execute(
          'SELECT id FROM likes WHERE user_id = ? AND target_type = 2 AND target_id = ?',
          [currentUserId, comment.id]
        );
        comment.liked = likeResult.length > 0;
      } else {
        comment.liked = false;
      }

      // 获取子评论数量
      const [childCount] = await pool.execute(
        'SELECT COUNT(*) as count FROM comments WHERE parent_id = ?',
        [comment.id]
      );
      comment.reply_count = childCount[0].count;
    }

    // 获取总数（直接从posts表读取comment_count字段）
    const [countResult] = await pool.execute(
      'SELECT comment_count as total FROM posts WHERE id = ?',
      [postId]
    );
    const total = countResult[0].total;


    res.json({
      code: RESPONSE_CODES.SUCCESS,
      message: 'success',
      data: {
        comments: rows,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('获取笔记评论列表失败:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODES.ERROR, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});



// 收藏/取消收藏笔记
router.post('/:id/collect', authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    // 验证笔记是否存在
    const [postRows] = await pool.execute('SELECT id FROM posts WHERE id = ?', [postId]);
    if (postRows.length === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ code: RESPONSE_CODES.NOT_FOUND, message: '笔记不存在' });
    }

    // 检查是否已经收藏
    const [existingCollection] = await pool.execute(
      'SELECT id FROM collections WHERE user_id = ? AND post_id = ?',
      [userId.toString(), postId.toString()]
    );

    if (existingCollection.length > 0) {
      // 已收藏，执行取消收藏
      await pool.execute(
        'DELETE FROM collections WHERE user_id = ? AND post_id = ?',
        [userId.toString(), postId.toString()]
      );

      // 更新笔记收藏数
      await pool.execute('UPDATE posts SET collect_count = collect_count - 1 WHERE id = ?', [postId.toString()]);

      console.log(`取消收藏成功 - 用户ID: ${userId}, 笔记ID: ${postId}`);
      res.json({ code: RESPONSE_CODES.SUCCESS, message: '取消收藏成功', data: { collected: false } });
    } else {
      // 未收藏，执行收藏
      await pool.execute(
        'INSERT INTO collections (user_id, post_id) VALUES (?, ?)',
        [userId.toString(), postId.toString()]
      );

      // 更新笔记收藏数
      await pool.execute('UPDATE posts SET collect_count = collect_count + 1 WHERE id = ?', [postId.toString()]);

      // 获取笔记作者ID，用于创建通知
      const [postResult] = await pool.execute('SELECT user_id FROM posts WHERE id = ?', [postId.toString()]);
      if (postResult.length > 0) {
        const targetUserId = postResult[0].user_id;

        // 创建通知（不给自己发通知）
        if (targetUserId && targetUserId !== userId) {
          const notificationData = NotificationHelper.createCollectPostNotification(targetUserId, userId, postId);
          const notificationResult = await NotificationHelper.insertNotification(pool, notificationData);
        }
      }

      console.log(`收藏成功 - 用户ID: ${userId}, 笔记ID: ${postId}`);
      res.json({ code: RESPONSE_CODES.SUCCESS, message: '收藏成功', data: { collected: true } });
    }
  } catch (error) {
    console.error('笔记收藏操作失败:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODES.ERROR, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

// 更新笔记
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content, category_id, images, tags, is_draft } = req.body;
    const userId = req.user.id;

    // 验证必填字段：如果不是草稿（is_draft=0），则要求标题、内容和分类不能为空
    if (!is_draft && (!title || !content || !category_id)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ code: RESPONSE_CODES.VALIDATION_ERROR, message: '发布时标题、内容和分类不能为空' });
    }

    // 检查笔记是否存在且属于当前用户
    const [postRows] = await pool.execute(
      'SELECT user_id FROM posts WHERE id = ?',
      [postId.toString()]
    );

    if (postRows.length === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ code: RESPONSE_CODES.NOT_FOUND, message: '笔记不存在' });
    }

    if (postRows[0].user_id !== userId) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({ code: RESPONSE_CODES.FORBIDDEN, message: '无权限修改此笔记' });
    }

    // 在更新之前获取原始笔记信息（用于对比@用户变化）
    const [originalPostRows] = await pool.execute('SELECT is_draft, content FROM posts WHERE id = ?', [postId.toString()]);
    const wasOriginallyDraft = originalPostRows.length > 0 && originalPostRows[0].is_draft === 1;
    const originalContent = originalPostRows.length > 0 ? originalPostRows[0].content : '';

    // 更新笔记基本信息
    await pool.execute(
      'UPDATE posts SET title = ?, content = ?, category_id = ?, is_draft = ? WHERE id = ?',
      [title || '', content || '', category_id || null, (is_draft ? 1 : 0).toString(), postId.toString()]
    );

    // 删除原有图片
    await pool.execute('DELETE FROM post_images WHERE post_id = ?', [postId.toString()]);

    // 处理新图片
    if (images && images.length > 0) {
      const validUrls = []

      // 处理所有有效的URL
      for (const imageUrl of images) {
        if (imageUrl && typeof imageUrl === 'string') {
          validUrls.push(imageUrl)
        }
      }

      // 插入所有有效的图片URL
      for (const imageUrl of validUrls) {
        await pool.execute(
          'INSERT INTO post_images (post_id, image_url) VALUES (?, ?)',
          [postId, imageUrl]
        );
      }
    }

    // 删除原有标签关联
    await pool.execute('DELETE FROM post_tags WHERE post_id = ?', [postId.toString()]);

    // 处理新标签
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        // 检查标签是否存在，不存在则创建
        let [tagRows] = await pool.execute('SELECT id FROM tags WHERE name = ?', [tagName]);
        let tagId;

        if (tagRows.length === 0) {
          const [tagResult] = await pool.execute('INSERT INTO tags (name) VALUES (?)', [tagName]);
          tagId = tagResult.insertId;
        } else {
          tagId = tagRows[0].id;
        }

        // 关联笔记和标签
        await pool.execute('INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)', [postId, tagId]);

        // 更新标签使用次数
        await pool.execute('UPDATE tags SET use_count = use_count + 1 WHERE id = ?', [tagId]);
      }
    }

    // 处理@用户通知的逻辑
    if (!is_draft && content) { // 只有在发布状态下才处理@通知
      // 获取新内容中的@用户
      const newMentionedUsers = hasMentions(content) ? extractMentionedUsers(content) : [];
      const newMentionedUserIds = new Set(newMentionedUsers.map(user => user.userId));
      
      // 获取原内容中的@用户（如果不是从草稿变为发布）
      let oldMentionedUserIds = new Set();
      if (!wasOriginallyDraft && originalContent && hasMentions(originalContent)) {
        const oldMentionedUsers = extractMentionedUsers(originalContent);
        oldMentionedUserIds = new Set(oldMentionedUsers.map(user => user.userId));
      }
      
      // 找出需要删除通知的用户（在旧列表中但不在新列表中）
      const usersToRemoveNotification = [...oldMentionedUserIds].filter(userId => !newMentionedUserIds.has(userId));
      
      // 找出需要添加通知的用户（在新列表中但不在旧列表中）
      const usersToAddNotification = [...newMentionedUserIds].filter(userId => !oldMentionedUserIds.has(userId));
      
      // 删除不再需要的@通知
      for (const mentionedUserId of usersToRemoveNotification) {
        try {
          // 根据小石榴号查找用户的自增ID
          const [userRows] = await pool.execute('SELECT id FROM users WHERE user_id = ?', [mentionedUserId]);
          
          if (userRows.length > 0) {
            const mentionedUserAutoId = userRows[0].id;
            
            // 删除该用户的@通知
            await NotificationHelper.deleteNotifications(pool, {
              type: NotificationHelper.TYPES.MENTION,
              targetId: postId,
              senderId: userId,
              userId: mentionedUserAutoId
            });
            
            console.log(`删除@通知 - 笔记ID: ${postId}, 用户: ${mentionedUserId}`);
          }
        } catch (error) {
          console.error(`删除@用户通知失败 - 用户: ${mentionedUserId}:`, error);
        }
      }
      
      // 添加新的@通知
      for (const mentionedUserId of usersToAddNotification) {
        try {
          // 根据小石榴号查找用户的自增ID
          const [userRows] = await pool.execute('SELECT id FROM users WHERE user_id = ?', [mentionedUserId]);

          if (userRows.length > 0) {
            const mentionedUserAutoId = userRows[0].id;

            // 不给自己发通知
            if (mentionedUserAutoId !== userId) {
              // 创建@用户通知
              const mentionNotificationData = NotificationHelper.createNotificationData({
                userId: mentionedUserAutoId,
                senderId: userId,
                type: NotificationHelper.TYPES.MENTION,
                targetId: postId
              });

              await NotificationHelper.insertNotification(pool, mentionNotificationData);
              
              console.log(`添加@通知 - 笔记ID: ${postId}, 用户: ${mentionedUserId}`);
            }
          }
        } catch (error) {
          console.error(`处理@用户通知失败 - 用户: ${mentionedUserId}:`, error);
        }
      }
    }

    console.log(`更新笔记成功 - 用户ID: ${userId}, 笔记ID: ${postId}`);

    res.json({
      code: RESPONSE_CODES.SUCCESS,
      message: '更新成功',
      data: { id: postId }
    });
  } catch (error) {
    console.error('更新笔记失败:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODES.ERROR, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

// 删除笔记
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    // 检查笔记是否存在且属于当前用户
    const [postRows] = await pool.execute(
      'SELECT user_id FROM posts WHERE id = ?',
      [postId.toString()]
    );

    if (postRows.length === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ code: RESPONSE_CODES.NOT_FOUND, message: '笔记不存在' });
    }

    if (postRows[0].user_id !== userId) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({ code: RESPONSE_CODES.FORBIDDEN, message: '无权限删除此笔记' });
    }

    // 获取笔记关联的标签，减少标签使用次数
    const [tagResult] = await pool.execute(
      'SELECT tag_id FROM post_tags WHERE post_id = ?',
      [postId.toString()]
    );

    // 减少标签使用次数
    for (const tag of tagResult) {
      await pool.execute('UPDATE tags SET use_count = GREATEST(use_count - 1, 0) WHERE id = ?', [tag.tag_id.toString()]);
    }

    // 删除相关数据（由于外键约束，需要按顺序删除）
    await pool.execute('DELETE FROM post_images WHERE post_id = ?', [postId.toString()]);
    await pool.execute('DELETE FROM post_tags WHERE post_id = ?', [postId.toString()]);
    await pool.execute('DELETE FROM likes WHERE target_type = 1 AND target_id = ?', [postId.toString()]);
    await pool.execute('DELETE FROM collections WHERE post_id = ?', [postId.toString()]);
    await pool.execute('DELETE FROM comments WHERE post_id = ?', [postId.toString()]);
    await pool.execute('DELETE FROM notifications WHERE target_id = ?', [postId.toString()]);

    // 最后删除笔记
    await pool.execute('DELETE FROM posts WHERE id = ?', [postId.toString()]);

    console.log(`删除笔记成功 - 用户ID: ${userId}, 笔记ID: ${postId}`);

    res.json({
      code: RESPONSE_CODES.SUCCESS,
      message: '删除成功'
    });
  } catch (error) {
    console.error('删除笔记失败:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODES.ERROR, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

// 取消收藏笔记
router.delete('/:id/collect', authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    console.log(`取消收藏 - 用户ID: ${userId}, 笔记ID: ${postId}`);

    // 删除收藏记录
    const [result] = await pool.execute(
      'DELETE FROM collections WHERE user_id = ? AND post_id = ?',
      [userId.toString(), postId.toString()]
    );

    if (result.affectedRows === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ code: RESPONSE_CODES.NOT_FOUND, message: '收藏记录不存在' });
    }

    // 更新笔记收藏数
    await pool.execute('UPDATE posts SET collect_count = collect_count - 1 WHERE id = ?', [postId.toString()]);

    console.log(`取消收藏成功 - 用户ID: ${userId}, 笔记ID: ${postId}`);
    res.json({ code: RESPONSE_CODES.SUCCESS, message: '取消收藏成功', data: { collected: false } });
  } catch (error) {
    console.error('取消笔记收藏失败:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODES.ERROR, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

module.exports = router;