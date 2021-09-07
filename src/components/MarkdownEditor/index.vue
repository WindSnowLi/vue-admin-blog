<template>
  <mavon-editor ref="md" v-model="text" class="mavon-editor" @imgAdd="$imgAdd" @imgDel="$imgDel" @save="save" />
</template>

<script>
import { getToken } from '@/utils/auth'
import { getUploadArticleImageUrl, deleteObject } from '@/api/file'
import axios from 'axios'

export default {
  name: 'MarkdownEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    save: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      text: '',
      imageMapKey: {}
    }
  },
  watch: {
    text(newValue, preValue) {
      if (newValue !== preValue && newValue !== this.value) {
        this.$emit('input', newValue)
      }
    },
    value(newValue, preValue) {
      if (newValue !== preValue && newValue !== this.text) {
        this.text = this.value
      }
    }
  },
  methods: {
    // 添加图片
    $imgAdd(pos, $file) {
      getUploadArticleImageUrl(getToken()).then(response => {
        if (!response.data.status) {
          this.$notify({
            title: '文件上传不可用',
            message: '文件上传不可用',
            type: 'warning',
            duration: 2000
          })
          return
        }
        const fileData = new FormData()
        Object.keys(response.data.urlParams).forEach(k => {
          fileData.append(k, response.data.urlParams[k])
        })
        fileData.append('file', $file)
        axios({
          url: response.data.host,
          method: 'post',
          data: fileData,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(_ => {
          this.imageMapKey[response.data.GetUrl] = response.data.urlParams.key
          this.$refs.md.$img2Url(pos, response.data.GetUrl)
        })
      })
    },
    $imgDel(pos) {
      // 删除图片
      deleteObject(getToken(), this.imageMapKey[pos[0]])
      delete this.imageMapKey[pos[0]]
    }
  }
}
</script>

<style scoped>
.mavon-editor {
  width: 100%;
  height: 600px;
}
</style>
