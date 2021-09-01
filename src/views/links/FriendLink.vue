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
      <el-table-column label="主题" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="封面" max-width="100px" align="center">
        <template slot-scope="{row}">
          <img :src="row.coverPic" alt="封面" width="100%" height="auto">
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column label="链接url" align="center" width="95">
        <template slot-scope="{row}">
          <span>{{ row.link }}</span>
        </template>
      </el-table-column>
      <el-table-column label="友链状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button
            v-if="row.status!=='PASS'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row,'PASS')"
          >
            通过/显示
          </el-button>
          <el-button
            v-if="row.status==='PASS'"
            size="mini"
            type="info"
            @click="handleModifyStatus(row,'HIDE')"
          >
            隐藏
          </el-button>
          <el-button
            v-if="row.status==='APPLY'"
            size="mini"
            type="warning"
            @click="handleModifyStatus(row,'REFUSE')"
          >
            拒绝
          </el-button>
          <el-button
            v-if="row.status!=='DELETE'"
            size="mini"
            type="danger"
            @click="handleModifyStatus(row,'DELETE')"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

import waves from '@/directive/waves'
import { getFriendLinks, setFriendLinkStatus } from '@/api/link'
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
      listLoading: true
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
    handleModifyStatus(row, status) {
      setFriendLinkStatus(row.id, status).then(_ => {
        row.status = status
      })
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
