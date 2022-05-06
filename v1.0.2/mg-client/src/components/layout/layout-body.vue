<template>
  <div id="layout-body" >
    <router-view></router-view>
    <MkAplayer/>
    <back-top></back-top>
  </div>
</template>

<script>
import backTop from '@/components/back-top'
import MkAplayer from "../mk-aplayer";

export default {
  name: "layout-body",
  data() {
    return {
      show:true,
      minHeight: 600
    }
  },
  components: {MkAplayer, backTop},
  methods:{}
}
</script>

<style scoped>
#layout-body {
  /* header = 80px */
  min-height: -moz-calc(100vh - 80px);
  min-height: -webkit-calc(100vh - 80px);
  min-height: calc(100vh - 80px);
  /*使也页面滚动更顺滑*/
  scroll-behavior: smooth;
}
  /*overflow: hidden;*/

/*****/
@media (max-width: 800px) {
  #layout-body {
    padding-top: 60px;
  }
}

</style>
