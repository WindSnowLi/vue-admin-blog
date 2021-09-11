<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="名称" align="center" width="250px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="封面" width="auto" align="center">
        <template slot-scope="{row}">
          <img :src="row.coverPic" alt="封面" width="auto" height="100px">
        </template>
      </el-table-column>
      <el-table-column label="描述" width="auto" align="center">
        <template slot-scope="{row}">
          <span>{{ row.describe }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button
            size="mini"
            type="primary"
            @click="editLabelDialog = true;linkForm=row;buffForm={ ...row } "
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑"
      :visible.sync="editLabelDialog"
      width="30%"
      center
    >
      <el-form ref="buffForm" :model="buffForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="title">
          <el-input v-model="buffForm.name" />
        </el-form-item>
        <el-form-item label="封面">
          <img
            v-if="buffForm.coverPic"
            :src="buffForm.coverPic"
            class="image"
            alt="封面"
            style="max-height: 108px;width: 192px"
            @click="getLabelImgUrl()"
          >
          <image-cropper
            v-show="uploadImg.imageCropperShow"
            :key="uploadImg.imageCropperKey"
            :width="192"
            :height="108"
            :url="uploadImg.coverPic"
            :params="uploadImg.params"
            :no-circle="true"
            :no-square="true"
            field="file"
            lang-type="zh"
            @close="close"
            @crop-upload-success="cropSuccess"
          />
        </el-form-item>
        <el-form-item label="封面url">
          <el-input v-model="buffForm.coverPic" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="buffForm.describe" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLinkForm('buffForm')">保存</el-button>
          <el-button @click="resetLinkForm()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>

import waves from '@/directive/waves'
import { getLabelByPage, setLabel } from '@/api/article-label'
import { getUploadArticleImageUrl } from '@/api/file'
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination'
import ImageCropper from '@/components/ImageCropper'

// waves directive
export default {
  name: 'Label',
  components: { Pagination, ImageCropper },
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      editLabelDialog: false,
      // 存储实际那一行的数据
      linkForm: {},
      // 缓冲表单，主要修改的这个用的
      buffForm: {
        // 标签ID
        id: undefined,
        // 标签名
        name: '',
        // 标签封面图片
        coverPic: '',
        // 相关描述
        describe: ''
      },
      rules: {
        name: [
          { required: true, message: '存在必填项错误', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ]
      },
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
      uploadImg: {
        imageCropperShow: false,
        imageCropperKey: 0,
        coverPic: '',
        params: {}
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getLabelByPage(this.listQuery).then(response => {
        this.list = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    submitLinkForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          setLabel(this.buffForm).then(_ => {
            this.linkForm = { ...this.buffForm }
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          this.$notify({
            title: '失败',
            message: '保存失败',
            type: 'danger',
            duration: 2000
          })
          return false
        }
      })
    },
    resetLinkForm() {
      this.buffForm = { ...this.linkForm }
    },
    cropSuccess(resData) {
      this.uploadImg.imageCropperShow = false
      this.uploadImg.imageCropperKey = this.imageCropperKey + 1
      this.buffForm.coverPic = this.uploadImg.coverPic
    },
    close() {
      this.uploadImg.imageCropperShow = false
    },
    getLabelImgUrl() {
      const _self = this
      getUploadArticleImageUrl(getToken()).then(response => {
        _self.uploadImg.imageCropperShow = true
        _self.uploadImg.coverPic = response.data.host
        _self.uploadImg.params = response.data.urlParams
        _self.uploadImg.coverPic = response.data.GetUrl
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
