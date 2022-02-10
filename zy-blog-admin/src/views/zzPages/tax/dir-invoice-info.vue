<template>
  <section class="data-list-box">
    <section v-if="!show.edit">
      <lk-search-form
        :key="updataKey + 1"
        :model="query"
        :show-query="btnPerm.queryBtn"
        :show-add="btnPerm.editBtn"
        showAdd
        @edit="goEdit()"
        @search="goPage(1)"
      >
        <el-form-item class="inline-item" prop="workerName">
          <el-input v-model.trim="query.params.workerName" clearable placeholder="输入用户姓名搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="idCard">
          <el-input v-model.trim="query.params.idCard" clearable placeholder="输入身份证号搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="payerPhone">
          <el-input v-model.trim="query.params.payerPhone" clearable placeholder="输入接收手机号搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <!--        <el-form-item class="inline-item" prop="phone">-->
        <!--          <el-select size="mini" v-model="query.params.status" placeholder="开票状态">-->
        <!--            <el-option label="全部" :value="-2"></el-option>-->
        <!--            <el-option label="已开票" :value="1"></el-option>-->
        <!--            <el-option label="开票失败" :value="3"></el-option>-->
        <!--            <el-option label="待填写" :value="2"></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item class="inline-item" prop="date">
          <el-date-picker
            size="mini"
            v-model="date"
            @change="goPage(1)"
            type="daterange"
            range-separator="至"
            start-placeholder="索要开始日期"
            end-placeholder="索要结束日期"
            :default-time="['00:00:00', '23:59:59']"
            value-format="timestamp"
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
              <lk-tool-button @view="retryData(scope.row)"
                              view-text="重新开票"
                              :dis-edit="!btnPerm.updateBtn"
                              @edit="goEdit(scope.row)"
                              edit-text="编辑"
                              dis-edit
                              :disView="scope.row.status != 3 "
                              dis-delete
              >
              </lk-tool-button>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='status'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.status === 3"> {{ scope.row.statusDesc }}</el-tag>
              <el-tag type="info" v-if="scope.row.status === 0"> {{ scope.row.statusDesc }}</el-tag>
              <el-tag type="success" v-if="scope.row.status === 1"> {{ scope.row.statusDesc }}</el-tag>
              <el-tag type="warning" v-if="scope.row.status === 2"> {{ scope.row.statusDesc }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='einvoiceUrl'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.einvoiceUrl">
                <a style="text-decoration: underline; color: #152ef3"
                   :href="scope.row.einvoiceUrl" download="file" title="发票链接" target="_blank"
                >
                  点击查看
                </a>
              </div>
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
    <get-invoice-info :updateData="updateData" v-if="show.edit" @close="closeEdit"/>
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
import GetInvoiceInfo from "@/views/zzPages/tax/get-invoice-info";

export default {
  name: 'dir-invoice-info',
  components: {
    GetInvoiceInfo,
    GetEmployeeInfo,
    ViewEmployeeInfo,
  },
  watch: {
    'heightL'(val) {
      this.updataKey+=1
      this.tableHeight = val
    },
  },
  data() {
    return {
      heightL:580,
      tableHeight:580,
      updataKey:0,
      uploadHeader: {
        'x-access-token': getToken()
      },
      updateData: {},
      show: {
        edit: false,
        view: false
      },
      date: [],
      //查询条件
      query: {
        size: 20,
        current: 1,
        params: {
          endTime: null,
          idCard: "",
          payerPhone: "",//接收手机
          phone: "",
          startTime: null,
          workerName: ""
        }
      },
      btnPerm: {
        queryBtn: false,
        updateBtn: false,
        editBtn: false,
        retryBtn: false,
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
        {key: 'id', name: 'ID', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'idCard', name: '用户身份证号', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'einvoiceUrl', name: '发票链接', show: true, width: '90', enableSort: false, align: "center", fixed: false},

        {key: 'workerName', name: '用户姓名(销方)', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'workerInvoiceNo', name: '用户税号(销方)', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'invoiceNo', name: '发票税号(购方)', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'invoiceTitle', name: '发票抬头(购方)', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'payerPhone', name: '接收手机号', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'payerMail', name: '接收邮箱', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {
          key: 'insertTimestamp',
          name: '索要发票时间',
          show: true,
          width: '180',
          enableSort: false,
          align: "center",
          fixed: false
        },
        {key: 'taskName', name: '任务名称', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'orderId', name: '用工ID', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'amount', name: '用工金额', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'finishTimestamp', name: '完工时间', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {
          key: 'invoiceTypeDesc',
          name: '个人/企业',
          show: true,
          width: '180',
          enableSort: false,
          align: "center",
          fixed: false
        },
        // {key: 'accounts', name: '用户/客户', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'invoiceDate', name: '开票日期', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'status', name: '开票状态', show: true, width: '100', enableSort: false, align: "center", fixed: 'right'},
        {key: 'toolButton', name: '操作', show: true, width: '180', enableSort: false, align: "center", fixed: 'right'},
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
    getWinHeight(){
      let that = this
      this.heightL = window.innerHeight - 340
      window.addEventListener('resize', () =>{
        that.updataKey+=1
        that.heightL = window.innerHeight - 340
      })
    },
    //权限判断
    getPerms() {
      let perms = this.$store.getters.perms
      if (perms.includes('*')) {
        this.btnPerm.queryBtn = true;
        this.btnPerm.updateBtn = true;
        this.btnPerm.retryBtn = true;
        this.btnPerm.editBtn = true;
      } else {
        if (perms.includes('POST /admin/invoice/list')) {
          this.btnPerm.queryBtn = true;
        }
        if (perms.includes('POST /admin/invoice/retry')) {
          this.btnPerm.retryBtn = true;
        }
        if (perms.includes('POST /admin/invoice/insert')) {
          this.btnPerm.editBtn = true;
        }
        if (perms.includes('POST /admin/invoice/update')) {
          this.btnPerm.updateBtn = true;
        }
      }
    },
    getDataList() {
      this.loading.list = true;
      let that = this
      //时间转存
      this.query.params.startTime = this.date && this.date.length > 0 ? this.date[0] : null
      this.query.params.endTime = this.date && this.date.length > 0 ? this.date[1] : null
      this.request('api_admin_invoice_list', this.query).then(res => {
        let datas = res.records || []
        for (const data of datas) {
          //时间格式化
          data.insertTimestamp = data.insertTimestamp && Tools.fmtLong2DateTime(Number(data.insertTimestamp))
          data.finishTimestamp = data.finishTimestamp && Tools.fmtLong2DateTime(Number(data.finishTimestamp))
          // data.updateTimestamp = Tools.fmtLong2DateTime(Number(data.updateTimestamp))
        }
        that.datas = datas;
        that.temp.dataSize = res.total;
        that.loading.list = false;
      }).catch(err => {
        console.log(err)
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

    //添加编辑
    goEdit(data) {
      this.show.edit = true
      this.updateData = data || {}
      // this.toast.showSmallModal('添加发票', GetInvoiceInfo, {}, res => {
      //   this.getDataList()
      // })
    },
    //重新开票
    retryData(data) {
      let p = {
        id: data.id
      }
      this.toast.confirm('确定重新开票吗？').then(res => {
        this.request('api_admin_invoice_retry', p).then((res) => {
          this.$notify.success({
            title: '成功',
            message: '重新开票申请成功'
          })
          this.getDataList()
        }).catch((error) => {
          this.$notify.error({
            title: '失败',
            message: error.msg
          })
        });
      })

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
    //下载用户模板
    getExample() {
      let params = {};
      this.request('api_admin_operate_templateDownload', params).then((res) => {
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
