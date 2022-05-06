<template>
  <section>
    <lk-view-header @back="$emit('close')" :content="isAdd?'添加关于信息':'修改关于信息'"/>
    <section class="lk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">
        <lk-get-row>
          <el-form-item label="关于标题" prop="aboutTitle">
            <el-input placeholder="请输入关于标题"
                      clearable
                      class="input-one"
                      v-model="form.aboutTitle"
            ></el-input>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="关于内容" prop="aboutContent">
           <tinymce width="900" height="150" v-model="form.aboutContent"/>
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
import LkSelectClass from "@/components/common/lk-select-class";

export default {
  name: "get-web-about",
  components: {LkSelectClass, LkImgList, Tinymce, LkEdit, LkBackList, LkGetButton, LkGetRow},
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
      commonKey:0,
      form: {},
      isAdd: true,
      rules: {
        aboutTitle: [{required: true, message: '请输入关于标题', trigger: 'blur'},],
        aboutContent: [{required: true, message: '请输入关于内容', trigger: 'blur'},],
      }
    }
  },
  methods: {
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          let api = this.isAdd ? 'api_blog_web_about_create' : 'api_blog_web_about_update'
          this.request(api, this.form).then(res => {
            this.toast.success(this.isAdd ? '创建成功！' : '修改成功！')
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
