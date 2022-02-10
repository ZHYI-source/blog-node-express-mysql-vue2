<style lang="scss" scoped>
  .map-info {
    width: 100%;
    height: 100%;
    .map {
      border: solid 0.063rem rgba(0, 122, 255, 0.18);
      position: relative;
      .ml-03 {
        margin-left: 0.3rem;
      }
      .panel-1 {
        position: absolute;
        z-index: 10;
        top: 0.875rem;
        left: 0.875rem;
        display: flex;
        width: 26rem;
        height: 5rem;
      }
      .panel-5 {
        position: absolute;
        z-index: 10;
        top: 7.875rem;
        left: 1.313rem;
        display: flex;
        width: 15rem;
        height: 6.438rem;
      }
      .panel-2 {
        display: flex;
      }
      .panel-3 {
        position: absolute;
        z-index: 10;
        bottom: 0.875rem;
        right: 0.875rem;
        display: flex;
        border: solid 0.1rem #0b2b6b;
      }
      .panel-4 {
        background-color: #007aff;
        padding: 0.5rem 0.5rem;
        position: absolute;
        z-index: 10;
        bottom: 0.875rem;
        right: 0.875rem;
        display: flex;
        border: solid 0.1rem #007aff;
      }
    }
  }
  .map-number-con{
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 1rem;
    left:1rem;
    z-index: 10;
    .number-title{
      color: white;
      font-size: 1.2rem;
      margin-bottom: 0.3rem;
    }
    .number-text{
      color: #f35626;
      background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-animation: hue 30s infinite linear;
      margin-bottom: 0.3rem;
    }
    @-webkit-keyframes hue {
      from {
        -webkit-filter: hue-rotate(0deg);
      }
      to {
        -webkit-filter: hue-rotate(-360deg);
      }
    }
  }
  .map-logo-1{
    display: flex;
    position: absolute;
    top:1rem;
    right:10rem;
    z-index: 10;
  }
  .map-logo-2{
    display: flex;
    position: absolute;
    top:1rem;
    right:1rem;
    z-index: 10;
  }
  .background{
    margin: 1%;
    border: 1px solid #ffffff;
    border-radius: 10%;
    /*background-color: bisque;*/
    background:rgba(0,0,0,0.9);
  }
  .warning-div{
    background: rgba(226, 226, 226, 0.25);
    border-radius: 10px;
    border: 0.1rem solid rgba(226, 226, 226, 0.5);
    box-shadow: inset 2px 2px 5px #000;
    width: 9rem;
    .warning-title{
      color: white;
      font-size: 1rem;
      margin-left: 0.5rem;
      margin-bottom: 0.3rem;
      margin-top: 1rem;
    }
    .warning-row{
      display: flex;
      flex-direction: row;
      margin-left: 0.5rem;
      margin-top: 1rem;
      margin-bottom: 0.6rem;
      .warning-name{
        color: white;
        font-size: 1rem;
        margin-right: 0.5rem;
        margin-bottom: 0.1rem;
      }
      .warning-text{
        color: white;
        font-size: 0.8rem;
        margin-bottom: 0.3rem;
      }
    }
  }
</style>
<style>
  .smallMarker{
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background-image: radial-gradient(#ffffff, rgb(10, 255, 15));
  }
  .staticMarker{
    width: 2px;
    height: 2px;
    border-radius: 100%;
    background-image: radial-gradient(#fffaa9, rgb(190, 166, 255));
  }
  .markerClass{
    margin-left: 100px;
    margin-top: 100px;
    width: 4px;
    height: 4px;
    /*transform: translate3d(0px, 0px, 0px);*/
    position: relative;
    outline: none;
    /*background-color: #dadd14;*/
    background-image: radial-gradient(yellow, rgb(255, 190, 10));
    /*box-shadow: 1px 1px 8px 0 rgb(255, 255, 255);*/
    border-radius: 100%;
    transform-origin: 0 0;
    display: block;
    opacity: 0.7;
  }

  .markerClass::after {
    content: "";
    -webkit-border-radius: 100%;
    border-radius: 100%;
    height: 300%;
    width: 300%;
    position: absolute;
    margin: -100% 0 0 -100%;
    box-shadow:  inset 0 0 10px 8px rgba(221, 220, 39, 0.62);
    animation: pulsate 1s ease-out;
    animation-iteration-count: infinite; /*无穷反复*/
    animation-delay: 1.1s;
  }

  @keyframes pulsate {
    0% {
      transform: scale(0.1, 0.1);
      opacity: 0;
      filter: alpha(opacity=0);
    }
    50% {
      opacity: 1;
      filter: none;
    }
    100% {
      transform: scale(1.2, 1.2);
      opacity: 0;
      filter: alpha(opacity=0);
    }
  }
</style>
<template>
  <div ref="mapInfo" class="map-info" >
    <div class="map">
      <div v-show="!switchFlag" id="map-container-big3" :style="{height: mapHeight + 'px'}">
        <div class="map-number-con">
          <div class="number-title">在线车辆</div>
          <div class="number-text " style="font-size: 2rem;">{{ onlineNum }}</div>
          <div class="number-title">今日订单</div>
          <div class="number-text" style="font-size: 2rem;">{{ orderNum }}</div>
          <div v-if="warningData" class="warning-div">
            <div class="warning-title">健康码预警</div>
            <div class="warning-row">
              <div class="warning-name">司机姓名</div>
              <div class="number-text" style="font-size: 1rem;">{{warningData.driverName}}</div>
            </div>
            <div class="warning-row">
              <div class="warning-name">车牌号</div>
              <div class="number-text" style="font-size: 1rem;">{{warningData.plateNo}}</div>
            </div>
          </div>
        </div>
        <div class="map-logo-2">
          <div>
            <img src="../../../icons/mapLogo.png" style="width: 100px;height:110px;" />
          </div>
        </div>
        <div class="map-logo-1">
          <div>
            <img src="../../../icons/shuihui.png" style="width: 100px;height:104px;" />
          </div>
        </div>
      </div>
      <!--<div id="map-container-big4" :class="switchFlag ? 'panel-2' : 'panel-3'"-->
      <!--:style="{width: mapWidth2 + 'px', height: mapHeight2 + 'px'}">-->
      <!--</div>-->
      <!--<div class="panel-4">-->
      <!--<div class="bv2-ft-0875-ffffff">实时交通情况</div>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  import autoLoad from '@/utils/autoLoad';
  export default {
    data: function () {
      return {
        mapHeight: 10,
        mapWidth2: 0,
        mapHeight2: 0,
        AMap: null,
        centerMap: '',
        centerMap2: '',
        staticList: [],
        staticMarkers: [],
        dynamicList: [],
        dynamicMarkers: [],
        dynamicFlash:[],
        warningData: undefined,
        onlineNum: 0,
        orderNum: 0,
        switchFlag: false,
        conTimer: null,
        flashTimer: null,
        layer: null
      };
    },
    beforeDestroy() {
      this.clearTimer()
    },
    created:function(){
      // this.conTimer = setInterval(() => {
      //   console.log('conTimer')
      //   this.getOrderNumber();
      // }, 30000);

      this.flashTimer = setInterval(() => {
        console.log('flashTimer')
        this.flashPoint();
      }, 500);
    },
    mounted: function () {
      this.mapHeight = this.$refs.mapInfo.offsetHeight + 15;
      this.mapWidth2 = this.$refs.mapInfo.offsetWidth / 3;
      this.mapHeight2 = this.$refs.mapInfo.offsetHeight / 3;
      // this.getOrderNumber();

    },
    updated: function () {
      if (this.centerMap === '') {
        this.mapHeight = this.$refs.mapInfo.offsetHeight + 18;
        this.mapWidth2 = this.$refs.mapInfo.offsetWidth / 3;
        this.mapHeight2 = this.$refs.mapInfo.offsetHeight / 3;
      }
    },
    methods: {
      init(callback) {
        callback && callback();
      },
      drawStaticPoint() {
        var markers = [];
        console.log('staticList')
        console.log(this.staticList)
        if(this.staticMarkers.length>2000){
          var removeMarkers = this.staticMarkers.slice(0,1000);
          this.staticMarkers = this.staticMarkers.slice(1000,this.staticMarkers.length-1);
          this.centerMap.remove(removeMarkers);
          //this.staticMarkers=[];
        }
        for (const car of this.staticList) {
          if (car.b0 && car.b1){
            let marker = new this.AMap.Marker({
              position: [car.b0, car.b1],
              content:'<div class="staticMarker"></div>'
            });
            //this.centerMap.add(marker);
            markers.push(marker);
            this.staticMarkers.push(marker);
          }
        }
        this.centerMap.add(markers);
      },
      flashPoint(){
        if(this.staticList.length>0){
          if(this.staticMarkers.length==0){
            this.drawStaticPoint();
          }
          console.log(this.staticList.length);
          //mk = this.getRandomArrayElements(this.dynamicMarkers,1);//this.dynamicMarkers[0];//
          let index = Math.floor(this.staticList.length * Math.random());
          let car = this.staticList[index];
          if (car.b0 && car.b1){
            let marker = new this.AMap.Marker({
              position: [car.b0, car.b1],
              content:'<div class="markerClass"></div>'
            });
            //this.centerMap.add(marker);
            //markers.push(marker);
            //this.dynamicMarkers.push(marker);
            this.dynamicFlash.push(marker);
            this.centerMap.add(marker);
          }

        }
        if(this.dynamicFlash.length>6){
          console.log(this.dynamicFlash.length);
//          this.centerMap.remove(this.dynamicFlash);
//          this.dynamicFlash=[];
          //var removeMarkers = this.dynamicFlash.slice(0,1);
          //this.dynamicFlash = this.dynamicFlash.slice(1,this.dynamicFlash.length-1);
          this.centerMap.remove(this.dynamicFlash.shift());
          //this.centerMap.remove(mk);
        }
      },
      drawDynamicPoint() {
        //var markers = [];
        console.log('dynamicList')
        console.log(this.dynamicList)
        this.dynamicMarkers = [];
        for (const car of this.dynamicList) {
          if (car.b0 && car.b1){
            let marker = new this.AMap.Marker({
              position: [car.b0, car.b1],
              content:'<div class="markerClass"></div>'
            });
            //this.centerMap.add(marker);
            //markers.push(marker);
            this.dynamicMarkers.push(marker);
          }
        }
        //this.centerMap.add(markers.length>20?markers.slice(0,20):markers);
      },

      drawSmallPoint() {
        this.centerMap2.clearMap();
        for (const car of this.dynamicList) {
          if (car.b0 && car.b1){
            let marker = new this.AMap.Marker({
              position: [car.b0, car.b1],
              content:'<div class="smallMarker"></div>'
            });
            this.centerMap2.add(marker);
          }
        }
      },

      drawMap(data) {
        this.AMap = window.AMap;

        let mapCenter = [106.714374, 26.567944]; // [106.4426, 26.64272];

        this.centerMap = new this.AMap.Map('map-container-big3', {
          resizeEnable: true,
          zoom: 12,
          center: mapCenter,
          mapStyle: 'amap://styles/03471f22c9caf677771a636c5ee1f47d'
        });

        // let mapCenter2 = [106.714374, 26.567944]; // [106.4426, 26.64272];
        //
        // this.centerMap2 = new this.AMap.Map('map-container-big4', {
        //   resizeEnable: true,
        //   zoom: 11,
        //   center: mapCenter2,
        //   mapStyle: 'amap://styles/03471f22c9caf677771a636c5ee1f47d'
        // });
        //
        // this.centerMap2.on('dblclick', this.switchMap);

        if (data) {
          this.dynamicList = data.dynamicList;
          this.staticList = data.staticList;
          this.drawStaticPoint();
          this.drawDynamicPoint();
          // this.drawSmallPoint();
        }
      },
      getOrderNumber(){
        const start = new Date(new Date().toLocaleDateString()).getTime();
        const end = new Date().getTime();
        let num = parseInt((end - start) / 1000) + Math.floor(Math.random() * 10 + 1);
        this.orderNum = Math.round(num/8);
      },
      setOrderNumber(data){
        this.orderNum = data;
      },
      setOnlineNumber(data){
        this.onlineNum = data;
      },
      setWarning(data){
        this.warningData = data;
      },
      switchMap() {
        this.switchFlag = !this.switchFlag;
        if (this.switchFlag) {
          this.mapWidth2 = this.$refs.mapInfo.offsetWidth;
          this.mapHeight2 = this.$refs.mapInfo.offsetHeight;
          this.centerMap2.setZoomAndCenter(12, [106.714374, 26.567944]);
        } else {
          this.mapWidth2 = this.$refs.mapInfo.offsetWidth / 3;
          this.mapHeight2 = this.$refs.mapInfo.offsetHeight / 3;
          this.centerMap2.setZoomAndCenter(11, [106.714374, 26.567944]);
        }
        this.centerMap2.setFitView(this.centerMap2.getAllOverlays());
        this.layer.setFitView();
      },

      calcWH() {
        document.getElementById('map-container-big3').style.height = (this.$refs.mapInfo.offsetHeight) + 'px';
      },
      resizeWin() {
        this.calcWH();
      },
      clearTimer(){
        // clearInterval(this.conTimer);
        clearInterval(this.flashTimer);
      },
      getRandomArrayElements(arr, count) {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
        }
        return shuffled.slice(min);
      },
      initData(data, isUpdate) {
        if (isUpdate) {
          this.dynamicList = data.dynamicList;
          this.staticList = data.staticList;
          if (this.centerMap) {
            this.drawStaticPoint();
            this.drawDynamicPoint();
          }
          // if (this.centerMap2) {
          //   this.drawSmallPoint();
          // }
        } else {
          let that = this;
          this.init(function () {
            autoLoad('https://webapi.amap.com/maps?v=1.4.10&key=5fbfab5b6f6d13a9bff742af384c7615' , function () {
              autoLoad('https://webapi.amap.com/loca?v=1.2.0&key=5fbfab5b6f6d13a9bff742af384c7615', function () {
                autoLoad('https://webapi.amap.com/ui/1.0/main.js?v=1.0.11', function () {
                  that.drawMap(data);

                });
              });
            });
          });
        }
      }
    }
  };
</script>
