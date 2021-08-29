import request from '@/utils/request'

/**
 * 获取头像上传的Url，含上传后的文件名
 * {url: 上传签名Url, GetUrl: Get请求Url}
 * @param {Object} token 验证信息
 */
export function getUploadAvatarUrl(token) {
  return request({
    url: '/file/getUploadAvatarUrl',
    method: 'post',
    data: { token }
  })
}

/**
 * 获取上传文章封面的Url，含上传后的文件名
 * {url: 上传签名Url, GetUrl: Get请求Url}
 * @param {Object} token 验证信息
 */
export function getUploadArticleCoverImageUrl(token) {
  return request({
    url: '/file/getUploadArticleCoverImageUrl',
    method: 'post',
    data: { token }
  })
}

/**
 * 获取上传文章内容图片的Url，含上传后的文件名
 * {url: 上传签名Url, GetUrl: Get请求Url}
 * @param {Object} token 验证信息
 */
export function getUploadArticleImageUrl(token) {
  return request({
    url: '/file/getUploadArticleImageUrl',
    method: 'post',
    data: { token }
  })
}

/**
 * 获取上传文章内容图片的Url，含上传后的文件名
 * {url: 上传签名Url, GetUrl: Get请求Url}
 * @param {Object} token 验证信息
 * @param {String} objectName 文件路径
 */
export function deleteObject(token, objectName) {
  return request({
    url: '/file/deleteObject',
    method: 'post',
    data: {
      token,
      content: objectName
    }
  })
}
