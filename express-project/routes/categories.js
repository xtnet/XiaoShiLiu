const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { success, error } = require('../utils/responseHelper');
const { authenticateToken } = require('../middleware/auth');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../constants');

/**
 * @api {get} /api/categories 获取分类列表
 * @apiName GetCategories
 * @apiGroup Categories
 * @apiDescription 获取所有分类列表
 * 
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Array} data 分类列表
 * @apiSuccess {Number} data.id 分类ID
 * @apiSuccess {String} data.name 分类名称
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "获取成功",
 *       "data": [
 *         {
 *           "id": 1,
 *           "name": "推荐"
 *         },
 *         {
 *           "id": 2,
 *           "name": "学习"
 *         }
 *       ]
 *     }
 */
router.get('/', async (req, res) => {
  try {
    const { sortField = 'id', sortOrder = 'asc', name } = req.query;
    
    // 验证排序字段
    const allowedSortFields = ['id', 'name', 'created_at', 'post_count'];
    const validSortField = allowedSortFields.includes(sortField) ? sortField : 'id';
    const validSortOrder = ['asc', 'desc'].includes(sortOrder?.toLowerCase()) ? sortOrder.toUpperCase() : 'ASC';
    
    // 构建WHERE条件
    let whereClause = '';
    const queryParams = [];
    
    if (name && name.trim()) {
      whereClause = 'WHERE c.name LIKE ?';
      queryParams.push(`%${name.trim()}%`);
    }
    
    const [categories] = await pool.execute(`
      SELECT 
        c.id, 
        c.name, 
        c.created_at,
        COUNT(p.id) as post_count
      FROM categories c
      LEFT JOIN posts p ON c.id = p.category_id
      ${whereClause}
      GROUP BY c.id, c.name, c.created_at
      ORDER BY ${validSortField} ${validSortOrder}
    `, queryParams);

    success(res, categories, '获取成功');
  } catch (err) {
    console.error('获取分类列表失败:', err);
    error(res, '获取分类列表失败');
  }
});

/**
 * @api {post} /api/categories 创建分类
 * @apiName CreateCategory
 * @apiGroup Categories
 * @apiDescription 创建新分类（需要管理员权限）
 * 
 * @apiHeader {String} Authorization Bearer token
 * 
 * @apiParam {String} name 分类名称
 * 
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Object} data 创建的分类信息
 * @apiSuccess {Number} data.id 分类ID
 * @apiSuccess {String} data.name 分类名称
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return error(res, '分类名称不能为空', HTTP_STATUS.BAD_REQUEST);
    }

    // 检查分类是否已存在
    const [existing] = await pool.execute(
      'SELECT id FROM categories WHERE name = ?',
      [name.trim()]
    );

    if (existing.length > 0) {
      return error(res, '分类已存在', HTTP_STATUS.BAD_REQUEST);
    }

    // 创建分类
    const [result] = await pool.execute(
      'INSERT INTO categories (name) VALUES (?)',
      [name.trim()]
    );

    const newCategory = {
      id: result.insertId,
      name: name.trim()
    };

    success(res, newCategory, '创建成功');
  } catch (err) {
    console.error('创建分类失败:', err);
    error(res, '创建分类失败');
  }
});

/**
 * @api {put} /api/categories/:id 更新分类
 * @apiName UpdateCategory
 * @apiGroup Categories
 * @apiDescription 更新分类信息（需要管理员权限）
 * 
 * @apiHeader {String} Authorization Bearer token
 * 
 * @apiParam {Number} id 分类ID
 * @apiParam {String} name 分类名称
 * 
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} message 响应消息
 */
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return error(res, '分类名称不能为空', HTTP_STATUS.BAD_REQUEST);
    }

    // 检查分类是否存在
    const [existing] = await pool.execute(
      'SELECT id FROM categories WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return error(res, '分类不存在', HTTP_STATUS.NOT_FOUND);
    }

    // 检查新名称是否已被其他分类使用
    const [duplicate] = await pool.execute(
      'SELECT id FROM categories WHERE name = ? AND id != ?',
      [name.trim(), id]
    );

    if (duplicate.length > 0) {
      return error(res, '分类名称已存在', HTTP_STATUS.BAD_REQUEST);
    }

    // 更新分类
    await pool.execute(
      'UPDATE categories SET name = ? WHERE id = ?',
      [name.trim(), id]
    );

    success(res, null, '更新成功');
  } catch (err) {
    console.error('更新分类失败:', err);
    error(res, '更新分类失败');
  }
});

/**
 * @api {delete} /api/categories/:id 删除分类
 * @apiName DeleteCategory
 * @apiGroup Categories
 * @apiDescription 删除分类（需要管理员权限）
 * 
 * @apiHeader {String} Authorization Bearer token
 * 
 * @apiParam {Number} id 分类ID
 * 
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} message 响应消息
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // 检查分类是否存在
    const [existing] = await pool.execute(
      'SELECT id FROM categories WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return error(res, '分类不存在', HTTP_STATUS.NOT_FOUND);
    }

    // 检查是否有笔记使用该分类
    const [posts] = await pool.execute(
      'SELECT id FROM posts WHERE category_id = ? LIMIT 1',
      [id]
    );

    if (posts.length > 0) {
      return error(res, '该分类下还有笔记，无法删除', HTTP_STATUS.BAD_REQUEST);
    }

    // 删除分类
    await pool.execute('DELETE FROM categories WHERE id = ?', [id]);

    success(res, null, '删除成功');
  } catch (err) {
    console.error('删除分类失败:', err);
    error(res, '删除分类失败');
  }
});

module.exports = router;