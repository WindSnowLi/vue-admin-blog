<template>
  <div class="components-container">
    <aside>
      系统设置
    </aside>
    <div class="editor-container">
      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="8">
          <vue-form
            v-model="sys.data"
            :schema="sys.schema"
            @on-submit="handlerSysSubmit"
            @on-cancel="handleSysCancel"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <vue-form
            v-model="gitee.data"
            :schema="gitee.schema"
            @on-submit="handlerGiteeSubmit"
            @on-cancel="handleGiteeCancel"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <vue-form
            v-model="sundry.data"
            :schema="sundry.schema"
            @on-submit="handlerSundrySubmit"
            @on-cancel="handleSundryCancel"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getGiteeConfig, getSundry, getSysConfig, setGiteeConfig, setSundry, setSysConfig } from '@/api/sys'

export default {
  name: 'SettingSys',
  data() {
    return {
      sys: {
        data: {},
        schema: {},
        config: {}
      },
      gitee: {
        data: {},
        schema: {},
        config: {}
      },
      sundry: {
        data: {},
        schema: {},
        config: {}
      }
    }
  },
  created() {
    getSysConfig().then(response => {
      this.sys.config = response.data
      this.sys.schema = response.data.template
      this.sys.data = response.data.sys
    })
    getGiteeConfig().then(response => {
      this.gitee.config = response.data
      this.gitee.schema = response.data.template
      this.gitee.data = response.data.client
    })
    getSundry().then(response => {
      this.sundry.config = response.data
      this.sundry.schema = response.data.template
      this.sundry.data = response.data.sundry
    })
  },
  methods: {
    handlerSysSubmit() {
      setSysConfig(this.sys.data).then(_ => {
        this.$message({
          message: '保存成功',
          type: 'success',
          showClose: true,
          duration: 1000
        })
      })
    },
    handleSysCancel() {
      this.sys.data = this.sys.config.sys
    },
    handlerGiteeSubmit() {
      setGiteeConfig(this.gitee.data).then(_ => {
        this.$message({
          message: '保存成功',
          type: 'success',
          showClose: true,
          duration: 1000
        })
      })
    },
    handleGiteeCancel() {
      this.gitee.data = this.gitee.config.sys
    },
    handlerSundrySubmit() {
      setSundry(this.sundry.data).then(_ => {
        this.$message({
          message: '保存成功',
          type: 'success',
          showClose: true,
          duration: 1000
        })
      })
    },
    handleSundryCancel() {
      this.sundry.data = this.sundry.config.sundry
    }
  }
}
</script>

<style scoped>
.editor-container {
  position: relative;
  height: 100%;
}
</style>
