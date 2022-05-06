<template>
  <img v-if="show" src="https://api.btstu.cn/netcard/api.php" style="position: absolute;bottom: 0px;right: 0px;">
</template>

<script>
export default {
  name: "mk-ip-card",
  data(){
    return {
      show:true
    }
  },
  created() {
    this.showCard()
  },
  methods:{
    showCard(){
      setTimeout(()=>{
        this.show=false
      },15000)
    }
  }
}
</script>

<style scoped>

</style>
