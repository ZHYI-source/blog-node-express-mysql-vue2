<template>
  <section>
    <lk-view-header @back="$emit('close')" :content="isAdd?'添加分类':'修改分类'"/>
    <section class="lk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">
        <lk-get-row>
          <el-form-item label="站点名称" prop="name">
            <el-input v-model="form.name" size="mini" class="input-one" clearable placeholder="请输入站点名称"></el-input>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="站点头像" prop="img">
            <el-input placeholder="请输入图片地址"
                      clearable
                      v-model="form.avatar" size="mini" style="width: 610px;"></el-input>
            <el-upload
              class="avatar-uploader"
              action="/zy-server/upload/v1"
              :show-file-list="false"
              :on-success="handleAvatarSuccessLicenseUrl"
              :before-upload="beforeAvatarUpload">
              <el-button size="mini" icon="el-icon-upload2" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </lk-get-row>
        <lk-get-row v-if="form.avatar">
          <el-form-item>
            <el-image
              style="width: 100px; height: 100px;border-radius: 5px"
              :src="form.avatar"
              :key="commonKey"
              :preview-src-list="[form.avatar]">
            </el-image>
          </el-form-item>
        </lk-get-row>

        <lk-get-row>
          <el-form-item label="站点标语" prop="slogan">
            <el-input type="textarea" v-model="form.slogan" :autosize="{ minRows: 3}"
                      style="width: 610px;" clearable placeholder="请输入站点标语"></el-input>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="站点通知" prop="notice">
            <el-input type="textarea" v-model="form.notice" :autosize="{ minRows: 3}"
                      style="width: 610px;" clearable placeholder="请输入站点通知"></el-input>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="站点描述" prop="psc">
            <el-input type="textarea" v-model="form.psc" :autosize="{ minRows: 3}"
                      style="width: 610px;" clearable placeholder="请输入站点描述"></el-input>
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
  name: "get-web-site",
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
      commonKey: 0,
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
          let api = this.isAdd ? 'api_blog_web_site_info_create' : 'api_blog_web_site_info_update'
          this.request(api, this.form).then(res => {
            if (res.error) {
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
      this.form.avatar = res.url;
      this.commonKey += 1
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
