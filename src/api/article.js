import request from '@/utils/request'
// 所有文章列表
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
// 获取访问总量和趋势
export function getVisitLog(token) {
  return request({
    url: '/article/getVisitLog',
    method: 'post',
    data: {
      token
    }
  })
}
// 界首
export function getPanel(token) {
  return request({
    url: '/article/getHomepagePanel',
    method: 'post',
    data: {
      token
    }
  })
}
// 获取所有分类访问量
export function getAllVisitCountByType(token) {
  return request({
    url: '/article/getAllVisitCountByType',
    method: 'post',
    data: {
      token
    }
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
// 文章可选标签
export function getLabels() {
  return request({
    url: '/article/labels',
    method: 'post'
  })
}

// 创建文章
export function createArticle(data) {
  return request({
    url: '/article/createArticle',
    method: 'post',
    data
  })
}
// 更新文章
export function updateArticle(data) {
  return request({
    url: '/article/updateArticle',
    method: 'post',
    data
  })
}
// 设置文章状态
export function setStatus(articleId, token, status) {
  return request({
    url: '/article/setStatus',
    method: 'post',
    data: {
      articleId,
      token,
      status
    }
  })
}

// 删除文章
export function delArticle(articleId, token) {
  return request({
    url: '/article/delArticle',
    method: 'post',
    data: {
      articleId,
      token
    }
  })
}
