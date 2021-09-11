module.exports = [
  // 获取访问总量和趋势
  {
    url: '/other/getPanel',
    type: 'post',
    dataType: 'json',
    response: _ => {
      return {
        code: 20000,
        message: '请求成功',
        data: {
          'pv': {
            'title': '浏览量',
            'total': 1502,
            'x': [
              '2021-08-05',
              '2021-08-06',
              '2021-08-07',
              '2021-08-08',
              '2021-08-13',
              '2021-08-14',
              '2021-08-15',
              '2021-08-18',
              '2021-08-19',
              '2021-08-20'
            ],
            'y': [
              49,
              18,
              4,
              5,
              26,
              23,
              1,
              1,
              22,
              26
            ]
          },
          'comments': {
            'title': '创作篇',
            'total': 17,
            'x': [
              '2021-08-18',
              '2021-08-19',
              '2021-08-20'
            ],
            'y': [
              7,
              1,
              6
            ]
          },
          'articles': {
            'title': '创作篇',
            'total': 34,
            'x': [
              '2021第20周',
              '2021第21周',
              '2021第22周',
              '2021第24周',
              '2021第26周',
              '2021第29周',
              '2021第30周',
              '2021第31周'
            ],
            'y': [
              2,
              6,
              1,
              3,
              2,
              5,
              5,
              10
            ]
          },
          'verifyComments': {
            'title': '创作篇',
            'total': 2,
            'x': [
              '2021-08-19',
              '2021-08-20'
            ],
            'y': [
              1,
              1
            ]
          }
        }
      }
    }
  },
  {
    url: '/other/getChart',
    type: 'post',
    dataType: 'json',
    response: _ => {
      return {
        code: 20000,
        message: '请求成功',
        data: {
          'pv': {
            'data': [
              {
                'name': 'Python',
                'value': 397
              },
              {
                'name': 'C++',
                'value': 270
              },
              {
                'name': '学习',
                'value': 356
              },
              {
                'name': '机器学习',
                'value': 29
              },
              {
                'name': '传感器',
                'value': 21
              },
              {
                'name': '开发资源',
                'value': 60
              },
              {
                'name': 'Windows',
                'value': 249
              },
              {
                'name': 'Java',
                'value': 62
              },
              {
                'name': 'Android',
                'value': 11
              },
              {
                'name': '其它',
                'value': 47
              }
            ],
            'dataName': [
              'Python',
              'C++',
              '学习',
              '机器学习',
              '传感器',
              '开发资源',
              'Windows',
              'Java',
              'Android',
              '其它'
            ]
          },
          'commentLineSeries': {
            'data': [
              {
                'data': [
                  7,
                  1,
                  6
                ],
                'name': '已审核'
              },
              {
                'data': [
                  0,
                  1,
                  1
                ],
                'name': '待审核'
              },
              {
                'data': [
                  1,
                  0,
                  0
                ],
                'name': '已删除'
              }
            ],
            'category': [
              '2021-08-18',
              '2021-08-19',
              '2021-08-20'
            ]
          },
          'article': {
            'data': [
              {
                'name': 'Python',
                'value': 9
              },
              {
                'name': 'C++',
                'value': 8
              },
              {
                'name': 'C语言基础',
                'value': 3
              },
              {
                'name': 'default',
                'value': 2
              },
              {
                'name': '学习',
                'value': 2
              },
              {
                'name': 'Android',
                'value': 2
              },
              {
                'name': '传感器',
                'value': 1
              },
              {
                'name': 'VScode',
                'value': 1
              },
              {
                'name': '机器学习',
                'value': 1
              },
              {
                'name': '其它',
                'value': 5
              }
            ],
            'dataName': [
              'Python',
              'C++',
              'C语言基础',
              'default',
              '学习',
              'Android',
              '传感器',
              'VScode',
              '机器学习',
              '其它'
            ]
          }
        }

      }
    }
  }
]
