<template>
  <section>
    <section class="mk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">
        <mk-get-row>
          <el-form-item label="角色名称" prop="role_name">
            <el-input v-model="form.role_name" :disabled="form.role_name==='admin'" size="mini" class="input-one"
                      clearable placeholder="请输入角色名称"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="角色描述" prop="role_desc">
            <el-input v-model="form.role_desc" :disabled="form.role_name==='admin'" size="mini" class="input-one"
                      clearable placeholder="请输入角色描述"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="权限">
            <mk-menu-tree v-model="form.menuIds" :roleId='form.id'/>
          </el-form-item>
        </mk-get-row>
        <el-alert
          v-if="form.role_name==='admin'"
          title="** 超级管理员角色不能修改"
          type="warning">
        </el-alert>
        <el-divider/>
        <mk-get-button @save="save" :dis-save="form.role_name==='admin'"  @close="close(true)"/>
      </el-form>
    </section>
  </section>
</template>

<script>
import MkGetRow from "@/components/common/mk-get-row";
import MkGetButton from "@/components/common/mk-get-button";
import MkBackList from "@/components/common/mk-back-list";

import {dirRolesCreate, dirRolesUpdate} from "@/api/modules/sys.roles.api";
import MkMenuTree from "@/components/common/mk-menu-tree";
import {dirMenusList} from "@/api/modules/sys.menus.api";
import util from "@/libs/util";

export default {
  name: 'get-roles-info',
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
      let menusId = []
      for (const argument of this.updateData.menus) {
        menusId.push(argument.id)
      }
      this.$set(this.form, 'menuIds', menusId)
      this.isAdd = false
    }
  },
  data() {
    return {
      commonKey: 0,
      form: {},
      treeData: [],
      query: {
        limit: 300
      },
      isAdd: true,
      rules: {
        role_name: [{required: true, message: '请输入角色名称', trigger: 'blur'},],
        menuIds: [{required: true, message: '请选择权限', trigger: 'blur'},],
      }
    }
  },
  methods: {
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          let _FUC = ''
          _FUC = this.isAdd ? dirRolesCreate : dirRolesUpdate
          _FUC(this.form).then(res => {
            this.$toast.success(this.isAdd ? '添加成功！' : '修改成功！')
            this.$emit('close', true);
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
.menu-tree {
  min-width: 200px;
  width: 400px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;

  .block {
    font-size: 14px;
  }

}
</style>
