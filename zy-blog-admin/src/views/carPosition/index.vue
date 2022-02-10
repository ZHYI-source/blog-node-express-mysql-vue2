<template>
  <div class="container">
    <div v-if="isMask" class="mask">
      <div class="loading">
        <img src="../../assets/carPosition/loading.gif">
        <div class="loading-text">加载中...</div>
      </div>
    </div>
    <div class="monitor" style="height:100%;">
      <!--左侧菜单-->
      <div class="monitor-left" style="padding-right: 0; padding-left: 0;" :class="clickLeft ? 'leftMenu-active' : ''">
        <!--<div class="select-org">-->
          <!--<el-popover-->
            <!--placement="right"-->
            <!--width="200"-->
            <!--trigger="click"-->
            <!--:content="selectedCarOrgName">-->
            <!--<el-button size="mini" slot="reference" plain style="margin-left: 50px">当前机构</el-button>-->
          <!--</el-popover>-->
          <!--<el-button size="mini" type="primary" plain @click="treeForm = true" style="margin-left: 30px">切换机构</el-button>-->
        <!--</div>-->
        <div class="carTree">
          <el-input v-model="filterCarText" class="filter-item" placeholder="搜索" clearable style="width: 240px; margin-left: 10%;" />
          <div class="tree">
            <el-tree
              class="filter-tree"
              node-key="id"
              :load="loadNode"
              :props="carProps"
              lazy
              :filter-node-method="filterCarNode"
              @node-click="handleCarNodeClick"
              :highlight-current="true"
              ref="carTree"
              style="margin-left: 25px; margin-top: 20px; width: 600px">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span class="car-node">
                  <img v-if="node.data.status ===1" :src="iconCar" style="margin-top:5px ;width: 15px;height: 20px;"/>
                  <!--<img v-if="!data.children && data.status ===2" :src="offlineCar" style="margin-top:5px;width: 15px;height: 15px;"/>-->
                  {{ node.label }}
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </div>
      <div class="mapSearch">
        <div class="group-bnt">
          <div style="width: 100px; font-size: 0.9rem; margin-left: 0.4rem; letter-spacing: 0.09rem; color: #555555; font-weight: bold">车辆查找</div>
          <el-input v-model="searchPlateNo" placeholder="输入车牌号后三位" clearable
                    style="font-size: 16px;width:100%;padding-left: 0.5rem;" />
          <div>
            <el-button size="mini" type="primary" @click="searchCar" style="margin-left: 10px">搜索</el-button>
          </div>
        </div>
        <div v-if="showCarList" class="mapSearch-result">
          <div v-for="(item,index) in searchCarList" :key="index" @click="clickCarList(item)" class="result-item">
            <div style="font-weight: bold">{{item.plateNo}}</div>
            <div style="font-weight: lighter">{{item.orgName}}</div>
          </div>
          <div v-if="noCar" class="result-item" style="height: 40px; margin-top: 20px">没有搜到车辆</div>
        </div>
      </div>
      <div class="left-button" :class="clickLeft ? '' : 'left-button-active'" @click="handleLeft">
        <img
          :src="clickLeft ? require('../../assets/carPosition/icon_right.png') : require('../../assets/carPosition/icon_left.png')"/>
      </div>
      <!--引入地图-->
      <div id="map-container" :class="clickLeft ? 'map-active' : ''" style="height:600px;">

        <div class="map-mask" @click="cancelMask" v-if="showCarList"></div>

        <div class="map-top-right">
          <!--<div :class="this.fullscreen ? 'unfullcreen' : 'fullcreen'" @click="goScreen"></div>-->
          <!--<screenfull id="screenfull" class="right-menu-item hover-effect"/>-->
        </div>

      </div>
      <!--右侧菜单-->
      <div class="choose-car"  :class="clickCar ? 'choose-car-active' : ''" style="right: -25rem;">
          <div class="info-top">
            <div class="top-close" @click="closeRight"><img src="../../assets/carPosition/monitor_close.png"/></div>
            <div class="header-row">
              <div class="license-image">
                <img src="../../assets/carPosition/car_default_logo.png">
              </div>
              <div class="license-column">
                <div class="plate-number">
                  <div>{{carInfo.plateNo}}</div>
                </div>
                <div class="car-type">
                  <div>{{carInfo.carType}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="info">
            <div class="car-info">
              <div class="title-row">
                <div class="shuxian"></div>
                <div class="title-name">车辆状态</div>
              </div>
              <div class="carinfo-row">
                <div class="info-title">组织机构:</div>
                <div class="info-info">{{carInfo.orgName}}</div>
              </div>
              <div class="carinfo-row">
                <div class="info-title">定位时间:</div>
                <div class="info-info">{{carInfo.a | fmtTime}}</div>
              </div>
              <div class="carinfo-row">
                <div class="info-title">当前位置:</div>
                <div class="info-info">{{newPosition | fmtPosition}}</div>
              </div>
            </div>
            <div class="order-info">
              <div class="title-row">
                <div class="shuxian"></div>
                <div class="title-name">订单状态</div>
              </div>
              <div class="carinfo-row">
                <div class="info-title">订单时间:</div>
                <div class="info-info">{{carInfo.payForTime | fmtTime}}</div>
              </div>
              <div class="carinfo-row">
                <div class="info-title">订单金额:</div>
                <div class="info-info">{{carInfo.tradeAmt | fmtAmt}}元</div>
              </div>
              <div class="carinfo-row">
                <div class="info-title">今日订单数:</div>
                <div class="info-info">{{carInfo.count}}</div>
              </div>
            </div>
          </div>
        <div class="car-info-button">
          <el-button size="medium" type="primary" @click="getCarTrack(carInfo)"  style="margin-left: 20px; margin-right: 10px">车辆跟踪</el-button>
          <el-button size="medium" type="primary" @click="getOrderMap(carInfo)">订单地图</el-button>
        </div>
      </div>
    </div>
    <!--订单列表-->
    <div class="table">
      <el-table
        class="el-table"
        v-loading="loading" element-loading-text="正在查询中。。。"
        :data="tableData.records" :stripe="true" border
        stripe
        style="width: 100%;"
        :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
        <el-table-column prop="plateNo" label="车牌号" width="100" align="center">
        </el-table-column>
        <el-table-column prop="driverName" label="司机姓名" width="100" align="center">
        </el-table-column>
        <el-table-column prop="idCard" label="司机身份证" width="180" align="center">
        </el-table-column>
        <el-table-column prop="orgName" label="机构" align="center">
        </el-table-column>
        <el-table-column prop="userNickName" label="乘客" width="100" align="center">
        </el-table-column>
        <el-table-column prop="tradeAmt" label="交易金额" width="100" align="center">
        </el-table-column>
        <el-table-column prop="address" label="地址" align="center">
        </el-table-column>
        <el-table-column prop="payForTime" label="时间" width="180" align="center">
          <template slot-scope="scope">
            {{scope.row.payForTime | fmtTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="100px">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="small" type="primary" icon="el-icon-document"
                         @click="getOrderMap(scope.row)">查看
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!--<el-pagination-->
        <!--background-->
        <!--layout="prev, pager, next"-->
        <!--@current-change="doQuery()"-->
        <!--:total="tableData.total" :current-page.sync="tableData.current" :page-size="tableData.size"-->
        <!--style="flex-shrink: 0;padding: 10px">-->
      <!--</el-pagination>-->
    </div>

    <el-dialog title="切换机构" :visible.sync="treeForm">
      <el-input v-model="filterOrgText" class="filter-item" placeholder="输入机构名" clearable style="width: 200px; margin-left: 25px;" />
      <el-tree
        class="filter-tree"
        :data="orgTree"
        :props="orgProps"
        default-expand-all
        :filter-node-method="filterOrgNode"
        @node-click="handleOrgNodeClick"
        :expand-on-click-node="false"
        :highlight-current="true"
        ref="orgTree"
        style="margin-left: 25px; margin-top: 10px">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="switchOrg">
          切换
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="车辆跟踪" :visible.sync="carTrackForm" :close-on-press-escape="false"
               :close-on-click-modal="false" @close="closeCarTrack" width="90%">
      <carTrack ref="carTrack" v-if="carTrackForm" v-on:appClose="closeCarTrack"></carTrack>
    </el-dialog>
    <el-dialog title="订单地图" :visible.sync="orderMapForm" :close-on-press-escape="false"
               :close-on-click-modal="false" @close="closeOrderMap" width="90%">
      <orderMap ref="orderMap" v-if="orderMapForm" v-on:appClose="closeOrderMap"></orderMap>
    </el-dialog>
  </div>
</template>
<script>
  import autoLoad from '@/utils/autoLoad';
  import util from '@/utils/util';
  import axios from '@/utils/axios';
  import carTrack from './carTrack';
  import orderMap from './orderMap';
  import Screenfull from '@/components/Screenfull'
  export default {
    components: { carTrack,orderMap,Screenfull },
    data() {
      return {
        isMask: false,
        queryTable:{
          size: 5,
          current: 1,
          orgId: ''
        },
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        queryOrg : {
          pageNumber: 1,
          pageSize: 999,
          orgId: ''
        },
        orgList: [],
        selectedCarOrgName: '',
        selectedCarOrgId: '',
        queryTree:{
          orgId: undefined
        },
        searchPlateNo: '',
        orgTree: [],
        carTree: [],
        filterOrgText: '',
        filterCarText: '',
        orgProps: {
          children: 'children',
          label: 'orgName'
        },
        carProps: {
          isLeaf: 'leaf'
        },
        iconCar: require('../../assets/carPosition/car.png'),
        offlineCar: require('../../assets/carPosition/noSingle.png'),
        // iconCarLicense: require('../../assets/carPosition/car_license_orange.png'),
        iconCarLicense: require('../../assets/carPosition/car_license_blank.png'),
        fullscreen: false,
        fullscreenNum: 1,
        treeForm: false,
        carTrackForm: false,
        orderMapForm: false,
        loading: false,
        viewButton: false,
        clickCar: false,
        clickLeft: false,
        AMap: null,
        newMap: null,
        timer: null,
        orderTimer: null,
        needToGetData: false,
        carList:[],
        searchCarList:[],
        showCarList: false,
        noCar: false,
        isInitMap: false,
        carInfo: {},
        newPosition:'',
        changeOrg: false,
        treeOrgId: '',
        treeOrgName: '',
        isSearch: false,
        root: [{
          id:1,
          type: 0,
          label: '',
          orgId: ''
        }],
        rootNode:{},
        rootResolve:{}
      }
    },
    watch: {
      filterOrgText(val) {
        this.$refs.orgTree.filter(val);
      },
      filterCarText(val) {
        this.$refs.carTree.filter(val);
      }
    },
    // 计算处理
    computed: {},
    filters:{
      fmtAmt(val){
        if(!val){
          return 0
        }
        return val
      },
      fmtPosition(val){
        if(!val || val==={} || val===[] ){
          return '未在线'
        }
        return val
      },
      fmtOrgName(val){
        if(val.length > 14){
          return val.substring(0, 14) + '...'
        }
        return val
      }
    },
    // 异步生命周期
    async created() {
      this.getUserInfo()
      this.getPerms()
      // 创建挂载JS文件
      await autoLoad('https://webapi.amap.com/maps?v=1.4.13&key=956fa8426889423864f4840af45f1b25')
      this.timer = setInterval(() => {
        console.log('timer')
        if (this.needToGetData) {
          this.getData();
        }
      }, 10000);
      this.orderTimer = setInterval(() => {
        console.log('orderTimer')
        if (this.needToGetData) {
          this.getOrderInfo()
        }
      }, 60000);
    },
    mounted() {
      this.getData()
      this.getTree()
      this.getOrderInfo()
    },
    beforeDestroy() {
      this.clearTimer()
    },
    methods: {
      getData(){
        let params = {
          orgId: this.selectedCarOrgId
        }

        if (!this.isInitMap || this.changeOrg){
          this.isMask = true
        }

        this.request('api_admin_device_gpsByCircle', params).then(response => {
          this.carList = response
          if (!this.isInitMap){
            this.initMap();
            this.isInitMap = true;
          }else if (this.changeOrg){
            this.toChangeOrg();
            if(this.isSearch){  //如果是搜索引起的切换org，画面中心切换至搜索车辆
              // this.newMap.clearInfoWindow();
              console.log('if isSearch')
              this.newMap.setZoom(17);
              this.newMap.setCenter([this.carInfo.b0,this.carInfo.b1]);
              this.isSearch = false
            }
          }else{
            this.newMap.clearMap()
            this.setMarkers()
          }
          this.needToGetData = true;
          this.isMask = false
        }).catch((error)=>{
          this.isMask = false
          this.changeOrg = false
          this.isSearch = false
        })
      },
      // 初始化地图
      initMap() {
        const AMap = window.AMap
        const map = new AMap.Map('map-container', {
          resizeEnable: true,
          zoom: 14,
          center: [106.725929, 26.589121]
        })
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.MouseTool', 'AMap.PolyEditor', 'AMap.CircleEditor'],
          function () {
            const toolopt = {
              // 相对于地图容器左上角的偏移量，正数代表向右下偏移。默认为AMap.Pixel(10,10)
              offset: new AMap.Pixel(20, 20),
              position: 'LT',
              locationMarker: AMap.Marker({map: map})
            }
            map.addControl(new AMap.ToolBar(toolopt))
            map.addControl(new AMap.Scale())
          }
        )
        this.AMap = AMap;
        this.newMap = map;
        this.setMarkers()
        this.setFitView()
      },
      //设置点标记
      setMarkers(){
        const that = this
        console.log(this.carList)
        let tempCars = this.carList.slice(0,20)
        console.log(tempCars)
        //加载所有车辆信息
        for (const car of tempCars) {
          //如果车辆状态良好 位置信息 车牌等数据传输正常则允许显示标记信息
          if (car.status === 1 && car.b0 && car.b1 && car.plateNo){
            //设置点标记
            const marker = this.getCarMarker(this.AMap, this.newMap, car)
            const licenseMarker = this.getLicenseMarker(this.AMap, this.newMap, car)
            this.newMap.add(marker)
            this.newMap.add(licenseMarker)
            this.AMap.event.addListener(marker, 'click', function() {
              that.handleCarNodeClick(car)
            })
          }
        }
      },
      //获取点标记
      getCarMarker(AMap, map, item) {
        let t = this;
        return new AMap.Marker({
          map: map,
          title: item.plateNo,
          icon: t.getIcon(this.iconCar, 28, 51),
          angle: item.c,
          position: [item.b0, item.b1],
          offset: new AMap.Pixel(-12, -26)
//          label: {content: item.lincese, offset: new AMap.Pixel(-12, -26)}
        });
      },
      //创建点标记的图标
      getIcon(image, width, height) {
        let AMap = this.AMap;
        return new AMap.Icon({
          size: new AMap.Size(width, height),
          imageSize: new AMap.Size(width, height),
          image: image
        });
      },
      //创建标记点的实体属性
      getLicenseMarker(AMap, map, item) {

        let heightLicense = -60 + (Math.tan(item.c) * 6);
        let licenseWidth = 12;
        if (item.plateNo) {
          if (item.plateNo.length > 8) {
            licenseWidth = 0;
          } else if (item.plateNo.length === 8) {
            licenseWidth = 8;
          }
        }
        return new AMap.Marker({
          map: map,//要显示该marker的地图对象
          title: item.plateNo,//鼠标滑过点标记时的文字提示
          icon: this.getIcon(this.iconCarLicense, 90, 40),//点标记中显示的图标
          position: [item.b0, item.b1], //点标记在地图上显示的位置，默认为地图中心点
          offset: new AMap.Pixel(-42, heightLicense), //点标记显示位置偏移量
          label: {content: item.plateNo, offset: new AMap.Pixel(licenseWidth, 5)} //文本标注
        });
      },
      toChangeOrg(){
        console.log('changeOrg')
        try {
          this.newMap.clearMap()
          this.newMap.clearInfoWindow();
          this.newMap.setZoom(14);
          this.newMap.setCenter([106.725929, 26.589121]);
          this.setMarkers()
          this.setFitView()
        }
        catch (e) {
          this.changeOrg = false
        }
        this.changeOrg = false
      },
      setFitView(){
        this.newMap.setFitView();
        // var newCenter = this.newMap.setFitView();
        // newCenter.getCenter();
      },
      parseAddress(lon, lat) {
        if(!lon || !lat){
          this.newPosition = ''
          return
        }
        let endgdGsp = util.wgs84togcj02(lon, lat);
        let location = endgdGsp[0] + ',' + endgdGsp[1];
        if (location){
          axios.get('/v3/geocode/regeo?key=956fa8426889423864f4840af45f1b25&location=' + location + '&poitype=&radius=1000&extensions=base&batch=false&roadlevel=0').then((res) => {
            this.newPosition = res.data.regeocode.formatted_address
          }).catch((error) => {
          });
        }else{
          this.newPosition = ''
        }
      },
      closeRight(){
        this.clickCar = false
        this.carInfo = {}
        this.newPosition = ''
      },
      handleLeft() {
        this.clickLeft = !this.clickLeft
      },
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
        } else {
          if (perms.includes('POST /admin/position/orderList')) {
            this.listButton = true;
          }
        }
      },
      switchOrg(){
        // this.selectedCarOrgId = this.treeOrgId
        // this.selectedCarOrgName = this.treeOrgName
        // this.root[0].label = this.selectedCarOrgName
        // this.root[0].orgId = this.selectedCarOrgId
        // console.log(this.rootNode)
        // this.rootNode.childNodes = []
        // this.loadNode(this.rootNode,this.rootResolve)
        this.changeOrg = true;
        this.getData();
        // this.treeForm = false
      },
      searchCar(){
        let params ={
          orgId: this.$store.getters.orgId,
          plateNo: this.searchPlateNo
        }
        this.request('api_admin_position_queryCarByPlateNo', params).then(response => {
          this.searchCarList = response
          if (this.searchCarList.length === 0){
            this.noCar = true
          }else{
            this.noCar = false
          }
          this.showCarList = true
        })
      },
      cancelMask(){
        this.showCarList = false
      },
      getCarTrack(val){
        this.carTrackForm = true;
        this.needToGetData = false;
        let that = this;
        //这里element弹框有延迟问题，view组件未加载
        setTimeout(function () {
          that.$refs.carTrack.open(val);
        }, 100);
      },
      getOrderMap(val){
        this.orderMapForm = true;
        this.needToGetData = false;
        let that = this;
        //这里element弹框有延迟问题，view组件未加载
        setTimeout(function () {
          that.$refs.orderMap.open(val);
        }, 100);
      },
      doQuery(){
        this.queryTable.current = this.tableData.current
        this.getOrderInfo()
      },
      getOrderInfo() {
        this.request('api_admin_position_orderList', this.queryTable).then(response => {
          this.tableData = response
          for (let row of this.tableData.records){
            if (row.endAddr){
              axios.get('/v3/geocode/regeo?key=956fa8426889423864f4840af45f1b25&location=' + row.endAddr + '&poitype=&radius=1000&extensions=base&batch=false&roadlevel=0').then((res) => {
                this.$set(row, 'address', res.data.regeocode.formatted_address);
              }).catch((error) => {
                this.$set(row, 'address', '未知地址');
              });
            }else{
              this.$set(row, 'address', '未知地址');
            }
          }
        })
      },
      getTree() {
        this.request('orgTree', this.queryTree).then(response => {
          this.orgTree = response
        })
      },
      filterOrgNode(value, data) {
        if (!value) return true;
        return data.orgName.indexOf(value) !== -1;
      },
      filterCarNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleOrgNodeClick(data) {
        this.treeOrgId = data.orgId
        this.treeOrgName = data.orgName
      },
      handleCarNodeClick(car) {
        if(car.type === 1){
          this.selectedCarOrgId = car.orgId
          this.switchOrg()
        }else if(car.type === 2){
          if(!car.carId) return
          if(this.selectedCarOrgId !== car.orgId){
            this.selectedCarOrgId = car.orgId
            this.switchOrg()
          }
          setTimeout(()=>{
            this.newMap.setZoom(19);
            this.newMap.setCenter([car.b0, car.b1]);
          },1000)
        }
        if(car.status === 1){
          this.clickCar = true
          let params = {
            did: car.carId
          }
          this.request('api_admin_device_newestGpsAndOrder', params).then(response => {
            this.carInfo = response
            this.parseAddress(response.b0,response.b1)
          })
        }
      },
      loadNode(node, resolve){
        console.log('load')
        console.log(node);
        if(node.level === 0){
          this.rootNode = node
          this.rootResolve = resolve
          this.root[0].label = this.selectedCarOrgName
          this.root[0].orgId = this.selectedCarOrgId
          resolve(this.root)
        }else {
          //你好
          if(node.data.type === 0){
            this.getOrgNode(node, resolve)
          }
          if(node.data.type === 1){
            this.getCarNode(node, resolve)
          }
        }

      },
      getOrgNode(node, resolve){
        let params ={
          orgId: node.data.orgId
        }
        this.request('api_admin_position_queryOrgNode', params).then(response => {
          console.log(response)
            resolve(response)
        })
          .catch(error => {})
      },
      getCarNode(node, resolve){
        let params ={
          orgId: node.data.orgId
        }
        this.request('api_admin_position_queryCarNode', params).then(response => {
          for(let o of response){
            o.isLeaf = true
          }
          resolve(response)
        })
          .catch(error => {})
      },
      clickCarList(car){
        let that = this
        this.showCarList = false
        this.clickCar = true
        let params = {
          did: car.carId
        }
        console.log('car!!!!!!!!')
        console.log(car)
        this.request('api_admin_device_newestGpsAndOrder', params).then(response => {
          this.carInfo = response
          this.parseAddress(response.b0,response.b1)

          if(car.orgId === this.selectedCarOrgId && this.carInfo.b0 && this.carInfo.b1){
            this.newMap.clearInfoWindow();
            this.newMap.setZoom(17);
            this.newMap.setCenter([this.carInfo.b0,this.carInfo.b1]);
          }else if (car.orgId !== this.selectedCarOrgId && this.carInfo.b0 && this.carInfo.b1){
            this.selectedCarOrgId = car.orgId
            // this.selectedCarOrgName = car.orgName
            this.carTree.children = []
            this.changeOrg = true;
            this.isSearch = true;
            this.getData();
          }else{  //如果没有定位信息

          }
        })
      },
      getUserInfo() {
        this.queryOrg.orgId = this.$store.getters.orgId
        this.queryTree.orgId = this.$store.getters.orgId
        this.selectedCarOrgId = this.$store.getters.orgId
        this.selectedCarOrgName = this.$store.getters.orgName
        this.queryTable.orgId = this.$store.getters.orgId

      },
      closeCarTrack(){
        this.carTrackForm = false
        this.needToGetData = true
      },
      closeOrderMap(){
        this.orderMapForm = false
        this.needToGetData = true
      },
      clearTimer(){
        clearInterval(this.timer)
        clearInterval(this.orderTimer)
      }
    }
  }
</script>

<style scoped>
  .container{
    display: flex;
    flex-direction: column;
  }
  .monitor {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
  }

  #map-container {
    border-radius: 0.375rem;
    flex-shrink: 1;
    width: 100%;
    position: relative;
  }

  .left-button {
    position: absolute;
    left: -5px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 100;
    cursor: pointer;
  }

  .left-button-active{
    left: 295px;
  }

  .map-active {
    flex-shrink: 0 !important;
    width: calc(100% + 300px);
    /*width: 220%;*/
    left: -300px;
  }

  .leftMenu-active {
    left: -300px !important;
    z-index: 999;
    background-color: white;
  }

  .monitor-left {
    flex-shrink: 0;
    width: 300px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 0 0.375rem 0.375rem 0;
    position: relative;
    transition: .6s;
    left: 0;
    border-right: 1px solid #f0f0f0;
    box-shadow: 3px 2px 10px #f0f0f0;
  }
  .select-org{
    display: flex;
    flex-direction: row;
    background-color: #f9f9f9;
    padding-top: 20px;
    padding-bottom: 20px;
    box-shadow: 3px 2px 2px #f0f0f0;
  }
  .carTree{
    margin-top: 15px;
    width: 300px;
  }
  .tree{
    width: 300px;
    height: 550px;
    overflow-y: auto;
    /*overflow-x: auto;*/
  }
  .custom-tree-node {
    align-items: center;
    justify-content: space-between;
    font-size: 0.95rem;
    color: #777777;
    letter-spacing: 0.01rem;
    padding-right: 8px;
  }
  .car-node{
    height: 4rem;
  }
  .mapSearch {
    position: absolute;
    z-index: 10;
    top: 1.6rem;
    left: 40%;
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
  }
  .group-bnt {
    background: #fff;
    box-shadow: 0px 4px 2px 0px rgba(177, 200, 255, 0.1);
    border-radius: 6px;
    padding: 0 5px;
    width: 400px;
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .mapSearch-result{
    z-index: 10;
    background-color: #FFFFFF;
    width: 400px;
    max-height: 300px;
    overflow-x: auto;
    border: 1px solid #e3e3e3;
  }
  .result-item{
    border-bottom: 1px solid #e3e3e3;
    padding: 0.3rem 0.8rem;
    font-size: 0.6rem;
    color: #777777;
    letter-spacing: 0.02rem;
  }
  .result-item>div{
    margin-top: 0.4rem;
  }
  .map-mask{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 9;
    background-color: #555555;
    opacity:0.4;
  }
  .car-info {
    margin-top: 40px;
    margin-bottom:50px;
  }
  .choose-car{
    position: absolute;
    transition: .6s;
    width: 20.625rem;
    padding: 1.813rem 1.875rem 0 1.875rem;
    background-color: #ffffff;
    box-shadow: 0rem 0.313rem 0.75rem 0rem rgba(177, 200, 255, 0.2);
    border-radius: 0.375rem;
    height: 100%;
    z-index: 0;
    display: flex;
    flex-direction: column;
  }
  .choose-car-active{
    right: 0!important;
    z-index: 200;
    background-color: white;
  }
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
  .car-type{
    margin-top: 0.5rem;
    color: #7f7f7f;
    font-weight: bold;
    letter-spacing: 0.1rem;
  }
  .info-top {
    padding-right: 20px;
    padding-bottom: 10px;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
  }
  .top-close {
    position: absolute;
    right: 0;
    top: 5px;
    cursor: pointer;
  }
  .plate-number{
    font-size: 20px;
    font-weight: bold;
  }
  .title-row{
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .shuxian {
    width: 0.288rem;
    height: 1.2rem;
    background-color: #666666;
    margin-right: 0.625rem;
  }
  .title-name{
    font-weight: bolder;
    font-size: 18px;
  }
  .carinfo-row {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    color: #5f5f5f;
    letter-spacing: 0.05rem;
    font-size: 0.9rem;
  }
  .info-title{
    width: 6rem;
    margin-right: 5px;
  }
  .info-info{
    width: 10rem;
  }
  .license-image {
    width: 4rem;
    height: 4rem;;
    border: 1px solid #99a9bf;
    border-radius: 50%;
    margin-right: 7px;
  }
  .car-info-button{
    display: flex;
    flex-direction: row;
    margin-top: 50px;
  }
  .map-top-right {
    position: absolute;
    z-index: 199;
    top: 1.6rem;
    right: 1rem;
  }

  .fullcreen {
    width: 54px;
    height: 54px;
    margin-bottom: 1rem;
    background-image: url('../../assets/carPosition/monitor_fullscreen_nor.png');
  }
  .fullcreen:hover {
    background-image: url('../../assets/carPosition/monitor_fullscreen_sel.png');
    cursor: pointer;
  }
  .unfullcreen {
    width: 54px;
    height: 54px;
    margin-bottom: 1rem;
    background-image: url('../../assets/carPosition/monitor_tuichu_nor.png');
  }
  .unfullcreen:hover {
    background-image: url('../../assets/carPosition/monitor_tuichu_sel.png');
    cursor: pointer;
  }
  #monitor .amap-marker-label {
    border: none;
    background-color: transparent;
    color: white;
  }
  .table{
    border-top: 0.01rem solid #e6e6e6;
    padding: 1rem 1rem 0rem 1rem;
    background-color: #f9f9f9;
  }
  .el-table{
    box-shadow: 3px 2px 3px #888888;
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 0.8;
    z-index: 500;
    display: flex;
    justify-content: center;
  }
  .loading {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .loading>img {
    position: relative;
    top: -50px;
    width: 100px;
    height: 100px;
  }
  .loading-text {
    position: relative;
    top: -40px;
    text-align: center;
    color: black;
    font-size: 16px;
  }

</style>
