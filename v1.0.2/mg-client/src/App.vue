<template>
  <div id="app" v-cloak :style="{'filter':websiteInfo.globalStyle}">
    <loading></loading>
    <layout-header></layout-header>
    <layout-body></layout-body>
    <layout-footer></layout-footer>
  </div>
</template>
<script>
import layoutHeader from '@/components/layout/layout-header'
import layoutBody from '@/components/layout/layout-body'
import layoutFooter from '@/components/layout/layout-footer'
import Loading from '@/components/loading'

export default {
  name: "app",
  components: {
    layoutHeader,
    layoutBody,
    layoutFooter,
    Loading
  },
  data() {
    return {
      websiteInfo: {}
    }
  },
  created() {
    this.getWebSiteInfo()
  },
  methods: {
    getWebSiteInfo() {
      this.$store.dispatch('getSiteInfo').then(data => {
        this.websiteInfo = data
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>
<style lang="less">

#app {
  font-size: 17px;
  color: #6f6f6f;

  .grid-line {
    background-image: linear-gradient(90deg,
    rgba(196, 198, 198, 0.15) 10%,
    rgba(0, 0, 0, 0) 10%),
    linear-gradient(rgba(205, 205, 205, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
    background-size: 10px 10px;
    box-sizing: border-box;
    padding-left: 5px;
    padding-right: 5px;
    border: 1px solid rgba(232, 232, 232, 0.15);
  }

}
</style>
