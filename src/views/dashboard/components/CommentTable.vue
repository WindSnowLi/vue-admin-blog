<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="评论内容" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.content }}
      </template>
    </el-table-column>
    <el-table-column label="评论人" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.fromUser.nickname }}
      </template>
    </el-table-column>
    <el-table-column label="评论时间" width="140" align="center">
      <template slot-scope="scope">
        {{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
      <template slot-scope="{row,$index}">
        <el-button
          size="mini"
          type="success"
          @click="handlePass(row,$index)"
        >
          通过
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(row,$index)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getCommentList, setCommentStatus } from '@/api/comment'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        limit: 8,
        sort: '-id',
        status: 'VERIFY'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getCommentList(this.listQuery).then(rsp => {
        this.list = rsp.data.items
      })
    },
    handleDelete(row, index) {
      setCommentStatus(getToken(), row.id, 'DELETE').then(rsp => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    },
    handlePass(row, index) {
      setCommentStatus(row.id, 'PASS').then(rsp => {
        this.$notify({
          title: '通过',
          message: '审核通过',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    }
  }
}
</script>
