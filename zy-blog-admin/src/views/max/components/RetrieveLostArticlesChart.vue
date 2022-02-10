<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

  var date =[];
  var counts = [23, 12, 18, 12, 33, 23, 32, 21, 43, 23, 32, 21];
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
    // chartData: {
    //   type: Object,
    //   required: true
    // }
  },
  data() {
    return {
      chart: null
    }
  },
  // watch: {
  //   chartData: {
  //     deep: true,
  //     handler(val) {
  //       this.setOptions(val)
  //     }
  //   }
  // },
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
      // this.setOptions(this.chartData)
      date = [];
      for(let i = 7; i >= 1; i--){
        let day = new Date();
        day.setTime(day.getTime()- 24*60*60*1000 * i);
        let str = day.getDate() + "日";
        date.push(str)
      }
      this.setOptions({ date, counts })
    },
    setOptions({ date, counts } = {}) {
      this.chart.setOption({
        // backgroundColor: '#0d1234',
        // title: {
        //   text: '失物招领',
        //   x: 'center',
        //   top: "5.5%",
        //   textStyle: {
        //     color: '#fff',
        //     fontSize: 18,
        //     fontWeight: 'normal',
        //   },
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '12%',
          right: '4%',
          left: '8%',
          bottom: '15%'
        },
        xAxis: [{
          type: 'category',
          data: date,
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.12)'
            }
          },
          axisLabel: {
            margin: 10,
            color: '#e2e9ff',
            textStyle: {
              fontSize: 14
            },
          },
        }],
        yAxis: [{
          axisLabel: {
            formatter: '{value}',
            color: '#e2e9ff',
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.12)'
            }
          }
        }],
        series: [{
          type: 'bar',
          data: counts,
          barWidth: '11px',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0,244,255,1)' // 0% 处的颜色
              }, {
                offset: 1,
                color: 'rgba(0,77,167,1)' // 100% 处的颜色
              }], false),
              barBorderRadius: [30, 30, 30, 30],
              shadowColor: 'rgba(0,160,221,1)',
              shadowBlur: 4,
            }
          },
          label: {
            normal: {
              show: true,
              lineHeight: 25,
              width: 50,
              height: 25,
              backgroundColor: 'rgba(0,160,221,0.1)',
              borderRadius: 200,
              position: ['-12', '-50'],
              distance: 1,
              formatter: [
                '    {d|●}',
                ' {a|{c}}     \n',
                '    {b|}'
              ].join(','),
              rich: {
                d: {
                  color: '#3CDDCF',
                },
                a: {
                  color: '#fff',
                  align: 'center',
                },
                b: {
                  width: 1,
                  height: 20,
                  borderWidth: 1,
                  borderColor: '#234e6c',
                  align: 'left'
                },
              }
            }
          }
        }]
      })
    }
  }
}
</script>
