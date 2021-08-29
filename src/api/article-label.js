// 文章可选标签
import request from '@/utils/request'

export function getLabels() {
  return request({
    url: '/articleLabel/labels',
    method: 'post'
  })
}
