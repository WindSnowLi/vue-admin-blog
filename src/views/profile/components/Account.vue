<template>
  <el-form :label-position="lablePosition">
    <el-form-item label="ID">
      <el-input v-model="user.id" placeholder="标识ID" readonly />
    </el-form-item>
    <el-form-item label="邮箱/账号">
      <el-input v-model="user.account" placeholder="邮箱/账号" readonly />
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="user.nickname" placeholder="昵称" />
    </el-form-item>
    <el-form-item label="QQ">
      <el-input v-model="user.qq" placeholder="QQ" />
    </el-form-item>
    <el-form-item label="介绍">
      <el-input v-model="user.introduction" type="textarea" placeholder="介绍" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { setInfo } from '@/api/user'
import { getToken } from '@/utils/auth'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          id: '',
          account: '',
          nickname: '',
          qq: '',
          introduction: ''
        }
      }
    }
  },
  data() {
    return {
      lablePosition: 'right'
    }
  },
  methods: {
    submit() {
      setInfo(getToken(), this.user).then(response => {
        this.$message({
          message: '信息保存成功',
          type: 'success',
          duration: 5 * 1000
        })
      })
    }
  }
}
</script>
