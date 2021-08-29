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
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getGiteeConfig, getSysConfig, setSysConfig } from '@/api/sys'

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
