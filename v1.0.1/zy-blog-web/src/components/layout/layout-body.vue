<template>
  <div id="layout-body">
    <router-view></router-view>
    <back-top></back-top>
    <div class="play-miusc" :style="{left:show?0+'px':-70+'px'}">
      <aplayer :audio="audio" :showLrc="false"  :shuffle="true"   mini :lrcType="1"/>
      <div class="play-line" @click="show=!show"></div>
    </div>
  </div>
</template>
<script>
import backTop from '@/components/back-top'
import {getSiteMusic} from "../../api/web-blog";

export default {
  name: "layout-body",
  data() {
    return {
      audio: [],
      minHeight: 600,
      show: false
    }
  },
  components: {backTop},
  methods: {
    getLrcData() {
      getSiteMusic().then(res => {
        this.audio = res.records || [{
          name: "Lawrence",
          artist: " Lawrence",
          url: 'http://f3.htqyy.com/play9/900/mp3/6',
          cover: '', // prettier-ignore
          lrc: "",
        },]
      })
    },
    getTop() {
      let timer = setInterval(() => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let speed = Math.ceil(scrollTop / 5)
        document.documentElement.scrollTop = scrollTop - speed
        if (scrollTop === 0) {
          clearInterval(timer)
        }
      }, 20)
    }
  },
  mounted() {
    this.getTop()
    this.getLrcData()
  }
}
</script>

<style lang="less" scoped>
#layout-body {
  /* header = 80px */
  min-height: -moz-calc(100vh - 80px);
  min-height: -webkit-calc(100vh - 80px);
  min-height: calc(100vh - 80px);

  .play-miusc {
    display: flex;
    justify-content: left;
    align-items: center;
    position: fixed;
    left: -70px;
    bottom: 67px;
    transition: all .2s linear;
    z-index: 10001 !important;

    .play-line {
      height: 66px;
      width: 20px;
      background-color: #d81f07;
      margin-left: -10px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}

</style>
