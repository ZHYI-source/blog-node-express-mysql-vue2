<template>
  <section>
    <section class="mk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">

        <mk-get-row>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" size="mini" class="input-one" clearable placeholder="请输入用户名"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" size="mini" class="input-one" clearable placeholder="请输入密码"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="form.nickName" size="mini" class="input-one" clearable placeholder="请输入昵称"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="角色" prop="roleId">
            <mk-select-role  class="input-one" v-model="form.roleId"/>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="状态" prop="state">
            <el-switch
              v-model="form.state"
              active-color="#13ce66"
              active-text="正常"
              inactive-text="禁用"
            >
            </el-switch>
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

import {dirUsersCreate, dirUsersUpdate} from "@/api/modules/sys.users.api";
import MkSelectRole from "@/components/common/mk-select-role";


export default {
  name: 'get-users-info',
  components: {MkSelectRole, MkBackList, MkGetButton, MkGetRow},
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
        state:true
      },
      isAdd: true,
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'},],

        password: [{required: true, message: '请输入密码', trigger: 'blur'},],

        nickName: [{required: true, message: '请输入昵称', trigger: 'blur'},],

        roleId: [{required: true, message: '请选择角色', trigger: 'blur'},],

        state: [{required: true, message: '请选择状态', trigger: 'blur'},],

      }
    }
  },
  methods: {
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          let _FUC = ''
          _FUC = this.isAdd ? dirUsersCreate : dirUsersUpdate
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
