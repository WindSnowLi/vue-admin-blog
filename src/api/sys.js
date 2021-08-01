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
      sysConfig: data
    }
  })
}

/**
 * 获取UI配置
 * @param {Number} id 用户ID
 */
export function getUiConfig(id) {
  return request({
    url: '/sys/getConfigByUserId',
    method: 'post',
    data: {
      id
    }
  })
}

/**
 * 获取系统存储配置
 * @param {String} token 身份验证信息
 */
export function getStorageConfig(token) {
  return request({
    url: '/sys/getStorageConfig',
    method: 'post',
    data: {
      token
    }
  })
}

/**
 * 设置系统存储配置
 * @param {String} token 身份验证信息
 * @param {Object} storage 存储配置Json对象
 */
export function setStorageConfig(token, storage) {
  return request({
    url: '/sys/setStorageConfig',
    method: 'post',
    data: {
      token,
      storage
    }
  })
}

/**
 * 获取系统存储配置，包含表单描述信息
 * @param {String} token 身份验证信息
 */
export function getSysConfig(token) {
  return request({
    url: '/sys/getSysConfig',
    method: 'post',
    data: {
      token
    }
  })
}

/**
 * 上传系统配置
 * @param {String} token 身份验证信息
 * @param {Object} config 系统设置信息
 */
export function setSysConfig(token, config) {
  return request({
    url: '/sys/setSysConfig',
    method: 'post',
    data: {
      token,
      config
    }
  })
}
