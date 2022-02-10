<template>
  <!--  合同管理-->
  <section class="data-list-box">
    <section v-if="!show.edit">
      <lk-search-form :model="query"
                      :key="updataKey + 1"
                      :show-query="btnPerm.queryBtn"
                      @search="goPage(1)"
      >
        <el-form-item class="inline-item" prop="id">
          <el-input v-model.trim="query.params.id" clearable placeholder="输入合同ID搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
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
          <el-input v-model.trim="query.params.phone" clearable placeholder="输入手机号搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="id">
          <el-select v-model="query.params.status" clearable size="mini"
                     @clear="goPage(1)" @change="goPage(1)" placeholder="请选择合同状态"
          >
            <el-option key="0" label="未签约" :value="0"/>
            <el-option key="1" label="已签约" :value="1"/>
            <el-option key="2" label="已盖章" :value="2"/>
            <el-option key="3" label="已归档" :value="3"/>
          </el-select>
        </el-form-item>
      </lk-search-form>
      <div class="table-operate">
        <lk-table-field-filter :fields="fields" @showChange="updataKey +=1"/>
        <lk-table-button
          dis-delete
          add-text="配置用户合同"
          @add="goEdit"
        >
        </lk-table-button>
      </div>
      <lk-el-table :datas="datas"
                   :key="updataKey"
                   stripe :height="tableHeight"
                   :loadingText="loading.text" :loading="loading.list"
      >
        <template v-for="field in fields" v-if="field.show">
          <el-table-column v-if="field.key=='checkBox'" :align="field.align" type="selection"></el-table-column>

          <el-table-column v-else-if="field.key=='toolButton'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <lk-tool-button @view="goView(scope.row)"
                              @delete="goDelete(scope.row)"
                              dis-edit
                              viewText="操作"
                              :disView="!btnPerm.viewBtn"
              >
              </lk-tool-button>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='status'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <template>
                  <el-tag class="tags" type="danger" v-if="scope.row.status == 0">未签约</el-tag>
                  <el-tag class="tags" type="warning" v-if="scope.row.status == 1">已签约</el-tag>
                  <el-tag class="tags" type="success" v-if="scope.row.status == 2">已盖章</el-tag>
                  <el-tag class="tags" type="info" v-if="scope.row.status == 3">已归档</el-tag>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='title'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <template>
<!--                  <el-link type="primary" :href="scope.row.url"></el-link>-->
                  <a class="con-link" :href="scope.row.url" target="_blank" style="color: #1890FF">{{ '《' + scope.row.title + '》' }}</a>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='downloadUrl'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <template>
<!--                  <el-link type="primary" :href="scope.row.url"></el-link>-->
                  <a class="con-link" v-if="scope.row.downloadUrl" :href="scope.row.downloadUrl" target="_blank" style="color: #1890FF">下载合同</a>
                  <span v-else>-</span>
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
      <lk-pagination :current-page="query.current" :pageSize="query.size"
                     :data-size="temp.dataSize" @changePageSize="changePageSize" @go="goPage"
      />
    </section>
    <GetContractInfo @close="closeEdit" v-if="show.edit"/>
  </section>

</template>
<script>
import ViewEmployeeInfo from "@/views/zzPages/operations/view-employee-info";
import GetEmployeeInfo from "@/views/zzPages/operations/get-employee-info";
import {getToken} from "@/utils/auth";
import LkPreviewOffice from "@/components/common/lx-preview-office";
import ViewContractInfo from "@/views/zzPages/operations/view-contract-info";
import Tools from "@/libs/tool";
import GetContractInfo from "@/views/zzPages/operations/get-contract-info";

export default {
  name: 'dir-contract-info',
  components: {
    GetContractInfo,
    ViewContractInfo,
    LkPreviewOffice,
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
      uploadHeader: {
        'x-access-token': getToken()
      },
      heightL: 580,
      tableHeight: 580,
      updataKey: 0,
      show: {
        edit: false,
        view: false
      },
      //查询条件
      query: {
        size: 20,
        current: 1,
        params: {
          endTime: null,
          startTime: null,
          status: '',
          id: '',
          idCard: '',
          phone: '',
          workerName: '',
        }
      },
      btnPerm: {
        queryBtn: false,
        viewBtn: false,
        exportBtn: false,
      },
      //返回数据列表
      datas: [],
      //临时变量
      temp: {
        //数据总条数
        dataSize: 0,
        id: ''
      },
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
        {key: 'id', name: '合同ID', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'idCard', name: '身份证号', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'workerName', name: '用户姓名', show: true, width: '', enableSort: false, align: "center", fixed: false},
        // {key: 'isReal', name: '是否实名', show: true, width: '80', enableSort: false, align: "center", fixed: false},
        // {key: 'outTradeNo', name: '实名绑定时间', show: true, width: '180', enableSort: false, align:"center", fixed: false},
        // {key: 'isSign', name: '是否签约', show: true, width: '80', enableSort: false, align: "center", fixed: false},
        {key: 'phone', name: '手机号', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'outTradeNo', name: '银行卡号', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        // {key: 'outTradeNo', name: '签约有效期', show: true, width: '180', enableSort: false, align:"center", fixed: false},
        {key: 'title', name: '合同信息', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'downloadUrl', name: '合同下载', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {
          key: 'startTimestamp',
          name: '协议签署日期',
          show: true,
          width: '180',
          enableSort: false,
          align: "center",
          fixed: false
        },
        {
          key: 'endTimestamp',
          name: '协议签署到期时间',
          show: true,
          width: '180',
          enableSort: false,
          align: "center",
          fixed: false
        },
        {
          key: 'insertTimestamp',
          name: '插入时间',
          show: true,
          width: '180',
          enableSort: false,
          align: "center",
          fixed: false
        },  {
          key: 'updateTimestamp',
          name: '更新时间',
          show: true,
          width: '180',
          enableSort: false,
          align: "center",
          fixed: false
        },
        {key: 'status', name: '合同状态', show: true, width: '80', enableSort: false, align: "center", fixed: 'right'},
        {key: 'toolButton', name: '操作', show: true, width: '180', enableSort: false, align: "center", fixed: 'right'},
      ]
    }
  },
  created() {
    this.getPerms()
    this.goPage(1);
  },
  mounted() {
    this.getWinHeight()
    this.goPage(1);
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
        this.btnPerm.exportBtn = true;
      } else {
        if (perms.includes('POST /admin/comment/driverCommentList')) {
          this.btnPerm.queryBtn = true;
        }
        if (perms.includes('POST /admin/comment/driverCommentListExport')) {
          this.btnPerm.exportBtn = true;
        }
        if (perms.includes('POST /admin/comment/commentDetail')) {
          this.btnPerm.viewBtn = true;
        }
      }
    },
    getDataList() {
      this.loading.list = true;
      this.request('api_admin_contract_list', this.query).then(res => {
        let datas = res.records || []
        for (const data of datas) {
          //时间格式化
          data.outTradeNo = data.outTradeNo || '-'
          data.startTimestamp = data.startTimestamp && Tools.fmtLong2DateTime(Number(data.startTimestamp)) || '-'
          data.endTimestamp = data.endTimestamp && Tools.fmtLong2DateTime(Number(data.endTimestamp)) || '-'
          data.updateTimestamp = data.updateTimestamp && Tools.fmtLong2DateTime(Number(data.updateTimestamp)) || '-'
          data.insertTimestamp = data.insertTimestamp && Tools.fmtLong2DateTime(Number(data.insertTimestamp)) || '-'
        }
        this.datas = datas;
        this.temp.dataSize = res.total;
        this.loading.list = false;
      }).catch(error => {
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
      this.loading = false
      if (response.result === 0) {
        this.errorUrl = response.errFile;
        this.ctl.excelResult = true;
      } else {
        this.$message('导入成功');
      }
      this.doQuery()
    },
    onError(err, file, fileList) {
      this.loading = false
    },
    onProgress() {
      this.loadingText = '导入中，请稍后。。。'
      this.loading = true
    },

    //添加编辑
    goEdit(data) {
      this.temp.id = data && data.id ? data.id : undefined;
      this.show.edit = true
      // this.toast.showMiniModal(this.temp.id?'修改合同':'配置用户合同',GetContractInfo, {id:this.temp.id},()=>{
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
      this.getDataList()
    },
    //跳转到查看详情
    goView(data) {
      this.toast.showSmallModal('合同操作', ViewContractInfo, {datas: data}, () => {
        this.getDataList()
      })
    },
    goDown(data){
      this.request('api_admin_contract_download', {contractId: data.id}).then(res => {
        let url = res.url
        window.open(url,'_blank')
        this.getDataList()
      }).catch(err => {
        console.log(err)
      })
    },
    //删除合同
    goDelete(data) {
      let that = this
      this.toast.confirmDelete().then(() => {
        this.request('api_admin_contract_delete', {contractId: data.id}).then(res => {
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
    //导出
    handleExport() {
      // try {
      //   this.loading.text = '正在导出，请稍后。。。'
      //   this.loading.list = true;
      //   let p = {
      //     params: this.query
      //   };
      //   this.request('api_admin_comment_driverCommentListExport',p).then((res) => {
      //     this.loading.list = false;
      //   }).catch((error) => {
      //     this.loading.list = false;
      //   });
      // } catch (error) {
      //   console.log(error)
      //   this.loading.list = false;
      // }

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
</style>
