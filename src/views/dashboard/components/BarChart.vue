<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'

require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 3000 // 动画持续时间

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    seriesData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    seriesData(newValue, oldValue) {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
      this.initChart()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.seriesData.category,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            }
          }],
        series: [
          {
            name: this.seriesData.data[0].name,
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: this.seriesData.data[0].data,
            animationDuration
          },
          {
            name: this.seriesData.data[1].name,
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: this.seriesData.data[1].data,
            animationDuration
          },
          {
            name: this.seriesData.data[2].name,
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: this.seriesData.data[2].data,
            animationDuration
          }
        ]
      })
    }
  }
}
</script>
