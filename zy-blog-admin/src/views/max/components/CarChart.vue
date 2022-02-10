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
      default: '300px'
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
    setOptions({ clockTotalPercent, clockTotalCount,notClockTotalCount } = {}) {
      this.chart.setOption({
        title: {
          text: clockTotalPercent + '%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#ffffff',
            fontSize: '12'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        color: ['rgba(176, 212, 251, 1)'],
        legend: {
          show: false,
          color: '#fff',
          itemGap: 12,
          textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: '12'
          },
          data: ['已打卡车辆', '未打卡车辆']
        },

        series: [{
          name: '打卡车辆占比',
          type: 'pie',
          clockWise: true,
          radius: ['50%', '66%'],
          itemStyle: {
            normal: {
              label: {
                color:'#FFFFFF',
                fontSize: '10',
                show: true
              },
              labelLine: {
                show: true,
                length:5,
                length2:5
              }
            }
          },
          hoverAnimation: true,
          data: [{
            value: clockTotalCount,
            name: '已打卡',
            itemStyle: {
              normal: {
                color: { // 完成的圆环的颜色
                  colorStops: [{
                    offset: 0,
                    color: '#ffad16' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#FF8C00' // 100% 处的颜色
                  }]
                },
                label: {
                  show: true,
                  textStyle: {
                    fontWeight: 'normal',
                    color: '#fff',
                    fontSize: '36'
                  }
                },
                labelLine: {
                  show: true
                }
              }
            }
          }, {
            name: '未打卡',
            value: notClockTotalCount,
            itemStyle: {
              normal: {
                color: { // 完成的圆环的颜色
                  colorStops: [{
                    offset: 0,
                    color: '#fff254' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#e8db52' // 100% 处的颜色
                  }]
                },
                label: {
                  show: true,
                  textStyle: {
                    fontWeight: 'normal',
                    color: '#fff',
                    fontSize: '36'
                  }
                },
                labelLine: {
                  show: true
                }
              }
            }
          }]
        }]
      })
    }
  }
}
</script>
