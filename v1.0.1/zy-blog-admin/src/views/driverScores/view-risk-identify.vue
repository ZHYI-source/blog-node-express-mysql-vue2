<template>
  <section>
    <lk-view-header @back="$emit('close')" :content="form.userRealName + ' 内容详情'"/>
    <section class="driver-view-box">
      <el-row class="box-head">
        基础信息
      </el-row>
      <section class="driver-info">
        <lk-view-row>
          <lk-view-item title="驾驶员">{{form.userRealName}} <span class="iconfont icon-weibiaoti-_huabanfuben">{{(form.driverLevel)}}</span></lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="身份证号">{{form.idCard}}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="电话号码">{{form.userTel}}</lk-view-item>
        </lk-view-row>
         <lk-view-row>
          <lk-view-item title="所属机构">{{form.orgName}}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="常用车辆">
            <div class="tagBox">
              <el-tag class="tag" v-for="item in form.commonPlate" :key="item">{{item}}</el-tag>
            </div>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="评价得分">
            {{form.avgScore}}分
          </lk-view-item>
        </lk-view-row>
      </section>
      <el-row class="box-head">
        数据分析
      </el-row>
      <section class="driver-chart">
        <section class="show-section">
          <div ref="chart" style="height: 300px;width: 400px">
            <lk-chart :option="bindData"/>
          </div>
        </section>
        <section class="show-section">
          <div ref="chart" style="height: 300px;width: 400px">
            <lk-chart :option="good"/>
          </div>
        </section>
        <section class="show-section">
          <div ref="chart" style="height: 300px;width: 400px">
            <lk-chart :option="bad"/>
          </div>
        </section>

      </section>
    </section>
  </section>
</template>

<script>
import LkViewRow from "@/components/common/lk-view-row";
import LkViewItem from "@/components/common/lk-view-item";
import CarChart from "@/views/max/components/CarChart";
import LkChart from "@/components/common/lk-chart";
export default {
  name: "view-driver-portrait",
  components: {LkChart, CarChart, LkViewItem, LkViewRow},
  props: {
    dataId: {
      type: String,
      default() {
        return undefined;
      }
    } ,
    baseData: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  created() {
    this.loadData(this.dataId);
  },
  mounted(){
    this.loadData(this.dataId);

  },

  methods: {
    //数组对象的key自定义
    changeKey(arr,key){
      let newArr = [];
      arr.forEach((item,index)=>{
        let newObj = {};
        for (var i = 0; i < key.length; i++){
          newObj[key[i]]=item[Object.keys(item)[i]]
        }
        newArr.push(newObj)
      })
      return newArr
    },
    loadData(id) {
      let that =this
      this.request('api_admin_comment_riskDetail', {idCard:id}).then(res => {
        this.form = res || {};
        this.form.orgName = this.baseData.orgName
        this.bindData.series[0].data=res.timesOfScore
        let newData = that.changeKey(res.positive,['name','value'])
        let newDataBad = that.changeKey(res.negative,['name','value'])
        this.good.series[0].data=newData
        this.bad.series[0].data=newDataBad
      })
    }
  },
  data(){
    return {
      form:{},
      taskHeight:300,
      bindData:  {
        color:[ '#3498db','#ea7ccc','#fac858', '#ee6666',  '#3ba272', '#fc8452', '#9a60b4', ],
        title: {
          text: '司机得分情况统计',
          left: 'center',
          top:'15px'
        },
        tooltip: {
          triggerOn: "mousemove",
          formatter: function (params) {
            let str=`${params.name}：${params.value}次`
            return str
          }
        },
        xAxis: {
          type: 'category',
          name:'分数',
          data: ['一分', '两分', '三分', '四分', '五分', ]
        },
        yAxis: {
          name:'次数',
          type: 'value',
          axisLabel: {
            formatter: function (value, index) {
              return value + "次";
            },
          },
        },

        series: [
          {
            data: [],
            type: 'bar'
          }
        ]
      },
      good: {
        icon: 'circle',
        title: {
          text: '正面评价标签统计',
          left: 'center',
          top:'15px'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            let str=`${params.name}:${params.value}%`
            return str
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top:'15px'
        },
        color:['#3498db', '#91cc75','#5470c6',  '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        series: [
          {

            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      bad: {
        icon: 'circle',
        title: {
          text: '负面评价标签统计',
          left: 'center',
          top:'15px'
        },
        color:[ '#3498db', '#fc8452','#fac858', '#91cc75','#5470c6',  '#ee6666', '#73c0de', '#3ba272', '#fc8452',],
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            let str=`${params.name}:${params.value}%`
            return str
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top:'15px'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.driver-view-box {
  width: 100%;
  font-size: 16px;
  padding: 10px;
  .box-head {
    padding: 15px 0px;
    color: #000000;
    font-weight: bold;
  }
  .driver-info {
    padding: 10px;
    background-color: rgba(191, 190, 190, 0.1);
    border-radius: 8px;

  }
  .driver-chart {
    display: flex;
    flex-wrap: wrap;
    border-radius: 8px;
  }
  .show-section {
    width:calc(30% - 30px);
    min-width: 450px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 15px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

  }


  .icon-bangzhu {
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: #1890FF;
    }
  }
  .icon-weibiaoti-_huabanfuben {
    color: #f39c12;
    font-size: 12px;
  }
  .tagBox {
    display: flex;
    .tag {
      margin-right: 5px;
    }
  }

}
</style>
