<template>
  <div class="dashboard-editor-container">
    <panel-group :group-data="groupData" @handleSetLineChartData="handleSetLineChartData" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :cake-chart-data="cakeChartData" />
        </div>
      </el-col>
      <!--      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart :superior-radar="superiorRadar" />
        </div>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
// import RaddarChart from './components/RaddarChart'
import {
  getVisitLog,
  getAllVisitCountByType,
  getArticleCreateLog,
  getPanel
  // getSuperiorRadar
} from '@/api/article'

import { getToken } from '@/utils/auth'
const data = {
  groupData: {
    visits: {
      visitsAllCount: 0,
      y: [0, 0, 0, 0, 0, 0, 0],
      x: ['6', '5', '4', '3', '2', '1', '0'],
      title: '浏览量'
    },
    articles: {
      articleAllCount: 0,
      y: [0, 0, 0, 0, 0, 0, 0],
      x: ['6', '5', '4', '3', '2', '1', '0'],
      title: '创作篇'
    }
  },
  cakeChartData: {
    visitData: [],
    dataName: []
  }
  // superiorRadar: {
  //   indicator: [],
  //   dataName: [],
  //   dataValue: []
  // }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    PieChart,
    LineChart
    // RaddarChart
  },
  data() {
    return {
      lineChartData: data.groupData.visits,
      // 圆饼图数据
      cakeChartData: data.cakeChartData,
      // 界首数据
      groupData: data.groupData
      // 分类访问量雷达图
      // superiorRadar: data.superiorRadar
    }
  },
  created: function() {
    this.handleSetLineChartData('visit')
    const that = this
    // 界首
    getPanel(getToken()).then(function(rs) {
      that.groupData.visits.visitsAllCount = rs.data.visitsAllCount
      that.groupData.articles.articleAllCount = rs.data.articleAllCount
    })
    // 用于访问圆饼图制作
    getAllVisitCountByType(getToken()).then(function(rs) {
      that.cakeChartData = rs.data
    })
    // 各分类访问量雷达图制作
    // getSuperiorRadar().then(function(rs) {
    //   that.superiorRadar = rs.data
    // })
  },
  methods: {
    handleSetLineChartData(type) {
      const that = this
      if (type === 'visit') {
        // 访问量曲线图
        getVisitLog(getToken()).then(function(rs) {
          that.groupData.visits = rs.data
          that.lineChartData = rs.data
        })
      } else if (type === 'article') {
        // 文章创建曲线图
        getArticleCreateLog(getToken()).then(function(rs) {
          that.groupData.articles = rs.data
          that.lineChartData = rs.data
        })
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

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
