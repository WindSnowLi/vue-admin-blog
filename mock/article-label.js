const Mock = require('mockjs')
const List = []
const count = 100
const coverPic = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@title(5, 10)',
    coverPic,
    describe: '这是其中一个标签的描述'
  }))
}

module.exports = [
  // 文章可选标签
  {
    url: '/articleLabel/labels',
    type: 'post',
    dataType: 'json',
    response: _ => {
      return {
        code: 20000,
        message: '请求成功',
        data: [{
          value: 'C++',
          label: 'C++'
        }, {
          value: 'Java',
          label: 'Java'
        }, {
          value: 'Python',
          label: 'Python'
        }]
      }
    }
  },
  // 标签对象列表
  {
    url: '/articleLabel/labelList',
    type: 'post',
    dataType: 'json',
    response: _ => {
      return {
        code: 20000,
        message: '请求成功',
        data: List
      }
    }
  },
  // 标签对象列表
  {
    url: '/articleLabel/setLabel',
    type: 'post',
    dataType: 'json',
    response: _ => {
      return {
        code: 20000,
        message: '请求成功'
      }
    }
  }
]
