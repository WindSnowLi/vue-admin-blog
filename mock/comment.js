const Mock = require('mockjs')
const List = []
const count = 20
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    content: '@guid()',
    createTime: +Mock.Random.date('T'),
    fromUser: {
      id: '@increment',
      nickname: '@name()'
    },
    toUser: {
      id: '@increment',
      nickname: '@name()'
    },
    target: {
      title: '@title(5, 10)'
    }
  }))
}

module.exports = [
  // 获取评论列表
  {
    url: '/comment/getCommentList',
    type: 'post',
    dataType: 'json',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: 20,
          items: List
        }
      }
    }
  },
  // 修改评论状态
  {
    url: '/comment/setCommentStatus',
    type: 'post',
    dataType: 'json',
    response: _ => {
      return {
        code: 20000,
        message: 'OK'
      }
    }
  }
]
