<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ amountData,countData, dayData } = {}) {
      this.chart.setOption({
        title: {
          text: '',
          x: 'center',
          y: 0,
          textStyle: {
            color: '#B4B4B4',
            fontSize: 16,
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.6)',
          formatter: function(params) {
            let str = params[0].name + '日' + '</br>';
            params.forEach(item => {
              if (item.seriesName === '交易额（元）') {
                str += item.marker + item.seriesName + ' : ' + item.value + '元' + '</br>';
              } else if (item.seriesName === '订单数') {
                // 柱状图渐变时设置marker
                item.marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#6C50F3;"></span>';
                str += item.marker + item.seriesName + ' : ' + item.value + ' 单';
              }
            });
            return str;
          }
        },
        legend: {
          // 修改legend的高度宽度
          itemHeight: 5,
          itemWidth: 24,
          data: [{
            name: '交易额（元）',
            icon: 'rect' // ledend的icon
          },
            {
              name: '订单数',
              icon: 'rect'
            }
          ],
          textStyle: {
            color: '#B4B4B4'
          },
          top: '1%',
          // 选择关闭的legend
          // selected: {
          //     '回温': false
          // }
        },
        grid: {
          x: '8%',
          width: '82%',
          y: '12%'
        },
        xAxis: [{
          // type:'category',
          data: dayData,
          boundaryGap: true,
          axisLine: {
            lineStyle: {
              color: '#B4B4B4'
            }
          },
          axisTick: {
            show: false
          }
        }],
        yAxis: [{
          name: '交易额（元）',
          nameLocation: 'middle',
          nameTextStyle: {
            padding: [3, 4, 50, 6]
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#eee'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#333'
            },
            formatter: '{value} '
          }
        },
          {
            name: '订单数',
            nameLocation: 'middle',
            nameTextStyle: {
              padding: [50, 4, 5, 6]
            },
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#333'
              },
              formatter: '{value} '
            }
          }
        ],
        series: [{
          name: '交易额（元）',
          type: 'line',
          smooth: true,
          showSymbol: true,
          // 矢量画五角星
          symbol: 'path://M150 0 L80 175 L250 75 L50 75 L220 175 Z',
          symbolSize: 12,
          yAxisIndex: 0,
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
                offset: 0,
                color: 'rgba(250,180,101,0.3)'
              },
                {
                  offset: 1,
                  color: 'rgba(250,180,101,0)'
                }
              ],),
              shadowColor: 'rgba(250,180,101,0.2)',
              shadowBlur: 20
            }
          },
          itemStyle: {
            normal: {
              color: '#FF8000'
            }
          },
          // data中可以使用对象，value代表相应的值，另外可加入自定义的属性
          data: amountData
        },
          {
            name: '订单数',
            type: 'bar',
            barWidth: 15,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(188,130,243,1)'
                },
                  {
                    offset: 1,
                    color: 'rgba(188,130,243,1)'
                  }
                ]),
                //柱状图圆角
                barBorderRadius: [30,30,0,0],
              }
            },

            data: countData
          }
        ]
      })
    }
  }
}
</script>
