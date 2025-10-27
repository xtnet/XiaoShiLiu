/**
 * 内容安全过滤工具函数
 * 统一管理危险标签过滤，防止XSS攻击
 */

/**
 * 内容安全过滤函数 - 用于渲染阶段
 * 保留mention链接，将其他所有HTML标签转义为纯文本，同时保持换行
 * @param {string} content - 需要过滤的内容
 * @returns {string} - 过滤后的安全内容
 */
export const sanitizeContent = (content) => {
  if (!content) return ''

  // 1. 提取并保护mention链接
  const mentionLinkRegex = /<a[^>]*class="[^"]*mention-link[^"]*"[^>]*data-user-id="[^"]*"[^>]*>@[^<]*<\/a>/g
  const mentionLinks = []
  let processedContent = content.replace(mentionLinkRegex, (match) => {
    const placeholder = `__MENTION_LINK_${mentionLinks.length}__`
    mentionLinks.push(match)
    return placeholder
  })

  // 2. 保护换行符
  const lineBreaks = []
  processedContent = processedContent.replace(/\n/g, () => {
    const placeholder = `__LINE_BREAK_${lineBreaks.length}__`
    lineBreaks.push('<br>')
    return placeholder
  })

  // 3. 将<br>标签也保护起来
  const brTags = []
  processedContent = processedContent.replace(/<br\s*\/?>/gi, () => {
    const placeholder = `__BR_TAG_${brTags.length}__`
    brTags.push('<br>')
    return placeholder
  })

  // 4. 将所有剩余的HTML标签转义为纯文本（使用DOM的textContent特性）
  const escapeHtml = (text) => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }
  processedContent = escapeHtml(processedContent)

  // 5. 恢复被保护的内容
  // 先恢复<br>标签
  brTags.forEach((tag, index) => {
    processedContent = processedContent.replace(`__BR_TAG_${index}__`, tag)
  })

  // 恢复换行符
  lineBreaks.forEach((tag, index) => {
    processedContent = processedContent.replace(`__LINE_BREAK_${index}__`, tag)
  })

  // 最后恢复mention链接
  mentionLinks.forEach((link, index) => {
    processedContent = processedContent.replace(`__MENTION_LINK_${index}__`, link)
  })

  return processedContent.trim()
}

/**
 * 简单的文本内容过滤函数
 * 移除所有HTML标签，只保留纯文本
 * @param {string} content - 需要过滤的内容
 * @returns {string} - 过滤后的纯文本内容
 */
export const sanitizeText = (content) => {
  if (!content) return ''
  return content.replace(/<[^>]*>/g, '')
}

/**
 * 验证内容是否包含危险标签
 * @param {string} content - 需要验证的内容
 * @returns {boolean} - 是否包含危险标签
 */
export const hasDangerousTags = (content) => {
  if (!content) return false

  // 危险标签列表
  const dangerousTags = [
    'script', 'iframe', 'object', 'embed', 'form', 'input', 'button',
    'link', 'meta', 'style', 'base', 'applet', 'frame', 'frameset'
  ]

  const tagRegex = new RegExp(`<\/?(?:${dangerousTags.join('|')})[^>]*>`, 'gi')
  return tagRegex.test(content)
}

/**
 * 验证内容是否包含危险属性
 * @param {string} content - 需要验证的内容
 * @returns {boolean} - 是否包含危险属性
 */
export const hasDangerousAttributes = (content) => {
  if (!content) return false

  // 危险属性列表
  const dangerousAttrs = [
    'onclick', 'onload', 'onerror', 'onmouseover', 'onmouseout',
    'onfocus', 'onblur', 'onchange', 'onsubmit', 'javascript:'
  ]

  return dangerousAttrs.some(attr =>
    content.toLowerCase().includes(attr.toLowerCase())
  )
}

/**
 * 完整的内容安全检查和过滤
 * @param {string} content - 需要处理的内容
 * @returns {object} - 包含是否安全和过滤后内容的对象
 */
export const securityCheck = (content) => {
  if (!content) {
    return {
      isSafe: true,
      sanitizedContent: '',
      warnings: []
    }
  }

  const warnings = []

  // 检查危险标签
  if (hasDangerousTags(content)) {
    warnings.push('检测到危险HTML标签')
  }

  // 检查危险属性
  if (hasDangerousAttributes(content)) {
    warnings.push('检测到危险HTML属性')
  }

  // 过滤内容
  const sanitizedContent = sanitizeContent(content)

  return {
    isSafe: warnings.length === 0,
    sanitizedContent,
    warnings
  }
}