import request from '@/utils/request'

/**
 * 获取仪表盘折线图和panel-group部分
 * @param token 验证信息
 */
export function getPanel(token) {
  return request({
    url: '/other/getPanel',
    method: 'post',
    data: { token }
  })
}

/**
 * 获取图表信息
 * @param token 验证信息
 */
export function getChart(token) {
  return request({
    url: '/other/getChart',
    method: 'post',
    data: { token }
  })
}
