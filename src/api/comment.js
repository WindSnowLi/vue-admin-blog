import request from '@/utils/request'

/**
 * 评论列表
 * @param token 验证信息
 * @param query 分页对象
 */
export function getCommentList(token, query) {
  const { page, limit, status, sort } = query
  return request({
    url: '/comment/getCommentList',
    method: 'post',
    data: {
      token,
      content: {
        page,
        limit,
        status,
        sort
      }
    }
  })
}

/**
 * 修改评论ID
 * @param token 验证信息
 * @param id 评论ID
 * @param status 状态
 */
export function setCommentStatus(token, id, status) {
  return request({
    url: '/comment/setCommentStatus',
    method: 'post',
    data: {
      token,
      content: {
        id,
        content: status
      }
    }
  })
}
