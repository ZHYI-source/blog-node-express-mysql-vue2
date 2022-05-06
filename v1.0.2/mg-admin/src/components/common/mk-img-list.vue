<template>
  <section class="gx-imgs" v-if="urls&&urls.length>0">
    <div v-for="(url,key) in imgUrls" class="box-item">
      <el-image :z-index="99999" class="img"
                :style="imgStyle"
                fit="cover"
                :src="url"
                :key="'img_'+key"
                :preview-src-list="bigUrls">
      </el-image>
      <span class="el-icon-circle-close" v-if="showClose" @click="$emit('deleteImg',key)"></span>
    </div>

  </section>
</template>

<script>

export default {
  name: "mk-img-list",
  props: {
    urls: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    showClose: {
      type: Boolean,
      default() {
        return false;
      }
    },
    imgStyle: {
      type: [Object, String],
      default() {
        return '';
      }
    },
    fileServer: {
      type: String,
      default() {
        return  '';
      }
    }

  },
  computed: {
    imgUrls() {
      let urls = [];
      for (let url of this.urls) {
        urls.push(url);
      }
      return urls;
    },
    bigUrls() {
      let urls = [];
      for (let url of this.imgUrls) {
        urls.push(url)
      }
      return urls;
    }
  },
  data() {
    return {};
  }
}
</script>

<style scoped lang="scss">
.gx-imgs {
  display: flex;
  flex-wrap: wrap;
  .box-item {
    position: relative;
    .el-icon-circle-close {
      position: absolute;
      top: -5px;
      right: -5px;
      color: red;
      font-size: 16px;
      &:hover {
        cursor: pointer;

      }
    }

  }
  .img {
    margin-right: 10px;
    margin-top: 10px;
    width: 80px;
    height: 70px;
    border: 1px solid #f0f3f5;
    border-radius: 5px;
  }
}
</style>
