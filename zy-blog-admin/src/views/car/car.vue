<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query">
      <el-input v-model="query.org_name" placeholder="组织机构" size="mini" @focus="showTree"></el-input>
      <el-input size="mini" v-model="query.plate_no" placeholder="车牌号" style="width: 100%"></el-input>
      <el-button @click="doQuery()" size="mini" icon="el-icon-search">查询</el-button>
      <el-button size="mini" @click="doAdd()"
                 icon="el-icon-circle-plus-outline" v-if="createButton">新增
      </el-button>
      <el-button @click="doExcelExport" size="mini" icon="el-icon-document" v-if="exportButton">导出</el-button>
      <el-upload
        :headers="uploadHeader"
        class="upload-demo"
        accept=".xlsx,.xls"
        :show-file-list="false"
        action="/taxi-server/admin/importExcelCars"
        :on-progress="onProgress"
        :on-success="onSuccess"
        :on-error="onError">
        <el-button size="mini" icon="el-icon-document" v-if="importButton">
          导入
        </el-button>
      </el-upload>
      <div style="text-decoration: underline; color: #3b91b6" @click="getExample" v-if="importButton">导入车辆模板下载</div>
      <el-upload
        :headers="uploadHeader"
        ref="fileRefs"
        class="upload-demo"
        accept=".xlsx,.xls"
        :show-file-list="false"
        action="/taxi-server/admin/importExcelTerminal"
        :on-progress="onProgress"
        :on-success="onSuccess"
        :on-error="onError">
      </el-upload>
      <el-button size="mini" icon="el-icon-document" @click="uploadBtnAction" v-if="importButton">
        生成终端
      </el-button>
    </div>
    <div class="app-table-contain">
      <div style="height: 100%;" ref="ztable">
        <el-table
          stripe
          v-loading="loading"
          :element-loading-text="loadingText"
          :data="tableData.records" :stripe="true" border
          style="width: 100%;"
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column width="200" prop="plateNo" label="车牌号">
          </el-table-column>
          <el-table-column width="200" prop="qrCode" label="二维码信息">
          </el-table-column>
          <el-table-column width="200" prop="pasteCodeDesc" label="贴码">
          </el-table-column>
          <el-table-column prop="din" label="车机号">
          </el-table-column>
          <el-table-column prop="modeDesc" label="运营模式">
          </el-table-column>
          <el-table-column prop="vin" label="车架号">
          </el-table-column>
          <el-table-column prop="vehicleCarBrand" label="品牌型号">
          </el-table-column>
          <el-table-column width="200" label="发证时间">
            <template slot-scope="scope">
              {{ scope.row.vehicleCarPubTime|fmtTime('yyyy-MM-dd') }}
            </template>
          </el-table-column>
          <el-table-column width="220" prop="orgName" label="所属公司">
          </el-table-column>
          <el-table-column width="250" label="当前当班人">
            <template slot-scope="scope">
              {{ scope.row.userRealName }}
              <template v-if="!strEmpty(scope.row.onTime)">（时间:{{ scope.row.onTime|fmtTime }}）</template>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" fixed="right" width="270">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" icon="el-icon-document"
                           @click="handleView(scope.row)">查看
                </el-button>
                <el-button size="mini" type="primary" icon="el-icon-edit" v-if="createButton"
                           @click="handleEdit(scope.row)">编辑
                </el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" v-if="scrapButton"
                           @click="handleScrap(scope.row)">报废
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
    <el-dialog title="车辆详情" :visible.sync="ctl.show" :close-on-press-escape="false" :close-on-click-modal="false">
      <viewinfo v-if="ctl.show" ref="view" :read="ctl.read" :propTree="orgTree"
                v-on:appClose="ctl.read=false;ctl.show=false;"
                v-on:reload="doQuery()"></viewinfo>
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
    <el-dialog title="导入提示" :visible.sync="excelResult" width="30%">
      <div style="margin: 7% 0 7% 7%;">导入失败，是否下载错误信息</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="excelResult = false">取 消</el-button>
        <el-button type="primary" @click="downFile">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="报废提示" :visible.sync="scrapForm">
      <div style="margin:20px 30px 30px 30px; font-weight: bold; font-size: 20px">确定要报废此车辆吗?</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="scrapForm = false">
          取消
        </el-button>
        <el-button type="danger" @click="scrapData">
          报废
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" class="dio" :visible.sync="inputPasseord" width="30%">
      <div class="teminals" style="margin:20px 30px 30px 30px;display: flex;min-width: 450px">
        <el-form ref="terminalForm" :model="terminalForm" label-width="50px" size="mini">
          <el-form-item label="密码"
                        prop="password"
                        :rules="[
                                  { required: true, message: '密码不能为空'},
                                  { type: 'number', message: '密码必须为数字值'}]">
            <el-input autocomplete="off"
                      maxlength="4"
                      show-word-limit
                      v-model.number="terminalForm.password"
                      show-password
                      clearable
                      style="width: 400px" placeholder="请输入密码" size="mini">
            </el-input>
          </el-form-item>
          <div class="psswod-err" v-if="showErrPass">密码错误！</div>
          <el-form-item>
            <el-button size="mini" type="primary" @click="inputPasseord = false;showErrPass = false">
              取消
            </el-button>
            <el-button size="mini" type="danger" @click="saveInputPasseord('terminalForm')">
              确认
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import viewinfo from './view.vue';
import {getToken} from '@/utils/auth'

export default {
  components: {viewinfo},
  data() {
    return {
      ctl: {
        show: false,
        read: false,
        delShow: false
      },
      showErrPass: false,
      terminalForm: {},
      disabled: false,//控制生成终端的上传
      inputPasseord: false,//控制生成终端的上传输入密码框
      tableData: {
        total: 0,
        size: null,
        current: 1,
        records: []
      },
      viewVal: {},
      loading: false,
      loadingText: '',
      scrapId: '',
      excelResult: false,
      listButton: false,
      createButton: false,
      importButton: false,
      exportButton: false,
      scrapButton: false,
      scrapForm: false,
      uploadHeader: {
        'x-access-token': getToken()
      },
      query: {
        plate_no: '',
        org_id: '',
        org_name: ''
      },
      queryTree: {
        orgId: undefined
      },
      orgTree: [],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'orgName'
      },
      treeForm: false,
    };
  },
  watch: {
    'terminalForm.password'(val) {
      if (val == '') {
        this.showErrPass = false
      }
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {

    getPerms() {
      let perms = this.$store.getters.perms
      if (perms.includes('*')) {
        this.createButton = true;
        this.listButton = true;
        this.importButton = true;
        this.exportButton = true;
        this.scrapButton = true;
      } else {
        if (perms.includes('POST /admin/addOrUptCar')) {
          this.createButton = true;
        }
        if (perms.includes('POST /admin/carlst')) {
          this.listButton = true;
        }
        if (perms.includes('POST /admin/importExcelCars')) {
          this.importButton = true;
        }
        if (perms.includes('POST /admin/exportCarlst')) {
          this.exportButton = true;
        }
        if (perms.includes('POST /admin/scrapCar')) {
          this.scrapButton = true;
        }
      }
    },
    doDel(index, val, ref) {
      console.log(val.carId);
      ref.doClose();
    },
    doAdd() {
      this.ctl.show = true;
      this.ctl.read = false;
      let that = this;
      //这里element弹框有延迟问题，view组件未加载
      setTimeout(function () {
        that.$refs.view.open({}, false);
      }, 100);
    },
    handleView(row) {
      let p = {
        carId: row.carId
      }
      this.request('api_admin_carDetail', p).then((res) => {
        this.doView(res)

      }).catch((error) => {
      });
    },
    handleEdit(row) {
      let p = {
        carId: row.carId
      }
      this.request('api_admin_carDetail', p).then((res) => {
        this.doEdit(res)
      }).catch((error) => {
      });
    },
    doEdit(val) {
      console.log('val')
      console.log(val)
      this.ctl.show = true;
      this.ctl.read = false;
      let that = this;
      //这里element弹框有延迟问题，view组件未加载
      setTimeout(function () {
        that.$refs.view.open(val, false);
      }, 100);
    },
    doView(val) {
      this.ctl.show = true;
      this.ctl.read = true;
      let that = this;
      //这里element弹框有延迟问题，view组件未加载
      setTimeout(function () {
        that.$refs.view.open(val, true);
      }, 100);
    },
    doQuery(val) {
      let p = {
        current: val ? val : this.tableData.current,
        params: this.query
      };
      this.queryData(p);
    },
    queryData(val) {
      let p = val;
      if (val === undefined) {
        p = {
          current: this.tableData.current,
          params: {org_id: this.$store.getters.orgId}
        }
      }
      this.loading = true
      this.loadingText = '查询中。。。'
      this.request('api_admin_carlst', p).then((res) => {
        this.tableData = res;
        this.loading = false
      }).catch((error) => {
        this.loading = false
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
    },
    handleNodeClick(data) {
      this.query.org_id = data.orgId
      this.query.org_name = data.orgName
    },
    selectOrg() {
      this.treeForm = false
    },
    // 点击了上传文件按钮的方法，我们是在这里进行拦截，假如不满足条件，则不弹出文件选择框
    uploadBtnAction() {
      this.disabled = false;
      this.loading = false;
      this.inputPasseord = true //打开输入密码弹窗
      this.showErrPass = false
    },
    saveInputPasseord(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (that.terminalForm.password === 1027) {
            that.inputPasseord = false
            that.showErrPass = false
            that.$refs['fileRefs'].$refs['upload-inner'].handleClick()
          } else {
            that.showErrPass = true
            console.log('密码错误')
          }
        } else {
          that.showErrPass = false
          console.log('error submit!!');
          return false;
        }
      });

    },
    beforeUpload(file) {
    },
    onProgress() {
      this.loadingText = '导入中，请稍后。。。'
      this.loading = true
    },
    onSuccess(response, file, fileLile) {
      this.loading = false
      if (response.result === 0) {
        this.errorUrl = response.errFile;
        this.excelResult = true;
        console.log(this.errorUrl);
      } else {
        this.$notify.success({
          title: '成功',
          message: '导入成功'
        })
        this.doQuery(1)
      }
    },
    onError(err, file, fileList) {
      this.loading = false
    },
    downFile() {
      this.excelResult = false;
      let params = {};
      params.fileUrl = this.errorUrl;
      this.request('api_admin_car_err', params).then((res) => {
        console.log(res);
      }).catch((error) => {
      });
    },
    getExample() {
      let params = {};
      this.request('api_admin_car_templateDownload', params).then((res) => {
      }).catch((error) => {
      });
    },
    doExcelExport() {
      this.loadingText = '正在导出，请稍后。。。'
      this.loading = true
      let p = {
        params: this.query
      };
      this.request('api_admin_exportCar', p).then((res) => {
        this.loading = false
      }).catch((error) => {
        this.loading = false
      });
    },
    handleScrap(row) {
      this.scrapId = row.carId
      this.scrapForm = true
    },
    scrapData() {
      let p = {
        carId: this.scrapId
      }
      this.request('api_admin_car_scrap', p).then((res) => {
        this.$notify.success({
          title: '成功',
          message: '报废车辆成功'
        })
        this.queryData()
        this.scrapForm = false
      }).catch(error => {
        this.$notify.error({
          title: '失败',
          message: error.msg
        })
        this.scrapForm = false
      })
    },
    getUserInfo() {
      this.queryTree.orgId = this.$store.getters.orgId
      this.query.org_id = this.$store.getters.orgId
    }
  },
  created() {
    this.getUserInfo()
    this.getPerms()
    setTimeout(this.getTree(), 1000)
  },
  mounted() {
    this.queryData();
    // console.log(this.$refs.ztable);
  }

}
</script>

<style lang="scss">
.teminals {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 40px;

  .lable-psa {
    width: 40px;
  }
}

.dio .el-dialog {
  min-width: 550px !important;

  .psswod-err {
    color: red;
    line-height: 20px;
    padding-bottom: 20px;
    padding-left: 50px;
  }
}
</style>
