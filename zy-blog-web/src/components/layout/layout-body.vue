<template>
  <div id="layout-body">
    <router-view></router-view>
    <back-top></back-top>
  </div>
</template>

<script>
import backTop from '@/components/back-top'

export default {
  name: "layout-body",
  data() {
    return {
      minHeight: 600
    }
  },
  components: {backTop},
  methods: {
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
  }
}
</script>

<style scoped>
#layout-body {
  /* header = 80px */
  min-height: -moz-calc(100vh - 80px);
  min-height: -webkit-calc(100vh - 80px);
  min-height: calc(100vh - 80px);
}
</style>
