<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
//  import Watermark from '@/libs/watermark';
export default {
  name: 'App',
  data() {
    return {
      userName: ''
    }
  },
  mounted() {
    this.userName = this.$store.getters.userNickName;
//    Watermark.set(this.userName);
  }
}
</script>
<style>
/*勿删！！！*/
.v-dialog-container .lk-dio .v-dialog-modal .v-dialog-body {
  padding: 0 !important;
  z-index: 99999!important;
}
</style>
