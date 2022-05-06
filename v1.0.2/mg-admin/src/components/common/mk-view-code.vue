<template>
  <div v-html="codes" v-highlight></div>
</template>

<script>
import hljs from "highlight.js"
// https://highlightjs.org/static/demo/
import 'highlight.js/styles/base16/atelier-forest-light.css'
export default {
  name: "mk-view-code",
  // 定义自定义指令 v-highlight 代码高亮
  directives: {
    highlight: {
      update(el) {
        let blocks = el.querySelectorAll("pre code");
        blocks.forEach((block) => {
          hljs.highlightBlock(block);
        });
      },
    },
  },
  props:{
    codes:{
      type:String,
      default(){
        return ''
      }
    }
  }
}
</script>

<style scoped>

</style>
