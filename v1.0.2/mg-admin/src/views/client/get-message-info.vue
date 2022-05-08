<template>
  <section>
    <section class="mk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">
        <mk-get-row>
          <el-form-item label="留言邮箱" prop="email">
            <el-input v-model="form.email" size="mini" class="input-one"  clearable placeholder="请输入留言邮箱"></el-input>
          </el-form-item>
          <el-form-item label="回复状态" prop="status">
            <el-switch v-model="form.status" disabled active-color="#13ce66">
            </el-switch>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="留言内容" prop="content" >
            <div style="width: 100px"></div>
<!--            <el-input v-model="form.content" size="mini" class="input-one" clearable placeholder="请输入留言内容"></el-input>-->
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <mk-md-editor v-model="form.content"/>
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

import {dirMessageCreate, dirMessageUpdate} from "@/api/modules/sys.message.api";
import MkMdEditor from "@/components/md-editor";


export default {
  name: 'get-message-info',
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

        email: [
          {required: true, message: '请输入留言邮箱', trigger: 'blur'},
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],

        content: [{required: true, message: '请输入留言内容', trigger: 'blur'},],

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
          _FUC = this.isAdd ? dirMessageCreate : dirMessageUpdate
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
