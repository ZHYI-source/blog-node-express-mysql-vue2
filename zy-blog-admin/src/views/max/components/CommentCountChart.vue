<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
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
      default: '120px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
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
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
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
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions(this.chartData)
    },
    setOptions({ onlinePercent, onlineCount,offlineCount } = {}) {
      this.chart.setOption({
        // backgroundColor: '#0d1234',
        // title: {
        //   text: '假3D柱状图',
        //   x: 'center'
        // },
        grid:{
          top: '8%',
          left: '20%',
          right: '4%'
        },
        tooltip: {
          trigger: 'item',
        },
        xAxis: {
          data: ["车内有异味", "司机态度恶劣", "司机吸烟", "车内整洁", "道路不熟", "驾驶平稳", "态度好服务棒", "活地图"],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {

            color: '#FFF',
            fontSize: 10,

            margin: 20, //刻度标签与轴线之间的距离。
            interval:0,
            rotate:40
          },

        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: '#eee',
              type: 'dashed'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#888'
            },
          }
        },
        series: [{
          // name: '年报上报率3',
          type: 'pictorialBar',
          symbolSize: [12, 8],
          symbolOffset: [0, -4],
          z: 12,
          symbolPosition: 'end',
          itemStyle: {
            normal: {
              color: '#d7ebcb'
            }
          },
          data: [101, 304, 205, 1000, 407, 1511, 2533, 4078],

        }, {
          // name: '年报上报率2',
          type: 'pictorialBar',
          symbolSize: [12, 8],
          symbolOffset: [0, 5],
          z: 12,
          itemStyle: {
            normal: {
              color: '#69c37b'
            }
          },
          data: [101, 304, 205, 1000, 407, 1511, 2533, 4078],
        }, {
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#69c37b'
            }
          },
          barWidth: 12,
          data: [101, 304, 205, 1000, 407, 1511, 2533, 4078],
        }]
      })
    }
  }
}
</script>
