const mysql = require('mysql2/promise');
const config = require('../config/config');

async function addCategoryTitleColumn() {
  let connection;
  
  try {
    // 创建数据库连接
    connection = await mysql.createConnection({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
      charset: 'utf8mb4'
    });

    console.log('数据库连接成功');

    // 1. 检查category_title列是否已存在
    const [columns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'categories' AND COLUMN_NAME = 'category_title'
    `, [config.database.database]);

    if (columns.length > 0) {
      console.log('category_title列已存在，跳过添加步骤');
    } else {
      // 2. 添加category_title列
      console.log('正在添加category_title列...');
      await connection.execute(`
        ALTER TABLE categories 
        ADD COLUMN category_title VARCHAR(50) NULL COMMENT '分类英文标题，用于URL路径' 
        AFTER name
      `);
      console.log('✓ category_title列添加成功');
    }

    // 3. 更新现有分类的英文标题
    console.log('正在更新分类英文标题...');
    
    const categoryMappings = [
      { name: '学习', title: 'study' },
      { name: '校园', title: 'campus' },
      { name: '情感', title: 'emotion' },
      { name: '兴趣', title: 'interest' },
      { name: '生活', title: 'life' },
      { name: '社交', title: 'social' },
      { name: '帮助', title: 'help' },
      { name: '观点', title: 'opinion' },
      { name: '毕业', title: 'graduation' },
      { name: '职场', title: 'career' }
    ];

    for (const mapping of categoryMappings) {
      const [result] = await connection.execute(
        'UPDATE categories SET category_title = ? WHERE name = ?',
        [mapping.title, mapping.name]
      );
      
      if (result.affectedRows > 0) {
        console.log(`✓ 更新分类 "${mapping.name}" -> "${mapping.title}"`);
      } else {
        console.log(`⚠ 分类 "${mapping.name}" 不存在，跳过更新`);
      }
    }

    // 4. 检查是否已有唯一索引
    const [indexes] = await connection.execute(`
      SELECT INDEX_NAME 
      FROM INFORMATION_SCHEMA.STATISTICS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'categories' AND INDEX_NAME = 'uk_category_title'
    `, [config.database.database]);

    if (indexes.length === 0) {
      // 5. 添加唯一索引
      console.log('正在添加category_title唯一索引...');
      await connection.execute(`
        ALTER TABLE categories 
        ADD UNIQUE KEY uk_category_title (category_title)
      `);
      console.log('✓ category_title唯一索引添加成功');
    } else {
      console.log('category_title唯一索引已存在，跳过添加步骤');
    }

    // 6. 验证更新结果
    console.log('\n验证更新结果:');
    const [categories] = await connection.execute(
      'SELECT id, name, category_title, created_at FROM categories ORDER BY id'
    );
    
    console.table(categories);
    
    console.log('\n✅ categories表category_title列添加完成！');
    
  } catch (error) {
    console.error('❌ 执行失败:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('数据库连接已关闭');
    }
  }
}

// 执行脚本
if (require.main === module) {
  addCategoryTitleColumn();
}

module.exports = addCategoryTitleColumn;