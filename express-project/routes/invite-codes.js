const express = require('express')
const router = express.Router()
const { pool } = require('../config/config')
const { HTTP_STATUS, RESPONSE_CODES } = require('../constants')

// 生成8位小写数字与字母组合的邀请码
function generateInviteCode() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// 获取邀请码列表
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, is_active, code } = req.query
    const offset = (parseInt(page) - 1) * parseInt(limit)
    
    let whereClause = ''
    let params = []
    
    // 处理is_active搜索参数
    if (is_active !== undefined && is_active !== '') {
      whereClause = 'WHERE is_active = ?'
      params.push(parseInt(is_active))
    }
    
    // 处理code搜索参数
    if (code && code.trim() !== '') {
      if (whereClause) {
        whereClause += ' AND '
      } else {
        whereClause = 'WHERE '
      }
      whereClause += 'code LIKE ?'
      params.push(`%${code.trim()}%`)
    }
    
    // 获取总数
    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total FROM invite_codes ${whereClause}`,
      params
    )
    
    // 获取数据 - 尝试使用query方法而不是execute方法
    let query = 'SELECT * FROM invite_codes'
    let queryParams = []
    
    // 添加WHERE条件
    if (whereClause) {
      query += ` ${whereClause}`
      queryParams = [...params]
    }
    
    // 添加排序和分页
    // 默认按created_at降序，如果有传入排序参数则使用传入的参数
    const sortField = req.query.sortField || 'created_at'
    const sortOrder = (req.query.sortOrder && req.query.sortOrder.toLowerCase() === 'asc') ? 'ASC' : 'DESC'
    
    // 安全检查，只允许有效的字段排序
    const validSortFields = ['id', 'code', 'is_active', 'created_at', 'used_at']
    const orderByField = validSortFields.includes(sortField) ? sortField : 'created_at'
    
    query += ` ORDER BY ${orderByField} ${sortOrder} LIMIT ? OFFSET ?`
    queryParams.push(parseInt(limit), offset)
    
    // 调试信息
    // console.log('SQL Query:', query)
    // console.log('Query Params:', queryParams)
    // console.log('is_active value:', is_active)
    // console.log('whereClause:', whereClause)
    // console.log('params:', params)
    
    // 尝试使用query方法而不是execute方法
    const [rows] = await pool.query(query, queryParams)
    
    res.json({
      code: RESPONSE_CODES.SUCCESS,
      message: '获取邀请码列表成功',
      data: {
        items: rows,
        total: countResult[0].total,
        page: parseInt(page),
        limit: parseInt(limit)
      }
    })
  } catch (error) {
    console.error('获取邀请码列表失败:', error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      code: RESPONSE_CODES.ERROR,
      message: '获取邀请码列表失败'
    })
  }
})

// 批量创建邀请码
router.post('/batch', async (req, res) => {
  try {
    const { count = 10 } = req.body
    
    if (!count || count <= 0 || count > 100) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        code: RESPONSE_CODES.ERROR,
        message: '数量必须在1-100之间'
      })
    }
    
    const codes = []
    const existingCodes = new Set()
    
    // 获取已存在的邀请码
    const [existingRows] = await pool.execute('SELECT code FROM invite_codes')
    existingRows.forEach(row => existingCodes.add(row.code))
    
    // 生成不重复的邀请码
    while (codes.length < count) {
      const code = generateInviteCode()
      if (!existingCodes.has(code)) {
        codes.push(code)
        existingCodes.add(code)
      }
    }
    
    // 批量插入数据库
    const [result] = await pool.execute(
      `INSERT INTO invite_codes (code) VALUES ${codes.map(() => '(?)').join(', ')}`,
      codes
    )
    
    res.json({
      code: RESPONSE_CODES.SUCCESS,
      message: `成功创建 ${count} 个邀请码`,
      data: {
        codes,
        affectedRows: result.affectedRows
      }
    })
  } catch (error) {
    console.error('批量创建邀请码失败:', error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      code: RESPONSE_CODES.ERROR,
      message: '批量创建邀请码失败'
    })
  }
})

// 删除邀请码
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    const [result] = await pool.execute('DELETE FROM invite_codes WHERE id = ?', [id])
    
    if (result.affectedRows === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        code: RESPONSE_CODES.ERROR,
        message: '邀请码不存在'
      })
    }
    
    res.json({
      code: RESPONSE_CODES.SUCCESS,
      message: '删除邀请码成功'
    })
  } catch (error) {
    console.error('删除邀请码失败:', error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      code: RESPONSE_CODES.ERROR,
      message: '删除邀请码失败'
    })
  }
})

// 批量删除邀请码
router.delete('/', async (req, res) => {
  try {
    const { ids } = req.body
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        code: RESPONSE_CODES.ERROR,
        message: '请至少选择一个邀请码'
      })
    }
    
    // 将数组转换为字符串格式用于SQL IN条件
    const idsStr = ids.join(',')
    const [result] = await pool.execute(`DELETE FROM invite_codes WHERE id IN (${idsStr})`)
    
    res.json({
      code: RESPONSE_CODES.SUCCESS,
      message: `成功删除 ${result.affectedRows} 个邀请码`
    })
  } catch (error) {
    console.error('批量删除邀请码失败:', error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      code: RESPONSE_CODES.ERROR,
      message: '批量删除邀请码失败'
    })
  }
})

// 验证邀请码（用于注册时验证）
router.get('/validate/:code', async (req, res) => {
  try {
    const { code } = req.params
    
    const [rows] = await pool.execute(
      'SELECT * FROM invite_codes WHERE code = ? AND is_active = 1',
      [code]
    )
    
    if (rows.length === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        code: RESPONSE_CODES.ERROR,
        message: '邀请码无效或已被使用'
      })
    }
    
    res.json({
      code: RESPONSE_CODES.SUCCESS,
      message: '邀请码有效',
      data: rows[0]
    })
  } catch (error) {
    console.error('验证邀请码失败:', error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      code: RESPONSE_CODES.ERROR,
      message: '验证邀请码失败'
    })
  }
})

// 使用邀请码（注册成功后调用）
router.put('/use/:code', async (req, res) => {
  try {
    const { code } = req.params
    
    const [result] = await pool.execute(
      'UPDATE invite_codes SET is_active = 2, used_at = CURRENT_TIMESTAMP WHERE code = ? AND is_active = 1',
      [code]
    )
    
    if (result.affectedRows === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        code: RESPONSE_CODES.ERROR,
        message: '邀请码无效或已被使用'
      })
    }
    
    res.json({
      code: RESPONSE_CODES.SUCCESS,
      message: '邀请码使用成功'
    })
  } catch (error) {
    console.error('使用邀请码失败:', error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      code: RESPONSE_CODES.ERROR,
      message: '使用邀请码失败'
    })
  }
})

// 更新邀请码（用于管理后台编辑）
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { is_active, code } = req.body
    
    // 验证参数
    if (is_active === undefined && !code) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        code: RESPONSE_CODES.ERROR,
        message: '请至少提供一个要更新的字段（状态或邀请码）'
      })
    }
    
    // 准备更新的数据
    const updateData = {}
    if (code) {
      // 检查邀请码是否已存在
      const [existingCodes] = await pool.execute(
        'SELECT id FROM invite_codes WHERE code = ? AND id != ?',
        [code, id]
      )
      
      if (existingCodes.length > 0) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          code: RESPONSE_CODES.ERROR,
          message: '邀请码已存在'
        })
      }
      updateData.code = code
    }
    
    if (is_active !== undefined) {
      updateData.is_active = parseInt(is_active)
      
      // 如果状态从2变为1，重置使用时间
      if (updateData.is_active === 1) {
        updateData.used_at = null
      }
      
      // 如果状态从1变为2，设置使用时间为当前时间
      if (updateData.is_active === 2) {
        updateData.used_at = new Date()
      }
    }
    
    // 构建更新SQL和参数
    const setClauses = []
    const params = []
    
    if (updateData.code) {
      setClauses.push('code = ?')
      params.push(updateData.code)
    }
    if (updateData.is_active !== undefined) {
      setClauses.push('is_active = ?')
      params.push(updateData.is_active)
      setClauses.push('used_at = ?')
      params.push(updateData.used_at)
    }
    
    params.push(id)
    
    // 执行更新
    const [result] = await pool.execute(
      `UPDATE invite_codes SET ${setClauses.join(', ')} WHERE id = ?`,
      params
    )
    
    if (result.affectedRows === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        code: RESPONSE_CODES.ERROR,
        message: '邀请码不存在'
      })
    }
    
    res.json({
      code: RESPONSE_CODES.SUCCESS,
      message: '邀请码更新成功',
      data: {
        id,
        is_active: updateData.is_active,
        used_at: updateData.used_at
      }
    })
  } catch (error) {
    console.error('更新邀请码失败:', error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      code: RESPONSE_CODES.ERROR,
      message: '更新邀请码失败'
    })
  }
})

module.exports = router