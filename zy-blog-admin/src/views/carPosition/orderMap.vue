<style lang="scss" src="@css/app.scss"></style>
<template>
  <div>
    <div class="app-form-class">
      <div style="display: flex; flex-direction: row">
        <div id="left-track-map" style="width: 70%; height: 700px;"></div>
        <div v-if="showOrderDialog" class="order-dialog">
          <div class="top-close" @click="closeOrder"><img src="../../assets/carPosition/monitor_close.png"/></div>
          <div class="row">
            <div class="card-row-title">司机姓名：</div>
            <div class="card-row-text">{{order.driverName}}</div>
          </div>
          <div class="row">
            <div class="card-row-title">身份证号：</div>
            <div class="card-row-text">{{order.idCard}}</div>
          </div>
          <div class="row">
            <div class="card-row-title">乘客昵称：</div>
            <div class="card-row-text">{{order.userNickName}}</div>
          </div>
          <div class="row">
            <div class="card-row-title">交易金额：</div>
            <div class="card-row-text">{{order.tradeAmt}}元</div>
          </div>
          <div class="row">
            <div class="card-row-title">终点位置：</div>
            <div class="card-row-text">{{order.address}}</div>
          </div>
        </div>
        <div class="info-box" style="width: 30%;">
          <div class="info-top">
            <div class="header-row">
              <div class="license-image">
                <img src="../../assets/carPosition/car_default_logo.png">
              </div>
              <div class="license-column">
                <div class="plate-number">
                  <div>{{carInfo.plateNo}}</div>
                </div>
                <div class="license">
                  <div>{{carInfo.carType}}</div>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 90%; margin-top: 40px; margin-left: 10%; align-items: center; justify-content: center;">
            <el-form ref="dataForm" :model="timeList" :rules="rules" label-width="80px" size="mini" @submit.native.prevent
                     :hide-required-asterisk="true" v-loading="queryLoading">
              <el-form-item label="开始时间" prop="startTime">
                <el-date-picker v-model="timeList.startTime" type="datetime" size="small" placeholder="选择开始时间"></el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间" prop="endTime">
                <el-date-picker v-model="timeList.endTime" type="datetime" size="small" placeholder="选择结束时间"></el-date-picker>
              </el-form-item>
            </el-form>
          </div>

          <div style="width: 100%; margin-top: 30px">
            <el-button type="primary" size="medium" @click="queryTrace()" style="display: flex; margin: auto;">查询</el-button>
          </div>

          <div class="card-box">
            <ul
              class="list">
              <el-card shadow="hover" v-for="item in orderList" style="margin: 10px 10px 0 -20px;">
                <div @click="clickCard(item)">
                  <div class="row">
                    <div class="card-row-title">交易时间：</div>
                    <div class="card-row-text">{{item.payForTime | fmtTime }}</div>
                  </div>
                  <div class="row">
                    <div class="card-row-title">司机姓名：</div>
                    <div class="card-row-text">{{item.driverName}}</div>
                  </div>
                  <div class="row">
                    <div class="card-row-title">身份证号：</div>
                    <div class="card-row-text">{{item.idCard}}</div>
                  </div>
                  <div class="row">
                    <div class="card-row-title">乘客昵称：</div>
                    <div class="card-row-text">{{item.userNickName}}</div>
                  </div>
                  <div class="row">
                    <div class="card-row-title">交易金额：</div>
                    <div class="card-row-text">{{item.tradeAmt}}元</div>
                  </div>
                  <div class="row">
                    <div class="card-row-title">终点位置：</div>
                    <div class="card-row-text">{{item.address}}</div>
                  </div>
                </div>
              </el-card>
            </ul>
            <!--<p v-if="orderLoading" style="text-align: center;">加载中...</p>-->
            <!--<p v-if="noMore" style="text-align: center;">没有更多了</p>-->
          </div>
        </div>
      </div>

    </div>
    <!--<el-row type="flex" justify="center" style="padding: 16px">-->
      <!--<el-col :span="12" style="display:flex;justify-content: center">-->
        <!--<el-button @click="appClose()">关闭</el-button>-->
      <!--</el-col>-->
    <!--</el-row>-->

  </div>

</template>

<script>
  import util from '@/utils/util';
  import axios from 'axios';
  import tool from '@/utils/tool'
  import {Message, MessageBox} from "element-ui";
  export default {
    components: {},
    props: {},
    data() {
      return {
        carInfo: {},
        orderData: {},
        orderList:[],
        order: {},
        showOrderDialog: false,
        timeList:{
          startTime: null,
          endTime: null
        },
        rules: {
          startTime: [
            {required: true, message: '开始时间不能为空', trigger: 'blur'}
          ],
          endTime: [
            {required: true, message: '结束时间不能为空', trigger: 'blur'},
          ]
        },
        params: {},
        iconPosition: require('../../assets/carPosition/positioning.png'),
        AMap:null,
        traceMap: null,
        queryLoading: false,
        center: [106.725929, 26.589121],
        orderLoading: false,
        noMore: false,
        hasInitData: false, //首次初始化地图后，变为true
        startQuery: false,  //首次点击查询按钮后，变为true
      };
    },
    computed: {
      disabled () {
        console.log('disabled')
        console.log(this.orderLoading || this.noMore)
        return this.orderLoading || this.noMore
      }
    },
    filters:{},
    methods: {
      appClose() {
        this.$emit('appClose');
        this.hasInitData = false
        this.noMore = false
        this.startQuery = false
        this.traceMap = null
      },
      open(val) {
        console.log('oooooopen!!!!!!!!!')
        console.log(this.noMore)
        this.orderList = []
        this.carInfo = val
        this.initParams()
        this.getTrackData()
      },
      // 初始化地图
      initMap() {
        console.log('initMap')
        let AMap = window.AMap;
        this.traceMap = new AMap.Map('left-track-map', {
          scrollWheel: true,
          center: this.center,
          zoom: 17
        });

        this.move()
      },
      move() {
        const t = this;
        // let AMap = window.AMap;
        if (this.orderList.length > 0){
          for (let order of this.orderList) {
            if (order.endAddr) {
              let address = order.endAddr.split(',')
              const marker = this.getCarMarker(address[0], address[1], t.iconPosition)
              marker.content = '<div style="display: flex; flex-direction: row">\n' +
                '                  <div style="font-weight: bold; width: 5rem">交易时间：</div>\n' +
                '               <div style="width: 12rem">' + t.fmtTime(order.payForTime) + '</div>\n' +
                '              </div>\n' +
                '              <div style="display: flex; flex-direction: row">\n' +
                '                <div style="font-weight: bold; width: 5rem">司机姓名：</div>\n' +
                '              <div style="width: 12rem">' + order.driverName + '</div>\n' +
                '              </div>\n' +
                '              <div style="display: flex; flex-direction: row">\n' +
                '                <div style="font-weight: bold; width: 5rem">身份证号：</div>\n' +
                '              <div style="width: 12rem">'+ order.idCard + '</div>\n' +
                '              </div>\n' +
                '              <div style="display: flex; flex-direction: row">\n' +
                '                <div style="font-weight: bold; width: 5rem">乘客昵称：</div>\n' +
                '              <div style="width: 12rem">'+ order.userNickName + '</div>\n' +
                '              </div>\n' +
                '              <div style="display: flex; flex-direction: row">\n' +
                '                <div style="font-weight: bold; width: 5rem">交易金额：</div>\n' +
                '              <div style="width: 12rem">'+ order.tradeAmt + '元</div>\n' +
                '              </div>\n' +
                '              </div>'
              marker.on('click', this.openMarker)
              this.traceMap.add(marker)
            }
          }
        }
        this.traceMap.setFitView()
      },
      openMarker(e){
        this.traceMap.setZoomAndCenter(16, e.target.getPosition());
        var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
        infoWindow.setContent(e.target.content);
        infoWindow.open(this.traceMap, e.target.getPosition());
      },
      clickCard(order){
        console.log('clickCard')
        order.userName = order.userNickName? order.userNickName : '未设置'
        let content = '<div style="display: flex; flex-direction: row">\n' +
          '                  <div style="font-weight: bold; width: 5rem">交易时间：</div>\n' +
          '               <div style="width: 12rem">' + this.fmtTime(order.payForTime) + '</div>\n' +
          '              </div>\n' +
          '              <div style="display: flex; flex-direction: row">\n' +
          '                <div style="font-weight: bold; width: 5rem">司机姓名：</div>\n' +
          '              <div style="width: 12rem">' + order.driverName + '</div>\n' +
          '              </div>\n' +
          '              <div style="display: flex; flex-direction: row">\n' +
          '                <div style="font-weight: bold; width: 5rem">身份证号：</div>\n' +
          '              <div style="width: 12rem">'+ order.idCard + '</div>\n' +
          '              </div>\n' +
          '              <div style="display: flex; flex-direction: row">\n' +
          '                <div style="font-weight: bold; width: 5rem">乘客昵称：</div>\n' +
          '              <div style="width: 12rem">'+ order.userNickName + '</div>\n' +
          '              </div>\n' +
          '              <div style="display: flex; flex-direction: row">\n' +
          '                <div style="font-weight: bold; width: 5rem">交易金额：</div>\n' +
          '              <div style="width: 12rem">'+ order.tradeAmt + '元</div>\n' +
          '              </div>\n' +
          '              </div>'
        if (order.endAddr){
          let params ={
            content: content,
            position: order.endAddr.split(',')
          }
          this.openMarkerFromCard(params);
        }
      },
      openMarkerFromCard(params){
        this.traceMap.setZoom(16);
        this.traceMap.setCenter(params.position);
        var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
        infoWindow.setContent(params.content);
        infoWindow.open(this.traceMap, params.position);
      },
      getCarMarker(lng, lat, img) {
        return new AMap.Marker({
          position: new AMap.LngLat(lng, lat),
          // 偏移图标显示
          offset: new AMap.Pixel(-20, -40),
          icon: new AMap.Icon({
            // imageOffset: new AMap.Pixel(-11, -10),
            size: new AMap.Size(40, 40),
            image: img,
            imageSize: new AMap.Size(40, 40)
          })
        })
      },
      getTrackData(){
        if(this.params.end - this.params.start > 24 *3600 *1000 * 3){
          MessageBox.alert('查询时间范围不能大于3天！', '错误', {
            confirmButtonText: '确定',
            type: 'error'
          })
          this.queryLoading = false
          return
        }
        this.request('api_admin_position_queryOrderByCar', this.params).then(res => {
          this.orderData = res;
          this.orderList = []
          let records = this.orderData.records
          if (records.length > 0){
            for (let order of records){
              if (order.endAddr){
                this.parseAddress(order)
              }
              this.orderList.push(order)
            }
          }else{
            this.noMore = true
          }
          if (!this.hasInitData || records.length > 0 || this.startQuery){
            this.initMap()
          }

          this.hasInitData = true
          this.orderLoading = false
          this.queryLoading = false
        }).catch((error)=>{
          this.orderLoading = false
          this.queryLoading = false
        })
      },
      queryTrace(){
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.queryLoading = true
          this.initParams()
          this.params.start = this.timeList.startTime.getTime()
          this.params.end = this.timeList.endTime.getTime()
          this.startQuery = true
          this.getTrackData()
        })
      },
      parseAddress(order) {
        let trace = order.endAddr.split(',')
        let endgdGsp = util.wgs84togcj02(trace[0], trace[1]);
        let location = endgdGsp[0] + ',' + endgdGsp[1];
        if (location){
          axios.get('https://restapi.amap.com/v3/geocode/regeo?key=956fa8426889423864f4840af45f1b25&location=' + location + '&poitype=&radius=1000&extensions=base&batch=false&roadlevel=0').then((res) => {
            this.$set(order, 'address', res.data.regeocode.formatted_address);
          }).catch((error) => {
            this.$set(order, 'address', '未知地址');
          });
        }else {
          this.$set(order, 'address', '未知地址');
        }
      },
      load () {
        if (this.hasInitData){
          this.orderLoading = true
          this.params.current = this.orderData.current + 1
          this.getTrackData()
        }
      },
      closeOrder(){
        this.showOrderDialog = false
        this.order = {}
      },
      initParams(){
        this.params = {
          size: 10,
          current: 1,
          orgId: this.$store.getters.orgId,
          carId: this.carInfo.carId,
          start: new Date(new Date().toLocaleDateString()).getTime(),
          // start: 1577971509000,
          // end:1578057909000
          end: new Date().getTime(),
        }
      },
      fmtTime(val, str) {
        if (val === '' || val === null || val === undefined) {
          return '未定'
        }
        let fmt = 'yyyy-MM-dd hh:mm:ss'
        if (str) {
          fmt = str
        }
        return tool.fmtLong2DateTime(parseInt(val), fmt)
      }
    },
    async created() {
    },
    mounted() {
    },
    beforeDestroy() {
    },
  }
</script>

<style scoped>
  .header-row {
    display: flex;
    flex-direction: row;
    margin-right: 10px;
    justify-content: center
  }
  .license-column{
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    justify-content: center;
  }

  .info-top {
    padding-right: 20px;
    padding-bottom: 10px;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
  }
  .plate-number{
    font-size: 20px;
    font-weight: bold;
  }
  .license-image {
    width: 4rem;
    height: 4rem;;
    border: 1px solid #99a9bf;
    border-radius: 50%;
    margin-right: 7px;
  }
  .card-box{
    overflow:auto;
    height: 400px;
    margin-top: 20px;
    margin-left: 5%;
    background-color: rgba(134, 177, 255, 0.08);
    border-top: 1px solid rgba(134, 177, 255, 0.08);
    border-bottom: 1px solid rgba(134, 177, 255, 0.08);
  }
  .row{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .card-row-title{
    font-weight: bold;
    width: 5rem;
  }
  .card-row-text{
    width: 12rem;
  }
  .order-dialog{
    position: absolute;
    left: 3%;
    top: 10%;
    z-index: 210;
    background-color: white;
    border: 1px solid #b4bccc;
    border-radius: 1rem;
    padding: 10px;
    box-shadow: 5px 5px 10px #888888;
  }
  .top-close {
    position: absolute;
    right: 9px;
    top: 6px;
    cursor: pointer;
  }
  .top-close>img{
    height: 10px;
  }
</style>
