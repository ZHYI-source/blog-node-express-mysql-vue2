<style lang="scss" src="@/assets/css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-input v-model="queryList.params.realName" placeholder="用户姓名" size="mini" clearable></el-input>
      <el-input v-model="queryList.params.phone" placeholder="手机号" size="mini" clearable></el-input>
      <el-input v-model="queryList.params.idCard" placeholder="身份证号" size="mini" clearable></el-input>
      <el-select size="mini" v-model="queryList.params.status">
        <el-option label="正常" :value="0"></el-option>
        <el-option label="注销" :value="1"></el-option>
        <el-option label="待激活" :value="2"></el-option>
        <el-option label="余额不足" :value="3"></el-option>
      </el-select>
      <el-date-picker
        v-model="insertTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="税号绑定开始时间"
        end-placeholder="税号绑定结束时间" size="mini">
      </el-date-picker>
      <el-date-picker
        v-model="useTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="税务登记开始时间"
        end-placeholder="税务登记结束时间" size="mini">
      </el-date-picker>
    </div>
    <div class="app-table-query" v-if="listButton">
      <el-button size="mini" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button  @click="goEdit" size="mini" icon="el-icon-document" >新增</el-button>
      <el-upload
        :headers="uploadHeader"
        class="upload-demo"
        accept=".xlsx,.xls"
        :show-file-list="false"
        action="zz-server/admin/invoice/importExcel"
        :on-success="onSuccess"
        :on-progress="onProgress"
        :on-error="onError">
        <el-button size="mini" icon="el-icon-document" v-if="importButton">
          导入
        </el-button>
      </el-upload>
      <div style="text-decoration: underline; color: #3b91b6" @click="getExample" v-if="importButton">导入模板下载</div>
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


          <el-table-column prop="userRealName" label="用户姓名" width="100" align="center">
          </el-table-column>
          <el-table-column prop="idCard" label="身份证号" width="250" align="center">
          </el-table-column>
          <el-table-column prop="invoiceNo" label="纳税人识别号" width="250" align="center">
          </el-table-column>
          <el-table-column prop="userTel" label="用户手机号" width="200" align="center">
          </el-table-column>
          <el-table-column prop="balanceDesc" label="发票余额" align="center">
          </el-table-column>
          <el-table-column prop="countDesc" label="发票余张" align="center">
          </el-table-column>
          <el-table-column prop="useTimestamp" label="税务登记时间" width="180" align="center">
            <template slot-scope="scope">
              {{scope.row.useTimestamp | fmtTime }}
            </template>
          </el-table-column>
          <el-table-column prop="insertTimestamp" label="税号绑定时间" width="180" align="center">
            <template slot-scope="scope">
              {{scope.row.insertTimestamp | fmtTime }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" width="90" fixed="right">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.status === 0"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="info" v-if="scope.row.status === 1"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="danger" v-if="scope.row.status === 2"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="warning" v-if="scope.row.status === 3"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="warning" v-if="scope.row.status === -1"> {{ scope.row.statusDesc }} </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="原因" width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 2"> {{ scope.row.reason }} </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="250">
            <template slot-scope="scope">
              <el-button-group>
<!--                <el-button size="mini" type="primary" icon="el-icon-document" v-if="changeButton && scope.row.status !== 1"-->
<!--                           @click="handleChange(scope.row)">换车-->
<!--                </el-button>-->
                <el-button size="mini" type="primary" icon="el-icon-document" v-if="cancellationButton && scope.row.status !== 1"
                           @click="handleCancellation(scope.row)">注销
                </el-button>
                <el-button size="mini" type="primary" icon="el-icon-document" v-if="updateButton"
                           @click="handleUpdate(scope.row)">编辑
                </el-button>
                <el-button size="mini" type="primary" icon="el-icon-document" v-if="historyButton"
                           @click="handleHistory(scope.row)">历史
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
        :total="tableData.total"
        :current-page.sync="tableData.current" :page-size="tableData.size"
        style="flex-shrink: 0;padding: 10px">
      </el-pagination>
    </div>

    <el-dialog title="机构筛选" :visible.sync="treeForm">
      <el-input v-model="filterText" class="filter-item" placeholder="输入关键字进行过滤" clearable
                style="width: 200px; margin-left: 25px; margin-top: 15px"/>
      <el-tree
        class="filter-tree"
        :data="orgTree"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
        :highlight-current="true"
        ref="tree"
        style="margin-left: 25px; margin-top: 10px">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="treeForm = false">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="注销提示" :visible.sync="cancellationForm" v-loading="cancellationLoading" width="30%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">
      <div style="margin-top: 5%; margin-left: 5%; margin-bottom: 5%">确定要注销此开票人吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancellationForm = false">
          取消
        </el-button>
        <el-button type="danger" @click="cancellationData">
          注销
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="换车提示" :visible.sync="changeForm" v-loading="changeLoading" width="30%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">
      <el-form ref="form" :model="queryChange" label-width="30%" size="mini" @submit.native.prevent
               :hide-required-asterisk="true">
        <el-form-item label="车牌号" prop="plateNo" style="margin-top: 5%">
          <el-input v-model="queryChange.plateNo" style="width: 50%;">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="changeData">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="导入提示" :visible.sync="errorForm"  :close-on-click-modal="false" width="30%">
      <div style="margin-top: 5%; margin-left: 5%; margin-bottom: 5%">是否下载错误信息</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="errorForm = false">取 消</el-button>
        <el-button type="primary" @click="downFile">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="增加税号" :visible.sync="show.edit" v-loading="editLoading"  width="30%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">
      <el-form ref="form" :model="queryEdit" label-width="30%" size="mini" @submit.native.prevent
               :hide-required-asterisk="true">
        <el-form-item label="姓名" prop="realName" style="margin-top: 5%">
          <el-input v-model="queryEdit.realName"  show-word-limit maxlength="20" clearable placeholder="输入用户姓名" style="width: 60%;">
          </el-input>
        </el-form-item>
        <el-form-item label="税号" prop="invoiceNo" style="margin-top: 2%">
          <el-input v-model="queryEdit.invoiceNo"  show-word-limit maxlength="30" clearable placeholder="输入税号" style="width: 60%;">
          </el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idCard" style="margin-top: 2%">
          <el-input v-model="queryEdit.idCard"  show-word-limit maxlength="20" clearable placeholder="输入身份证" style="width: 60%;">
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" style="margin-top: 2%">
          <el-input v-model="queryEdit.phone"  show-word-limit maxlength="20" clearable placeholder="输入手机号" style="width: 60%;">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show.edit = false">
          取消
        </el-button>
        <el-button type="primary" @click="addInvoiceNo">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="税号编辑" :visible.sync="updateForm" v-loading="updateLoading" width="30%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">
      <el-form ref="form" :model="queryUpdate" label-width="30%" size="mini" @submit.native.prevent
               :hide-required-asterisk="true">
        <el-form-item label="姓名" prop="userRealName" style="margin-top: 5%">
          <el-input v-model="queryUpdate.userRealName" style="width: 50%;">
          </el-input>
        </el-form-item>
        <el-form-item label="税号" prop="invoiceNo" style="margin-top: 2%">
          <el-input v-model="queryUpdate.invoiceNo" style="width: 50%;">
          </el-input>
        </el-form-item>
        <el-form-item label="机构" prop="orgName" style="margin-top: 2%">
          <el-input v-model="queryUpdate.orgName" style="width: 50%;">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="历史记录" :visible.sync="historyForm" width="50%">
      <el-table
        :data="historyTable"
        stripe
        style="width: 100%;"
        :header-cell-style="{
                        'text-align': 'center',
                        'color': '#23262b',
                        'font-size': '14px'}"
        height="250">
        <el-table-column prop="insertTimestamp" label="时间" align="center">
          <template slot-scope="scope">
            {{scope.row.insertTimestamp | fmtTime }}
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="记录" align="center">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import { getToken } from '@/utils/auth'
  export default {
    data() {
      return {
        queryEdit:{},
        queryList: {
          size: 20,
          current: 1,
          params: {
            idCard: "",
            insertEndTime: null,
            insertStartTime: 0,
            phone: "",
            realName: "",
            status: 0,
            useEndTime: null,
            useStartTime: null
          }
        },
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        historyTable: [],
        queryCancellation: {
          id: undefined,
        },
        queryChange: {
          id: undefined,
          oldCarId: undefined,
          plateNo: undefined
        },
        queryUpdate: {
          id: undefined,
          invoiceNo: undefined,
          userRealName: undefined,
          orgName: undefined
        },
        queryHistory: {
          id: undefined,
        },
        queryTree: {
          orgId: undefined
        },
        uploadHeader: {
          'x-access-token': getToken()
        },
        queryReport: {
          current: 1,
          params: {
            orgId: '',
            orgName: ''
          }
        },
        show:{
          edit:false
        },
        tempSize:1000,
        useTime: [],
        insertTime: [],
        loadingText: '',
        errorUrl: null,
        loading: false,
        cancellationLoading: false,
        importLoading: false,
        changeLoading: false,
        updateLoading: false,
        historyLoading: false,
        cancellationForm: false,
        changeForm: false,
        updateForm: false,
        errorForm: false,
        treeForm: false,
        historyForm: false,
        listButton: false,
        cancellationButton: false,
        exportButton: false,
        importButton: false,
        changeButton: false,
        updateButton: false,
        historyButton: false,
        editLoading: false,
        //机构树
        orgTree: [],
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'orgName'
        },
      };
    },
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
          this.cancellationButton = true;
          this.exportButton = true;
          this.importButton = true;
          this.changeButton = true;
          this.updateButton = true;
          this.historyButton = true;

        } else {
          if (perms.includes('POST /admin/invoice/orgList')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/invoice/cancellation')) {
            this.cancellationButton = true;
          }
          if (perms.includes('POST /admin/invoice/orgExport')) {
            this.exportButton = true;
          }
          if (perms.includes('POST /admin/invoice/importExcel')) {
            this.importButton = true;
          }
          if (perms.includes('POST /admin/invoice/updateCar')) {
            this.changeButton = true;
          }
          if (perms.includes('POST /admin/invoice/updateOrg')) {
            this.updateButton = true;
          }
          if (perms.includes('POST /admin/invoice/orgHistory')) {
            this.historyButton = true;
          }
        }
      },
      addInvoiceNo(){
        this.editLoading = true
        this.request('api_admin_invoice_insertOrg', this.queryEdit).then((res) => {
          this.editLoading = false
          this.$notify.success({
            title: '成功',
            message: '增加税号'
          })
          this.getList()
          this.show.edit = false
        }).catch((error) => {
          this.editLoading = false
          this.$notify.error({
            title: '失败',
            message: '增加税号失败'
          })
          this.show.edit = false
        });
        console.log('增加税号')
      },
      goEdit(){
        this.show.edit = true
      },
      closeEdit(){
        this.show.edit = false
      },
      handleFilter() {
        if (this.useTime && this.useTime.length > 1) {
          this.queryList.params.useStartTime = this.useTime[0].getTime();
          this.queryList.params.useEndTime = this.useTime[1].getTime();
        } else {
          this.queryList.params.useStartTime = null;
          this.queryList.params.useEndTime = null;
        }
        if (this.insertTime && this.insertTime.length > 1) {
          this.queryList.params.insertStartTime = this.insertTime[0].getTime();
          this.queryList.params.insertEndTime = this.insertTime[1].getTime();
        } else {
          this.queryList.params.insertStartTime = null;
          this.queryList.params.insertEndTime = null;
        }
        this.queryList.current = this.tableData.current
        this.getList();
      },
      getList() {
        this.loadingText = '正在查询中。。。'
        this.loading = true
        this.request('api_admin_invoice_orgList', this.queryList).then((res) => {
          this.tableData = res;
          this.loading = false
        }).catch((error) => {
          console.log(error)
          this.loading = false
        });
      },
      handleCancellation(row) {
        this.queryCancellation.id = row.id
        this.cancellationForm = true
      },
      cancellationData() {
        this.cancellationLoading = true
        this.request('api_admin_invoice_cancellation', this.queryCancellation).then((res) => {
          this.cancellationLoading = false
          this.$notify.success({
            title: '成功',
            message: '注销成功'
          })
          this.getList()
          this.cancellationForm = false
        }).catch((error) => {
          this.cancellationLoading = false
          this.$notify.error({
            title: '失败',
            message: '注销失败，请重试'
          })
          this.cancellationForm = false
        });
      },
      handleChange(row){
        this.queryChange.id = row.id
        this.queryChange.oldCarId = row.invoiceCarId
        this.queryChange.plateNo = row.plateNo
        this.changeForm = true
      },

      changeData(){
        this.changeLoading = true
        this.request('api_admin_invoice_updateCar',this.queryChange).then((res) => {
          this.changeLoading = false
          this.$notify.success({
            title: '成功',
            message: '更换车辆成功'
          })
          this.getList()
          this.changeForm = false
        }).catch((error) => {
          this.changeLoading = false
          this.$notify.error({
            title: '失败',
            message: error.msg
          })
        });
      },
      handleUpdate(row){
        this.queryUpdate.id = row.id
        this.queryUpdate.userRealName = row.userRealName
        this.queryUpdate.invoiceNo = row.invoiceNo
        this.queryUpdate.orgName = row.orgName
        this.updateForm = true
      },

      updateData(){
        this.updateLoading = true
        this.request('api_admin_invoice_updateOrg',this.queryUpdate).then((res) => {
          this.updateLoading = false
          this.$notify.success({
            title: '成功',
            message: '编辑成功'
          })
          this.getList()
          this.updateForm = false
        }).catch((error) => {
          this.updateLoading = false
          this.$notify.error({
            title: '失败',
            message: error.msg
          })
        });
      },
      handleHistory(row) {
        this.queryHistory.id = row.id
        this.loadingText = '历史记录加载中。。。'
        this.loading = true
        this.historyData();
      },
      historyData() {
        this.request('api_admin_invoice_orgHistory', this.queryHistory).then((res) => {
          this.historyTable = res
          this.loading = false
          this.historyForm = true
        }).catch((error) => {
          this.loading = false
          this.$notify.error({
            title: '失败',
            message: '历史记录加载失败，请重试'
          })
        });
      },
      handleExcelExport() {
        this.loadingText = '正在导出，请稍后。。。'
        this.loading = true
        this.queryList.current = this.tableData.current
        this.request('api_admin_invoice_orgExport', this.queryList).then((res) => {
          this.loading = false
        }).catch((error) => {
          this.loading = false
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
        this.request('api_admin_invoice_errExcel', params).then((res) => {
          console.log(res);
        }).catch((error) => {
        });
      },
      getExample() {
        let params = {};
        this.request('api_admin_invoice_template', params).then((res) => {
        }).catch((error) => {
        });
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
      handleNodeClick(data) {
        this.queryList.params.orgId = data.orgId
        this.queryList.params.orgName = data.orgName
      },
      getUserInfo() {
        this.queryList.params.orgId = this.$store.getters.orgId
        this.queryTree.orgId = this.$store.getters.orgId
      }
    },
    async created() {
      await this.getUserInfo()
      this.getPerms()
      this.getTree()
    },
    mounted() {
      this.queryReport.params.orgId = this.$store.getters.orgId
      this.request('api_admin_carReport', this.queryReport).then((res) => {
        this.tempSize = res.invoice.invoiceTotalCount
      }).catch((error) => {
      });
      this.getList();
    }
  }
</script>

