<template>
  <section>
    <section class="mk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">
        <mk-get-row>
          <el-form-item label="内容" prop="about_content">
<!--            <el-input v-model="form.about_content" size="mini" class="input-one" clearable placeholder="请输入内容"></el-input>-->
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <mk-md-editor v-model="form.about_content"/>
        </mk-get-row>
        <el-divider />
        <mk-get-button @save="save" @close="close(true)"/>
      </el-form>
    </section>
  </section>

</template>

<script>
import MkGetRow from "@/components/common/mk-get-row";
import MkGetButton from "@/components/common/mk-get-button";
import MkBackList from "@/components/common/mk-back-list";
import {dirAboutCreate, dirAboutUpdate} from "@/api/modules/sys.about.api";
import MkMdEditor from "@/components/md-editor";


export default {
  name: 'get-about-info',
  components: {MkMdEditor, MkBackList, MkGetButton, MkGetRow},
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
      form: {},
      isAdd: true,
      rules: {

        id: [{required: true, message: '请输入ID', trigger: 'blur'},],

        about_content: [{required: true, message: '请输入内容', trigger: 'blur'},],

        createdAt: [{required: true, message: '请输入创建时间', trigger: 'blur'},],

        updatedAt: [{required: true, message: '请输入更新时间', trigger: 'blur'},],

      }
    }
  },
  methods: {
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          let _FUC = ''
          _FUC = this.isAdd ? dirAboutCreate : dirAboutUpdate
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
