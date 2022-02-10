<template>
  <div class="content" :style="{'width': windowWidth + 'px', 'height':windowHeight + 'px'}">
    <div class="screen-close" @click="closeScreen"
         :style="{'position': 'absolute', 'left':windowWidth - 110 + 'px','top': '0.4rem'}">
      <div>
        <img class="close-img hover-effect" src="../../icons/svg/screenClose.png"/>
      </div>
      <div class="close-text hover-effect">关闭</div>
    </div>
    <el-row :gutter="8" class="row">
      <el-col :span="6" class="column-1">
        <div class="left">
          <!--<div class="left-1 background">-->
          <!--<el-col :span="12" class="left-column">-->
          <!--<div class="left-title">登录APP司机</div>-->
          <!--<sign-chart class="chart" :chart-data="signData" :height="chartHeight"></sign-chart>-->
          <!--<div class="number-div">-->
          <!--<div class="sub-number-div">-->
          <!--<div>{{signData.signDriverTotalCount}}</div>-->
          <!--<div>&ensp;/&ensp;</div>-->
          <!--<div>{{signData.driverTotalCount}}</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--</el-col>-->
          <!--<el-col :span="12" class="left-column">-->
          <!--<div class="right-title">绑卡司机</div>-->
          <!--<bind-chart class="chart" :chart-data="bindData" :height="chartHeight"></bind-chart>-->
          <!--<div class="number-div">-->
          <!--<div class="sub-number-div">-->
          <!--<div>{{bindData.bindDriverTotalCount}}</div>-->
          <!--<div>&ensp;/&ensp;</div>-->
          <!--<div>{{bindData.driverTotalCount}}</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--</el-col>-->
          <!--</div>-->
          <div class="left-1 background">
            <el-col :span="10" class="left-column">
              <div class="left-title">疫情防控</div>
              <div class="health-div" :style="{'height': healthDivHeight}">
                <div class="health-row">
                  <div class="health-text">今日乘客数</div>
                  <div class="health-text">{{ totalDayCount }}</div>
                </div>
                <div class="health-row">
                  <div class="green-square"></div>
                  <div class="health-text">{{ greenDayCount}}</div>
                </div>
                <div class="health-row">
                  <div class="orange-square"></div>
                  <div class="health-text">{{ orangeDayCount}}</div>
                  <!--<div class="health-text">0</div>-->
                </div>
                <div class="health-row">
                  <div class="red-square"></div>
                  <div class="health-text">{{ redDayCount}}</div>
                  <!--<div class="health-text">0</div>-->
                </div>
              </div>
              <div class="health-div" :style="{'height': healthDivHeight}">
                <div class="health-row">
                  <div class="health-text">近7日乘客数</div>
                  <div class="health-text">{{ totalWeekCount }}</div>
                </div>
                <div class="health-row">
                  <div class="green-square"></div>
                  <div class="health-text">{{ greenWeekCount }}</div>
                </div>
                <div class="health-row">
                  <div class="orange-square"></div>
                  <div class="health-text">{{orangeWeekCount}}</div>
                  <!--<div class="health-text">0</div>-->
                </div>
                <div class="health-row">
                  <div class="red-square"></div>
                  <div class="health-text">{{redWeekCount}}</div>
                  <!--<div class="health-text">0</div>-->
                </div>
              </div>
            </el-col>
            <el-col :span="14" class="left-column">
              <div class="square-div">
                <div class="green-square"></div>
                <div class="square-text">正常</div>
                <div class="orange-square"></div>
                <div class="square-text">居家隔离</div>
                <div class="red-square"></div>
                <div class="square-text">集中隔离</div>
              </div>
              <user-health-day-chart class="health-chart" :height="userHealthHeight"></user-health-day-chart>
              <user-health-week-chart class="health-chart" :height="userHealthHeight"></user-health-week-chart>
            </el-col>
          </div>
          <div class="left-2 background">
            <el-col :span="8" class="column">
              <div class="right-title">在线车辆</div>
              <online-car-chart class="chart" :chart-data="onlineCarData" :height="chartHeight"></online-car-chart>
              <div class="number-div">
                <div class="sub-number-div">
                  <div>{{onlineCarData.onlineTotalCount}}</div>
                  <div>&ensp;/&ensp;</div>
                  <div>{{onlineCarData.carTotalCount}}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="column">
              <div class="right-title">打卡车辆</div>
              <car-chart class="chart" :chart-data="clockCarData" :height="chartHeight"></car-chart>
              <div class="number-div">
                <div class="sub-number-div">
                  <div>{{clockCarData.clockTotalCount}}</div>
                  <div>&ensp;/&ensp;</div>
                  <div>{{clockCarData.carTotalCount}}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="column">
              <div class="right-title">电子发票</div>
              <paste-chart class="chart" :chart-data="invoiceData" :height="chartHeight"></paste-chart>
              <div class="number-div">
                <div class="sub-number-div">
                  <div>{{invoiceData.invoiceTotalCount}}</div>
                  <div>&ensp;/&ensp;</div>
                  <div>{{invoiceData.carTotalCount}}</div>
                </div>
              </div>
            </el-col>
          </div>
          <div class="left-3 background">
            <el-col :span="11" class="left-column">
              <div class="left-title">评价占比情况</div>
              <comment-proportion-chart class="com-pro-chart" :chart-data="commentProportionData"
                                        :height="commentProportionHeight"></comment-proportion-chart>
            </el-col>
            <el-col :span="13" class="left-column">
              <div class="right-title">评价数量</div>
              <comment-count-chart class="com-cou-chart" :chart-data="commentCountData"
                                   :height="commentCountHeight"></comment-count-chart>
            </el-col>
          </div>
          <div class="left-4 background">
            <el-col :span="12" class="column">
              <div class="left-title">车龄分布</div>
              <car-age-chart class="chart" :chart-data="carAgeData" :height="carAgeHeight"></car-age-chart>
            </el-col>
            <el-col :span="12" class="column">
              <div class="right-title">驾驶时长</div>
              <drive-duration-chart class="chart" :chart-data="driveDurationData"
                                    :height="carAgeHeight"></drive-duration-chart>
            </el-col>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="column-2">
        <div class="center">
          <div class="center-1 background">
            <car-map-info-con ref="carMapInfoRef"></car-map-info-con>
          </div>
          <!--<div class="center-2 background"></div>-->
          <div class="center-3 background">
            <div class="table-title">
              <div class="col-1 col-short">司机</div>
              <div class="col-2 col-short">车牌号</div>
              <div class="col-3 col-long">身份证</div>
              <div class="col-4 col-short">金额</div>
              <div class="col-5 col-short">电话</div>
              <div class="col-6 col-max-long">时间</div>
              <div class="col-7 col-max-long">公司</div>
            </div>
            <vue-seamless-scroll :data="tableData.records" class="order-table-scroll"
                                 :style="{'height': tableMaxHeight + 'px'}"
                                 :class-option="orderTableOption">
              <div class="line-box" v-for="(item, index) of tableData.records">
                <div class="item-1 item-short">{{item.driverName}}</div>
                <div class="item-2 item-short">{{item.plateNo}}</div>
                <div class="item-3 item-long">{{item.idCard | plusXing}}</div>
                <div class="item-4 item-short">{{item.amountDesc}}</div>
                <div class="item-5 item-short">{{item.userTel | plusXing}}</div>
                <div class="item-6 item-max-long">{{item.payForTimeDesc}}</div>
                <div class="item-7 item-max-long overflow-text"
                     style=" white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{item.orgName |
                  orgNameFilter1}}
                </div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="column-3">
        <div class="right">
          <div class="right-1 background">
            <el-col :span="12" class="left">
              <div class="left-title" style="font-size: 1rem">出租车在线数量</div>
              <vue-seamless-scroll :data="orgCarOnlineData" class="org-scroll"
                                   :style="{'height': orgCarOnlineHeight + 'px'}"
                                   :class-option="orgCarOnlineOption">
                <div class="item-box" v-for="(item, index) of orgCarOnlineData">
                  <div class="title">{{item.orgName | orgNameFilter1}}</div>
                  <div class="line">
                    <div class="item-1">车辆：</div>
                    <div class="item-2">{{item.carCount}}</div>
                    <div class="item-1">贴码：</div>
                    <div class="item-2">{{item.pasteCount}}</div>
                    <div class="item-1">打卡：</div>
                    <div class="item-2">{{item.clockCarCount}}</div>
                  </div>
                </div>
              </vue-seamless-scroll>
            </el-col>
            <el-col :span="12" class="right">
              <div class="right-title">实时订单排名</div>
              <div class="table-title">
                <div class="col-1">司机</div>
                <div class="col-2">车牌号</div>
                <div class="col-3">数量</div>
                <div class="col-4">公司</div>
              </div>
              <vue-seamless-scroll :data="orderRankData" class="order-scroll"
                                   :style="{'height': orderRankHeight + 'px'}"
                                   :class-option="orderRankOption">
                <div class="line-box" v-for="(item, index) of orderRankData">
                  <div class="item-1">{{item.driverName}}</div>
                  <div class="item-2">{{item.plateNo}}</div>
                  <div class="item-3">{{item.count}}</div>
                  <!--<div class="item-4">{{item.orgName | orgNameFilter2}}</div>-->
                </div>
              </vue-seamless-scroll>
            </el-col>
          </div>
          <div class="right-2 background">
            <div class="left-title-long" style="font-size: 0.9rem;">用户总量和新增用户</div>
            <user-count-chart class="user-cou-chart"
                              :height="userCountHeight"></user-count-chart>
          </div>
          <div class="right-3 background">
            <div class="left-title-long">失物招领</div>
            <retrieve-lost-articles-chart class="retr-lost-artic-chart"
                                          :height="retrieveLostArticlesHeight"></retrieve-lost-articles-chart>
          </div>
          <div class="right-4 background">
            <el-col :span="24" class="column">
              <div class="left-title-long">用户出行分析</div>
              <user-travel-info-chart class="user-tra-chart"
                                      :height="userTravelInfoHeight"></user-travel-info-chart>
            </el-col>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import screenfull from 'screenfull';
  import CarMapInfoCon from './components/CarMapInfoCon.vue';
  import CommentProportionChart from './components/CommentProportionChart.vue';
  import CommentCountChart from './components/CommentCountChart.vue';
  import UserCountChart from './components/UserCountChart.vue';
  import UserTravelInfoChart from './components/UserTravelInfoChart.vue';
  import RetrieveLostArticlesChart from './components/RetrieveLostArticlesChart.vue';
  import OnlineCarChart from './components/OnlineCarChart.vue';
  import CarChart from './components/CarChart.vue';
  import PasteChart from './components/PasteChart.vue';
  import SignChart from './components/SignChart.vue';
  import BindChart from './components/BindChart.vue';
  import CarAgeChart from './components/CarAgeChart.vue';
  import DriveDurationChart from './components/DriveDurationChart.vue';
  import UserHealthDayChart from './components/UserHealthDayChart.vue';
  import UserHealthWeekChart from './components/UserHealthWeekChart.vue';

  export default {
    components: {
      CarMapInfoCon,
      CommentProportionChart,
      CommentCountChart,
      UserCountChart,
      UserTravelInfoChart,
      RetrieveLostArticlesChart,
      OnlineCarChart, CarChart, PasteChart, SignChart, BindChart,
      CarAgeChart, DriveDurationChart,
      UserHealthWeekChart, UserHealthDayChart
    },
    filters: {
      orgNameFilter1(val) {
        if (val) {
          if (val.length > 12) {
            val = val.substring(0, 12) + '...'
          }
        } else {
          val = '未知机构'
        }
        return val
      },
      orgNameFilter2(val) {
        if (val) {
          if (val.length > 9) {
            val = val.substring(0, 9) + '...'
          }
        } else {
          val = '未知机构'
        }
        return val
      },
      plusXing(str) {
        let frontLen = str.length * 0.3;
        let endLen = str.length - str.length * 0.8;
        var len = str.length - frontLen - endLen;
        var xing = '';
        for (var i = 0; i < len; i++) {
          xing += '*';
        }
        return str.substr(0, frontLen) + xing + str.substr(str.length - endLen);
      },
    },
    data() {
      return {
        timer: null,//15s更新一次地图和订单信息
        orderTimer: null,
        initialized: false, // 地图是否已经初始化
        queryScreen: {
          orgId: ''
        },
        queryReport: {
          current: 1,
          params: {
            orgId: '',
            orgName: ''
          }
        },
        queryIndex: {
          orgId: '',
          isSuper: 1
        },
        windowWidth: 0,
        windowHeight: 0,
        chartHeight: '',
        orgCarOnlineHeight: '',
        orgCarOnlineData: [
          {orgName: '湄潭力帮汽车有限公司', totalCount: '208', onlineCount: '108', offlineCount: '100'},
          {orgName: '湄潭诚顺汽车有限公司', totalCount: '208', onlineCount: '108', offlineCount: '100'},
          {orgName: '湄潭诚顺汽车有限公司', totalCount: '208', onlineCount: '108', offlineCount: '100'},
          {orgName: '湄潭力帮汽车有限公司', totalCount: '208', onlineCount: '108', offlineCount: '100'},
          {orgName: '湄潭力帮汽车有限公司', totalCount: '208', onlineCount: '108', offlineCount: '100'},
        ],
        orderRankHeight: '',
        orderRankData: [
          {driverName: '张三', plateNo: '贵A12345', count: '66', orgName: '力帮公司'},
          {driverName: '李四', plateNo: '贵A12345', count: '65', orgName: '诚顺总公司诚顺总公司'},
          {driverName: '王五', plateNo: '贵A12345', count: '64', orgName: '力帮股份公司力帮股份公司'},
          {driverName: '张四', plateNo: '贵A12345', count: '63', orgName: '诚顺股份总公司'},
          {driverName: '张五', plateNo: '贵A12345', count: '62', orgName: '力帮股份有限公司'},
          {driverName: '张六', plateNo: '贵A12345', count: '60', orgName: '诚顺'},
          {driverName: '张七', plateNo: '贵A12345', count: '52', orgName: '力帮'},
          {driverName: '张八', plateNo: '贵A12345', count: '38', orgName: '诚顺'},
        ],
        commentProportionHeight: '',
        commentProportionData: {
          data: [
            {value: 4, name: '车内有异味'},
            {value: 3, name: '司机态度恶劣'},
            {value: 2, name: '司机吸烟'},
            {value: 10, name: '车内整洁'},
            {value: 1, name: '道路不熟'},
            {value: 15, name: '驾驶平稳'},
            {value: 25, name: '态度好服务棒'},
            {value: 40, name: '活地图'}
          ]
        },
        commentCountHeight: '',
        commentCountData: {
          data: []
        },
        userCountHeight: '0',
        // userCountData:{
        //   month:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        //   totalCount: [393, 438, 485, 631, 689, 724, 787, 824, 894, 987, 1056, 1123],
        //   increase: [200, 382, 102, 267, 186, 315, 316, 186, 315, 316, 310, 335]
        // },
        tableMaxHeight: 0,
        tableData: {
          records: [],
        },
        userTravelInfoHeight: '',
        // userTravelInfoData: {
        //   date: ['-','-','-','-','-','-','-'],
        //   estimate: [],
        //   real : [460, 550, 750, 850, 800, 760, 650],
        // },
        retrieveLostArticlesHeight: '',
        // retrieveLostArticlesData: {
        //   date: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日'],
        //   counts: [23, 12, 18, 12, 43, 23, 32, 21, 43, 23, 32, 21],
        // },
        healthDivHeight: '',
        userHealthHeight: '',
        onlineCarData: {},
        clockCarData: {},
        // pasteData: {},
        invoiceData: {},
        signData: {},
        bindData: {},
        healthData: {},
        orderData: undefined,
        totalDayCount: 0,
        greenDayCount: 0,
        orangeDayCount: 0,
        redDayCount: 0,
        totalWeekCount: 0,
        greenWeekCount: 0,
        orangeWeekCount: 0,
        redWeekCount: 0,
        carAgeHeight: '',
        carAgeData: {
          brandData: [{value: 4, name: '远景'}, {value: 5, name: '帝豪'}, {value: 7, name: '大众'}, {value: 4, name: '吉利'}],
          ageData: [{value: 500, name: '一至二年'}, {value: 800, name: '三至五年'}, {value: 200, name: '五至八年'}, {
            value: 50,
            name: '八至十年'
          }, {value: 50, name: '其他'}]
        },
        driveDurationData: {
          dayNightData: [{value: 6, name: '白天'}, {value: 4, name: '夜晚'}],
          durationData: [{value: 10, name: '1小时以内'}, {value: 100, name: '1~2小时'}, {
            value: 400,
            name: '3~5小时'
          }, {value: 300, name: '5~8小时'}, {value: 50, name: '其他'}]
        },
        carLIst: {}
      }
    },
    created() {
      this.getUserInfo();
      //this.getOnlineCar();
      this.timer = setInterval(() => {
        console.log('timer')
        if (this.initialized) {
          this.getOnlineCar();
        }
      }, 60000);
      this.orderTimer = setInterval(() => {
        console.log('orderTimer')
        if (this.initialized) {
          this.getNewestOrder()
          this.getCarReportData();
          this.getHealthData();
          this.getIndex();
        }
      }, 10000);
    },
    mounted() {
      this.initWindow();
      this.initData();
      var that = this;
      //<!--把window.onresize事件挂在到mounted函数上-->
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight;
          window.fullWidth = document.documentElement.clientWidth;
          that.windowHeight = window.fullHeight;  // 高
          that.windowWidth = window.fullWidth; // 宽
        })();
      };
      this.$nextTick(() => {
        this.orgCarOnlineHeight = this.windowHeight * 0.17;
        this.orderRankHeight = this.windowHeight * 0.14;
        this.tableMaxHeight = this.windowHeight * 0.23;
      })
    },
    beforeDestroy() {
      this.clearTimer()
    },
    computed: {
      orgCarOnlineOption() {
        return {
          direction: 1,
          openWatch: false,
          step: 0.5
        }
      },
      orderRankOption() {
        return {
          direction: 1,
          openWatch: false,
          step: 0.5
        }
      },
      orderTableOption() {
        return {
          direction: 0,
          //limitMoveNum: 10,
          openWatch: false,
          //singleHeight: 1,
          //waitTime: 1000,
          step: 1
        }
      }
    },
    methods: {
      getUserInfo() {
        this.queryReport.params.orgId = this.$store.getters.orgId
        this.queryScreen.orgId = this.$store.getters.orgId
        this.queryIndex.orgId = this.$store.getters.orgId
      },
      initData() {
        this.$refs.carMapInfoRef.initData(this.carList, false);
        this.initialized = true;
        this.getOnlineCar();
        this.getCarReportData();
        this.getOrderRank();
        this.getNewestOrder();
        this.getHealthData();
        this.getIndex();
        console.log('initData')
      },
      initWindow() {
        this.windowHeight = document.documentElement.clientHeight;
        this.windowWidth = document.documentElement.clientWidth;
        this.chartHeight = this.windowHeight * 0.12 + 'px';
        this.healthDivHeight = this.windowHeight * 0.11 + 'px';
        this.userHealthHeight = this.windowHeight * 0.13 + 'px';
        this.commentProportionHeight = this.windowHeight * 0.225 + 'px';
        this.commentCountHeight = this.windowHeight * 0.23 + 'px';
        this.userCountHeight = this.windowHeight * 0.18 + 'px';
        this.userTravelInfoHeight = this.windowHeight * 0.22 + 'px';
        this.retrieveLostArticlesHeight = this.windowHeight * 0.18 + 'px';
        this.carAgeHeight = this.windowHeight * 0.22 + 'px';
      },
      getOnlineCar() {
        this.request('api_admin_screen_getOnlineCar', this.queryScreen).then((res) => {
          console.log('onlineCar')
          this.carList = res;
          if (this.initialized) {
            console.log('update')
            this.$refs.carMapInfoRef.initData(this.carList, true);
          }
        }).catch((error) => {

        });
      },
      getOrderRank() {
        this.request('api_admin_screen_orderRank', this.queryScreen).then((res) => {
          console.log('orderRank')
          this.orderRankData = res;
        }).catch((error) => {
        });
      },
      getNewestOrder() {
        this.request('api_admin_screen_newestOrder', this.queryScreen).then((res) => {
          console.log("newestOrder")
          this.tableData.records = res;
        }).catch((error) => {
        });
      },
      getCarReportData() {
        this.request('api_admin_carReport', this.queryReport).then((res) => {
          this.orgCarOnlineData = res.records;
          this.signData = res.sign;
          this.bindData = res.bind;
          this.onlineCarData = res.onlineCar;
//          clockTotalCount
          this.clockCarData = res.clockCar;
          this.clockCarData.carTotalCount = this.onlineCarData.onlineTotalCount
          this.clockCarData.notClockTotalCount = this.clockCarData.carTotalCount - this.clockCarData.clockTotalCount
          this.clockCarData.clockTotalPercent = (this.clockCarData.clockTotalCount*100.0/this.clockCarData.carTotalCount).toFixed(1)
//          this.clockCarData.clockTotalCount

          // this.pasteData = res.paste;
          this.invoiceData = res.invoice;
          if (this.onlineCarData) {
            this.$refs.carMapInfoRef.setOnlineNumber(this.onlineCarData.onlineTotalCount)
          }
        }).catch((error) => {
        });
      },
      getHealthData() {
        this.request('api_admin_screen_getHealthInfo', this.queryScreen).then((res) => {
          this.healthData = res;
          if (this.healthData) {
            const start = new Date(new Date().toLocaleDateString()).getTime();
            const end = new Date().getTime();
            let num = parseInt((end - start) / 1000) + Math.floor(Math.random() * 10 + 1);
            // this.totalDayCount = Math.round(parseInt(num * 1.33/10));
            this.totalDayCount = res.today.total;
            // this.greenDayCount = Math.round(this.totalDayCount - res.today.countOrange - res.today.countRed);
            this.greenDayCount = this.totalDayCount - res.today.countOrange - res.today.countRed;
            this.orangeDayCount = res.today.countOrange;
            this.redDayCount = res.today.countRed;
            // this.totalWeekCount = Math.round(this.totalDayCount + parseInt(81337 * 0.6));
            this.totalWeekCount = res.week.total
            this.greenWeekCount = this.totalWeekCount - res.week.countOrange - res.week.countRed;
            this.orangeWeekCount = res.week.countOrange;
            this.redWeekCount = res.week.countRed;
            this.$refs.carMapInfoRef.setWarning(res.warning)
          }
        }).catch((error) => {
        });
      },
      getIndex(){
        const p = {
          params: this.queryIndex
        }
        this.request('api_admin_histogram', p).then((res) => {
          this.$refs.carMapInfoRef.setOrderNumber(res.orderNum)
        }).catch((error) => {
        })
      },
      // getDate(){
      //   let timeArr1 = [];
      //   let timeArr2 = [];
      //   let timeArr3 = [];
      //   for(let i = 7; i >= 1; i--){
      //     let day = new Date();
      //     day.setTime(day.getTime()- 24*60*60*1000 * i);
      //     let str1 = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();
      //     let str2 = day.getDate() + "日";
      //
      //     // this.userTravelInfoData.date.push(str)
      //     timeArr1.push(str1)
      //     timeArr2.push(str2)
      //
      //   }
      //   this.userTravelInfoData = timeArr1;
      //   this.retrieveLostArticlesData.date = timeArr2;
      //
      //   for (let i = 11; i >= 0; i--) {
      //     let now = new Date()
      //     let str3 =(now.getMonth()+1 - i) + "月";
      //     timeArr3.push(str3)
      //   }
      //   this.userCountData.month = timeArr3;
      // },
      closeScreen() {
        this.$router.push({path: '/'})
        screenfull.toggle();
      },
      clearTimer() {
        clearInterval(this.timer);
        clearInterval(this.orderTimer);

      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    background: url("../../icons/maxBackground.png") no-repeat;
    background-size: 100% 100%;
    padding: 3% 1% 1% 1%;;
    .row {
      width: 100%;
      height: 100%;
      .column-1 {
        height: 100%;
        .left {
          display: flex;
          flex-direction: column;
          height: 100%;
          .left-1 {
            height: 30%;
            .left-column {
              height: 100%;
              .chart {
                position: relative;
                top: 1rem;
              }
              .number-div {
                display: flex;
                width: 100%;
                margin-top: 1rem;
                .sub-number-div {
                  display: flex;
                  margin: auto;
                  font-size: 1.2rem;
                  color: #ffffff;
                }
              }
              .health-div {
                border: 0.01rem solid #4f599d;
                border-radius: 2%;
                margin-top: 0.7rem;
                .health-row {
                  display: flex;
                  flex-direction: row;
                  margin-top: 0.35rem;
                  margin-left: 0.5rem;
                  .health-text {
                    color: white;
                    font-size: 1rem;
                    margin-left: 0.4rem;
                  }
                }
              }
              .health-chart {
                margin-top: -0.1rem;
              }
            }
          }
          .left-2 {
            height: 20%;
            .column {
              height: 100%;
              .chart {
                position: relative;
                top: 0
              }
              .number-div {
                display: flex;
                width: 100%;
                margin-top: 0;
                .sub-number-div {
                  display: flex;
                  margin: auto;
                  font-size: 1.2rem;
                  color: #ffffff;
                }
              }
            }
          }
          .left-3 {
            height: 27%;
            .left-column {
              .com-pro-chart {
                margin-top: 1rem;
              }
            }
          }
          .left-4 {
            height: 23%;
          }
        }
      }
      .column-2 {
        height: 100%;
        .center {
          display: flex;
          flex-direction: column;
          height: 100%;
          .center-1 {
            height: 70%;
          }
          /*.center-2 {*/
          /*height: 23%;*/
          /*margin-bottom: 1%;*/
          /*}*/
          .center-3 {
            height: 30%;
            .table-title {
              display: flex;
              height: 3rem;
              line-height: 3rem;
              background: rgba(30, 160, 244, 0.4);
              color: #d9d9d9;
              font-size: 1.25rem;
              font-weight: bold;
              letter-spacing: 0.4rem;
              text-align: center;
              .col-short, .col-long, .col-max-long {
                border: 1px solid #042d54;
              }
              .col-short {
                width: 7rem;
              }
              .col-long {
                width: 12rem;
              }
              .col-max-long {
                width: 13rem;
              }
            }
            .order-table-scroll {
              overflow: hidden;
              .line-box {
                margin: 0.2rem 0 0 0;
                display: flex;
                width: 100%;
                color: #ffffff;
                font-size: 0.9rem;
                border-top: 0.01rem solid #b4bccc;
                border-bottom: 0.01rem solid #b4bccc;
                border-left: 0.01rem solid #042d54;
                border-right: 0.01rem solid #042d54;
                background: rgba(226, 226, 226, 0.3);
                text-align: center;
                .item-short, .item-long, .item-max-long {
                  /*border: 1px solid #042d54;*/
                  height: 2rem;
                  line-height: 2rem;
                }
                .item-short {
                  width: 7rem;
                }
                .item-long {
                  width: 12rem;
                }
                .item-max-long {
                  width: 13rem;
                }
              }
            }
          }
        }
      }
      .column-3 {
        height: 100%;
        .right {
          display: flex;
          flex-direction: column;
          height: 100%;
          .right-1 {
            height: 25%;
            .left {
              .org-scroll {
                margin-top: 1rem;
                overflow: hidden;
                color: #FFFFFF;
                .item-box {
                  .title {
                    margin: 0.6rem 0 0 0.5rem;
                    width: 100%;
                    font-size: 0.8rem;
                    font-weight: 900;
                    letter-spacing: 0.1rem;
                  }
                  .line {
                    margin: 0.8rem 0 0 0;
                    padding-bottom: 0.6rem;
                    display: flex;
                    width: 100%;
                    font-size: 0.1rem;
                    border-bottom: 0.01rem solid #b4bccc;
                    .item-1 {
                      margin: 0 0 0 1rem;
                    }
                    .item-2 {
                      margin: 0 0 0 -0.2rem;
                      width: 10%;
                    }
                  }
                }
              }
            }
            .right {
              color: #FFFFFF;
              .table-title {
                margin-top: 1rem;
                width: 100%;
                display: flex;
                font-size: 1rem;
                font-weight: bold;
                text-align: center;
                letter-spacing: 0.1rem;
                .col-1 {
                  width: 20%;
                }
                .col-2 {
                  width: 35%;
                }
                .col-3 {
                  width: 20%;
                }
                .col-4 {
                  width: 25%;
                }
              }
              .order-scroll {
                margin-top: 1rem;
                overflow: hidden;
                .line-box {
                  margin: 1rem 0 0 0;
                  padding-bottom: 0.6rem;
                  display: flex;
                  text-align: center;
                  font-size: 0.1rem;
                  border-bottom: 0.01rem solid #b4bccc;
                  .item-1 {
                    width: 30%;
                  }
                  .item-2 {
                    width: 50%;
                  }
                  .item-3 {
                    width: 20%;
                  }
                  .item-4 {
                    align-items: center;
                    justify-content: center;
                    width: 25%;
                  }
                }
              }
            }
          }
          .right-2 {
            height: 23.5%;
          }
          .right-3 {
            height: 23.5%;
          }
          .right-4 {
            height: 28%;
          }
        }
      }
    }
    .background {
      margin: 1%;
      border: 1px solid #042d54;
      /*background-color: #0d1234;*/
      background-color: bisque;
      background: rgba(0, 0, 0, 0.2);
    }
    .left-title, .left-title-long {
      width: 90%;
      margin-top: 4%;
      margin-right: 5%;
      padding-top: 0.1rem;
      padding-left: 1.8rem;
      height: 1.7rem;
      background: url("../../icons/leftTitle.png") no-repeat;
      background-size: cover;
      color: white;
      font-size: 1.2rem;
      font-weight: 700;
      letter-spacing: 0.15rem;
    }
    .left-title-long {
      width: 50%;
    }
    .right-title, .right-title-long {
      width: 90%;
      margin-top: 4%;
      margin-left: 10%;
      padding-top: 0.1rem;
      padding-left: 1rem;
      height: 1.7rem;
      background: url("../../icons/rightTitle.png") no-repeat;
      background-size: cover;
      color: white;
      font-size: 1.2rem;
      font-weight: 700;
      letter-spacing: 0.15rem;
    }
  }


    .el-table {
      th {
        border-bottom: none;
        .gutter {
          &:last-of-type {
            background-color: #54a2fb;
            width: 100px !important;
          }
        }
      }
      td {
        border: none;
      }
      tbody tr {
        &:hover {
          td {
            background-color: #042d54;
          }
        }
      }
    }


  .green-square {
    width: 1rem;
    height: 1rem;
    background-color: #10d472;
    margin-left: 0.4rem;
    margin-right: 0.2rem;
  }

  .orange-square {
    width: 1rem;
    height: 1rem;
    background-color: orange;
    margin-left: 0.4rem;
    margin-right: 0.2rem;
  }

  .red-square {
    width: 1rem;
    height: 1rem;
    background-color: red;
    margin-left: 0.4rem;
    margin-right: 0.2rem;
  }

  .square-div {
    display: flex;
    flex-direction: row;
    margin-left: 1rem;
    margin-top: 1rem;
    margin-bottom: -1.5rem;
  }

  .square-text {
    color: white;
    font-size: 1rem;
  }

  .empty-span {
    font-size: 14px;
    color: white;
    margin-top: 50%;
  }

  .screen-close {
    height: 2.5rem;
    width: 5.5rem;
    background: rgba(226, 226, 226, 0.25);
    border-radius: 10px;
    border: 0.1rem solid rgba(226, 226, 226, 0.5);
    box-shadow: inset 2px 2px 5px #000;
    display: flex;
    flex-direction: row;
    .close-img {
      width: 1.6rem;
      height: 1.6rem;
      margin: 0.45rem 0.2rem 0.45rem 0.5rem;
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;
        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .close-text {
      height: 100%;
      line-height: 2.5rem;
      letter-spacing: 0.1rem;
      font-size: 1.2rem;
      font-weight: 600;
      color: #ffffff;
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;
        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .overflow-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }


</style>
