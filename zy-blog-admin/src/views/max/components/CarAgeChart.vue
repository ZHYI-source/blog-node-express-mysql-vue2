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
    setOptions({ brandData, ageData } = {}) {
      this.chart.setOption({
        title: {
          text: "",
          subtext: "",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 18
          },
        },
        // backgroundColor: '#ffffff',
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}:({d}%)"
        },
        series: [{
          name: '品牌',
          type: 'pie',
          radius: ['20%', '42%'],
          color: ['#ec5d51', '#59abe1', '#f4cf42', '#3dc6a8'],
          label: {
            normal: {
              position: 'inner'
            }
          },
          data: brandData
        }, {
          name: '车龄分组',
          type: 'pie',
          radius: ['44%', '62%'],
          color: ['#a0dca0', '#60bbb6', '#f78db3', '#feadac', '#fae395','#91d4e5','#8eb3e8'],
          label: {
            normal: {
              formatter: '{b}\n{d}%',
              fontSize: 11
            },
          },
          labelLine: {
            show: true,
            length: 5,
            length2: 5,
          },
          data: ageData
        }]
      })
    }
  }
}
</script>
