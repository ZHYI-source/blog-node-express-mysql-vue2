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
    setOptions({ invoiceTotalPercent, invoiceTotalCount,notInvoiceTotalCount } = {}) {
      this.chart.setOption({
        title: {
          text: invoiceTotalPercent,
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#000000',
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
          color: '#000000',
          itemGap: 14,
          textStyle: {
            fontWeight: 'normal',
            color: '#050505',
            fontSize: '36'
          },
          data: ['已开通', '未开通']
        },

        series: [{
          name: '开通车辆占比',
          type: 'pie',
          clockWise: true,
          radius: ['50%', '66%'],
          itemStyle: {
            normal: {
              label: {
                color:'#0c0c0c',
                fontSize: '12',
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
            value: invoiceTotalCount,
            name: '已开通',
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
                    color: '#000000',
                    fontSize: '14'
                  }
                },
                labelLine: {
                  show: true
                }
              }
            }
          },
            {
            name: '未开通',
            value: notInvoiceTotalCount,
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
                    color: '#000000',
                    fontSize: '14'
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
