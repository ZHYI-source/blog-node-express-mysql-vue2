<template>
  <h1 class="section-title" @click="$emit('click')">
    <slot></slot>
    <i class="iconfont" :class="icon"></i></h1>
</template>

<script>
export default {
  name: "section-title",
  props: {
    icon: {
      type: String,
      default() {
        return ""
      }
    }
  }
}
</script>

<style scoped lang="less">
h1.section-title {
  color: #757575;
  font-size: 16px;
  font-weight: 400;
  padding-bottom: 15px;
  line-height: 32px;
  border-bottom: 1px dashed #ECECEC;

  .icon-qiehuan {
    padding-top: 5px;
  }
  &:hover{
    cursor: pointer;
  }
}
</style>
