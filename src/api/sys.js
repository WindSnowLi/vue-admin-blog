import request from '@/utils/request'

/**
 * 设置UI
 * @param {String} token 验证信息
 * @param {Object} data UI数据
 */
export function setUiConfig(token, data) {
  return request({
    url: '/sys/setUiConfig',
    method: 'post',
    data: {
      token: token,
      content: data
    }
  })
}

/**
 * 获取系统存储配置
 */
export function getStorageConfig() {
  return request({
    url: '/sys/getStorageConfig',
    method: 'post'
  })
}

/**
 * 设置系统存储配置
 * @param {Object} storage 存储配置Json对象
 */
export function setStorageConfig(storage) {
  return request({
    url: '/sys/setStorageConfig',
    method: 'post',
    data: {
      content: storage
    }
  })
}

/**
 * 获取系统存储配置，包含表单描述信息
 */
export function getSysConfig() {
  return request({
    url: '/sys/getSysConfig',
    method: 'post'
  })
}

/**
 * 获取Gitee登录配置，包含表单描述信息
 */
export function getGiteeConfig() {
  return request({
    url: '/sys/getGiteeConfig',
    method: 'post'
  })
}

/**
 * 设置Gitee登录配置
 */
export function setGiteeConfig() {
  return request({
    url: '/sys/setGiteeConfig',
    method: 'post'
  })
}

/**
 * 上传系统配置
 * @param {Object} config 系统设置信息
 */
export function setSysConfig(config) {
  return request({
    url: '/sys/setSysConfig',
    method: 'post',
    data: {
      content: config
    }
  })
}

/**
 * 获取用户Ui配置信息
 * @param {int} id 用户ID
 */
export function getUiConfig(id) {
  return request({
    url: '/sys/getUiConfig',
    method: 'post',
    data: { id }
  })
}
