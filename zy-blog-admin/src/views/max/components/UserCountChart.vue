<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

  var month = [];
  var totalCount = [39, 43, 48, 63, 68, 72, 78, 82, 89, 98, 105, 112];
  var increase = [20, 38, 10, 26, 18, 31, 35, 18, 19, 25, 34, 22];

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
       month = [];
      for (let i = 11; i >= 0; i--) {
        let now = new Date()
        let str =(now.getMonth()+1 - i) + "月";
        month.push(str)
      }
      this.setOptions({month, totalCount,increase})
    },
    setOptions({ month, totalCount,increase } = {}) {
      this.chart.setOption({
        // backgroundColor: '#0d1234',
        tooltip: {},
        grid: {
          top: '14%',
          left: '3%',
          right: '3%',
          bottom: '2%',
          containLabel: true,
        },
        legend: {
          itemGap: 50,
          data: ['注册总量(万)' ,'最新注册量(万)'],
          textStyle: {
            color: '#f9f9f9',
            borderColor: '#fff'
          },
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          axisLine: { //坐标轴轴线相关设置。数学上的x轴
            show: true,
            lineStyle: {
              color: '#f9f9f9'
            },
          },
          axisLabel: { //坐标轴刻度标签的相关设置
            textStyle: {
              color: '#d1e6eb',
              margin: 10,
            },
          },
          axisTick: {
            show: false,
          },
          data: month,
        }],
        yAxis: [{
          type: 'value',
          min: 0,
          // max: 140,
          splitNumber: 7,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#0a3256'
            }
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              color: '#d1e6eb',

            },
          },
          axisTick: {
            show: false,
          },
        }],
        series: [{
          name: '注册总量(万)',
          type: 'line',
          // smooth: true, //是否平滑曲线显示
          // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 6,
          lineStyle: {
            normal: {
              color: "#28ffb3", // 线条颜色
            },
            borderColor: '#f0f'
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#fff',
            }
          },
          itemStyle: {
            normal: {
              color: "#28ffb3",

            }
          },
          tooltip: {
            show: false
          },
          areaStyle: { //区域填充样式
            normal: {
              //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0,154,120,1)'
              },
                {
                  offset: 1,
                  color: 'rgba(0,0,0, 0)'
                }
              ], false),
              shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
              shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
          },
          data: totalCount
        }, {
          name: '最新注册量(万)',
          type: 'bar',
          barWidth: 15,
          tooltip: {
            show: false
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#fff',
            }
          },
          itemStyle: {
            normal: {
              // barBorderRadius: 5,
              // color: new echarts.graphic.LinearGradient(
              //     0, 0, 0, 1,
              //     [{
              //             offset: 0,
              //             color: '#14c8d4'
              //         },
              //         {
              //             offset: 1,
              //             color: '#43eec6'
              //         }
              //     ]
              // )
              color: function(params) {
                var colorList = ['#0ec1ff', '#10cdff', '#12daff', '#15ebff', '#17f8ff', '#1cfffb', '#1dfff1', '#17f8ff', '#1cfffb', '#1dfff1'];
                return colorList[params.dataIndex];
              }
            }
          },
          data: increase
        }]
      })
    }
  }
}
</script>
