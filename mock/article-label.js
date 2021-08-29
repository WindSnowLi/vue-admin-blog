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
  }
]
