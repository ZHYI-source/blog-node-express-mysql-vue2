<template>
  <section>
    <lk-view-header @back="$emit('close')" :content="isAdd?'添加分类':'修改分类'"/>
    <section class="lk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">
        <lk-get-row>
          <el-form-item label="分类名称" prop="className">
            <el-input v-model="form.className" size="mini" class="input-one" clearable placeholder="请输入分类名称"></el-input>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="分类值" prop="classValue">
            <el-input v-model.number="form.classValue" size="mini" class="input-one" clearable placeholder="请输入分类值"></el-input>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="页面路径" prop="path">
            <el-input v-model="form.path" size="mini" class="input-one" clearable placeholder="例如：/category/"></el-input>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="路径参数" prop="query">
            <el-input v-model.number="form.query" size="mini" class="input-one" clearable placeholder="例如：vue.js"></el-input>
          </el-form-item>
        </lk-get-row>
        <el-divider/>
        <lk-get-button @save="save" @close="close(true)"/>
      </el-form>
    </section>
  </section>

</template>

<script>
import LkGetRow from "@/components/common/lk-get-row";
import LkGetButton from "@/components/common/lk-get-button";
import LkBackList from "@/components/common/lk-back-list";
import LkEdit from "@/components/common/lk-edit";
import Tinymce from "@/components/Tinymce";
import LkImgList from "@/components/common/lk-img-list";

export default {
  name: "get-article-class",
  components: {LkImgList, Tinymce, LkEdit, LkBackList, LkGetButton, LkGetRow},
  props: {
    updateData: {
      type: Object,
      default() {
        return {};
      }
    },
    routerId: {
      type: [String, Number],
      default() {
        return undefined;
      }
    }
  },
  created() {
    console.log(this.updateData)
    if (this.updateData && this.updateData.id) {
      this.form = this.updateData
      this.isAdd = false
    }
  },
  data() {
    return {
      commonKey:0,
      form: {},
      isAdd: true,
      rules: {
        className: [{required: true, message: '请输入文章分类名称', trigger: 'blur'},],
        classValue: [{required: true, message: '请输入文章分类值', trigger: 'blur'},],
        path: [{required: true, message: '请输入页面路径', trigger: 'blur'},],
        query: [{required: true, message: '请输入路径参数', trigger: 'blur'},],
      }
    }
  },
  methods: {
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          let api = this.isAdd ? 'api_blog_article_class_create' : 'api_blog_article_class_update'
          this.request(api, this.form).then(res => {
            if (res.error){
              this.toast.error(res.errMsg)
              return
            }
            this.toast.success(res.errMsg)
            this.$emit('close');
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleAvatarSuccessLicenseUrl(res, file) {
      console.log(res)
      this.form.img = res.url;
      this.commonKey+=1
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
        this.$message.error('请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片');
        return
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    close(show) {
      if (show) {
        this.toast.confirmSave().then(() => {
          this.$emit('close');
        });
      } else {
        this.$emit('close');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 .avatar {
   border-radius: 8px;
 }
</style>
