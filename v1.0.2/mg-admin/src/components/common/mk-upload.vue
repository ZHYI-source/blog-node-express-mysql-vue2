<template>
  <section>
    <el-upload
      class="upload-demo"
      :action="action"
      :show-file-list="false"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :headers=headers
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过20M</div>
    </el-upload>
    <el-image
      v-if="tempImg"
      style="width: 100px; height: 100px;border-radius: 5px"
      :src="tempImg"
      :preview-src-list="[tempImg]"
      fit="fit"></el-image>
  </section>
</template>

<script>
import util from "@/libs/util";
import MkImgList from "@/components/common/mk-img-list";

export default {
  name: "mk-upload",
  components: {MkImgList},
  props: {
    img: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      action: `${process.env.VUE_APP_API}/api/private/upload`,
      headers: {
        authorization: util.cookies.get('token',)
      },
      tempImg: '',
      fileList: []
    };
  },
  watch: {
    'img': {
      immediate: true,
      handler: function (val) {
        // //回填
        this.tempImg = val
      }
    },
  },
  model: {
    prop: 'img',
    event: 'getImg'
  },
  mounted() {
    this.headers.authorization = util.cookies.get('token',)
  },
  methods: {
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/webp' || file.type === 'image/jpeg')) {
        this.$message.error('请上传格式为image/png, image/gif, image/jpg, image/jpeg,image/webp的图片');
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return isLt2M;
    },
    handleSuccess(res, file) {
      this.tempImg = res.data.url
      this.$emit('getImg', res.data.url)
      this.$toast.success(res.meta.msg)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
}
</script>

<style scoped>

</style>
