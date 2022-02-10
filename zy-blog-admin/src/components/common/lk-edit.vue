<template>
  <section class="edit">
    <div ref="editor" style="text-align:left;"></div>
  </section>
</template>

<script>
import  E from  "wangeditor"
export default {
  name: "lk-edit",
  data(){
    return {
      editor:null,
      updateList:{}
    }
  },
  mounted(){
    this.createEditor()
  },
  model: {
    prop: 'content',
    event: 'change'
  },
  props: {
    content: String
  },
  methods: {
    createEditor() {
      this.editor = new E(this.$refs.editor)
      this.editor.config.onchange = (html) => {
        console.log('s',html)
        this.$emit('change',html)
        this.updateList.content = html
      }
      this.editor.config.uploadImgServer = '/taxi-file/fileserver/upload/v2'
      this.editor.config.uploadImgMaxLength = 1
      this.editor.config.uploadImgHooks = {
        before: function (xhr, editor, files) {
        },
        success: function (xhr, editor, result) {
          console.log(xhr)
          console.log(result)
        },
        fail: function (xhr, editor, result) {
        },
        error: function (xhr, editor) {
          console.log(xhr)
        },
        timeout: function (xhr, editor) {
        },
        customInsert: function (insertImg, result, editor) {

          var url = result[0].url
          insertImg(url)
        }
      }
      this.editor.create()
      // this.editor.txt.html(this.updateList.content)
      // this.mark = false
    },
  }
}
</script>

<style scoped>
.edit {
  z-index: 2;
}
</style>
