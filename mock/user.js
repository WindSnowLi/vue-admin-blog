const users = {
  roles: ['admin'],
  introduction: 'I am a super administrator',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  name: 'Super Admin',
  id: 0,
  account: 'admin@test.com',
  nickname: 'WindSnowLi',
  qq: '706623475',
  token: '66666666666666666'
}

module.exports = [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      // const { username } = config.body
      // const token = tokens[username]

      return {
        code: 20000,
        data: users
      }
    }
  },

  // get user info
  {
    url: '/user/getInfo',
    type: 'post',
    response: config => {
      // const { token } = config.query
      // const info = users[token]

      // // mock error
      // if (!info) {
      //   return {
      //     code: 50008,
      //     message: 'Login failed, unable to get user details.'
      //   }
      // }

      return {
        code: 20000,
        data: users
      }
    }
  },
  // set user info
  {
    url: '/user/setInfo',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: users
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // getWork
  {
    url: '/user/getWork',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: [
          {
            name: 'Vue',
            value: 30
          },
          {
            name: 'C++',
            value: 47
          },
          {
            name: 'Java',
            value: 56
          },
          {
            name: 'Python',
            value: 65
          }
        ]
      }
    }
  },
  // getWork
  {
    url: '/user/setAvatar',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'OK'
      }
    }
  },
  // 获取用户关于信息
  {
    url: '/user/getAboutByUserId',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'I LOVE YOU WITH ME!'
      }
    }
  },
  // 获取用户关于信息
  {
    url: '/user/setAboutByUserToken',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'OK'
      }
    }
  }
]
