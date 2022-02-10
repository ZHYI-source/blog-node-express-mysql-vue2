<template>
  <!-- 客户信息 -->
  <section class="data-list-box">
    <section>
      <lk-search-form :model="query"
                      :key="updataKey + 1"
                      :show-query="btnPerm.queryBtn"
                      :show-add="btnPerm.editBtn"
                      @edit="goEdit()"
                      @search="goPage(1)"
      >
<!--        <el-upload-->
<!--          v-if="btnPerm.importBtn"-->
<!--          slot="btn"-->
<!--          :headers="uploadHeader"-->
<!--          class="lk-btn"-->
<!--          accept=".xlsx,.xls"-->
<!--          :show-file-list="false"-->
<!--          action="/zz-server/admin/operate/worker/import"-->
<!--          :on-success="onSuccess"-->
<!--          :on-progress="onProgress"-->
<!--          :on-error="onError"-->
<!--        >-->
<!--          <el-button size="mini" class="lk-btn" icon="el-icon-download">-->
<!--            导入-->
<!--          </el-button>-->
<!--        </el-upload>-->
<!--        <el-button v-if="show.errUpload" size="mini" slot="btn" style="margin-left: 10px" @click="getError"-->
<!--                   class="lk-btn" icon="el-icon-upload2"-->
<!--        >-->
<!--          错误信息导出-->
<!--        </el-button>-->
<!--        <div class="downMB" slot="btn" v-if="btnPerm.templateDownload" @click="getExample">导入用户模板下载</div>-->

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
        <el-form-item class="inline-item" prop="phone">
          <el-input v-model.trim="query.params.phone" clearable placeholder="输入用户手机号搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>

        <el-form-item class="inline-item" prop="account">
          <el-input v-model.trim="query.params.account" clearable placeholder="输入银行卡号搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="date">
          <el-date-picker
            size="mini"
            v-model="date"
            @change="goPage(1)"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
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
      <lk-el-table :key="updataKey" :datas="datas" stripe
                   :height="tableHeight" :loadingText="loading.text" :loading="loading.list">
        <template v-for="field in fields" v-if="field.show">
          <el-table-column v-if="field.key=='checkBox'" :align="field.align" type="selection"></el-table-column>

          <el-table-column v-else-if="field.key=='toolButton'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <lk-tool-button @view="goView(scope.row)"
                              :disView="!btnPerm.viewBtn"
                              dis-delete
                              dis-edit
              >
              </lk-tool-button>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='isReal'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <template>
                  <el-tag class="tags" type="danger" v-if="scope.row.isReal == 0">否</el-tag>
                  <el-tag class="tags" type="success" v-if="scope.row.isReal == 1">是</el-tag>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='isSign'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <template>
                  <el-tag class="tags" type="danger" v-if="scope.row.isSign == 0">否</el-tag>
                  <el-tag class="tags" type="success" v-if="scope.row.isSign == 1">是</el-tag>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='regType'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <template>
                  <el-tag class="tags" type="danger" v-if="scope.row.regType == 0">未进件</el-tag>
                  <el-tag class="tags" type="success" v-if="scope.row.regType == 1">已进件</el-tag>
                </template>
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
  </section>

</template>
<script>
import ViewEmployeeInfo from "@/views/zzPages/operations/view-employee-info";
import GetEmployeeInfo from "@/views/zzPages/operations/get-employee-info";
import {getToken} from "@/utils/auth";
import Tools from "@/libs/tool";
import ViewTaskPay from "@/views/zzPages/account/view-task-pay";

export default {
  name: 'dir-task-pay',
  components: {
    ViewTaskPay,
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
      show: {
        edit: false,
        view: false,
        errUpload: false//错误信息导入
      },
      date: [],
      //查询条件
      query: {
        size: 20,
        current: 1,
        params: {
          account: "",
          endTime: null,
          idCard: "",
          phone: "",
          startTime: null,
          workerName: ""
        }
      },
      btnPerm: {
        queryBtn: false,
        viewBtn: false,
        exportBtn: false,
        editBtn: false,
        importBtn: false,
        templateDownload: false,
      },
      //返回数据列表
      datas: [
        {
          1:'520103197102094014',
          2:'张斌易',
          3:'522631********2144',
          4:'**** **** **** 7468',
          5:'2021/11/02 14:29:17',
          6:'2021/11/09 14:29:17',
          7:'待支付',
          8:'1475290303209709570',
          9:'中智用工测试',
          10:'现代服务',
          11:'-',
          12:'0.00',
          13:'300',
          14:'王慕之',
          15:'待支付',
          16:'2022-01-02 18:23:33',
        }
      ],
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
        {key: '1', name: '业务流水号', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: '2', name: '持卡人姓名', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: '3', name: '身份证号', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: '4', name: '银行卡号', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: '5', name: '任务创建时间', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: '6', name: '任务完成时间', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: '7', name: '交易状态', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: '8', name: '任务ID', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: '9', name: '任务名称', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: '10', name: '任务类型', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: '11', name: '任务内容', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: '12', name: '税前金额', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: '13', name: '个人所得税', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: '14', name: '税后金额', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: '15', name: '支付状态', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: '16', name: '插入时间', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'toolButton', name: '操作', show: true, width: '120', enableSort: false, align: "center", fixed: 'right'},
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
        this.btnPerm.queryBtn = true;//查询
        this.btnPerm.viewBtn = true;//查看
        this.btnPerm.importBtn = true;//导入
        this.btnPerm.editBtn = true;//新增
        this.btnPerm.templateDownload = true;//下载用户模板
      } else {
        if (perms.includes('POST /admin/operate/worker/list')) {
          this.btnPerm.queryBtn = true;
        }
        if (perms.includes('POST /admin/operate/worker/import')) {
          this.btnPerm.importBtn = true;
        }
        if (perms.includes('POST /admin/operate/worker/create')) {
          this.btnPerm.editBtn = true;
        }
        if (perms.includes('POST /admin/operate/templateDownload')) {
          this.btnPerm.templateDownload = true;
        }
      }
    },


    getDataList() {
      this.loading.list = true;
      let that = this
      //时间转存
      this.query.params.startTime = this.date && this.date.length > 0 ? this.date[0] : null
      this.query.params.endTime = this.date && this.date.length > 0 ? this.date[1] : null
      this.request('api_admin_operate_worker_list', this.query).then(res => {
        // let datas = res.records || []
        // for (const data of datas) {
        //   //时间格式化
        //   data.insertTimestamp = Tools.fmtLong2DateTime(Number(data.insertTimestamp))
        //   data.updateTimestamp = Tools.fmtLong2DateTime(Number(data.updateTimestamp))
        // }
        // that.datas = datas;
        // that.temp.dataSize = res.total;
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
        this.show.errUpload = true
        this.$message.error('导入失败，可以点击错误信息导出查看详情！');
        console.log("错误信息", this.errorUrl);
      } else {
        this.$message({
          message: '导入成功',
          type: 'success'
        });
      }
      this.goPage(1)
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
      this.$message({
        message: '开发中...',
        type: 'warning'
      });
      // this.toast.showSmallModal('添加用户', GetEmployeeInfo, {}, res => {
      //   this.getDataList()
      // })
    },
    //关闭编辑
    closeEdit() {

    },
    closeView() {
      this.show.view = false
    },
    //跳转到查看详情
    goView(data) {
      let datas = data ? data : {};
      this.toast.showSmallModal('详情', ViewTaskPay, {datas})
    },
    //下载用户模板
    getExample() {
      let params = {};
      this.request('api_admin_operate_templateDownload', params).then((res) => {
      }).catch((error) => {
      });
    },
    //导出
    getError() {
      try {
        this.loading.text = '正在导出，请稍后。。。'
        this.loading.list = true;
        let p = {
          fileUrl: this.errorUrl
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
  justify-content: center;
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
