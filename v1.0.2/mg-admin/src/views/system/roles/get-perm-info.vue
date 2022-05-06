<template>
  <section>
    <section class="mk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">

        <mk-get-row>
          <el-form-item label="ID" prop="id">
            <el-input v-model="form.id" disabled size="mini" class="input-one" clearable placeholder="请输入ID"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="角色名称" prop="role_name">
            <el-input v-model="form.role_name" disabled size="mini" class="input-one" clearable placeholder="请输入角色名称"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="权限选择">
            <mk-menu-tree v-model="form.menuIds"/>
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
import {dirRolesCreate, dirRolesCreatePermission, dirRolesUpdate} from "@/api/modules/sys.roles.api";
import MkMenuTree from "@/components/common/mk-menu-tree";

export default {
  name: 'get-perm-info',
  components: {MkMenuTree, MkBackList, MkGetButton, MkGetRow},
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

        role_name: [{required: true, message: '请输入角色名称', trigger: 'blur'},],

        role_desc: [{required: true, message: '请输入角色描述', trigger: 'blur'},],

        createdAt: [{required: true, message: '请输入CREATEDAT', trigger: 'blur'},],

        updatedAt: [{required: true, message: '请输入UPDATEDAT', trigger: 'blur'},],

      }
    }
  },
  methods: {
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          let p= {
            roleId:this.form.id,
            menuIds:this.form.menuIds
          }
          dirRolesCreatePermission(p).then(res => {
            console.log(res)
            this.$toast.success('分配成功！')
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
