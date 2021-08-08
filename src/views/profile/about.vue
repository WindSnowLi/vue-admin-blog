<template>
  <div class="components-container">
    <markdown-editor ref="markdownEditor" v-model="content" width="100%" height="100%" :save="handleSave" />
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import { getAboutByUserId, setAboutByUserToken } from '@/api/user'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'

export default {
  name: 'About',
  components: {
    MarkdownEditor
  },
  data() {
    return {
      content: ''
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  created() {
    getAboutByUserId(this.id).then(rsp => {
      this.content = rsp.data
    })
  },
  methods: {
    handleSave() {
      setAboutByUserToken(getToken(), this.content).then(_ => {
        this.$message({
          message: '保存成功',
          type: 'success',
          showClose: true,
          duration: 1000
        })
      })
    }
  }
}
</script>
