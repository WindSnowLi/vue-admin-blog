// 文章可选标签
import request from '@/utils/request'

/**
 * 文章可选择标签
 */
export function getLabels() {
  return request({
    url: '/articleLabel/labels',
    method: 'post'
  })
}

/**
 * 获取标签对象列表
 * @param query 分页查询参数对象
 */
export function getLabelByPage(query) {
  return request({
    url: '/articleLabel/getLabelByPage',
    method: 'post',
    data: query
  })
}

/**
 * 设置标签内容
 * @param label 标签对象
 */
export function setLabel(label) {
  return request({
    url: '/articleLabel/setLabel',
    method: 'post',
    data: label
  })
}
