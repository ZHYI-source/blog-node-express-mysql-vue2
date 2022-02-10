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
    setOptions({ onlineTotalPercent, onlineTotalCount,offlineTotalCount } = {}) {
      this.chart.setOption({
        title: {
          text: onlineTotalPercent,
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
          data: ['在线车辆', '离线车辆']
        },

        series: [{
          name: '在线车辆占比',
          type: 'pie',
          clockWise: true,
          radius: ['50%', '66%'],
          itemStyle: {
            normal: {
              label: {
                color:'#FFF',
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
            value: onlineTotalCount,
            name: '在线车辆',
            itemStyle: {
              normal: {
                color: { // 完成的圆环的颜色
                  colorStops: [{
                    offset: 0,
                    color: '#cf85ff' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#ab1eff' // 100% 处的颜色
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
            name: '离线车辆',
            value: offlineTotalCount,
            itemStyle: {
              normal: {
                color: { // 完成的圆环的颜色
                  colorStops: [{
                    offset: 0,
                    color: '#ffefe7' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#ffbcee' // 100% 处的颜色
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
