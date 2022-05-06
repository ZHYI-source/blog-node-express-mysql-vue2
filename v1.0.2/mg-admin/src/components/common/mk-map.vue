<template>
  <section>
    <el-button style="margin: 15px" size="mini" type="danger" @click="startCar">开始</el-button>
    <el-button style="margin: 15px" size="mini" type="danger" @click="pauseMove">暂停</el-button>
    <el-button style="margin: 15px" size="mini" type="info" @click="resumeMove">继续</el-button>
    <div id="container"></div>
  </section>
</template>

<script>
//html引入腾讯地图
export default {
  name: "mk-map",
  data() {
    return {
      map: null,
      path: [
        new TMap.LatLng(39.98481500648338, 116.30571126937866),
        new TMap.LatLng(39.982266575222155, 116.30596876144409),
        new TMap.LatLng(39.982348784165886, 116.3111400604248),
        new TMap.LatLng(39.978813710266024, 116.3111400604248),
        new TMap.LatLng(39.978813710266024, 116.31699800491333),
        new TMap.LatLng(39.988813710266024, 116.31699800491333),
        new TMap.LatLng(39.989813710266024, 116.31699800491333),
        new TMap.LatLng(39.990813710266024, 116.31699800491333),
        new TMap.LatLng(39.98481500648338, 116.30571126937866),
      ],
      polylineLayer: null,
      marker: null
    }
  },
  created() {
  },
  mounted() {
    this.initMap();
  },
  methods: {
    pauseMove() {
      this.marker.pauseMove()
    },
    resumeMove() {
      this.marker.resumeMove()
    },
    startCar() {
      // 使用marker 移动接口， https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocMarker
      //调用moveAlong动画 执行标记点动画开始
      this.marker.moveAlong(
        {
          car: {
            path: this.path,//移动路径的坐标串
            // duration:8000,//完成移动所需的时间，单位：毫秒
            speed: 250, //speed为指定速度，正整数，单位：千米/小时
          },
        },
        {
          autoRotation: true,//自动旋转
        }
      );
      //监听事件名
      this.marker.on('moving', (e) => {
        var passedLatLngs = e.car && e.car.passedLatLngs;
        if (passedLatLngs) {
          // 使用路线擦除接口 eraseTo, https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector
          this.polylineLayer.eraseTo(
            'erasePath',
            passedLatLngs.length - 1,
            passedLatLngs[passedLatLngs.length - 1]
          );
        }
      });

    },
    initMap() {
      //设置地图中心点
      var center = new TMap.LatLng(39.984104, 116.307503);
      // 初始化地图
      var map = new TMap.Map('container', {
        zoom: 15,
        center: center,
        // baseMap: {  // 设置卫星地图
        //   type: 'satellite'
        // }
      });
      this.polylineLayer = new TMap.MultiPolyline({
        map, // 绘制到目标地图
        // 折线样式定义
        styles: {
          style_blue: new TMap.PolylineStyle({
            color: '#ff8d00', // 线填充色
            width: 4, // 折线宽度
            borderWidth: 2, // 边线宽度
            borderColor: '#FFF', // 边线颜色
            lineCap: 'round', // 线端头方式
            eraseColor: 'rgb(172,172,172)',//擦除路径的颜色
          }),
        },
        geometries: [
          {
            id: 'erasePath',
            styleId: 'style_blue',
            paths: this.path,
          },
        ],
      });
      this.marker = new TMap.MultiMarker({
        map,
        styles: {
          'car-down': new TMap.MarkerStyle({
            width: 40,
            height: 40,
            anchor: {
              x: 20,
              y: 20,
            },
            faceTo: 'map',
            rotate: 180,
            src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/car.png',
          }),
          start: new TMap.MarkerStyle({
            width: 25,
            height: 35,
            anchor: {x: 16, y: 32},
            src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png',
          }),
          end: new TMap.MarkerStyle({
            width: 25,
            height: 35,
            anchor: {x: 16, y: 32},
            src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png',
          }),
        },
        geometries: [
          {
            id: 'car',
            styleId: 'car-down',
            position: new TMap.LatLng(39.98481500648338, 116.30571126937866),
          },
          {
            id: 'start',
            styleId: 'start',
            position: new TMap.LatLng(39.98481500648338, 116.30571126937866),
          },
          {
            id: 'end',
            styleId: 'end',
            position: new TMap.LatLng(39.978813710266024, 116.31699800491333),
          },
        ],
      });
    }
  }
}
</script>

<style scoped>
#container {
  width: 100%;
  height: calc(100vh - 280px);
  border-radius: 10px;
  overflow: hidden;
}
</style>
