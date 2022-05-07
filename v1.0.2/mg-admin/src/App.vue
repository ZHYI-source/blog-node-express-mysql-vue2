<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'app',
  watch: {
    '$i18n.locale': 'i18nHandle'
  },
  created () {
    this.i18nHandle(this.$i18n.locale)
  },
  methods: {
    i18nHandle (val, oldVal) {
      util.cookies.set('lang', val)
      document.querySelector('html').setAttribute('lang', val)
    }
  }
}
</script>

<style lang="scss">
/*勿删！！！*/
.v-dialog-container .lk-dio .v-dialog-modal .v-dialog-body {
  padding: 0 !important;
  //z-index: 99999!important;
}

.v-dropdown-container,.el-popover,.el-color-picker__panel {
  z-index: 100000!important;
}
//.el-message{
//  z-index: 110000!important;
//}
//.el-popover .el-popper {
//  z-index: 120000!important;
//}
.el-image-viewer__wrapper,.el-message{
  z-index: 12000!important;
}
@import '~@/assets/style/public-class.scss';
</style>
