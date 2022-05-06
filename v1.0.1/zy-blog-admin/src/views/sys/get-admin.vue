<template>
  <section>
    <section class="lk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="130px">
        <lk-get-row>
          <el-form-item label="管理员名称" prop="userName">
            <el-input clearable v-model.trim="form.userName" class="input-one" size="mini"
                      placeholder="请输入管理员名称"
                      show-word-limit maxlength="50"
            />
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="密码" prop="password">
            <el-input clearable type="password" v-model.trim="form.password" class="input-one" size="mini"
                      placeholder="请输入密码"
                      show-password
                      show-word-limit maxlength="50"
            />
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="管理员昵称" prop="userNickName">
            <el-input clearable v-model.trim="form.userNickName" class="input-one" size="mini"
                      placeholder="请输入管理员昵称"
                      show-word-limit maxlength="50"
            />
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="手机号" prop="userMobile">
            <el-input clearable v-model.trim="form.userMobile"
                      class="input-one" size="mini" placeholder="请输入手机号"
                      show-word-limit maxlength="20"
            />
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="管理员角色" prop="roleId">
            <el-select v-model="form.roleId" class="input-one" size="mini" placeholder="请选择">
              <el-option
                v-for="item in roleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
import DirSelectEmployeeInfo from "@/views/zzPages/task/dir-select-employee-info";

export default {
  name: "get-admin",
  components: {DirSelectEmployeeInfo, LkGetButton, LkGetRow},
  props: {
    datas: {
      type: Object,
      default() {
        return null;
      }
    },
    roleOptions: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created() {
    console.log(this.datas)
    if (this.datas && this.datas.id) {
      this.form = this.datas
      this.isadd = false
      return
    }
    this.form = {}
  },
  data() {
    return {
      form: {},
      isadd: true,
      rules: {
        userName: [{required: true, message: '请输入名称', trigger: 'blur'},],
        password: [{required: true, message: '请输入密码', trigger: 'blur'},],
        // userMobile: [{required: true, message: '请输入手机号', trigger: 'blur'},],
        roleId: [{required: true, message: '请选择角色', trigger: 'blur'},],
      }
    }
  },
  methods: {

    save() {
      //密码加密

      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          let sha256 = require("js-sha256").sha256
          this.form.password = sha256(this.form.password)
          console.log(this.form)
          this.request('api_admin_admin_create', this.form).then(res => {
            if (res.errno === 0) {
              this.toast.success('添加成功!')
              this.$emit('close');
            } else {
              this.form.password = ''
              this.toast.error(res.errmsg)
            }
          }).catch(err => {
            this.toast.error(err.errmsg)
            this.$emit('close');
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

<style scoped>
.add-btns {
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
}
</style>
