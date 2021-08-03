import request from '@/utils/request'

/**
 * 登录，返回验证信息
 * @param {Object} data 行号密码
 */
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 * @param {Object} token 验证信息
 */
export function getInfo(token) {
  const data = { 'token': token }
  return request({
    url: '/user/getInfo',
    method: 'post',
    data
  })
}

/**
 * 设置个人信息
 * @param {Object} token 验证信息
 * @param {Object} user 新的用户信息对象
 */
export function setInfor(token, user) {
  return request({
    url: '/user/setInfo',
    method: 'post',
    data: { token: token, user: user }
  })
}

/**
 * 登出
 */
export function logout(token) {
  return request({
    url: '/user/logout',
    method: 'post',
    data: { token }
  })
}

/**
 * 获取最近活动记录
 * @param {Object} token 验证信息
 */
export function getActivity(token) {
  return request({
    url: '/user/getActivity',
    method: 'post',
    data: { token }
  })
}

/**
 * 获取工作概览
 * @param {Object} token 验证信息
 */
export function getWork(token) {
  return request({
    url: '/user/getWork',
    method: 'post',
    data: { token }
  })
}

/**
 * 设置头像
 * @param {Object} token 验证信息
 */
export function setAvatar(token, avatar) {
  return request({
    url: '/user/setAvatar',
    method: 'post',
    data: { token: token, avatar: avatar }
  })
}

/**
 * 获取用户关于信息
 * @param {Object} token 验证信息
 */
export function getAboutByUserId(token) {
  return request({
    url: '/user/getAboutByUserId',
    method: 'post',
    data: { token: token }
  })
}
