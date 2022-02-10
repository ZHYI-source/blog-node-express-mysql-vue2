<style lang="scss" src="@css/app.scss"></style>
<template>
  <div>
    <div class="app-form-class">
      <div style="display: flex; flex-direction: row">
        <div id="map-container" class="map-container" style="width: 70%; height: 700px"></div>
        <div class="info-box" style="width: 30%;">
          <div class="license">{{formVal.plateNo}}</div>
          <div class="driver">司机信息</div>
          <div class="info-row">
            <div>司机姓名</div>
            <div class="row-item" v-if="formVal.driverRealName">{{formVal.driverRealName | fmtName}}</div>
          </div>
          <div class="info-row">
            <div>身份证号</div>
            <div class="row-item" v-if="formVal.driverIdCard">{{formVal.driverIdCard | fmtIdCard}}</div>
          </div>
          <div class="info-row">
            <div>订&ensp;单&ensp;号</div>
            <div class="row-item" v-if="formVal.outTradeNo">{{formVal.outTradeNo}}</div>
          </div>
          <div class="user">乘客信息</div>
          <div class="info-row">
            <div>手机号码</div>
            <div class="row-item" v-if="formVal.userTel">{{formVal.userTel}}</div>
          </div>
          <div class="info-row">
            <div>姓&emsp;&emsp;名</div>
            <div class="row-item" v-if="formVal.userRealName">{{formVal.userRealName | fmtName}}</div>
          </div>
          <div class="info-row">
            <div>身份证号</div>
            <div class="row-item" v-if="formVal.userIdCard">{{formVal.userIdCard | fmtIdCard}}</div>
          </div>
          <div class="address">
            <div class="address-row">
              <img class="img" :src="startUrl"/>
              <div class="address-row-right">
                <div class="address-row-2">
                  <div class="address-row-2-title">时间</div>
                  <div class="address-row-2-info" v-if="formVal.startTime">{{formVal.startTime | fmtTime}}</div>
                </div>
                <div class="address-row-2">
                  <div class="address-row-2-title">地址</div>
                  <div class="address-row-2-info" v-if="formVal.startAddress">{{formVal.startAddress}}</div>
                </div>
              </div>
            </div>
            <div class="address-row">
              <img class="img" :src="endUrl"/>
              <div class="address-row-right">
                <div class="address-row-2">
                  <div class="address-row-2-title">时间</div>
                  <div class="address-row-2-info" v-if="formVal.endTime">{{formVal.endTime | fmtTime}}</div>
                </div>
                <div class="address-row-2">
                  <div class="address-row-2-title">地址</div>
                  <div class="address-row-2-info" v-if="formVal.endAddress">{{formVal.endAddress}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <el-row type="flex" justify="center" style="padding: 16px">
      <el-col :span="12" style="display:flex;justify-content: center">
        <el-button @click="appClose()">关闭</el-button>
      </el-col>
    </el-row>

  </div>

</template>

<script>
  import tool from '@libs/tool';
  import autoLoad from '@/utils/autoLoad'
  export default {
    components: {},
    props: {},
    data() {
      return {
        ctl: {
          view: false,
          loading: false
        },
        formVal: {},
        startUrl:'http://img.wisdomtaxi.com/startAddress.png',
        endUrl:'http://img.wisdomtaxi.com/endAddress.png',
        AMap:null
      };
    },
    computed: {},
    filters:{
      fmtName(val){
        // console.log(val)

        if(val !== undefined && val !== null){
          return val.substring(0, 1) + '*' + val.substring(2, val.length)
        }
        return val;
      },
      fmtIdCard(val){
        if(val !== undefined && val !== null){
          return val.substring(0, 9) + '*******' + val.substring(16, val.length)
        }
        return val;
      }
    },
    methods: {
      appClose() {
        this.$emit('appClose');
      },
      open(val, read) {
        this.formVal = tool.cloneObj(val);
        console.log('open')
        console.log(this.formVal)

        this.ctl.view = read;
      },
      getCenter(start, end){  //取起点终点的中间值
        let startAddr = start === undefined || start === '' ? '106.628494,26.646253' : start;
        let endAddr = end === undefined || end === '' ? '106.628494,26.646253' : end;
        let startAddrArr = startAddr.split(',');
        let endAddrArr = endAddr.split(',');
        let centerLng = (parseFloat(startAddrArr[0]) + parseFloat(endAddrArr[0]))/2;
        console.log(centerLng)

        let centerLat = (parseFloat(startAddrArr[1]) + parseFloat(endAddrArr[1]))/2;
        console.log(centerLat)

        let center = [centerLng, centerLat];
        return center;
      },
      // 初始化地图
      initMap() {
        console.log('initMap')
        // let center = this.getCenter(this.formVal.startAddr, this.formVal.endAddr);
        let centerLng = 106.628494;
        let centerLat = 26.646253;
        if(this.formVal.startAddr){
          let startAddrArr = this.formVal.startAddr.split(',');
          centerLng = parseFloat(startAddrArr[0]);
          centerLat = parseFloat(startAddrArr[1]);
        }


        const AMap = window.AMap
        const map = new AMap.Map('map-container', {
          resizeEnable: true,
          zoom: 13,
          center: [centerLng,centerLat]
        })
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.MouseTool', 'AMap.PolyEditor', 'AMap.CircleEditor'],
          function() {
            const toolopt = {
              // 相对于地图容器左上角的偏移量，正数代表向右下偏移。默认为AMap.Pixel(10,10)
              offset: new AMap.Pixel(20, 20),
              position: 'LT',
              locationMarker: AMap.Marker({ map: map })
            }
            map.addControl(new AMap.ToolBar(toolopt))
            map.addControl(new AMap.Scale())
          }
        )
        let endAddr = this.formVal.endAddr;
        if (endAddr){
          console.log('endAddr if')
          console.log(endAddr)
          let endAddrArr = endAddr.split(',');
          const endMarker = this.getMarker(endAddrArr[0], endAddrArr[1], this.endUrl);
          map.add(endMarker)
        }
        let startAddr = this.formVal.startAddr;
        if (startAddr){
          console.log('startAddr if')
          console.log(startAddr)
          let startAddrArr = startAddr.split(',');
          const startMarker = this.getMarker(startAddrArr[0], startAddrArr[1], this.startUrl);
          map.add(startMarker)
        }
      },
      getMarker(lng, lat, img) {
        return new AMap.Marker({
          position: new AMap.LngLat(lng, lat),
          // 偏移图标显示
          offset: new AMap.Pixel(0, -30),
          icon: new AMap.Icon({
            // imageOffset: new AMap.Pixel(-11, -10),
            size: new AMap.Size(20, 20),
            image: img,
            imageSize: new AMap.Size(20, 20)
          })
        })
      }
    },
    async created() {
      // 创建挂载JS文件
      await autoLoad('https://webapi.amap.com/maps?v=1.4.13&key=956fa8426889423864f4840af45f1b25')
      this.initMap()
    },
    mounted() {

    }

  }
</script>

<style scoped>
  .license{
    width: 80%;
    margin-left: 10%;
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
  }
  .driver{
    width: 80%;
    margin-left: 10%;
    text-align: center;
    align-content: center;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 250%;
    border-top: 0.01rem solid #000000;
  }
  .user{
    width: 80%;
    margin-left: 10%;
    margin-top: 40px;
    margin-bottom: 20px;
    text-align: center;
    align-content: center;
    font-weight: bold;
    font-size: 1.5rem;
  }
  .form{
    width: 300px;
    margin-left:80px;
    margin-top: 30px;
  }
  .form-item{
    width: 300px;
    margin-top: -20px;
  }
  .address{
    width: 80%;
    margin-left: 10%;
    margin-top: 10%;
    border-top: 0.01rem solid #000000;
  }
  .address-row{
    display: flex;
    flex-direction: row;
    margin-top: 10%;
    /*border: 0.01rem solid #000000;*/
  }
  .img{
    margin-top: 5%;
    width: 40px;
    height: 40px;
    /*border: 0.01rem solid #000000;*/
  }
  .address-row-right{
    /*margin-left: -8%;*/
    /*border: 0.01rem solid #000000;*/

  }
  .address-row-2{
    display: flex;
    flex-direction: row;
    margin-top: 5%;
  }
  .address-row-2-title{
    width: 20%;
    /*border: 0.01rem solid #000000;*/
  }
  .address-row-2-info{
    width: 80%;
  }
  .info-row{
    display: flex;
    flex-direction: row;
    margin: 10px 10%;
    font-size: 0.8rem;
    font-weight: bold;
    /*border: 0.01rem solid #000000;*/
  }
  .row-item{
    margin-left: 10%;
  }
</style>
