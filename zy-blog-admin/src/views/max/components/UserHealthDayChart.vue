<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme

  var date = []
  var estimate = []
  var real = [7, 7.5, 8, 8.5, 8.2, 8.3, 7.8]

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

        date = []
        for(let i = 0; i < 7; i++){
          let now = new Date();
          let hour = new Date(now.getTime() + 3600*1000*i).getHours()
          let str = hour + ':00'
          date.push(str)
        }


        for (var i = 0; i < 33; i++) {
          var estimateItem = (real[i]+0.3)/ 10; //计算计划量比率
          estimate[i] = estimateItem.toFixed(2);

          // var estimateItem = real[i] -125;
          // estimate[i] = estimateItem;
        }
        // this.chartData.estimate = estimate;

        this.setOptions({date, estimate, real})

        // if(this.chartData){
        // this.setOptions(this.chartData)
        // }
      },
      setOptions({ date, estimate,real } = {}) {
        this.chart.setOption({
          // backgroundColor: '#0d1234',
          // title: {
          //   text: '用户出行分析',
          //   x: 'center',
          //   top: "6%",
          //   textStyle: {
          //     color: '#fff',
          //     fontSize: 18,
          //     fontWeight: 'normal',
          //   },
          // },
          tooltip: { //鼠标滑过数据的展示形式
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.1)',
            axisPointer: {
              type: 'shadow',
              label: {
                show: true,
                backgroundColor: '#7B7DDC'
              }
            }
          },
          // legend: {
          //   data: ['实际出行量(万)', '预计出行量(万)', ], // 控制标签的位置
          //   textStyle: {
          //     color: '#ccc' //标签颜色
          //   },
          //   top: '7%',
          //   right: '10%'
          // },
          grid:{
            top: '20%',
            left: '12%',
            right: '10%',
            bottom: '11%',
          },
          xAxis: {
            data: date, //x轴展示数据
            axisLine: {
              lineStyle: {
                color: '#B4B4B4' //x轴坐标颜色
              }
            },
            axisTick: {
              show: true, //x轴坐标标注
            },
            axisLabel: {
              textStyle: {
                color: "#ccc",
                fontSize: 8
              }
            }
          },
          yAxis: [{
            // name: '单位：次数', //y轴单位
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                opacity: 0.6 //设置透明度

              } //  y轴虚线

            },
            axisLine: {
              lineStyle: {
                color: '#B4B4B4', //y轴显示样式
              }
            },

            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: "#ccc",
                fontSize: 10
              }
            }
          },
            {

              splitLine: {
                show: false
              }, //两个y轴，所以分别设置两个y轴的数据
              axisLine: {
                lineStyle: {
                  color: '#B4B4B4',
                }
              },
              axisLabel: {
                // formatter: '{value} %',
                formatter: '{value}',
                textStyle: {
                  color: "#ccc",
                  fontSize: 10
                }
              }
            }
          ],

          series: [{
            name: '预计乘客数(万)', //曲线展示设置  name要和legend对应
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle', //曲线链接点的显示形式
            symbolSize: 8,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: '#F02FC2'
              }, // 设置曲线颜色
            },
            data: estimate
          },

            {
              name: '实际乘客数(万)', //柱状图显示样式
              type: 'bar',
              barWidth: 11, //设置柱状的宽度
              itemStyle: {
                normal: {
                  barBorderRadius: 5, //圆角
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [{
                      offset: 0,
                      color: '#fbff24'
                    }, //柱状图渐变颜色
                      {
                        offset: 1,
                        color: '#fffaa9'
                      }
                    ]
                  )
                }
              },
              data: real
            }
          ]
        })
      }
    }
  }
</script>
