<template>
  <!-- 客户信息 -->
  <section class="data-list-box">
    <section v-if="!show.view&&!show.edit">
      <lk-search-form :model="query"
                      :key="updataKey + 1"
                      :show-query="btnPerm.queryBtn"
                      :show-add="btnPerm.editBtn"
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
          action="/zz-server/admin/company/import"
          :on-success="onSuccess"
          :on-progress="onProgress"
          :on-error="onError"
        >
          <el-button size="mini" class="lk-btn" icon="el-icon-download">
            导入
          </el-button>
        </el-upload>
        <el-button v-if="show.errUpload" size="mini" slot="btn" style="margin-left: 10px" @click="getError"
                   class="lk-btn" icon="el-icon-upload2"
        >
          错误信息导出
        </el-button>
        <div class="downMB" slot="btn" v-if="btnPerm.templateDownload" @click="getExample">导入客户模板下载</div>

        <el-form-item class="inline-item" prop="comName">
          <el-input v-model.trim="query.params.comName" clearable placeholder="输入客户名称搜索" size="mini"
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
      <lk-el-table :key="updataKey" :datas="datas" stripe :height="tableHeight" :loadingText="loading.text"
                   :loading="loading.list"
      >
        <template v-for="field in fields" v-if="field.show">
          <el-table-column v-if="field.key=='checkBox'" :align="field.align" type="selection"></el-table-column>

          <el-table-column v-else-if="field.key=='toolButton'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <lk-tool-button @view="goView(scope.row)"
                              @edit="goEdit(scope.row)"
                              @delete="goDelete(scope.row)"
              >
              </lk-tool-button>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='accountType'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <template>
                  <el-tag class="tags" type="info" v-if="scope.row.accountType == 0">基本用户</el-tag>
                  <el-tag class="tags" type="success" v-if="scope.row.accountType == 1">一般用户</el-tag>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='isUnited'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <template>
                  <el-tag class="tags" type="danger" v-if="scope.row.isUnited == 0">否</el-tag>
                  <el-tag class="tags" type="success" v-if="scope.row.isUnited == 1">是</el-tag>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='licenseUrl'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <template>
                  <a class="link" v-if="scope.row.licenseUrl" :href="scope.row.licenseUrl" target="_blank">查看</a>
                  <span v-else>-</span>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='cardBack'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <template>
                  <a class="link" v-if="scope.row.cardBack" :href="scope.row.cardBack" target="_blank">查看</a>
                  <span v-else>-</span>
                </template>
              </div>
            </template>
          </el-table-column>

          <el-table-column v-else-if="field.key=='cardFront'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <template>
                  <a class="link" v-if="scope.row.cardFront" :href="scope.row.cardFront" target="_blank">查看</a>
                  <span v-else>-</span>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='taxpayerType'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <template>
                  <el-tag class="tags" type="info" v-if="scope.row.taxpayerType == 0">一般纳税人</el-tag>
                  <el-tag class="tags" type="info" v-if="scope.row.taxpayerType == 1">小规模纳税人</el-tag>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='status'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <template>
                  <el-tag class="tags" type="success" v-if="scope.row.status == 0">合作中</el-tag>
                  <el-tag class="tags" type="danger" v-if="scope.row.status == 1">取消合作</el-tag>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='termStart'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <div class="time-item">
                  {{ scope.row.termStarts }}
                </div>
                -
                <div class="time-item">
                  {{ scope.row.termEnds }}
                </div>
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
    <view-client-info v-if="show.view" @close="closeView" :datas="viewData"/>
    <get-client-info v-if="show.edit" @close="closeEdit" :updateData="updateData"/>
  </section>
</template>
<script>
import ViewEmployeeInfo from "@/views/zzPages/operations/view-employee-info";
import GetEmployeeInfo from "@/views/zzPages/operations/get-employee-info";
import {getToken} from "@/utils/auth";
import Tools from "@/libs/tool";
import ViewClientInfo from "@/views/zzPages/operations/view-client-info";
import GetClientInfo from "@/views/zzPages/operations/get-client-info";

export default {
  name: 'dir-client-info',
  components: {
    GetClientInfo,
    ViewClientInfo,
    GetEmployeeInfo,
    ViewEmployeeInfo,
  },
  data() {
    return {
      uploadHeader: {
        'x-access-token': getToken()
      },
      heightL: 580,
      tableHeight: 580,
      updataKey: 0,
      updateData: {},
      viewData: {},
      show: {
        edit: false,
        view: false,
        errUpload: false//错误信息导入
      },
      editData: {},
      date: [],
      //查询条件
      query: {
        size: 20,
        current: 1,
        params: {
          comName: "",
          endTime: null,
          startTime: null,
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
        // {key: 'id', name: 'ID', show: true, width: '140', enableSort: false, align: "center", fixed: false},
        {key: 'comName', name: '客户名称', show: true, width: '140', enableSort: false, align: "center", fixed: false},
        {key: 'invoiceNo', name: '社会信用代码', show: true, width: '140', enableSort: false, align: "center", fixed: false},
        {key: 'type', name: '客户类型', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'industry', name: '所属行业', show: true, width: '140', enableSort: false, align: "center", fixed: false},
        {key: 'registerAdd', name: '注册地址', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'actualAdd', name: '实际营业地址', show: true, width: '180', enableSort: false, align: "center", fixed: false},

        {key: 'licenseNo', name: '营业执照号', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'range', name: '经营范围', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        // {key: 'termStarts', name: '营业期限', show: true, width: '220', enableSort: false, align: "center", fixed: false},
        {key: 'isUnited', name: '三证合一', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: 'licenseUrl', name: '营业执照照片', show: true, width: '180', enableSort: false, align: "center", fixed: false},

        {key: 'legalName', name: '法人姓名', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'legalId', name: '法人证件号', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'cardBack', name: '身份证反面', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'cardFront', name: '身份证正面', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'legalLimit', name: '法人有效期', show: true, width: '140', enableSort: false, align: "center", fixed: false},

        {key: 'accountName', name: '开户名称', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'account', name: '银行账号', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'bankName', name: '开户行', show: true, width: '140', enableSort: false, align: "center", fixed: false},
        {key: 'accountType', name: '账户类型', show: true, width: '140', enableSort: false, align: "center", fixed: false},

        {
          key: 'taxpayerType',
          name: '纳税人类型',
          show: true,
          width: '180',
          enableSort: false,
          align: "center",
          fixed: false
        },
        // {key: 'invoiceNo', name: '发票税号', show: true, width: '140', enableSort: false, align: "center", fixed: false},
        {key: 'taxpayerAdd', name: '纳税人地址', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'taxpayerTel', name: '纳税人电话', show: true, width: '180', enableSort: false, align: "center", fixed: false},

        {
          key: 'insertTimestamp',
          name: '插入时间',
          show: true,
          width: '140',
          enableSort: false,
          align: "center",
          fixed: false
        },
        {
          key: 'updateTimestamp',
          name: '更新时间',
          show: true,
          width: '180',
          enableSort: false,
          align: "center",
          fixed: false
        },
        {key: 'status', name: '合作状态', show: true, width: '150', enableSort: false, align: "center", fixed: 'right'},
        {key: 'toolButton', name: '操作', show: true, width: '200', enableSort: false, align: "center", fixed: 'right'},
      ]
    }
  },
  watch: {
    'heightL'(val) {
      this.updataKey += 1
      this.tableHeight = val
    },
  },
  created() {
    this.getPerms()
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
      this.request('api_admin_operate_company_list', this.query).then(res => {
        let datas = res.records || []
        for (const data of datas) {
          //时间格式化
          data.insertTimestamp = data.insertTimestamp ? Tools.fmtLong2DateTime(Number(data.insertTimestamp)) : new Date().toLocaleDateString()
          data.updateTimestamp = data.updateTimestamp ? Tools.fmtLong2DateTime(Number(data.updateTimestamp)) : new Date().toLocaleDateString()
          // data.termStarts = data.termStart ? Tools.fmtLong2DateTime(Number(data.termStart), 'yyyy/MM/dd') : '未知'
          // data.termEnds = data.termEnd ? Tools.fmtLong2DateTime(Number(data.termEnd), 'yyyy/MM/dd') : '长期'
          data.term = data.term ? Tools.fmtLong2DateTime(Number(data.term)) : new Date().toLocaleDateString()
          data.legalLimit = data.legalLimit ? Tools.fmtLong2DateTime(Number(data.legalLimit), 'yyyy-MM-dd') : Tools.fmtLong2DateTime(Number(new Date()), 'yyyy-MM-dd')
        }
        that.datas = datas || [];
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
      this.updateData = data || {}
      this.show.edit = true
    },
    //删除客户
    goDelete(data) {
      let that = this
      this.toast.confirmDelete().then(() => {
        this.request('api_admin_operate_company_delete', {id: data.id}).then(res => {
          that.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.getDataList()
        }).catch(err => {
          console.log(err)
        })
      })
    },
    //关闭编辑
    closeEdit() {
      this.show.edit = false
      this.getDataList();
    },
    closeView() {
      this.show.view = false
      this.getDataList();
    },
    //跳转到查看详情
    goView(data) {
      this.viewData = data ? data : {};
      this.show.view = true
    },
    //下载用户模板
    getExample() {
      let params = {};
      this.request('api_admin_operate_company_templateDownload', params).then((res) => {
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
        this.request('api_admin_operate_company_errExcelOut', p).then((res) => {
          this.loading.list = false;
        }).catch((error) => {
          this.loading.list = false;
        });
      } catch (error) {
        console.log(error)
        this.loading.list = false;
      }

    }
  },
  mounted() {
    this.getWinHeight()
    this.getDataList();
  },
}
</script>

<style lang="scss" scoped>
.col-tags {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .time-item {
    padding: 0 5px;
    color: #696a6a;
    font-weight: 530;
  }

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

.link {
  color: #1989fa;
}
</style>
