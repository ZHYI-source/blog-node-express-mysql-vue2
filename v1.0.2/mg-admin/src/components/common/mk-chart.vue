<template>
  <div :id="id" :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
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
    Max: {
      type: Number,
      default: 10
    },
    charData: {
      type: Array,
      default: []
    },
    //接受盒子高度 实现高度自适应
    changeHeight: 0
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {

    this.initChart()
    //监视窗口变化实现自适应
    window.addEventListener('resize', this.resizeChart)
  },

  destroyed() {
    //  及时销毁 防止内存泄露
    window.removeEventListener('resize', this.resizeChart)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    resizeChart() {
      this.chart ? this.chart.resize() : ''
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        title: {
          top: 30,
          left: 'center',
          text: `${new Date().getFullYear()}年博文统计`
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return  params.data[0] + ' 发布 ' + params.data[1] + ' 篇博文 ';
          }
        },
        visualMap: {
          min: 0,
          max: this.Max,
          type: 'piecewise',
          orient: 'horizontal',
          left: 'center',
          top: 65,
          textStyle: { color: '#000' },
          precision: 0,
          inRange: {
            color: ['#e7ecb0', '#c0d45f', '#8cc665', '#44a340', '#1e6823']
          }
        },
        calendar: {
          top: 110,
          left: 30,
          right: 30,
          cellSize: ['auto', 20],
          range: new Date().getFullYear(),
          itemStyle: {
            borderWidth: 0.5
          },
          splitLine: { show: false },
          monthLabel: { nameMap: [
              '一月', '二月', '三月',
              '四月', '五月', '六月',
              '七月', '八月', '九月',
              '十月', '十一月', '十二月'
            ], position: 'end' }, // 设置日历坐标中 月份轴的样式
          dayLabel: { nameMap: ['日', '一', '二', '三', '四', '五', '六'] } ,// 设置日历坐标中 星期轴的样式
          yearLabel: { show: true }
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: this.charData
        }
      })
    }
  }
}
</script>
