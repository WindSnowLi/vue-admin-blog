const Mock = require('mockjs')

const List = []
const count = 100

const baseContent =
  '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const coverPic = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    article: {
      id: '@increment',
      title: '@title(5, 10)',
      summary: 'mock data',
      content: baseContent,
      coverPic,
      labels: ['C++', 'Python', 'Java', '学习', '资源'],
      createTime: +Mock.Random.date('T'),
      updateTime: +Mock.Random.date('T'),
      visitsCount: '@integer(300, 5000)',
      'status|1': ['published', 'draft', 'deleted'],
      'publishType|1': ['ORIGINAL', 'REPRINT', 'TRANSLATE'],
      articleType: {
        // label ID
        id: 2,
        // label名称
        'name|1': ['C++', 'Python', 'Java', '学习', '资源'],
        // 封面
        coverPic: coverPic,
        // 浏览次数
        visitsCount: '@integer(300, 5000)',
        // 所属文章总数
        num: '@integer(10, 50)'
      }
    },
    user: {
      id: '@increment',
      nickname: '@first'
    }
  }))
}

module.exports = [
  // 所有文章列表
  {
    url: '/article/getArticlesByPage',
    type: 'post', // 接收不到请求参数
    response: config => {
      const {
        page = 1,
        limit = 20,
        sort
      } = config.query
      let mockList = List

      if (sort === '-id') {
        mockList = mockList.reverse()
      }
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: pageList.length,
          items: pageList
        }
      }
    }
  },
  // 根据文章ID查询文章信息
  {
    url: '/article/getArticleById',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: List[0]
      }
    }
  },
  // 创建文章
  {
    url: '/article/createArticle',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          articleId: List[0].id
        }
      }
    }
  },
  // 更新文章
  {
    url: '/article/updateArticle',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 获取所有分类访问量
  {
    url: '/article/getAllPVByType',
    type: 'post',
    dataType: 'json',
    response: _ => {
      return {
        code: 20000,
        message: '请求成功',
        data: {
          data: [{
            value: 320,
            name: 'Industries'
          },
          {
            value: 240,
            name: 'Technology'
          },
          {
            value: 149,
            name: 'Forex'
          },
          {
            value: 250,
            name: 'Gold'
          },
          {
            value: 590,
            name: 'Forecasts'
          }
          ],
          dataName: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        }
      }
    }
  },
  // 设置文章状态
  {
    url: '/article/setStatus',
    type: 'post',
    dataType: 'json',
    response: _ => {
      return {
        code: 20000,
        message: '请求成功'
      }
    }
  },
  // 删除文章
  {
    url: '/article/delArticle',
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
