import request from '../utils/request.js'

/**
 *  获取友链列表
 */
export function getFriendLinks() {
  return request({
    url: '/links/getFriendLinks',
    method: 'post',
    data: {
      status: 'ALL'
    }
  })
}

/**
 *  申请友链
 */
export function applyFriendLink(friendLinks) {
  return request({
    url: '/links/applyFriendLink',
    method: 'post',
    data: {
      ...friendLinks
    }
  })
}

/**
 *  设置友链
 */
export function setFriendLink(link) {
  return request({
    url: '/links/setFriendLink',
    method: 'post',
    data: {
      ...link
    }
  })
}
