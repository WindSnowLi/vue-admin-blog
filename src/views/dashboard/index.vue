<template>
  <div class="dashboard-editor-container">
    <panel-group :group-data="groupData" @handleSetLineChartData="handleSetLineChartData" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <label>访问量分析</label>
          <pie-chart :cake-chart-data="chartData.pv" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <label>各类文章占比</label>
          <pie-chart :cake-chart-data="chartData.article" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <label>评论组成</label>
          <bar-chart :series-data="chartData.commentLineSeries" />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="36" :sm="36" :md="36" :lg="18" :xl="18" style="padding-right:8px;margin-bottom:30px;">
        <label>最新待审核评论</label>
        <transaction-table />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import {
  getChart,
  getPanel
} from '@/api/other'
import { getToken } from '@/utils/auth'

const data = {
  groupData: {
    pv: {
      total: 0,
      y: [0, 0, 0, 0, 0, 0, 0],
      x: ['6', '5', '4', '3', '2', '1', '0'],
      title: '浏览量'
    },
    articles: {
      total: 0,
      y: [0, 0, 0, 0, 0, 0, 0],
      x: ['6', '5', '4', '3', '2', '1', '0'],
      title: '创作篇'
    },
    comments: {
      total: 0,
      y: [0, 0, 0, 0, 0, 0, 0],
      x: ['1', '5', '15', '35', '42', '61', '70'],
      title: '总评论趋势'
    },
    verifyComments: {
      total: 0,
      y: [0, 0, 0, 0, 0, 0, 0],
      x: ['6', '5', '4', '3', '2', '1', '0'],
      title: '待审核评论'
    }
  },
  chartData: {
    article: {
      data: [],
      dataName: []
    },
    pv: {
      data: [],
      dataName: []
    },
    commentLineSeries: {
      category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [
        {
          name: '待审核',
          data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: '已审核',
          data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: '已删除',
          data: [0, 0, 0, 0, 0, 0, 0]
        }
      ]
    }
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    PieChart,
    LineChart,
    BarChart,
    TransactionTable
  },
  data() {
    return {
      lineChartData: data.groupData.pv,
      // 图数据
      chartData: data.chartData,
      // 界首数据
      groupData: data.groupData
    }
  },
  created: function() {
    const that = this
    // 界首
    getPanel(getToken()).then(rsp => {
      that.groupData = rsp.data
      that.handleSetLineChartData('pv')
    })
    // 图表数据
    getChart(getToken()).then(rsp => {
      that.chartData = rsp.data
    })
  },
  methods: {
    handleSetLineChartData(type) {
      if (type === 'pv') {
        // 访问量曲线图
        this.lineChartData = this.groupData.pv
      } else if (type === 'article') {
        // 文章创建曲线图
        this.lineChartData = this.groupData.articles
      } else if (type === 'comment') {
        // 总评论曲线图
        this.lineChartData = this.groupData.comments
      } else if (type === 'verify') {
        // 待审核评论曲线图
        this.lineChartData = this.groupData.verifyComments
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
