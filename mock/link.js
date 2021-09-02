const Mock = require('mockjs')
const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    link: '@url',
    title: '@csentence',
    describe: '@csentence',
    email: '@email',
    'status|1': ['PASS', 'APPLY', 'REFUSE', 'HIDE', 'DELETE'],
    coverPic: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
    createTime: +Mock.Random.date('T'),
    updateTime: +Mock.Random.date('T')
  }))
}

module.exports = [
  // 获取友链
  {
    url: '/links/getFriendLinks',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: List
      }
    }
  },
  // 添加友链
  {
    url: '/links/applyFriendLink',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'OK'
      }
    }
  },
  // 设置友链状态
  {
    url: '/links/setFriendLink',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'OK'
      }
    }
  }
]
