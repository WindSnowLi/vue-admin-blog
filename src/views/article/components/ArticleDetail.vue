<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status.toLowerCase()">
        <CommentDropdown v-model="postForm.commentDisabled" />
        <PublishType v-model="postForm.publishType" />
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          发布
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">
          保存草稿
        </el-button>
      </sticky>
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" required>
                标题
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col v-if="uploadStatus" :span="8">
                  <el-form-item style="margin-bottom: 40px;" label-width="70px" label="封面:">
                    <el-upload
                      class="image-uploader"
                      :action="handleImageUrl()"
                      :data="uploadImage.params"
                      :show-file-list="false"
                      :on-success="handleImageSuccess"
                      :before-upload="beforeImageUpload"
                    >
                      <img v-if="postForm.coverPic" :src="postForm.coverPic" class="image" alt="封面">
                      <i v-else class="el-icon-plus image-uploader-icon" />
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item style="margin-bottom: 40px;" label-width="120px" label="标签:">
                    <el-select
                      v-model="postForm.labels"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      placeholder="请选择文章标签"
                    >
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item style="margin-bottom: 40px;" label-width="120px" label="分类:">
                    <el-select
                      v-model="postForm.articleType"
                      clearable
                      filterable
                      allow-create
                      default-first-option
                      placeholder="请选择文章分类"
                    >
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-form-item style="margin-bottom: 40px;" label-width="70px" label="摘要:">
          <el-input
            v-model="postForm.summary"
            :rows="1"
            type="textarea"
            class="article-textarea"
            autosize
            placeholder="文章介绍"
          />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>
        <el-form-item prop="content" style="margin-bottom: 30px;">
          <markdown-editor ref="markdownEditor" v-model="postForm.content" :save="handleSave" height="600px" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import MarkdownEditor from '@/components/MarkdownEditor'
import { createArticle, fetchArticle, updateArticle } from '@/api/article'
import { getToken } from '@/utils/auth'
import { getUploadArticleCoverImageUrl } from '@/api/file'
import { getLabels } from '@/api/article-label'
import { CommentDropdown, PublishType } from '@/views/article/components/Dropdown'

const defaultForm = {
  status: 'DRAFT',
  title: '', // 文章题目
  content: '', // 文章内容
  summary: '', // 文章摘要
  coverPic: '',
  id: 0,
  labels: [], // 标签列表
  articleType: '', // 分类
  commentDisabled: false, // 是否开启评论
  publishType: 'ORIGINAL'

}

export default {
  name: 'ArticleDetail',
  components: {
    MDinput,
    Sticky,
    CommentDropdown,
    MarkdownEditor,
    PublishType
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        title: '',
        content: ''
      },
      tempRoute: {},
      options: [],
      uploadImage: {
        host: '',
        params: {},
        GetUrl: '',
        // 是否已经初始化了上传参数
        ini: false,
        // url获取时间
        urlTime: undefined
      },
      edit: false,
      uploadStatus: true
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.summary.length
    }
  },
  created() {
    this.edit = this.isEdit
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.setAllLabels()
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data.article
        this.postForm.articleType = response.data.article.articleType.name

        const labelList = []
        response.data.article.labels.forEach(label => {
          labelList.push(label.name)
        })
        this.postForm.labels = labelList
        // set tagsview title
        this.setTagsViewTitle()
        // set page title
        this.setPageTitle()
        this.setLabels()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '编辑'
      const route = Object.assign({}, this.tempRoute, {
        title: `${title}-${this.postForm.title}`
      })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑'
      document.title = `${title} - ${this.postForm.title}`
    },
    setLabels() {
      getLabels().then(response => {
        this.options = response.data
        // 设置标签
        this.labels = `${this.postForm.labels}`
      })
    },
    // 设置满标签
    setAllLabels() {
      getLabels().then(response => {
        this.options = response.data
      })
    },
    submitForm() {
      this.editArticle('PUBLISHED')
    },
    draftForm() {
      this.editArticle('DRAFT')
    },
    handleSave() {
      this.draftForm()
    },
    editArticle(status) {
      if (this.postForm.content.length === 0 ||
        this.postForm.title.length === 0 ||
        this.postForm.summary.length === 0) {
        this.$message({
          message: '请填写必要的标题、摘要和内容',
          type: 'warning'
        })
        return
      }
      this.loading = true
      const data = {
        token: getToken(),
        article: this.postForm
      }
      data.article.status = status
      if (data.article.labels.length === 0) {
        data.article.labels = ['default']
      }
      if (data.article.articleType === null || data.article.articleType === '') {
        data.article.articleType = 'default'
      }
      if (this.edit) {
        updateArticle(data.article).then(_ => {
          this.$notify({
            title: '成功',
            message: '文章编辑成功',
            type: 'success',
            duration: 2000
          })
        }).catch(err => {
          console.log(err)
        })
      } else {
        createArticle(data.token, data.article).then(response => {
          this.$notify({
            title: '成功',
            message: '文章上传成功',
            type: 'success',
            duration: 2000
          })
          this.edit = true
          this.postForm.id = response.data.aticleId
        }).catch(err => {
          console.log(err)
        })
      }
      this.loading = false
    },
    handleImageSuccess(res, file) {
      this.postForm.coverPic = this.uploadImage.GetUrl
    },
    beforeImageUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      if (new Date().getTime() - this.uploadImage.urlTime.getTime() > 60 * 59 * 1000) {
        this.handleImageUrl()
      }
      return isLt2M
    },
    handleImageUrl() {
      const _self = this
      // 以防多次获取上传url
      if (!this.uploadImage.ini) {
        this.uploadImage.urlTime = new Date()
        getUploadArticleCoverImageUrl(getToken()).then(response => {
          this.uploadStatus = response.data.status
          if (response.data.status) {
            _self.uploadImage.host = response.data.host
            _self.uploadImage.params = response.data.urlParams
            _self.uploadImage.GetUrl = response.data.GetUrl
          } else {
            this.$notify({
              title: '文件上传不可用',
              message: '文件上传不可用',
              type: 'warning',
              duration: 2000
            })
          }
        })
        this.uploadImage.ini = !this.uploadImage.ini
      }
      return _self.uploadImage.host
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #bfcbd9;
  }
}

.image-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.image-uploader .el-upload:hover {
  border-color: #409EFF;
}

.image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 192px;
  height: 108px;
  border-style: dotted;
  line-height: 108px;
  text-align: center;
}

.image {
  width: 192px;
  height: auto;
  display: block;
}
</style>
