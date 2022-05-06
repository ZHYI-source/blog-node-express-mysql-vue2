<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入角色名称" v-if="listButton"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" v-if="listButton">查找</el-button>
      <el-button v-if="createButton" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" label="角色名称" prop="name" sortable/>

      <el-table-column align="center" label="说明" prop="describe"/>

      <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="updateButton && scope.row.isAdmin === 0" type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-if="deleteButton && scope.row.isAdmin === 0" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          <el-button v-if="permButton && scope.row.isAdmin === 0" type="primary" size="mini" @click="handlePermission(scope.row)">授权</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="dataForm.name"/>
        </el-form-item>
        <el-form-item label="说明" prop="desc">
          <el-input v-model="dataForm.describe"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus==='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

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

  </div>
</template>

<script>
import { listRole, createRole, updateRole, deleteRole, getPermission, updatePermission } from '@/api/role'
import Pagination from '@/components/Pagination'
export default {
  name: 'Role',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        orgId: '',
        sort: 'insert_timestamp',
        order: 'desc'
      },
      dataForm: {
        id: undefined,
        name: undefined,
        describe: undefined,
        orgId: '',
        isAdmin:1,
        status:0,
        insertTimestamp:null,
        updateTimestamp:null
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
      },
      permissionDialogFormVisible: false,
      systemPermissions: null,
      assignedPermissions: null,
      permissionForm: {
        roleId: undefined,
        permissions: []
      },
      listButton: false,
      updateButton: false,
      deleteButton: false,
      createButton: false,
      permButton : false,
    }
  },
  created() {
    this.getUserInfo()
    this.getPerms()
  },
  mounted(){
    this.getList()
  },
  methods: {
    getPerms(){
      let perms = this.$store.getters.perms
      console.log(this.$store)
      if(perms.includes('*')){
        this.updateButton = true;
        this.deleteButton = true;
        this.createButton = true;
        this.permButton = true;
        this.listButton = true;
      }else{
        if(perms.includes('POST /admin/role/update')){
          this.updateButton = true;
        }
        if(perms.includes('POST /admin/role/delete')){
          this.deleteButton = true;
        }
        if(perms.includes('POST /admin/role/create')){
          this.createButton = true;
        }
        if(perms.includes('GET /admin/role/getPermissions')){
          this.permButton = true;
        }
        if(perms.includes('GET /admin/role/list')){
          this.listButton = true;
        }
      }
    },
    getList() {
      this.listLoading = true
      listRole(this.listQuery)
        .then(response => {
          this.list = response.data.data.list
          this.total = parseInt(response.data.data.total)
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        name: undefined,
        describe: undefined,
        orgId: this.$store.getters.orgId
      }
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          console.log(this.dataForm)
          createRole(this.dataForm)
            .then(response => {
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '添加角色成功'
              })
              this.getList()
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.data.errmsg
              })
            })
        }
      })
    },
    handleUpdate(row) {
      this.dataForm = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateRole(this.dataForm)
            .then(() => {
              for (const v of this.list) {
                if (v.id === this.dataForm.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.dataForm)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '更新管理员成功'
              })
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.data.errmsg
              })
            })
        }
      })
    },
    handleDelete(row) {
      deleteRole(row)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '删除管理员成功'
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    },
    handlePermission(row) {
      this.permissionDialogFormVisible = true
      this.permissionForm.roleId = row.id
      getPermission({ roleId: row.id })
        .then(response => {
          this.systemPermissions = response.data.data.systemPermissions
          this.assignedPermissions = response.data.data.assignedPermissions
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
    getUserInfo() {
      this.listQuery.orgId = this.$store.getters.orgId
      this.dataForm.orgId = this.$store.getters.orgId
    }
  }
}
</script>
