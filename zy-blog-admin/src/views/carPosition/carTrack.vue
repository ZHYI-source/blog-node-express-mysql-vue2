<style lang="scss" src="@css/app.scss"></style>
<template>
  <div>
    <div class="app-form-class">
      <div style="display: flex; flex-direction: row">
        <div id="left-track-map" style="width: 70%; height: 700px;"></div>
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
          <div style="width: 90%; margin-top: 40px; margin-left: 10%; align-items: center; justify-content: center">
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

          <el-card shadow="hover" style="margin: 30px 8%;">
            <div style="font-weight: bold; ">当前位置：</div>
            <div style="margin-top: 10px">{{endAddr | fmtAddr}}</div>
          </el-card>

        </div>
        <div class="mapbuttons">
          <div class="btimg" @click="doOverview"><img src="../../assets/carPosition/overview@2x.png"></div>
          <div class="btimg" @click="doCar"><img src="../../assets/carPosition/doCar.png"></div>
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
  export default {
    components: {},
    props: {},
    data() {
      return {
        carInfo: {},
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
        iconCar: require('../../assets/carPosition/car.png'),
        AMap:null,
        traceMap: null,
        setTrackInterval: null,
        isGetDataFlag: false,
        isInitMap: false,
        zoomTimeOutFlag: false,
        queryLoading: false,
        lineArr: [],
        gpsArr:[],
        endAddr: '',
        marker: null,
        polyline: null,
        passedPolyline: null,
        center: [106.725929, 26.589121],
      };
    },
    computed: {},
    filters:{
      fmtAddr(val){
        if(!val){
          return '暂无位置信息'
        }
        return val
      }
    },
    methods: {
      appClose() {
        this.$emit('appClose');
      },
      open(val) {
        this.carInfo = val
        console.log(this.carInfo)
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

        // let t = this
        // this.trackMap.on('zoomend', function () {
        //   t.zoomTimeOutFlag = true;
        //   // 删除前一个setTimeOut
        //   clearTimeout(t.setTimeOut);
        //   // 重新启动一个setTimeOut
        //   t.setTimeOut = setTimeout(() => {
        //     t.zoomTimeOutFlag = false;
        //   }, 10000);
        // });
        if(this.lineArr.length > 0){
          this.move()
        }
        this.isInitMap = true
      },
      move() {
        const t = this;
        let AMap = window.AMap;
        this.marker = new AMap.Marker({
          map: t.traceMap,
          position: this.center,
          icon: new AMap.Icon({
            // imageOffset: new AMap.Pixel(-11, -10),
            size: new AMap.Size(38, 66),
            image: t.iconCar,
            imageSize: new AMap.Size(38, 66)
          }),
          offset: new AMap.Pixel(-12, -26),
          autoRotation: true,
          angle: t.gpsArr.length === 0 ? 90 : t.gpsArr[t.gpsArr.length - 1].c
        });
        this.polyline = new AMap.Polyline({
          map: t.traceMap,
          path: this.lineArr,
          showDir: true,
          strokeColor: '#28F', // 线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6 // 线宽
          // strokeStyle: "solid"  //线样式
        })
        this.passedPolyline = new AMap.Polyline({
          map: t.traceMap,
          // path: lineArr,
          strokeColor: '#AF5', // 线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6 // 线宽
          // strokeStyle: "solid"  //线样式
        })
        this.marker.on('moving', function(e) {
          t.passedPolyline.setPath(e.passedPath)
        })
        // this.traceMap.setFitView()
        if (!this.isInitMap){
          this.doCar();
        }
        this.isGetDataFlag = true
      },
      startAnimation() {
        this.marker.moveAlong(this.lineArr, 2000)
      },
      pauseAnimation() {
        this.marker.pauseMove()
      },
      resumeAnimation() {
        this.marker.resumeMove()
      },
      stopAnimation() {
        this.marker.stopMove()
      },
      getTrackData(){
        this.request('api_admin_device_gpsOfCar', this.params).then(res => {
          this.gpsArr = res;

          if (this.gpsArr.length > 0) {
            let endAddr = this.gpsArr[this.gpsArr.length - 1]
            this.pasertAddress(endAddr);

            let num = 0
            this.lineArr = [];
            for (const gps of this.gpsArr) {
              const gpsData = []
              gpsData.push(gps.b0)
              gpsData.push(gps.b1)
              if (num === this.gpsArr.length - 1) {
                this.center = gpsData
              }
              this.lineArr.push(gpsData)
              num++
            }
          }
          if (!this.isInitMap){
            this.initMap()
          }else {
            this.traceMap.remove(this.marker)
            this.move()
          }
          this.queryLoading = false
        }).catch((error)=>{
          this.queryLoading = false
        })
      },
      queryTrace(){
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.queryLoading = true
          this.clearTimer()
          this.params.start = this.timeList.startTime.getTime()
          this.params.end = this.timeList.endTime.getTime()
          console.log(this.params)
          this.getTrackData()
        })
      },
      pasertAddress(trace) {
        let endgdGsp = util.wgs84togcj02(trace.b0, trace.b1);
        let location = endgdGsp[0] + ',' + endgdGsp[1];
        if (location){
          axios.get('https://restapi.amap.com/v3/geocode/regeo?key=956fa8426889423864f4840af45f1b25&location=' + location + '&poitype=&radius=1000&extensions=base&batch=false&roadlevel=0').then((res) => {
            this.endAddr = res.data.regeocode.formatted_address;
          }).catch((error) => {
            console.log(error);
          });
        }else{
          this.endAddr = '';
        }

      },
      initParams(){
        this.params = {
          did: this.carInfo.carId,
          // start: new Date().getTime() - 5*60*1000,
          // // start: 1585749974000,
          // end: new Date().getTime(),
          count: 2000
        }
      },
      doOverview() {
        this.closeInfoWindow();
        this.traceMap.setFitView();
      },
      doCar() {
        this.closeInfoWindow();
        if (this.getLastGps()) {
          this.traceMap.setZoom(17);
          this.traceMap.setCenter(this.getLastGps());
        }
      },
      getLastGps(){
        if (this.lineArr.length > 0){
          return this.lineArr[this.lineArr.length - 1]
        }
        return false
      },
      closeInfoWindow() {
        this.traceMap.clearInfoWindow();
      },
      clearTimer(){
        clearInterval(this.setTrackInterval)
      }
    },
    async created() {
      this.setTrackInterval = setInterval(() => {
        if (this.isGetDataFlag) {
          this.initParams();
          this.getTrackData();
        }
      }, 10000);
    },
    mounted() {
    },
    beforeDestroy() {
      this.clearTimer()
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
  .mapbuttons {
    position: absolute;
    display: flex;
    flex-direction: column;
    padding-top: 30px;
  }
  .btimg {
    margin-left: 16px;
    cursor: pointer;
  }
  img {
    width: 60px;
    height: 60px;
  }
</style>
