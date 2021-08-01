<template>
  <div class="components-container">
    <aside>
      系统设置
    </aside>
    <div class="editor-container">
      <vue-form
        v-model="formData"
        :schema="schema"
        @on-submit="handlerSubmit"
        @on-cancel="handleCancel"
      />
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getSysConfig, setSysConfig } from '@/api/sys'

export default {
  name: 'SettingSys',
  data() {
    return {
      formData: {},
      schema: {},
      config: {}
    }
  },
  created() {
    getSysConfig(getToken()).then(response => {
      this.config = response.data
      this.schema = response.data.template
      this.formData = response.data.sys
    })
  },
  methods: {
    handlerSubmit() {
      console.log(this.formData)
      setSysConfig(getToken(), this.formData).then(_ => {
        this.$message({
          message: '保存成功',
          type: 'success',
          showClose: true,
          duration: 1000
        })
      })
    },
    handleCancel() {
      this.formData = this.config.sys
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
