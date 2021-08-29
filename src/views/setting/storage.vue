<template>
  <div class="components-container">
    <aside>
      后台存储配置
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
import { getStorageConfig, setStorageConfig } from '@/api/sys'

export default {
  name: 'SettingStorage',
  data() {
    return {
      formData: {},
      schema: {},
      config: {
        template: {},
        storage: {}
      }
    }
  },
  created() {
    getStorageConfig().then(response => {
      this.config = response.data
      this.schema = response.data.template
      this.formData = response.data.storage
    })
  },
  methods: {
    handlerSubmit() {
      console.log(this.formData)
      setStorageConfig(this.formData).then(_ => {
        this.$message({
          message: '保存成功',
          type: 'success',
          showClose: true,
          duration: 1000
        })
      })
    },
    handleCancel() {
      this.formData = this.config.storage
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
