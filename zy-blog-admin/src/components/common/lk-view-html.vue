<template>
  <section class="view-html" :style="{width:elWidth + 'px',height:elHeight + 'px'}">
    <div class="content" v-html="content"></div>
  </section>
</template>

<script>
export default {
  name: "lk-view-html",
  props:{
    content:{
      type:String,
      default(){
        return ''
      }
    },
    elWidth:{
      type:[Number,String],
      default(){
        return ''
      }
    },
    elHeight:{
      type:[Number,String],
      default(){
        return '100'
      }
    }
  },
  data(){
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .view-html {
    width: 100%;
    overflow: auto;
  }
</style>
