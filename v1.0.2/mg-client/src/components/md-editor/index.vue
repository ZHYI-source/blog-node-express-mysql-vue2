<template>
  <section class="md" style="width: 100%;height: 100%">
    <v-md-editor
        v-model="content"
        ref="preview"
        :mode="mode"
        :placeholder="placeholder"
        :left-toolbar=toolbar.leftToolbar
        :right-toolbar="toolbar.rightToolbar"
        :disabled-menus="toolbar.disabledMenus"
        @change="handleChange"
        @image-click="handleClickImage"
        @upload-image="handleUploadImage"
        @copy-code-success="handleCopyCodeSuccess"
    ></v-md-editor>
  </section>
</template>

<script>
/**
 * @author zhouyi
 * @date 2022/4/23 21:18
 * @dec: markdown 编辑器
 * @url: https://ckang1229.gitee.io/vue-markdown-editor/zh/#%E4%BB%8B%E7%BB%8D
 */
import toolbar from './toolbar'
import './plugins'

export default {
  name: "mk-md-editor",
  props: {
    height: {
      type: Number,
      default() {
        return 400
      }
    },
    placeholder: {
      type: String,
      default() {
        return '请输入内容'
      }
    },
    mode: {
      type: String,
      default() {
        //可选值：edit(纯编辑模式) editable(编辑与预览模式) preview(纯预览模式)。
        return 'editable'
      }
    },
    mdContent: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      toolbar,
      content: ''
    }
  },
  watch: {
    'mdContent': {
      immediate: true,
      handler: function (val) {
        this.content = val
      }
    },
  },
  mounted() {

  },
  model: {
    prop: 'mdContent',
    event: 'getValue'
  },
  methods: {
    handleCopyCodeSuccess(code) {
      let oInput = document.createElement('input')
      oInput.value = code
      document.body.appendChild(oInput)
      oInput.select()
      document.execCommand("Copy");
      oInput.remove()
      // this.$toast.success('复制成功')
      this.$message({
        message: '复制成功',
        type: 'success'
      });
    },
    handleUploadImage(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      console.log(files);
      // 此处只做示例
      insertImage({
        url: '',
        desc: '七龙珠',
        // width: 'auto',
        // height: 'auto',
      });
    },
    handleClickImage(images, currentIndex) {
      window.open(images[currentIndex])
    },
    handleChange(val) {
      this.$emit('getValue', val)
    }
  }
}
</script>

<style lang="less">
.md .vuepress-markdown-body {
  font-family: miranafont, "Hiragino Sans GB", STXihei, "Microsoft YaHei", SimSun, sans-serif;
  font-size: 15px;
  padding: 5px 10px;
  position: relative;

  h1, h2, h3, h4, h5, h6 {
    //padding-left: 10px;
    &:hover {
      color: #ff6d6d;
      transition: all .1s linear;
    }
  }

  a {
    color: #69a7d2;
    text-decoration: none;

    &:hover {
      color: #d82e16;
    }
  }

}

</style>
