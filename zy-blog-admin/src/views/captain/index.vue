<style lang="scss" src="@/assets/css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-input v-model="queryList.params.plateNo" placeholder="车牌号" size="mini"></el-input>
      <el-button size="mini" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button size="mini" icon="el-icon-edit" @click="handleInsert" v-if="insertButton">新增</el-button>
      <el-button size="mini" icon="el-icon-edit" @click="handleUpdate" v-if="updateButton">编辑队长</el-button>
      <el-upload
        :headers="uploadHeader"
        class="upload-demo"
        accept=".xlsx,.xls"
        :show-file-list="false"
        action="taxi-server/admin/captain/importExcel"
        :on-success="onSuccess"
        :on-progress="onProgress"
        :on-error="onError">
        <el-button size="mini" icon="el-icon-document" v-if="importButton">
          导入
        </el-button>
      </el-upload>
      <div style="text-decoration: underline; color: #3b91b6" @click="getExample" v-if="importButton">导入司机模板下载</div>
    </div>
    <div class="app-table-contain">
      <div style="height: 100%;" ref="ztable">
        <el-table
          v-loading="loading" :element-loading-text="loadingText"
          :data="tableData.records" :stripe="true" border
          stripe
          style="width: 100%;"
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column prop="account" label="账号" align="center">
          </el-table-column>
          <el-table-column prop="plateNo" label="车牌号" align="center">
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="100px">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="danger" icon="el-icon-delete" v-if="deleteButton"
                           @click="handleDelete(scope.row)">删除
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="total,prev, pager, next"
        @current-change="handleFilter"
        :total="tableData.total" :current-page.sync="tableData.current" :page-size="tableData.size"
        style="flex-shrink: 0;padding: 10px">
      </el-pagination>
    </div>

    <el-dialog title="编辑队长" :visible.sync="updateForm" :close-on-press-escape="false" :close-on-click-modal="false"
               v-loading="updateLoading" :element-loading-text="loadingText" width="30%">
      <el-form ref="updateForm" :model="queryUpdate" label-width="120px" size="mini" style="margin: 20px 30px 20px 10px"
               :rules="updateRules" @submit.native.prevent>
        <el-form-item label="身份证号" prop="idCard" style="width: 80%">
          <el-input v-model="queryUpdate.idCard"></el-input>
        </el-form-item>
        <div style="display: flex; flex-direction: column;">
          <el-checkbox v-model="queryUpdate.isAdmin" style="margin: 10px 30% 30px 30%">是否为信息管理员</el-checkbox>
          <el-form-item label="信息管理员" prop="managerId" style="width: 80%">
            <el-select v-model="queryUpdate.managerId" :disabled="adminSelect" placeholder="请选择信息管理员" style="width: 100%">
              <el-option
                v-for="item in adminList"
                :key="item.userId"
                :label="item.nickName"
                :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>

      <div style="display: flex; width: 100%">
        <div style="display: flex; width: 100%; margin-bottom: 50px;">
          <el-button size="medium" @click="closeUpdate" style="margin: auto">取消</el-button>
          <el-button size="medium" type="primary" @click="updateData"
                     style="margin: auto">确认
          </el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="新增车辆" :visible.sync="insertForm" v-loading="insertLoading" width="30%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">
      <el-form ref="insertForm" :model="queryInsert" :rules="insertRules" label-width="30%" size="mini"
               @submit.native.prevent>
        <el-form-item label="车牌号码" :required="true" prop="plateNo" style="margin-top: 5%">
          <el-input v-model="queryInsert.plateNo" style="width: 50%;">
          </el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard" style="margin-top: 5%">
          <el-input v-model="queryInsert.idCard" style="width: 50%;">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeInsert">
          取消
        </el-button>
        <el-button type="primary" @click="insertData">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除提示" :visible.sync="deleteForm" v-loading="deleteLoading" width="30%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">
      <div style="margin-top: 5%; margin-left: 5%">确定要删除这台车辆的绑定关系吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteForm = false">
          取消
        </el-button>
        <el-button type="danger" @click="deleteData">
          删除
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="导入提示" :visible.sync="errorForm" width="30%">
      <div style="margin-top: 5%; margin-left: 5%; margin-bottom: 5%">是否下载错误信息</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="errorForm = false">取 消</el-button>
        <el-button type="primary" @click="downFile">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getToken} from '@/utils/auth'

  export default {
    data() {
      return {
        queryList: {
          size: 20,
          current: 1,
          params: {
            userId: '',
            plateNo: '',
            orgId: '',
          }
        },
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        queryInsert: {
          userId: undefined,
          idCard: '',
          plateNo: ''
        },
        queryDelete: {
          carId: undefined
        },
        queryView: {
          userId: undefined,
          orgId: undefined
        },
        queryUpdate: {
          userId: undefined,
          idCard: undefined,
          managerId: undefined,
          isAdmin: false
        },
        adminList: {},
        adminSelect: false,
        insertRules: {
          plateNo: [
            {required: true, message: '车牌号不能为空', trigger: 'blur'},
          ]
        },
        updateRules: {
          idCard: [
            {required: true, message: '身份证不能为空', trigger: 'blur'},
            {
              pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
              message: '身份证格式错误'
            }
          ]
        },
        uploadHeader: {
          'x-access-token': getToken()
        },
        loadingText: '',
        errorUrl: null,
        loading: false,
        insertLoading: false,
        importLoading: false,
        deleteLoading: false,
        updateLoading: false,
        insertForm: false,
        updateForm: false,
        deleteForm: false,
        errorForm: false,
        listButton: false,
        insertButton: false,
        updateButton: false,
        importButton: false,
        deleteButton: false
      };
    },
    watch: {
      'queryUpdate.isAdmin': {
        handler: function (val) {
          this.adminSelect = val
        }
      }
    },
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
          this.insertButton = true;
          this.updateButton = true;
          this.importButton = true;
          this.deleteButton = true;
        } else {
          if (perms.includes('POST /admin/captain/select')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/captain/insert')) {
            this.insertButton = true;
          }
          if (perms.includes('POST /admin/captain/update')) {
            this.updateButton = true;
          }
          if (perms.includes('POST /admin/captain/importExcel')) {
            this.importButton = true;
          }
          if (perms.includes('POST /admin/captain/delete')) {
            this.deleteButton = true;
          }
        }
      },

      handleFilter() {
        this.queryList.current = this.tableData.current
        this.getList();
      },
      getList() {
        this.loadingText = '正在查询中。。。'
        this.loading = true
        this.request('api_admin_captain_list', this.queryList).then((res) => {
          this.tableData = res;
          this.loading = false
        }).catch((error) => {
          console.log(error)
          this.loading = false
        });
      },
      handleInsert() {
        this.insertForm = true
      },
      insertData() {
        this.$refs['insertForm'].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.insertLoading = true
          this.request('api_admin_captain_insert', this.queryInsert).then((res) => {
            this.insertLoading = false
            this.$notify.success({
              title: '成功',
              message: '新增成功'
            })
            this.getList()
            this.closeInsert()
          }).catch((error) => {
            this.insertLoading = false
            this.$notify.error({
              title: '失败',
              message: error.msg
            })
          });
        });
      },
      resetInsert() {
        this.queryInsert.plateNo = ''
        this.queryInsert.idCard = ''
      },
      closeInsert() {
        this.insertForm = false
        this.resetInsert()
      },
      handleUpdate() {
        this.updateForm = true
        this.updateLoading = true
        this.loadingText = '加载中。。'
        this.request('api_admin_captain_view', this.queryView).then((res) => {
          this.updateLoading = false
          this.queryUpdate.idCard = res.idCard
          this.queryUpdate.isAdmin = res.isAdmin
          if(res.managerId){
            this.queryUpdate.managerId = res.managerId
          }
          this.adminList = res.adminList
        }).catch((error) => {
          this.updateLoading = false
          this.$notify.error({
            title: '加载失败',
            message: error.msg
          })
        });
      },
      updateData() {
        this.$refs['updateForm'].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.updateLoading = true
          this.loadingText = '处理中。。'
          this.request('api_admin_captain_update', this.queryUpdate).then((res) => {
            this.updateLoading = false
            this.$notify.success({
              title: '成功',
              message: '更新成功'
            })
            this.closeUpdate()
          }).catch((error) => {
            this.updateLoading = false
            this.$notify.error({
              title: '失败',
              message: error.msg
            })
          });
        });
      },
      closeUpdate() {
        this.queryUpdate.idCard = undefined
        this.queryUpdate.managerId = undefined
        this.queryUpdate.isAdmin = false
        this.updateForm = false
      },
      handleDelete(row) {
        this.queryDelete.carId = row.carId
        this.deleteForm = true
      },
      deleteData() {
        this.deleteLoading = true
        this.request('api_admin_captain_delete', this.queryDelete).then((res) => {
          this.deleteLoading = false
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
          this.getList()
          this.deleteForm = false
        }).catch((error) => {
          this.deleteLoading = false
          this.$notify.error({
            title: '失败',
            message: '删除失败，请重试'
          })
          this.deleteForm = false
        });
      },
      onSuccess(response, file, fileLile) {
        this.loading = false
        if (response.result === 0) {
          this.errorUrl = response.errFile;
          this.errorForm = true;
          console.log(this.errorUrl);
        } else {
          this.$message('导入成功');
        }
        this.getList()
      },
      onError(err, file, fileList) {
        this.loading = false
      },
      onProgress() {
        this.loadingText = '导入中，请稍后。。。'
        this.loading = true
      },
      downFile() {
        this.errorForm = false;
        let params = {};
        params.fileUrl = this.errorUrl;
        this.request('api_admin_captain_errExcel', params).then((res) => {
          console.log(res);
        }).catch((error) => {
        });
      },
      getExample() {
        let params = {};
        this.request('api_admin_captain_template', params).then((res) => {
        }).catch((error) => {
        });
      },
      getUserInfo() {
        this.queryList.params.orgId = this.$store.getters.orgId
        this.queryList.params.userId = this.$store.getters.userId
        this.queryInsert.userId = this.$store.getters.userId
        this.queryView.userId = this.$store.getters.userId
        this.queryView.orgId = this.$store.getters.orgId
        this.queryUpdate.userId = this.$store.getters.userId
      }
    },
    async created() {
      await this.getUserInfo()
      this.getPerms()
    },
    mounted() {
      this.getList();
    }

  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

</style>

