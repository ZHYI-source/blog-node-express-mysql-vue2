<template>
  <section>
    <lk-view-header @back="$emit('close')" :content="isAdd?'添加用户':'修改用户'"/>
    <section class="lk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="140px">
        <el-row class="row-title">基本信息</el-row>
        <lk-get-row>
          <el-form-item label="用户账号" prop="username">
            <el-input clearable v-model.trim="form.username" class="input-one" size="mini" placeholder="请输入用户账号"
                      show-word-limit maxlength="20"/>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="用户密码" prop="password">
            <el-input clearable v-model.trim="form.password" class="input-one" size="mini" placeholder="请输入用户密码"
                      show-word-limit maxlength="20"/>
          </el-form-item>
        </lk-get-row>


<!--        <el-row class="row-title">其他材料</el-row>-->
<!--        <lk-get-row>-->
<!--          <el-form-item label="材料图片" prop="otherUrl">-->
<!--            <lk-img-list :urls="otherUrls" show-close @deleteImg="deleteImg"></lk-img-list>-->
<!--            <el-upload-->
<!--              class="avatar-uploader"-->
<!--              multiple-->
<!--              action="/taxi-file/fileserver/upload/v2"-->
<!--              :show-file-list="false"-->
<!--              :on-success="handleAvatarSuccessOtherUrl"-->
<!--              :before-upload="beforeAvatarUpload">-->
<!--              <el-button size="mini" type="primary">点击上传</el-button>-->
<!--            </el-upload>-->
<!--          </el-form-item>-->
<!--        </lk-get-row>-->

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
  import LkImgList from "@/components/common/lk-img-list";

  export default {
    name: "get-user-info",
    components: {LkImgList, LkEdit, LkBackList, LkGetButton, LkGetRow},
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
      if (this.updateData && this.updateData.id) {
        this.form = this.updateData
        this.isAdd = false
      }
    },
    data() {
      return {
        otherUrls:[],
        commonKey:1,
        timeKey:1,
        form: {},
        imageUrl: '',
        isAdd: true,
        rules: {
          username: [{required: true, message: '请输入用户账号', trigger: 'blur'},],
          password: [{required: true, message: '请输入用户密码', trigger: 'blur'},],
        }
      }
    },
    methods: {
      deleteImg(idx){
        this.otherUrls.splice(idx,1)
      },
      handleAvatarSuccessLicenseUrl(res, file) {
        this.form.licenseUrl = res[0].url;
        this.commonKey+=1
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
          this.$message.error('请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片');
          return
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },

      save() {
        this.$refs['formAdd'].validate((valid) => {
          if (valid) {
            let api = this.isAdd ? 'api_admin_user_create' : 'api_admin_user_update'
            this.request(api, this.form).then(res => {
              this.toast.success(this.isAdd ? '新增成功！' : '修改成功！')
              this.$emit('close');
            }).catch(err => {
              this.toast.error(err.msg)
              console.log(err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
    width: 120px;
    height: 40px;
    display: block;
  }

</style>
