<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>关于</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <!-- <div @click="imagecropperShow=true">修改头像</div> -->
          <el-button type="primary" icon="el-icon-edit" circle @click="getAvatarUrl()" />
        </pan-thumb>
        <image-cropper
          v-show="imagecropperShow"
          :key="imagecropperKey"
          :width="300"
          :height="300"
          :url="uploadAvatarUrl"
          :params="params"
          field="file"
          lang-type="zh"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </div>
      <div class="box-center">
        <div class="user-nickname text-center">{{ user.nickname }}</div>
        <!-- <div class="user-role text-center text-muted">{{ user.role }}</div> -->
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><i class="el-icon-s-custom" /><span>介绍</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.introduction }}
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>爱好</span></div>
        <div class="user-bio-section-body">
          <div v-for="(item, index) in activity" :key="index">
            <div class="progress-item">
              <span>{{ item.name }}</span>
              <el-progress :percentage="item.value" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import ImageCropper from '@/components/ImageCropper'
import { getToken } from '@/utils/auth'
import { getUploadAvatarUrl } from '@/api/file'
import { setAvatar } from '@/api/user'
export default {
  components: { ImageCropper, PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          nickname: '',
          account: '',
          avatar: '',
          role: '',
          introduction: ''
        }
      }
    },
    activity: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      uploadAvatarUrl: '',
      params: {}
    }
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.setAvatar()
    },
    close() {
      this.imagecropperShow = false
    },
    getAvatarUrl() {
      const _self = this
      getUploadAvatarUrl(getToken()).then(response => {
        _self.imagecropperShow = true
        _self.uploadAvatarUrl = response.data.host
        _self.params = response.data.urlParams
        _self.avatarUrl = response.data.GetUrl
      })
    },
    setAvatar() {
      const _self = this
      setAvatar(getToken(), this.avatarUrl).then(response => {
        this.$message({
          message: '头像修改成功',
          type: 'success',
          duration: 5 * 1000
        })
        _self.user.avatar = _self.avatarUrl
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-nickname {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
