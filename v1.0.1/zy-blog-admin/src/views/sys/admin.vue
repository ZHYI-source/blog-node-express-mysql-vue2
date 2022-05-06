<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.username" size="mini" clearable class="filter-item" style="width: 200px;margin-right: 10px" placeholder="请输入管理员名称"/>
      <el-button class="filter-item" type="primary" size="mini" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button v-if="createButton" class="filter-item" size="mini" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <!--<el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>-->
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="tableData.records" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" label="管理员ID" prop="userId" sortable/>

      <el-table-column align="center" label="管理员名称" prop="userName"/>

      <el-table-column align="center" label="管理员昵称" prop="userNickName"/>

      <el-table-column align="center" label="管理员角色">
        <template slot-scope="scope">
          <el-tag type="primary" style="margin-right: 20px;"> {{ formatRole(scope.row.roleId) }} </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="updateButton" type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-if="deleteButton" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="getList"
      :total="tableData.total" :current-page.sync="tableData.current" :page-size="tableData.size"
      style="flex-shrink: 0;padding: 10px">
    </el-pagination>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="管理员名称" prop="userName">
          <el-input v-model="dataForm.userName"  placeholder="请输入管理员名称"/>
        </el-form-item>
        <el-form-item label="管理员密码" prop="password" v-if="dialogStatus==='create'">
          <el-input v-model="dataForm.password"  placeholder="请输入管理员密码" type="password" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="password" v-if="dialogStatus==='create'">
          <el-input v-model="dataForm.repassword"  placeholder="确认密码" type="password" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="管理员昵称" prop="userNickName">
          <el-input v-model="dataForm.userNickName"  placeholder="请输入管理员昵称"/>
        </el-form-item>
        <el-form-item label="管理员手机号" prop="userMobile">
          <el-input v-model="dataForm.userMobile"  placeholder="请输入管理员手机号"/>
        </el-form-item>
        <el-form-item label="所属机构" prop="orgId" v-if="dialogStatus==='create'">
          <el-input :value="fmtOrgId(dataForm.orgId)"  placeholder="组织机构" size="mini" @focus="showTree"></el-input>
        </el-form-item>
        <el-form-item label="所属机构" prop="orgId" v-if="dialogStatus==='update' && orgList">
          <el-input :value="fmtOrgId(dataForm.orgId)" @focus="showTree"></el-input>
        </el-form-item>
        <el-form-item label="管理员角色" prop="roleId">
          <el-select v-model="dataForm.roleId" style="width: 300px" placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus==='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-if="dialogStatus==='update'" type="primary" @click="handleReset">重置密码</el-button>
        <el-button v-if="dialogStatus==='update'" type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="重置密码" :visible.sync="passwordForm" v-loading="resetLoading"
               element-loading-text="处理中。。。">
      <el-form ref="password" :rules="resetRules" :model="queryReset" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="新密码" prop="password"style="margin-top: 5%">
          <el-input v-model="queryReset.password" type="password" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input v-model="queryReset.repassword" type="password" auto-complete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordForm = false">取消</el-button>
        <el-button type="primary" @click="resetData">重置</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="deleteForm">
      <div>确定要删除这个账号吗?</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteForm = false">
          取消
        </el-button>
        <el-button type="danger" @click="deleteData">
          删除
        </el-button>
      </div>
    </el-dialog>
<!--    <el-dialog title="机构筛选" :visible.sync="treeForm">-->

<!--      <el-input v-model="filterText" class="filter-item" placeholder="输入关键字进行过滤" clearable style="width: 200px; margin-left: 25px; margin-top: 15px" />-->

<!--      <el-tree-->
<!--        class="filter-tree"-->
<!--        :data="orgTree"-->
<!--        :props="defaultProps"-->
<!--        default-expand-all-->
<!--        :filter-node-method="filterNode"-->
<!--        @node-click="handleNodeClick"-->
<!--        :expand-on-click-node="false"-->
<!--        :highlight-current="true"-->
<!--        ref="tree"-->
<!--        style="margin-left: 25px; margin-top: 10px">-->
<!--      </el-tree>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="treeForm = false">-->
<!--          取消-->
<!--        </el-button>-->
<!--        <el-button type="primary" @click="selectOrg">-->
<!--          确定-->
<!--        </el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
  </div>
</template>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 145px;
  height: 145px;
  display: block;
}
</style>

<script>
import { listAdmin, createAdmin, updateAdmin, deleteAdmin } from '@/api/admin'
import { roleOptions } from '@/api/role'
import { uploadPath } from '@/api/storage'
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination'
import GetAdmin from "@/views/sys/get-admin"; // Secondary package based on el-pagination

export default {
  name: 'Admin',
  components: {GetAdmin, Pagination },
  data() {
    return {
      uploadPath,
      orgList: null,
      list: [],
      total: 0,
      roleOptions: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        username: undefined,
        orgId: undefined,
        order: 'desc'
      },
      queryRole : {
        orgId: undefined
      },
      queryReset: {
        userId: undefined,
        password: undefined,
        repassword: undefined
      },
      dataForm: {
        userId: undefined,
        userName: undefined,
        userNickName: undefined,
        userMobile: undefined,
        orgId: '',
        orgName: undefined,
        password: undefined,
        repassword: undefined,
        roleId: undefined,
        isSend: undefined
      },
      dialogFormVisible: false,
      deleteForm: false,
      passwordForm: false,
      deleteRow: {},
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableData: {
        total: 0,
        size: null,
        current: 1,
        records: []
      },
      rules: {
        userName: [
          { required: true, message: '管理员名称不能为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        roleId: [{ required: true, message: '请选择管理员角色', trigger: 'blur' }],
        orgId: [{ required: true, message: '请选择所属机构', trigger: 'change' }]
      },
      resetRules: {
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      downloadLoading: false,
      resetLoading: false,
      listButton: false,
      updateButton: false,
      deleteButton: false,
      createButton: false,
      queryTree:{
        orgId: undefined
      },
      orgTree: [],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'orgName'
      },
      treeForm: false,
    }
  },
  computed: {
    headers() {
      return {
        'X-Token': getToken()
      }
    }
  },
  async created() {
    await this.getUserInfo()
    this.getPerms()
    // this.getTree()
    roleOptions(this.queryRole)
      .then(response => {
        this.roleOptions = response.data.data.list
      })
  },
  mounted(){
    this.getList()
    this.queryOrgList()
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    getPerms(){
      let perms = this.$store.getters.perms
      console.log(this.$store)
      if(perms.includes('*')){
        this.listButton = true;
        this.updateButton = true;
        this.deleteButton = true;
        this.createButton = true;
      }else{
        if(perms.includes('GET /admin/admin/list')){
          this.listButton = true;
        }
        if(perms.includes('POST /admin/admin/update')){
          this.updateButton = true;
        }
        if(perms.includes('POST /admin/admin/delete')){
          this.deleteButton = true;
        }
        if(perms.includes('POST /admin/admin/create')){
          this.createButton = true;
        }
      }
    },
    fmtOrgId(val){
      for (let i = 0; i < this.orgList.length; i++) {
        if (val === this.orgList[i].orgId) {
          return this.orgList[i].orgName
        }
      }
    },
    formatRole(roleId) {
      for (let i = 0; i < this.roleOptions.length; i++) {
        if (roleId === this.roleOptions[i].value) {
          return this.roleOptions[i].label
        }
      }
      return ''
    },
    getList() {
      this.listQuery.page = this.tableData.current
      this.listLoading = true

      this.request('api_admin_adminList', this.listQuery).then((res) => {
        this.tableData = res
        console.log(this.tableData)
        this.list = res.records
        this.listLoading = false
      }).catch((error) => {
        this.list = []
        this.total = 0
        this.listLoading = false
      });
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetForm() {
      this.dataForm = {
        userId: undefined,
        userName: undefined,
        userNickName: undefined,
        userMobile: undefined,
        orgId: '',
        password: undefined,
        roleId: undefined
      }
    },
    uploadAvatar: function(response) {
      this.dataForm.avatar = response.data.url
    },

    handleCreate() {
      this.toast.showMiniModal('添加管理员',GetAdmin,{roleOptions:this.roleOptions},()=>{
        this.getList()
      })
      // this.resetForm()
      // this.dialogStatus = 'create'
      // this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    createData() {
      let sha256 = require("js-sha256").sha256
      if(this.dataForm.password !== this.dataForm.repassword){
        this.$notify.error({
          title: '失败',
          message: '两次密码不一致'
        })
        return
      }
      if(this.dataForm.password.length < 6){
        this.$notify.error({
          title: '失败',
          message: '密码长度不能小于6'
        })
        return
      }
      this.dataForm.password = sha256(this.dataForm.password)

      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createAdmin(this.dataForm)
            .then(response => {
              this.getList()
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '添加管理员成功'
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
    handleUpdate(row) {
      this.dataForm = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      // let sha256 = require("js-sha256").sha256
      console.log(this.dataForm)
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          // this.dataForm.password = sha256(this.dataForm.password)
          updateAdmin(this.dataForm)
            .then(() => {
              this.getList()
              // for (const v of this.list) {
              //   if (v.id === this.dataForm.id) {
              //     const index = this.list.indexOf(v)
              //     this.list.splice(index, 1, this.dataForm)
              //     break
              //   }
              // }
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
    handleReset() {
      this.queryReset.userId = this.dataForm.userId
      this.queryReset.password = null
      this.queryReset.repassword = null
      this.passwordForm = true
      this.$nextTick(() => {
        this.$refs['password'].clearValidate()
      })
    },
    handleDelete(row) {
      this.deleteForm = true
      console.log(row)
      this.deleteRow.roleId = row.roleId
      this.deleteRow.password = row.password
      this.deleteRow.account = row.username
      this.deleteRow.nickName = row.userNickName
      this.deleteRow.id = row.userId
      this.deleteRow.updateTimestamp = row.updateTimestamp
      this.deleteRow.insertTimestamp = row.insertTimestamp
      this.deleteRow.orgId = 0
      this.deleteRow.status = 0

    },
    resetData() {
      let sha256 = require("js-sha256").sha256
      if(this.queryReset.password !== this.queryReset.repassword){
        this.$notify.error({
          title: '失败',
          message: '两次密码不一致'
        })
        return
      }
      if(this.queryReset.password.length < 6){
        this.$notify.error({
          title: '失败',
          message: '密码长度不能小于6'
        })
        return
      }
      this.queryReset.password = sha256(this.queryReset.password)

      this.$refs['password'].validate(valid => {
        if (valid) {
          this.resetLoading = true
          updateAdmin(this.queryReset)
            .then(response => {
              this.resetLoading = false
              this.passwordForm = false
              this.$notify.success({
                title: '成功',
                message: '重置密码成功'
              })
            })
            .catch(response => {
              this.resetLoading = false
              this.$notify.error({
                title: '失败',
                message: response.data.errmsg
              })
            })
        }
      })
    },
    deleteData(){
      deleteAdmin(this.deleteRow)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '删除管理员成功'
          })
          this.deleteForm = false
          this.getList()
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
          this.deleteForm = false
        })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['管理员ID', '管理员名称', '管理员角色']
        const filterVal = ['userId', 'userName', 'userNickName']
        const list = this.list
        // const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel(
          {
            header:filterVal,
            data:list,
            filename:'管理员信息',
          }
        )
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        console.log(v,j)
        // if (j === 'insertTimestamp') {
        //   return parseTime(v[j])
        // } else {
        //   return v[j]
        // }
      }))
    },
    queryOrgList(queryOrg) {
      if (!queryOrg) {
        queryOrg = {
          pageNumber: 1,
          pageSize: 999
        }
      }
      const that = this
      this.request('orgList', queryOrg).then(response => {
        that.orgList = response.records
      })
    },
    getTree() {
      const that = this
      this.request('orgTree', this.queryTree).then(response => {
        console.log(response)
        that.orgTree = response
      })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.orgName.indexOf(value) !== -1;
    },
    showTree() {
      this.treeForm = true
    },
    handleNodeClick(data) {
      this.dataForm.orgId = data.orgId
      this.dataForm.orgName = data.orgName
      console.log(data)
    },
    selectOrg() {
      this.treeForm = false
    },
    getUserInfo(){
      this.queryTree.orgId = this.$store.getters.orgId
      this.listQuery.orgId = this.$store.getters.orgId
      this.queryRole.orgId = this.$store.getters.orgId
      console.log(this.queryRole.orgId,'45')
    }
  }
}
</script>
