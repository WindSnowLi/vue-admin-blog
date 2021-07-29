module.exports = [
  // 获取头像上传的Url，含上传后的文件名
  // {url: 上传签名Url, GetUrl: Get请求Url, method: 上传方式}
  {
    url: '/file/getUploadAvatarUrl',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          urlParams: {
            key: 'cece089d-dd3b-11eb-a1d2-1f59eeaa999a',
            policy: '',
            success_action_status: '200',
            OSSAccessKeyId: '',
            signature: ''
          },
          GetUrl: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
          host: 'http://localhost:9527/dev-api/file/uploadData'
        }
      }
    }
  },
  // 获取上传文章封面Url
  {
    url: '/file/getUploadArticleCoverImageUrl',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          urlParams: {
            key: 'cece089d-dd3b-11eb-a1d2-1f59eeaa999a',
            policy: '',
            success_action_status: '200',
            OSSAccessKeyId: '',
            signature: ''
          },
          GetUrl: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
          host: 'http://localhost:9527/dev-api/file/uploadData'
        }
      }
    }
  },
  // 获取上传文章内容图片的Url
  {
    url: '/file/getUploadArticleImageUrl',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          urlParams: {
            key: 'cece089d-dd3b-11eb-a1d2-1f59eeaa999a',
            policy: '',
            success_action_status: '200',
            OSSAccessKeyId: '',
            signature: ''
          },
          GetUrl: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
          host: 'http://localhost:9527/dev-api/file/uploadData'
        }
      }
    }
  },
  // 上传文件
  {
    url: '/file/uploadData',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'OK'
      }
    }
  },
  // 删除文件
  {
    url: '/file/deleteObject',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'OK'
      }
    }
  }
]
