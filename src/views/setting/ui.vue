<template>
  <div class="app-container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <el-form ref="form" :label-position="labelPosition" :model="form" label-width="80px" center="true">
          <el-form-item label="标签标题">
            <el-input v-model="form.main_title" placeholder="浏览器标签页主标题" />
          </el-form-item>
          <el-form-item label="顶栏标题">
            <el-input v-model="form.topbar_title" placeholder="页面顶部栏标题" />
          </el-form-item>
          <el-form-item label="页脚HTML">
            <el-input v-model="form.footer" type="textarea" placeholder="页脚html代码" />
          </el-form-item>
          <el-form-item label="轮播背景">
            <el-input v-model="form.background_list" type="textarea" placeholder="一行一张url链接" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getUiConfig, setUiConfig } from '@/api/sys'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      labelPosition: 'top',
      form: {
        main_title: '',
        topbar_title: '',
        footer: '',
        background_list: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  created: function() {
    getUiConfig(this.id).then(response => {
      this.form = response.data
    })
  },
  methods: {
    onSubmit() {
      this.setUiConfig()
    },
    setUiConfig() {
      const ui = {
        main_title: this.form.main_title,
        topbar_title: this.form.topbar_title,
        footer: this.form.footer,
        background_list: this.form.background_list
      }
      setUiConfig(getToken(), ui).then(_ => {
        this.$notify({
          title: '成功',
          message: 'UI设置成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>
