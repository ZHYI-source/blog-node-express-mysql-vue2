<template>
  <section>
    <section class="mk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">
        <mk-get-row>
          <el-form-item label="站点头像" prop="avatar">
            <el-input clearable v-model.trim="form.avatar" size="mini" style="width: 600px" type="textarea"
                      :rows="3"
                      maxlength="255"
                      show-word-limit
                      placeholder="请输入在线图片地址"
            />
            <mk-upload v-model="form.avatar"/>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="站点名称" prop="name">
            <el-input v-model="form.name" size="mini" class="input-one" clearable placeholder="请输入站点名称"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="站点格言" prop="slogan">
            <el-input clearable v-model.trim="form.slogan" size="mini" style="width: 600px" type="textarea"
                      :rows="2"
                      maxlength="200"
                      show-word-limit
                      placeholder="请输入站点格言"
            />
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="站点主页" prop="domain">
            <el-input clearable v-model.trim="form.domain" size="mini" style="width: 600px" type="textarea"
                      :rows="2"
                      maxlength="200"
                      show-word-limit
                      placeholder="请输入站点主页"
            />
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="站点通知" prop="notice">
            <el-input clearable v-model.trim="form.notice" size="mini" style="width: 600px" type="textarea"
                      :rows="2"
                      maxlength="200"
                      show-word-limit
                      placeholder="请输入站点通知"
            />
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="站点描述" prop="desc">
            <el-input clearable v-model.trim="form.desc" size="mini" style="width: 600px" type="textarea"
                      :rows="2"
                      maxlength="200"
                      show-word-limit
                      placeholder="请输入站点描述"
            />
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="全局样式" prop="globalStyle">
            <el-input clearable v-model.trim="form.globalStyle" size="mini" style="width: 600px" type="textarea"
                      :rows="2"
                      maxlength="200"
                      show-word-limit
                      placeholder="请输入全局样式"
            />
          </el-form-item>
        </mk-get-row>
        <el-divider/>
        <mk-get-button @save="save" @close="close(true)"/>
      </el-form>
    </section>
  </section>

</template>

<script>
import MkGetRow from "@/components/common/mk-get-row";
import MkGetButton from "@/components/common/mk-get-button";
import MkBackList from "@/components/common/mk-back-list";
import {dirWebsiteCreate, dirWebsiteUpdate} from "@/api/modules/sys.website.api";
import MkUpload from "@/components/common/mk-upload";


export default {
  name: 'get-website-info',
  components: {MkUpload, MkBackList, MkGetButton, MkGetRow},
  props: {
    updateData: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  created() {
    if (this.updateData && this.updateData.id) {
      this.form = this.updateData
      this.isAdd = false
    }
  },
  data() {
    return {
      commonKey: 0,
      form: {
        avatar: 'https://bpic.51yuansu.com/pic3/cover/04/05/51/6135ec9add9eb_260.jpg'
      },
      isAdd: true,
      rules: {

        avatar: [{required: true, message: '请输入站点头像', trigger: 'blur'},],

        name: [{required: true, message: '请输入站点名称', trigger: 'blur'},],

        slogan: [{required: true, message: '请输入站点格言', trigger: 'blur'},],

        domain: [{required: false, message: '请输入站点主页', trigger: 'blur'},],

        notice: [{required: true, message: '请输入站点通知', trigger: 'blur'},],

        desc: [{required: true, message: '请输入站点描述', trigger: 'blur'},],

        globalStyle: [{required: false, message: '请输入全局样式', trigger: 'blur'},],

      }
    }
  },
  methods: {
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          let _FUC = ''
          _FUC = this.isAdd ? dirWebsiteCreate : dirWebsiteUpdate
          _FUC(this.form).then(res => {
            this.$toast.success(this.isAdd ?'添加成功！':'修改成功！')
            this.$emit('close',true);
          }).catch(err => {
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
        this.$toast.confirmSave().then(() => {
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

</style>
