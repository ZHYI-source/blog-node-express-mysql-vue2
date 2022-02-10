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
    setOptions({ pasteTotalPercent, pasteTotalCount,notPasteTotalCount } = {}) {
      this.chart.setOption({
        title: {
          text: pasteTotalPercent,
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#000',
            fontSize: '30'
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
          data: ['已贴码车辆', '未贴码车辆']
        },

        series: [{
          name: '贴码车辆占比',
          type: 'pie',
          clockWise: true,
          radius: ['50%', '66%'],
          itemStyle: {
            normal: {
              label: {
                show: true
              },
              labelLine: {
                show: true
              }
            }
          },
          hoverAnimation: true,
          data: [{
            value: pasteTotalCount,
            name: '已贴码车辆',
            itemStyle: {
              normal: {
                color: { // 完成的圆环的颜色
                  colorStops: [{
                    offset: 0,
                    color: '#ff598a' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#ff2530' // 100% 处的颜色
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
            name: '未贴码车辆',
            value: notPasteTotalCount,
            itemStyle: {
              normal: {
                color: { // 完成的圆环的颜色
                  colorStops: [{
                    offset: 0,
                    color: '#ffbcee' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#d89eb4' // 100% 处的颜色
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
