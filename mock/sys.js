module.exports = [
  // UI设置
  {
    url: '/sys/setUiConfig',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'OK'
      }
    }
  },
  // 获取UI设置
  {
    url: '/sys/getConfigByUserId',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          main_title: '啊呜呜呜~~',
          topbar_title: '啊呜呜呜-',
          footer: '啊呜',
          background_list: '啊~'
        }
      }
    }
  },
  // 获取系统存储配置
  {
    url: '/sys/getStorageConfig',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          template: {
            title: '系统存储配置',
            type: 'object',
            required: [
              'endpoint',
              'accessKeyId',
              'accessKeySecret',
              'bucketName',
              'rootPath',
              'articleCoverImagePath',
              'articleImagePath',
              'avatarImagePath',
              'callbackUrl'
            ],
            properties: {
              endpoint: {
                type: 'string',
                title: 'endpoint',
                description: '请输入OSS节点描述',
                default: '***'
              },
              accessKeyId: {
                title: 'accessKeyId',
                type: 'string',
                description: '请OSS用户ID',
                default: '***'
              },
              accessKeySecret: {
                title: 'accessKeySecret',
                type: 'string',
                description: '请输入OSS密钥',
                default: '***'
              },
              bucketName: {
                title: 'bucketName',
                type: 'string',
                description: '请输入bucket名字',
                default: '***'
              },
              rootPath: {
                title: '项目存储根路径',
                type: 'string',
                description: '请输入项目存储根路径',
                default: 'Blog/'
              },
              articleCoverImagePath: {
                title: 'articleCoverImagePath',
                type: 'string',
                description: '请输入文章封面目录',
                default: 'Blog/articleCoverImage'
              },
              articleImagePath: {
                title: '内容图片路径',
                type: 'string',
                description: '请输入文章内容图片路径',
                default: 'Blog/articleImagePath'
              },
              avatarImagePath: {
                title: 'avatarImagePath',
                type: 'string',
                description: '请输入用户头像路径',
                default: 'Blog/avatarImagePath'
              },
              callbackUrl: {
                title: 'callbackUrl',
                type: 'string',
                description: '请输入OSS上传回调路径',
                default: 'Blog/callbackUrl'
              }
            }
          },
          storage: {
            endpoint: '***.com',
            accessKeyId: '***',
            accessKeySecret: '***',
            bucketName: '***',
            rootPath: 'Blog',
            articleCoverImagePath: 'Blog/image/articleCoverImage',
            articleImagePath: 'Blog/image/articleImage',
            avatarImagePath: 'Blog/image/avatar',
            callbackUrl: '***.com/api/file/callback'
          }
        }
      }
    }
  },
  // 设置系统存储配置
  {
    url: '/sys/setStorageConfig',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'OK'
      }
    }
  },
]
