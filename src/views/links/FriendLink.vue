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
      <el-table-column label="创建日期" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主题" min-width="100px">
        <template slot-scope="{row}">
          <a
            target="_blank"
            :href="row.link"
          >
            <span>{{ row.title }}</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column label="封面" width="auto" align="center">
        <template slot-scope="{row}">
          <img :src="row.coverPic" alt="封面" width="auto" height="100px">
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="链接url" align="center" width="250px">
        <template slot-scope="{row}">
          <a
            target="_blank"
            :href="row.link"
          >
            <span>{{ row.link }}</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column label="介绍" align="center" width="250px">
        <template slot-scope="{row}">
          <span>{{ row.describe }}</span>
        </template>
      </el-table-column>
      <el-table-column label="友链状态" class-name="status-col" width="100px">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button
            size="mini"
            type="primary"
            @click="editLinkDialog = true;linkForm=row;buffForm={ ...row } "
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑"
      :visible.sync="editLinkDialog"
      width="30%"
      center
    >
      <el-form ref="buffForm" :model="buffForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="主题" prop="title">
          <el-input v-model="buffForm.title" />
        </el-form-item>
        <el-form-item label="首页链接" prop="title">
          <el-input v-model="buffForm.link" />
        </el-form-item>
        <el-form-item label="封面url">
          <el-input v-model="buffForm.coverPic" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="buffForm.email" />
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="buffForm.describe" type="textarea" />
        </el-form-item>
        <el-form-item label="链接状态" prop="status">
          <el-radio-group v-model="buffForm.status">
            <el-radio label="PASS">审核通过</el-radio>
            <el-radio label="HIDE">隐藏</el-radio>
            <el-radio label="REFUSE">拒绝</el-radio>
            <el-radio label="DELETE">逻辑删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLinkForm('buffForm')">保存</el-button>
          <el-button @click="resetLinkForm()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>

import waves from '@/directive/waves'
import { getFriendLinks, setFriendLink } from '@/api/link'

// waves directive
export default {
  name: 'FriendLink',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        PASS: 'success',
        HIDE: 'info',
        DELETE: 'danger',
        REFUSE: 'warning'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      editLinkDialog: false,
      // 存储实际那一行的数据
      linkForm: {},
      // 缓冲表单，主要修改的这个用的
      buffForm: {
        // 友链ID
        id: undefined,
        // 友链URL
        link: '',
        // 友链主题
        title: '',
        // 友链介绍
        describe: '',
        // 创建时间
        createTime: '',
        // 修改时间
        updateTime: '',
        // 邮箱
        email: '',
        // 当前友链状态
        status: '',
        // 友链封面URL
        coverPic: ''
      },
      rules: {
        title: [
          { required: true, message: '存在必填项为空', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '存在必填项为空', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getFriendLinks().then(response => {
        this.list = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    submitLinkForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          setFriendLink(this.buffForm).then(_ => {
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
