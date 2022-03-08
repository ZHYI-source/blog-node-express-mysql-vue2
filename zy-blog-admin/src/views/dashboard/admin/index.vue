<template>
  <div class="dashboard-editor-container">
<!--    <day-group :groupData="newVisitis.todayData" @router-push="routerPush" ref="todayGroupId" />-->

<!--    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
<!--      <amount-count-chart :chart-data="newVisitis" />-->
<!--    </el-row>-->
  <Tinymce v-model="content"/>
    <div style="padding: 30px;height: 300px;background-color:#fff;margin-top: 20px;font-size: 18px;font-family: 楷体;color: #e27806" v-html="content"></div>
<!--    <panel-group :groupData="newVisitis.groupData" ref="groupId" />-->

<!--    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
<!--      <month-chart :chart-data="newVisitis" />-->
<!--    </el-row>-->

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import DayGroup from './components/DayGroup'
import AmountCountChart from './components/AmountCountChart'
import MonthChart from './components/MonthChart'
import Tinymce from "@/components/Tinymce";
const lineChartData = {
  newVisitis: {
    monthData: {},
    expectedData: {},
    amountData: {},
    countData: {},
    dayData:{},
    groupData: {},
    todayData:{}
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    Tinymce,
    PanelGroup,
    DayGroup,
    MonthChart,
    AmountCountChart
  },
  data() {
    return {
      content:'',
      query: {
        orgId: '',
        isSuper: 0
      },
      newVisitis: {
        monthData: [],
        expectedData: [],
        numberData: [],
        amountData: [],
        countData: [],
        dayData:[],
        groupData: {},
        todayData:{}
      },
      userName: '',
      notice: false,
      superNotice: false,
      decideOrNoticeNum: 0,
      dealNum: 0,
      fullscreen: false
    }
  },
  async created() {
    await this.getUserInfo()
    this.getPerms()
  },
  mounted() {
    this.doQuery()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    doQuery() {
      const p = {
        params: this.query
      }
      this.request('api_admin_index', p).then((res) => {
        this.newVisitis.monthData = res.monthArrs
        this.newVisitis.expectedData = res.priceArrs
        this.newVisitis.numberData = res.numberArrs
        this.newVisitis.groupData.onlineCarNum = res.onlineCarNum
        this.newVisitis.groupData.activationCarNum = res.activationCarNum
        this.newVisitis.groupData.orderNum = res.orderNum
        this.newVisitis.groupData.payMoney = res.payMoney
        this.$refs.groupId.setOptions(this.newVisitis.groupData)
      }).catch((error) => {
      })
      this.request('api_admin_histogram', p).then((res) => {
        this.newVisitis.dayData = []
        this.newVisitis.amountData = []
        this.newVisitis.countData = []
        this.newVisitis.dayData = res.dayArrs
        this.newVisitis.amountData = res.priceArrs
        this.newVisitis.countData = res.countArrs
        this.newVisitis.todayData.pendingNum = res.pendingNum
        this.newVisitis.todayData.signNum = res.signNum
        this.newVisitis.todayData.orderNum = res.orderNum
        this.newVisitis.todayData.payAmount = res.payAmount
        this.decideOrNoticeNum = res.decideOrNoticeNum
        this.dealNum = res.dealNum
        console.log(JSON.stringify(this.newVisitis.todayData))
        this.$refs.todayGroupId.setOptions(this.newVisitis.todayData)
        if(res.pendingNum > 0){
         if(this.query.isSuper === 1){
           this.superNotice = true
         } else  {
           this.notice = true
         }
        }
      }).catch((error) => {
      })
    },
    routerPush(){
      if(this.query.isSuper === 1){
        this.$router.push({path:'/supervision/complaint'})
        this.superNotice = false
      }else {
        this.$router.push({path:'/operate/complaint'})
        this.notice = false
      }
    },
    getPerms() {
      let perms = this.$store.getters.perms
      if (perms.includes('*')) {
          this.query.isSuper = 1
      } else {
        if (perms.includes('POST /admin/complaint/superList')) {
          this.query.isSuper = 1
        }
      }
    },
    toMax() {
      this.$router.push({ path: '/max' })
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    getUserInfo() {
      this.query.orgId = this.$store.getters.orgId
      this.userName = this.$store.getters.userNickName
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

  .title_font{
    color: white;
    font-weight: bold;
    font-size: 20px;
    margin:10px ;
    padding: 10px;
    text-align: center;
  }
  .div_red{
    background-color: #ce3b3b;
  }
  .div_blue{
    background-color: #6888ff;
  }
  .div_yellow{
    background-color: orange;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
