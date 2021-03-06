import request from '@/utils/request'

// 所有文章列表
/**
 * 分页获取文章列表
 * @param query 分页查询参数对象
 */
export function fetchList(query) {
  return request({
    url: '/article/getArticlesByPage',
    method: 'post',
    data: query
  })
}

// 根据文章ID查询文章信息
export function fetchArticle(id) {
  return request({
    url: '/article/getArticleById',
    method: 'post',
    data: {
      id
    }
  })
}

// 获取所有分类访问量
export function getAllPVByType() {
  return request({
    url: '/article/getAllPVByType',
    method: 'post'
  })
}

// 获取文章创建历史
export function getArticleCreateLog(token) {
  return request({
    url: '/article/getArticleCreateLog',
    method: 'post',
    data: {
      token
    }
  })
}

// 创建文章
export function createArticle(token, article) {
  return request({
    url: '/article/createArticle',
    method: 'post',
    data: {
      token,
      content: article
    }
  })
}

// 更新文章
export function updateArticle(article) {
  return request({
    url: '/article/updateArticle',
    method: 'post',
    data: {
      content: article
    }
  })
}

// 设置文章状态
export function setStatus(articleId, status) {
  return request({
    url: '/article/setStatus',
    method: 'post',
    data: {
      id: articleId,
      content: status
    }
  })
}

// 删除文章
export function delArticle(articleId) {
  return request({
    url: '/article/delArticle',
    method: 'post',
    data: {
      id: articleId
    }
  })
}
