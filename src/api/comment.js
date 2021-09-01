import request from '@/utils/request'

/**
 * 评论列表
 * @param query 分页对象
 */
export function getCommentList(query) {
  const { page, limit, status, sort } = query
  return request({
    url: '/comment/getCommentList',
    method: 'post',
    data: {
      page,
      limit,
      status,
      sort
    }
  })
}

/**
 * 修改评论ID
 * @param id 评论ID
 * @param status 状态
 */
export function setCommentStatus(id, status) {
  return request({
    url: '/comment/setCommentStatus',
    method: 'post',
    data: {
      id,
      content: status
    }
  })
}
