<template>
  <section>
    <lk-view-header @back="$emit('close')" :content="isAdd?'添加角色':isAuth?'配置权限':'修改角色'"/>
    <section class="lk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="140px">
        <el-row class="row-title">基本信息</el-row>
        <lk-get-row>
          <el-form-item label="角色名称" prop="roleName">
            <el-input clearable v-model.trim="form.roleName" class="input-one" size="mini" placeholder="请输入角色名称"
                      show-word-limit maxlength="20"/>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="角色标识" prop="roleKey">
            <el-input clearable v-model.trim="form.roleKey" class="input-one" size="mini" placeholder="请输入角色标识"
                      show-word-limit maxlength="20"/>
          </el-form-item>
        </lk-get-row>
        <lk-get-row v-if="isAuth">
          <el-form-item label="角色权限" prop="roleAuth">
            <el-button @click="permissionDialogFormVisible = true">选择</el-button>
          </el-form-item>
        </lk-get-row>
        <el-divider/>
        <lk-get-button @save="save" @close="close(true)"/>
      </el-form>
    </section>
    <!-- 权限配置对话框 -->
    <el-dialog :visible.sync="permissionDialogFormVisible" title="权限配置">
      <el-tree
        ref="tree"
        :data="systemPermissions"
        :default-checked-keys="assignedPermissions"
        show-checkbox
        node-key="id"
        highlight-current>
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ data.label }}</span>
          <el-tag v-if="data.api" type="success" size="mini">{{ data.api }}</el-tag>
        </span>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="permissionDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updatePermission">确定</el-button>
      </div>
    </el-dialog>
  </section>

</template>

<script>
  import LkGetRow from "@/components/common/lk-get-row";
  import LkGetButton from "@/components/common/lk-get-button";
  import LkBackList from "@/components/common/lk-back-list";
  import LkEdit from "@/components/common/lk-edit";
  import LkImgList from "@/components/common/lk-img-list";
  import {getPermission, updatePermission} from "@/api/role";

  export default {
    name: "get-role-info",
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
        if (this.updateData.isAuth){
          this.isAuth=true
          this.getRouteList()
        }
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
        isAuth: false,
        permissionDialogFormVisible: false,
        systemPermissions: null,
        assignedPermissions: null,
        permissionForm: {
          roleId: undefined,
          permissions: []
        },
        rules: {
          roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'},],
          roleKey: [{required: true, message: '请输入角色密码', trigger: 'blur'},],
        }
      }
    },
    methods: {
      //加载路由列表
      getRouteList(){
        this.permissionForm.roleId = this.form.id
        this.request('api_admin_role_getPermissions',{ roleId: this.form.id }).then(response=>{
          this.systemPermissions = response.data.systemPermissions
          this.assignedPermissions = response.data.assignedPermissions
        })
      },

      updatePermission() {
        this.permissionForm.permissions = this.$refs.tree.getCheckedKeys(true)
        updatePermission(this.permissionForm)
          .then(response => {
            this.permissionDialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '授权成功'
            })
          })
          .catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.errmsg
            })
          })
      },
      save() {
        this.$refs['formAdd'].validate((valid) => {
          if (valid) {
            let api = this.isAdd ? 'api_admin_role_create' : 'api_admin_role_update'
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
