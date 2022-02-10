<template>
  <div class="view-row">
    <div class="row-title" :style="{'width':labelWidth?labelWidth+'px':60+'px'}">{{title}}</div>
    {{ title?'：':'' }}
    <div class="row-value"><slot/></div>
  </div>
</template>

<script>
export default {
  name: "lk-view-item",
  props:{
    title:{
      type:[String,Number],
      default:''
    },
    labelWidth:{
      type:String,
      default:'60'
    }
  }
}
</script>

<style lang="scss" scoped>
.view-row {
  min-width: 200px;
  display: flex;
  flex: 1;
  justify-content: flex-start;
  //margin-right: 65px;
  color: #0e0f17;
  font-size: 12px;
  font-weight: 400;
  padding-right: 10px;
  position: relative;
  .row-title {
    //text-align-last: justify;
    //text-justify: inter-ideograph;
    font-size: 14px;
    color: #606266;
    text-align: right;
    font-weight: 700;
  }
  .row-value {
    min-width: 275px;
    padding-left: 5px;
    font-size: 14px;
    font-weight: 400;
    word-break: break-all;
    color: #606266;
  }
  .tagBox {
    margin-top: -5px;
  }
}
</style>
