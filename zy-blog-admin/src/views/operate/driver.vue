<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-input size="mini" v-model="query.user_real_name" placeholder="用户姓名" style="width: 100%" clearable></el-input>
      <el-input size="mini" v-model="query.id_card" placeholder="身份证" style="width: 100%" clearable></el-input>
      <el-input size="mini" v-model="query.userTel" placeholder="手机号" style="width: 100%" clearable></el-input>
      <el-select size="mini" v-model="query.pay_chanel" placeholder="进件类型" clearable>
        <el-option label="农行" :value="2"></el-option>
        <el-option label="交行" :value="3"></el-option>
        <el-option label="招行" :value="4"></el-option>
        <el-option label="招行个人" :value="5"></el-option>
      </el-select>
      <span style=" color:#23262b; font-size:13px; margin-left:17px">添加时间</span>
      <el-date-picker
        size="mini"
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        value-format="timestamp">
      </el-date-picker>
      <el-input size="mini" v-model="query.id_card" placeholder="银行卡号" style="width: 100%" clearable></el-input>
      <el-button @click="doQuery()" size="mini" icon="el-icon-search">查询</el-button>
    </div>
    <div class="app-table-tools">
      <el-upload
        :headers="uploadHeader"
        class="upload-demo"
        accept=".xlsx,.xls"
        :show-file-list="false"
        action="/taxi-server/admin/importExcel"
        :on-success="onSuccess"
        :on-progress="onProgress"
        :on-error="onError">
        <el-button size="mini" type="primary" icon="el-3-icon el-3-iconfabu" v-if="driverUploadButton">
          导入
        </el-button>
      </el-upload>
      <div>
        <el-popover ref="ex1" placement="right" width="400px" v-model="ctl.exportShow" size="mini">
          <div class="app-table-tools-pop-title">
            导出设置
          </div>
          <el-form size="mini" @submit.native.prevent label-width="100px">
            <el-form-item label="导出模式">
              <el-radio v-model="excelExport.flg" :label="1">全部</el-radio>
              <el-radio v-model="excelExport.flg" :label="2">当前页</el-radio>
            </el-form-item>
            <el-form-item label="用户姓名">
              <el-input v-model="excelExport.user_real_name" placeholder="用户姓名"></el-input>
            </el-form-item>
            <el-form-item label="进件类型">
              <el-select v-model="query.pay_chanel">
                <el-option label="农行" :value="2"></el-option>
                <el-option label="交行" :value="3"></el-option>
                <el-option label="招行" :value="4"></el-option>
                <el-option label="招行个人" :value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="ctl.exportShow = false">取消</el-button>
            <el-button type="primary" size="mini" @click="doExcelExport()">确定</el-button>
          </div>

        </el-popover>
        <el-button size="mini" type="primary" v-popover:ex1 icon="el-3-icon el-3-icondaochu" @click="ctl.exportShow = true" v-if="exportButton">
          导出
        </el-button>
      </div>
      <el-button v-if="createButton" class="filter-item" type="primary"
                 @click="handleCreate" size="mini">新增</el-button>
      <div class="downMB"  @click="getExample" v-if="driverUploadButton">导入用户模板下载</div>
    </div>
    <div class="app-table-contain">
      <div style="height: 100%;" ref="ztable">
        <el-table
          stripe
          height="640"
          v-loading="loading"
          :element-loading-text="loadingText"
          :data="tableData.records" :stripe="true" border
          style="width: 100%;"
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column width="200" prop="idCard" label="身份证号">
          </el-table-column>
          <el-table-column prop="userRealName" label="用户姓名">
          </el-table-column>
          <el-table-column width="200" prop="userTel" label="用户手机号">
          </el-table-column>
          <el-table-column width="200" prop="account" label="银行卡帐号"></el-table-column>

          <el-table-column label="持卡银行">
            <template slot-scope="scope">
              {{scope.row.payChanel|fmtPayChanel}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="200px">
            <template slot-scope="scope">
              <el-button-group>
<!--                <el-button size="mini" type="primary" v-if="resetButton" icon="el-icon-edit-outline"-->
<!--                           @click="handleReset(scope.row)">重置密码-->
<!--                </el-button>-->
<!--                <el-button size="mini" type="primary" v-if="recognitionButton" icon="el-icon-view"-->
<!--                           @click="handleRecognition(scope.row)">重置识别-->
<!--                </el-button>-->
                <el-button size="mini" type="primary" icon="el-icon-document"
                           @click="doView(scope.row)">查看
                </el-button>
                <el-button size="mini" type="primary" icon="el-icon-edit" v-if="updateButton"
                           @click="handleUpdate(scope.row)">编辑
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="doQuery()"
        :total="tableData.total" :current-page.sync="tableData.current" :page-size="tableData.size"
        style="flex-shrink: 0;padding: 10px">
      </el-pagination>
    </div>
    <el-dialog title="用户详情" :visible.sync="ctl.show" :close-on-press-escape="false" :close-on-click-modal="false">
      <viewinfo v-if="ctl.show" ref="view" :read="ctl.read" v-on:appClose="ctl.read=false;ctl.show=false;"
                v-on:reload="doQuery()"></viewinfo>
    </el-dialog>

    <el-dialog title="司机进件" :visible.sync="ctl.regShow" :close-on-press-escape="false"
               :close-on-click-modal="false">
      <reg v-if="ctl.regShow" ref="reg" v-on:appClose="ctl.regShow=false;" v-on:reload="doQuery()"></reg>
    </el-dialog>

    <el-dialog title="导入提示" :visible.sync="ctl.excelResult" width="30%">
      <span>是否下载错误信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ctl.excelResult = false">取 消</el-button>
        <el-button type="primary" @click="downFile()">确 定</el-button>
      </span>
    </el-dialog>
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
        <el-button type="primary" @click="selectOrg">
          确定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="55%" v-loading="ctl.updateLoading"
               element-loading-text="加载中。。。" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <div class="app-form-class">
        <el-form ref="dataForm" :model="updateList" :rules="rules" label-width="80px" size="mini" @submit.native.prevent>
          <el-row :gutter="20" type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="姓名"  prop="userRealName" label-width="95px">
                <el-input v-model="updateList.userRealName" :disabled="ctl.view">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="手机号" :required="true" prop="userTel" label-width="95px">
                <el-input v-model="updateList.userTel" :disabled="ctl.view"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="身份证号" :required="true" prop="idCard" label-width="95px">
                <el-input v-model="updateList.idCard" :disabled="ctl.edit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="性别" label-width="95px">
                <el-select v-model="updateList.sex" placeholder="请选择" :disabled="ctl.view">
                  <el-option label="男" :value="1"></el-option>
                  <el-option label="女" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="从业资格证号" label-width="108px">
                <el-input v-model="updateList.enbeworRecordId" :disabled="ctl.view"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="从业编号" label-width="95px">
                <el-input v-model="updateList.cmpsnid" :disabled="ctl.view"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="space-between">
            <el-col :span="11" v-if="dialogStatus ==='view'">
              <el-form-item label="行驶证起始" label-width="95px">
                <el-input v-model="updateList.gradate" :disabled="ctl.view"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" v-else>
              <el-form-item label="行驶证起始" label-width="95px">
                <el-date-picker v-model="updateList.gradate" type="datetime"
                                placeholder="请选择" value-format="timestamp" :disabled="ctl.view" />
              </el-form-item>
            </el-col>
            <el-col :span="11" v-if="dialogStatus ==='view'">
              <el-form-item label="行驶证截止" label-width="95px">
                <el-input v-model="updateList.enddate" :disabled="ctl.view"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" v-else>
              <el-form-item label="行驶证截止" label-width="95px">
                <el-date-picker v-model="updateList.enddate" type="datetime"
                                value-format="timestamp" placeholder="请选择" :disabled="ctl.view"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="space-between">
            <el-col :span="11" v-if="dialogStatus ==='view'">
              <el-form-item label="年检日期" label-width="95px">
                <el-input v-model="updateList.examinedate" :disabled="ctl.view"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" v-else>
              <el-form-item label="年检日期" label-width="95px">
                <el-date-picker v-model="updateList.examinedate" type="datetime"
                                value-format="timestamp" placeholder="请选择" :disabled="ctl.view"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="所属公司" label-width="95px">
                <el-input v-model="updateList.orgName" @focus="showTree" :disabled="ctl.view"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="space-between">
            <el-col :span="11" v-if="dialogStatus === 'view'">
              <el-form-item label="农行余额">
                <el-input v-model="nh.balance" :disabled="true">
                  <span slot="suffix">元</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="绑定车辆" label-width="95px">
                <el-input v-model="updateList.bindingCar" @focus="handleBind" :disabled="ctl.view"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="是否停用" label-width="95px">
                <el-radio-group v-model="updateList.status" :disabled="ctl.view">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="0">停用</el-radio>
                  <el-radio :label="2">注销</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="space-between">
            <el-col :span="24">
              <el-form-item label="备注信息" label-width="95px">
                <el-input v-model="updateList.remark"   type="textarea"
                          :rows="2" :disabled="ctl.view" style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-row type="flex" justify="center" style="padding: 16px">
        <el-col :span="12" style="display:flex;justify-content: center">
          <el-button @click="closeForm">取消</el-button>
          <!--<el-button v-if="dialogStatus==='create'" type="primary" @click="createData">确定</el-button>-->
          <el-button type="primary" @click="updateData">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="passwordForm">
      <div style="margin:15px 10px 20px 20px">确定要重置该司机的登录密码吗?</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="resetPassword">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="recognitionForm">
      <div style="margin:15px 10px 20px 20px">确定要重置该司机的人脸识别功能吗?</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="recognitionForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="resetRecognition">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择绑定车辆" :visible.sync="bindForm" width="45%" v-loading="bindLoading"
               element-loading-text="处理中。。。"  :show-close="false">
      <div style="text-align: center; padding-bottom: 20px; padding-top: 20px">
        <el-transfer
          ref="transfer"
          style="text-align: left; display: inline-block"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="车牌号筛选"
          v-model="queryBind.carIds"
          @change="handleChange"
          :titles="['待选择车辆', '已选择车辆']"
          :data="carData">
        </el-transfer>
        <div slot="footer" class="dialog-footer" style="margin-top: 20px;">
          <el-button @click="closeBind">
            取消
          </el-button>
          <el-button type="primary" @click="bindData" :disabled="queryBind.carIds.length === 0">
            绑定
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import viewinfo from './view.vue';
  import reg from './reg.vue';
  import tool from '@libs/tool';
  import {getToken} from '@/utils/auth'

  export default {
    components: {viewinfo, reg},
    computed: {},
    data() {
      return {
        ctl: {
          show: false,
          read: false,
          view: false,
          loading: false,
          updateLoading: false,
          regShow: false,
          edit: false,
          add: false,
          exportShow: false,
          excelResult: false
        },
        nh: {},
        excelExport: {
          user_real_name: '',
          pay_chanel: null,
          flg: 1,
          org_id: ''
        },
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        viewVal: {},
        orgList: [],
        carList: [],
        carData: [],
        uploadHeader: {
          'x-access-token': getToken()
        },
        loading: false,
        loadingText: '',
        errorUrl: null,
        date: null,
        exportButton: false,
        resetButton: false,
        extractButton: false,
        driverUploadButton: false,
        updateButton: false,
        listButton: false,
        createButton: false,
        recognitionButton: false,
        query: {
          user_real_name: '',
          id_card: '',
          pay_chanel: null,
          org_id: '',
          org_name: '',
          userTel:'',
          status: 1
        },
        queryTree: {
          orgId: undefined
        },
        queryReset: {
          idCard: null
        },
        queryBind: {
          idCard: undefined,
          carIds: []
        },
        orgTree: [],
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'orgName'
        },
        treeForm: false,
        passwordForm: false,
        bindForm: false,
        recognitionForm: false,
        bindLoading: false,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑用户',
          create: '新建用户',
          view: '用户详情'
        },
        bindCar: '',
        rules: {
          userRealName: [
            {required: true, message: '司机姓名不能为空', trigger: 'blur'}
          ],
          userTel: [
            {required: true, message: '手机号不能为空', trigger: 'blur'},
            {
              pattern: /^[1][3|4|5|6|7|8|9][0-9]{9}$/,
              message: '手机号格式错误'
            }
          ],
          idCard: [
            {required: true, message: '身份证不能为空', trigger: 'blur'},
            {
              pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
              message: '身份证格式错误'
            }
          ]
        },
        updateList: {
          userRealName: '',
          userTel: '',
          idCard: '',
          sex: 1,
          enbeworRecordId: undefined,
          cmpsnid: undefined,
          gradate: undefined,
          enddate: undefined,
          examinedate: undefined,
          orgId: '',
          orgName: '',
          bindingCar: '',
          remark: '',
          status: 1,
          isCreate: ''
        }
      };
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      'query.status': {
        deep: true,
        handler(val) {
          if(val === 0){
            this.query.org_id = null
            this.excelExport.org_id = null
            this.query.org_name = ''
          }else {
            this.query.org_id = this.$store.getters.orgId
            this.excelExport.org_id = this.$store.getters.orgId
          }
        }
      }
    },
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.exportButton = true;
          this.resetButton = true;
          this.recognitionButton = true;
          this.extractButton = true;
          this.driverUploadButton = true;
          this.updateButton = true;
          this.listButton = true;
          this.createButton = true;
        } else {
          if (perms.includes('POST /admin/exportDriver')) {
            this.exportButton = true;
          }
          if (perms.includes('POST /admin/resetPassword')) {
            this.resetButton = true;
          }
          if (perms.includes('POST /admin/resetRecognition')) {
            this.recognitionButton = true;
          }
          if (perms.includes('POST /admin/driverExtractMoney')) {
            this.extractButton = true;
          }
          if (perms.includes('POST /admin/importExcel')) {
            this.driverUploadButton = true;
          }
          if (perms.includes('POST /admin/addOrUptDriver')) {
            this.updateButton = true;
            this.createButton = true;
          }
          if (perms.includes('POST /admin/driverlst')) {
            this.listButton = true;
          }
        }
      },
      handleReset(row){
        this.queryReset.idCard = row.idCard
        this.passwordForm = true
      },
      resetPassword(){
        this.request('api_admin_resetPassword', this.queryReset).then((res) => {
          this.passwordForm = false
          this.$notify.success({
            title: '成功',
            message: '司机登录密码重置成功'
          })
        }).catch((error) => {
          this.$notify.error({
            title: '失败',
            message: '司机登录密码重置失败，请重试'
          })
          this.passwordForm = false
        });
      },
      handleRecognition(row){
        this.queryReset.idCard = row.idCard
        this.recognitionForm = true
      },
      resetRecognition(){
        this.request('api_admin_resetRecognition', this.queryReset).then((res) => {
          this.recognitionForm = false
          this.$notify.success({
            title: '成功',
            message: '人脸识别重置成功'
          })
        }).catch((error) => {
          this.$notify.error({
            title: '失败',
            message: '人脸识别重置失败，请重试'
          })
          this.recognitionForm = false
        });
      },
      doExcelExport() {
        let p = {
          current: this.excelExport.flg === 1 ? null : this.tableData.current,
          params: this.excelExport
        };
        this.request('api_admin_exportDriver', p).then((res) => {
          // this.tableData = res;
          console.log('res')
          console.log(res)
        }).catch((error) => {
          console.log('error')
          console.log(error);
        });

        this.ctl.exportShow = false;
      },
      importExcel() {
        let that = this;
        //这里element弹框有延迟问题，view组件未加载
        setTimeout(function () {
          that.$refs.view.open({}, false);
        }, 100);
      },
      doReReg(index, val) {
        this.ctl.regShow = true;
        let that = this;
        //这里element弹框有延迟问题，view组件未加载
        setTimeout(function () {
          that.$refs.reg.open(val);
        }, 100);
      },
      doEdit(index, val) {
        this.ctl.show = true;
        this.ctl.read = false;
        let that = this;
        //这里element弹框有延迟问题，view组件未加载
        setTimeout(function () {
          that.$refs.view.open(val, false);
        }, 100);
      },
      doView(row) {
        // this.ctl.show = true;
        // this.ctl.read = true;
        // let that = this;
        // //这里element弹框有延迟问题，view组件未加载
        // setTimeout(function () {
        //   that.$refs.view.open(val, true);
        // }, 100);
        this.queryNHTotal(row.shopno)
        this.dialogStatus = 'view'
        let p = {
          idCard: row.idCard
        }
        this.ctl.updateLoading = true
        this.request('api_admin_driverDetail', p).then((res) => {
          this.updateList = res
          this.updateList.isCreate = 0
          this.ctl.view = true
          this.ctl.edit = true
          this.ctl.add = false
          this.dialogFormVisible = true
          this.ctl.updateLoading = false
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        }).catch((error) => {
          this.ctl.updateLoading = false
          this.$notify.error({
            title: '失败',
            message: '详情获取失败'
          })
        })
      },
      queryNHTotal(shopno) {
        if (this.strEmpty(shopno)) {
          return;
        }
        let p = {
          shopNo: shopno
        };
        this.request('api_admin_pay_querySubmerchatFee', p).then((res) => {
          this.nh = res;
          console.log(res);
          this.nh.balance = res.balance / 100.0
        }).catch((error) => {
        });
      },
      doQuery() {
        this.query.startTime = null;
        this.query.endTime = null;
        if (this.date) { //如果输入了查询时间，添加到查询参数query
          let startTime = this.date[0];
          let endTime = this.date[1];
          this.query.startTime = startTime;
          this.query.endTime = endTime;
        }
        // alert(JSON.stringify(this.query));
        let p = {
          current: this.tableData.current,
          params: this.query
        };
        this.excelExport = tool.cloneObj(this.query);
        this.$set(this.excelExport, 'flg', 2);
        // this.excelExport.flg=1;
        this.queryData(p);
      },
      queryData(val) {
        let p = val;
        this.loading = true
        this.loadingText = '查询中。。。'
        this.request('api_admin_driverlst', p).then((res) => {
          this.loading = false
          console.log(res);
          let data = res;
          for (let driver of data.records) {
            let insertTime = tool.fmtLong2DateTime(driver.intTime)
            this.$set(driver, 'insertTime', insertTime)
            // console.log(JSON.stringify(driver))
          }
          this.tableData = res;
        }).catch((error) => {
          this.loading = false
        });
      },
      onSuccess(response, file, fileLile) {
        this.loading = false
        if (response.result === 0) {
          this.errorUrl = response.errFile;
          this.ctl.excelResult = true;
          console.log(this.errorUrl);
        } else {
          this.$message('导入成功');
        }
        this.doQuery()
      },
      onError(err, file, fileList) {
        this.loading = false
      },
      onProgress(){
        this.loadingText = '导入中，请稍后。。。'
        this.loading = true
      },
      downFile() {
        this.ctl.excelResult = false;
        let params = {};
        params.fileUrl = this.errorUrl;
        this.request('api_admin_err_exportDriver', params).then((res) => {
          console.log(res);
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
      showTree() {
        this.treeForm = true
        this.createDriver = true
      },
      handleNodeClick(data) {
        if (this.ctl.edit || this.createDriver) {
          this.updateList.orgName = data.orgName
          this.updateList.orgId = data.orgId
        } else{
          this.query.org_id = data.orgId
          this.excelExport.org_id = data.orgId
          this.query.org_name = data.orgName
        }
        console.log(data)
      },
      resetForm() {
        this.updateList = {
          userRealName: '',
          userTel: '',
          idCard: '',
          sex: 1,
          enbeworRecordId: undefined,
          cmpsnid: undefined,
          gradate: undefined,
          enddate: undefined,
          examinedate: undefined,
          orgId: this.$store.getters.orgId,
          orgName: this.$store.getters.orgName,
          bindingCar: '',
          remark: '',
          status: 1,
          isCreate: 1
        }
      },
      handleCreate() {
        this.resetForm()
        this.dialogStatus = 'create'
        this.ctl.add = true
        this.ctl.view = false
        this.ctl.edit = false
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleUpdate(row) {
        let p = {
          idCard: row.idCard
        }
        this.ctl.updateLoading = true
        this.request('api_admin_driverDetail', p).then((res) => {
          this.updateList = res
          this.dialogStatus = 'update'
          this.updateList.isCreate = 0
          this.ctl.view = false
          this.ctl.edit = true
          this.ctl.add = false
          this.dialogFormVisible = true
          this.ctl.updateLoading = false
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        }).catch((error) => {
          this.ctl.updateLoading = false
          this.$notify.error({
            title: '失败',
            message: '详情获取失败'
          })
        })
      },
      updateData(){
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) {
            return false;
          }
          let p = this.updateList;
          this.ctl.loading = true;
          this.request('api_admin_addOrUptDriver', p).then((res) => {
            this.ctl.loading = false;
            this.dialogFormVisible = false
            this.ctl.edit = false
            this.ctl.add = false
            this.createDriver = false
            this.doQuery()
            this.$notify.success({
              title: '成功',
              message: '编辑成功'
            })
          }).catch((error) => {
            console.log('error')
            console.log(JSON.stringify(error))
            this.createDriver = false
            this.ctl.loading = false;
            this.dialogFormVisible = false
            this.ctl.edit = false
            this.ctl.add = false
            this.$notify.error({
              title: '失败',
              message: error.msg
            })
          });
        });
      },
      closeForm(){
        this.dialogFormVisible = false
        this.createDriver = false
        this.ctl.edit = false
        this.ctl.add = false
        this.orgName = ''
      },
      queryOrgList() {
        const queryOrg = {
          pageNumber: 1,
          pageSize: 999
        }
        const that = this
        this.request('orgList', queryOrg, true).then(response => {
          that.orgList = response.records
          console.log('org')
          console.log(that.orgList)
        })
      },
      handleChange(value, direction, movedKeys) {
        this.queryBind.carIds = value;
        console.log(value, direction, movedKeys);
      },
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },

      handleBind(){
        this.queryBind.idCard = this.updateList.idCard
        this.bindForm = true
      },
      closeBind(){
        this.bindLoading = false;
        this.bindForm = false
        this.$refs['transfer'].clearQuery("left")
        this.$refs['transfer'].clearQuery("right")
        this.queryBind.carIds = []
      },
      bindData(){
        this.bindLoading = true;
        this.request('api_admin_driver_bindCar', this.queryBind).then((res) =>{
          this.$notify.success({
            title: '成功',
            message: '绑定成功'
          })
          this.closeBind()
          this.dialogFormVisible = false
        })
          .catch(response => {
            this.$notify.error({
              title: '失败',
              message: '绑定失败，请重试'
            })
            this.closeBind()
          })
      },
      getGenerateData(){
        const data = [];
        for(let car of this.carList) {
          data.push({
            label: car.plateNo,
            key: car.carId
          });
        }
        return data;
      },
      queryCarList() {
        const queryCar = {
          orgId : this.$store.getters.orgId
        }
        this.request('api_admin_driver_carList', queryCar, true).then(response => {
          this.carList = response
          console.log('car')
          console.log(this.carList)
          this.carData = this.getGenerateData()
        })
      },
      selectOrg() {
        this.treeForm = false
      },
      getExample() {
        let params = {};
        this.request('api_admin_driver_templateDownload', params).then((res) => {
        }).catch((error) => {
        });
      },
      getUserInfo() {
        this.queryTree.orgId = this.$store.getters.orgId
        this.query.org_id = this.$store.getters.orgId
        this.excelExport.org_id = this.$store.getters.orgId
      }
    },
    async created() {
      await this.getUserInfo()
      this.getPerms()
      this.getTree()
      this.queryOrgList()
      this.queryCarList()
    },
    mounted() {
      this.errorUrl = null;
      let p = {
        current: 1,
        params:{
          org_id: this.$store.getters.orgId
        }
      };
      this.queryData(p);
    }

  }
</script>

<style lang="scss" scoped>
  .downMB {
    color: #3b91b6;
    font-size: 14px;
    padding-top: 10px;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: #1890FF;
    }
  }
</style>
