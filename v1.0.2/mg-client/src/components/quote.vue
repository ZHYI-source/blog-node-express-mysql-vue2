<template>
    <div class="quote"><i class="iconfont icon-wodeshuiguoicon-"></i><slot></slot></div>
</template>

<script>
    export default {
        name: "quote"
    }
</script>

<style scoped lang="less">
.quote{
    border-left: 3px solid #ff6d6d;
    background-color: #FBFBFB;
    padding: 15px 20px;
    border-radius: 3px;
  .icon-wodeshuiguoicon- {
    padding-right: 10px;
    color:#ff6d6d ;
  }
}
</style>
