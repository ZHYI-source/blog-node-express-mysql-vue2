<template>
  <section class="data-list-box">
    <section v-if="!show.edit">
      <lk-search-form
        :key="updataKey + 1"
        :model="query" @handleExport="handleExport"
        :show-query="btnPerm.queryBtn"
        :show-add="btnPerm.editBtn"
        showAdd
        @edit="goEdit()"
        @search="goPage(1)"
      >
        <el-upload
          v-if="btnPerm.importBtn"
          slot="btn"
          :headers="uploadHeader"
          class="lk-btn"
          accept=".xlsx,.xls"
          :show-file-list="false"
          action="/zz-server/admin/invoice/importExcel"
          :on-success="onSuccess"
          :on-progress="onProgress"
          :on-error="onError"
        >
          <el-button size="mini" class="lk-btn" icon="el-icon-download">
            导入
          </el-button>
        </el-upload>
        <div class="downMB" slot="btn" @click="getExample" v-if="btnPerm.templateDownload">模板导入下载</div>

        <el-form-item class="inline-item" prop="realName">
          <el-input v-model.trim="query.params.realName" clearable placeholder="输入用户姓名搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="idCard">
          <el-input v-model.trim="query.params.idCard" clearable placeholder="输入身份证号搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="phone">
          <el-input v-model.trim="query.params.phone" clearable placeholder="输入用户手机号搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="phone">
          <el-select size="mini"

                     clearable placeholder="选择状态搜索"
                     @clear="goPage(1)" @change="goPage(1)"
                     v-model="query.params.status"
          >
            <el-option label="正常" :value="0"></el-option>
            <el-option label="注销" :value="1"></el-option>
            <el-option label="待激活" :value="2"></el-option>
            <el-option label="余额不足" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="inline-item" prop="insertTime">
          <el-date-picker
            @change="goPage(1)"
            v-model="insertTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="税号绑定开始时间"
            end-placeholder="税号绑定结束时间" size="mini"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="inline-item" prop="useTime">
          <el-date-picker
            @change="goPage(1)"
            v-model="useTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="税务登记开始时间"
            end-placeholder="税务登记结束时间" size="mini"
          >
          </el-date-picker>
        </el-form-item>
      </lk-search-form>
      <div class="table-operate">
        <lk-table-field-filter :fields="fields" @showChange="updataKey +=1"/>
        <lk-table-button
          dis-delete
          dis-add
        >
        </lk-table-button>
      </div>
      <lk-el-table
        :key="updataKey"
        :datas="datas" stripe :height="tableHeight" :loadingText="loading.text" :loading="loading.list"
      >
        <template v-for="field in fields" v-if="field.show">
          <el-table-column v-if="field.key=='checkBox'" :align="field.align" type="selection"></el-table-column>

          <el-table-column v-else-if="field.key=='toolButton'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <lk-tool-button @view="handleCancellation(scope.row)"
                              @edit="goEdit(scope.row)"
                              @delete="handleHistory(scope.row)"
                              view-text="注销"
                              edit-text="编辑"
                              delete-text="历史"
                              :dis-view="scope.row.status == 1"
                              :dis-edit="!btnPerm.updateBtn"
                              :dis-delete="!btnPerm.history"
              />
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='status'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.status === 0"> {{ scope.row.statusDesc }}</el-tag>
              <el-tag type="info" v-if="scope.row.status === 1"> {{ scope.row.statusDesc }}</el-tag>
              <el-tag type="danger" v-if="scope.row.status === 2"> {{ scope.row.statusDesc }}</el-tag>
              <el-tag type="warning" v-if="scope.row.status === 3"> {{ scope.row.statusDesc }}</el-tag>
              <el-tag type="warning" v-if="scope.row.status === -1"> {{ scope.row.statusDesc }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            show-overflow-tooltip
            :align="field.align"
            :prop="field.key"
            :label="field.name"
            :width="field.width"
            :sortable="field.enableSort?'custom':false"
            :fixed="field.fixed"
          ></el-table-column>
        </template>
      </lk-el-table>
      <lk-pagination :current-page="query.current" :page-size="query.size"
                     :data-size="temp.dataSize" @changePageSize="changePageSize" @go="goPage"
      />
    </section>
    <get-tax-info v-if="show.edit" :datas="tempData" @close="closeEdit"/>
  </section>
</template>
<script>
/**
 *@author ZY
 *@date 2021/12/10
 *@Description:税号管理
 */
import ViewEmployeeInfo from "@/views/zzPages/operations/view-employee-info";
import GetEmployeeInfo from "@/views/zzPages/operations/get-employee-info";
import {getToken} from "@/utils/auth";
import Tools from "@/libs/tool";
import GetTaxInfo from "@/views/zzPages/tax/get-tax-info";
import ViewTaxHistory from "@/views/zzPages/tax/view-tax-history";

export default {
  name: 'dir-tax-info',
  components: {
    ViewTaxHistory,
    GetTaxInfo,
    GetEmployeeInfo,
    ViewEmployeeInfo,
  },
  watch: {
    'heightL'(val) {
      this.updataKey += 1
      this.tableHeight = val
    },
  },
  data() {
    return {
      heightL: 580,
      tableHeight: 580,
      updataKey: 0,
      uploadHeader: {
        'x-access-token': getToken()
      },
      tempData: {},
      show: {
        edit: false,
        view: false
      },
      date: [],
      //查询条件
      useTime: [],
      insertTime: [],
      query: {
        size: 20,
        current: 1,
        params: {
          idCard: "",
          insertEndTime: null,
          insertStartTime: null,
          phone: "",
          realName: "",
          status: '',
          useEndTime: null,
          useStartTime: null
        }
      },
      btnPerm: {
        queryBtn: false,
        viewBtn: false,
        exportBtn: false,
        editBtn: false,
        updateBtn: false,
        templateDownload: false,
        history: false,
      },
      //返回数据列表
      datas: [],
      //临时变量
      temp: {
        //数据总条数
        dataSize: 0,
        id: ''
      },
      ctl: {
        view: false,
        loading: false
      },
      errorUrl: '',
      //汇总数据
      totals: [],
      //加载中效果
      loading: {
        text: '数据加载中',
        //获取列表数据中
        list: false,
        //行数据的id
        id: ''
      },
      //列表渲染数据列
      fields: [
        {key: 'realName', name: '用户姓名', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'idCard', name: '身份证号', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'phone', name: '用户手机号', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'invoiceNo', name: '纳税人识别号', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'balanceDesc', name: '发票余额', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'countDesc', name: '发票张数', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {
          key: 'useTimestamp',
          name: '税务登记时间',
          show: true,
          width: '180',
          enableSort: false,
          align: "center",
          fixed: false
        },
        {
          key: 'insertTimestamp',
          name: '税务绑定时间',
          show: true,
          width: '180',
          enableSort: false,
          align: "center",
          fixed: false
        },
        {key: 'reason', name: '问题&原因', show: true, width: '90', enableSort: false, align: "center", fixed: false},
        {key: 'status', name: '状态', show: true, width: '120', enableSort: false, align: "center", fixed: 'right'},
        {key: 'toolButton', name: '操作', show: true, width: '250', enableSort: false, align: "center", fixed: 'right'},
      ]
    }
  },
  created() {
    this.getPerms()
    this.getDataList();
  },
  mounted() {
    this.getWinHeight()
    this.getDataList();
  },
  methods: {
    //获取窗口高度
    getWinHeight() {
      let that = this
      this.heightL = window.innerHeight - 340
      window.addEventListener('resize', () => {
        that.updataKey += 1
        that.heightL = window.innerHeight - 340
      })
    },
    //权限判断
    getPerms() {
      let perms = this.$store.getters.perms
      if (perms.includes('*')) {
        this.btnPerm.queryBtn = true;
        this.btnPerm.viewBtn = true;
        this.btnPerm.importBtn = true;
        this.btnPerm.editBtn = true;
        this.btnPerm.updateBtn = true;
        this.btnPerm.templateDownload = true;
        this.btnPerm.history = true;
      } else {
        if (perms.includes('POST /admin/invoice/orgList')) {
          this.btnPerm.queryBtn = true;
        }
        if (perms.includes('POST /admin/invoice/importExcel')) {
          this.btnPerm.importBtn = true;
        }
        if (perms.includes('POST /admin/invoice/insertOrg')) {
          this.btnPerm.editBtn = true;
        }
        if (perms.includes('POST /admin/invoice/updateOrg')) {
          this.btnPerm.updateBtn = true;
        }
        if (perms.includes('POST /admin/invoice/templateDownload')) {
          this.btnPerm.templateDownload = true;
        }
        if (perms.includes('POST /admin/invoice/orgHistory')) {
          this.btnPerm.history = true;
        }
      }
    },
    handleFilter() {
      if (this.useTime && this.useTime.length > 1) {
        this.query.params.useStartTime = this.useTime[0].getTime();
        this.query.params.useEndTime = this.useTime[1].getTime();
      } else {
        this.query.params.useStartTime = null;
        this.query.params.useEndTime = null;
      }
      if (this.insertTime && this.insertTime.length > 1) {
        this.query.params.insertStartTime = this.insertTime[0].getTime();
        this.query.params.insertEndTime = this.insertTime[1].getTime();
      } else {
        this.query.params.insertStartTime = null;
        this.query.params.insertEndTime = null;
      }
    },
    getDataList() {
      this.loading.list = true;
      let that = this
      this.handleFilter()
      this.request('api_admin_invoice_orgList', this.query).then(res => {
        let datas = res.records || []
        for (const data of datas) {
          //时间格式化
          data.insertTimestamp = data.insertTimestamp && Tools.fmtLong2DateTime(Number(data.insertTimestamp))
          data.updateTimestamp = data.updateTimestamp && Tools.fmtLong2DateTime(Number(data.updateTimestamp))
          data.useTimestamp = data.useTimestamp && Tools.fmtLong2DateTime(Number(data.useTimestamp))
        }
        that.datas = datas;
        that.temp.dataSize = res.total;
        that.loading.list = false;
      }).catch(err => {
        console.log(error)
        this.loading.list = false;
      })

    },
    //跳到页
    goPage(pageNum) {
      this.query.current = pageNum;
      this.getDataList();
    },
    //改变每页数据量
    changePageSize(size) {
      this.query.size = size;
      this.query.current = 1;
      this.getDataList();
    },
    //排序
    sortChange(sort) {
      // setSortType(this.query, sort);
      this.getDataList();
    },
    //重置查询条件
    resetQuery() {
      this.goPage(1);
    },
    onSuccess(response, file, fileLile) {
      this.loading.list = false
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
      this.loading.list = false
    },
    onProgress() {
      this.loading.text = '导入中，请稍后。。。'
      this.loading.list = true
    },

    //注销
    handleCancellation(row) {
      console.log(row)
      let p = {
        id: row.id || ''
      }
      this.$confirm('此操作将注销该用户税号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'zhuxiao',
        type: 'warning'
      }).then(() => {
        this.request('api_admin_invoice_cancellation', p).then(res => {
          this.$message({
            type: 'success',
            message: '注销成功!'
          });
          this.getDataList()
        }).catch(err => {

        })
      }).catch((err) => {
        console.log(err)
      });

    },
    //编辑
    // handleUpdate(row) {
    //   let datas = row || {}
    //   this.toast.showMiniModal('修改用户税号', GetTaxInfo, {datas}, res => {
    //     this.getDataList()
    //   })
    // },
    //历史
    handleHistory(row) {
      let datas = row || {}
      console.log(datas)
      this.toast.showMiniModal('用户税号历史记录', ViewTaxHistory, {datas}, res => {
        this.getDataList()
      })
    },


    //添加编辑
    goEdit(data) {
      this.show.edit = true
      this.tempData = data || {}
      // console.log(data)
      // let tempData = data ? data : {};
      // this.toast.showMiniModal('添加用户税号', GetTaxInfo, {}, res => {
      //   this.getDataList()
      // })
    },
    //关闭编辑
    closeEdit() {
      this.show.edit = false
      this.getDataList()
    },
    closeView() {
      this.show.view = false
    },
    //跳转到查看详情
    goView(data) {
      let datas = data ? data : {};
      this.toast.showMiniModal('用户详情', ViewEmployeeInfo, {datas})
    },
    //下载导入税号模板
    getExample() {
      let params = {};
      this.request('api_admin_invoice_templateDownload', params).then((res) => {
      }).catch((error) => {
      });
    },
    //导出
    handleExport() {
      try {
        this.loading.text = '正在导出，请稍后。。。'
        this.loading.list = true;
        let p = {
          params: this.query
        };
        this.request('api_admin_operate_errExcelOut', p).then((res) => {
          this.loading.list = false;
        }).catch((error) => {
          this.loading.list = false;
        });
      } catch (error) {
        console.log(error)
        this.loading.list = false;
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.col-tags {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  .tags {
    margin: 2px;
  }
}

.downMB {
  font-size: 14px;
  line-height: 28px;
  padding: 0 8px;
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  color: #0a76a4;

  &:hover {
    color: #1890FF;
    text-decoration: underline;
  }
}

</style>
<style lang="scss">
.zhuxiao {
  border: none;
  box-shadow: 0 0 10px #F56C6C;

  .el-message-box__message {
    color: #F56C6C;
  }
}
</style>
