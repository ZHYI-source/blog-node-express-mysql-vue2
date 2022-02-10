<template>
  <!--  用工记录-->
  <section class="data-list-box">
    <section v-if="!show.edit">
      <lk-search-form :model="query" @handleExport="handleExport"
                      :key="updataKey + 1"
                      :show-query="btnPerm.queryBtn"
                      editText="新增用工"
                      :showAdd="btnPerm.editBtn"
                      @edit="goEdit()"
                      @search="goPage(1)"
      >
        <el-button size="mini" slot="btn" class="lk-btn" style="margin-left: 0px" icon="el-icon-download" @click="getTask">
          导入
        </el-button>
        <!--        <el-upload-->
        <!--          slot="btn"-->
        <!--          :headers="uploadHeader"-->
        <!--          class="lk-btn"-->
        <!--          accept=".xlsx,.xls"-->
        <!--          :show-file-list="false"-->
        <!--          action="/zz-server/admin/task/order/import"-->
        <!--          :on-success="onSuccess"-->
        <!--          :on-progress="onProgress"-->
        <!--          :on-error="onError"-->
        <!--        >-->
        <!--          <el-button size="mini" class="lk-btn" icon="el-icon-download">-->
        <!--            导入-->
        <!--          </el-button>-->
        <!--        </el-upload>-->
        <el-button v-if="show.errUpload" size="mini" slot="btn" style="margin-left: 10px" @click="getError"
                   class="lk-btn" icon="el-icon-upload2"
        >
          错误信息导出
        </el-button>
        <div class="downMB" slot="btn" @click="getExample">导入用工模板下载</div>

        <el-form-item class="inline-item" prop="id">
          <el-input v-model.trim="query.params.id" clearable placeholder="输入用工ID搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="workerName">
          <el-input v-model.trim="query.params.workerName" clearable placeholder="输入用户名称搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="phone">
          <el-input v-model.trim="query.params.phone" clearable placeholder="输入用户手机号搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="idCard">
          <el-input v-model.trim="query.params.idCard" clearable placeholder="输入用户身份证号搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="driverTel">
          <el-select
            clearable
            @change="goPage(1)"
            v-model.trim="query.params.status"
            class="input-one" size="mini" placeholder="请选择任务状态"
          >
            <!--            <el-option label="新发布" value="0"></el-option>-->
            <el-option label="待接单" value="1"></el-option>
            <el-option label="已提交" value="2"></el-option>
            <el-option label="已完工" value="3"></el-option>
            <el-option label="被退回" value="9"></el-option>
          </el-select>
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
          <el-button :type="multiple?'primary':'info'" icon="el-icon-s-check" size="mini" v-if="btnPerm.keyAduitBtn"
                     @click="oneKeyAudit"
          >一键审核
          </el-button>
        </lk-table-button>
      </div>
      <lk-el-table :datas="datas"
                   :key="updataKey"
                   @select="multipleSelect"
                   @select-all="AllSelect"
                   stripe
                   :height="tableHeight"
                   :loadingText="loading.text" :loading="loading.list"
      >
        <template v-for="field in fields" v-if="field.show">
          <el-table-column v-if="field.key=='checkBox'" :align="field.align" type="selection"></el-table-column>

          <el-table-column v-else-if="field.key=='toolButton'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <lk-tool-button
                viewText="操作"
                :dis-edit="scope.row.taskStatus !== 1 && btnPerm.updateBtn"
                :showBack="scope.row.taskStatus === 2 && btnPerm.backBtn"
                :dis-delete="scope.row.taskStatus !== 1"
                :dis-view="!btnPerm.viewBtn"
                @view="goOperate(scope.row)"
                @edit="goEdit(scope.row)"
                @delete="goDelete(scope.row)"
                @back="goBackStatus(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='taskType'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <el-tag class="tags" type="warning" v-if="scope.row.taskType == 1">类型2</el-tag>
                <el-tag class="tags" type="" v-if="scope.row.taskType == 0">类型1</el-tag>
              </div>
            </template>
          </el-table-column>
          <!--强制接单-->
          <el-table-column v-else-if="field.key=='isForce'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <!-- 强制-->
                <el-tag type="primary" v-if="scope.row.isForce === 1"> 是</el-tag>
                <!-- 不强制-->
                <el-tag type="info" v-if="scope.row.isForce === 2"> 否</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='taskStatus'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <!-- 待通知-->
                <el-tag type="danger" v-if="scope.row.taskStatus == 9"> 被退回</el-tag>
                <!-- 被拒绝-->
                <el-tag type="danger" v-if="scope.row.taskStatus == 8"> 被拒绝</el-tag>
                <!-- 待申诉-->
                <el-tag type="warning" v-if="scope.row.taskStatus === 0"> 新发布</el-tag>
                <!-- 待处理-->
                <el-tag type="primary" v-if="scope.row.taskStatus === 1"> 待接单</el-tag>
                <!-- 待结案-->
                <el-tag type="info" v-if="scope.row.taskStatus === 2"> 已提交</el-tag>
                <!-- 已结案-->
                <el-tag type="success" v-if="scope.row.taskStatus === 3"> 已完工</el-tag>
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
    <get-order-info v-if="show.edit" :updateData="updateData" @close="closeEdit"/>
  </section>
</template>

<script>
import {getToken} from "@/utils/auth";
import Tools from "@/libs/tool";
import GetOrderInfo from "@/views/zzPages/task/get-order-info";
import ViewOrderInfo from "@/views/zzPages/task/view-order-info";
import DirSelectTaskInfo from "@/views/zzPages/task/dir-select-task-info";
import GetAssignTask from "@/views/zzPages/task/get-assign-task";

export default {
  name: 'dir-order-info',
  components: {
    GetAssignTask,
    ViewOrderInfo,
    GetOrderInfo,
  },
  watch: {
    'heightL'(val) {
      this.updataKey += 1
      this.tableHeight = val
    },
  },
  data() {
    return {
      auditData: [],
      heightL: 580,
      tableHeight: 540,
      updataKey: 0,
      multiple: false,
      date: null,
      options: [],
      uploadHeader: {
        'x-access-token': getToken()
      },
      updateData: {},//修改数据
      show: {
        edit: false,
        view: false,
        errUpload: false//错误信息导入
      },
      //查询条件
      query: {
        size: 20,
        current: 1,
        params: {
          endTime: null,
          id: '',
          idCard: "",
          phone: "",
          startTime: null,
          // status: 1,
          taskId: '',
          workerName: ""
        }
      },
      btnPerm: {
        queryBtn: false,
        viewBtn: false,
        updateBtn: false,
        editBtn: false,
        deleteBtn: false,
        backBtn: false,
        keyAduitBtn: false,
      },
      //返回数据列表
      datas: [],
      //临时变量
      temp: {
        //数据总条数
        dataSize: 0,
        id: ''
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
        {key: 'checkBox', name: '全选', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: 'id', name: '用工ID', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'taskId', name: '任务ID', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'taskName', name: '任务名称', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'taskType', name: '任务类型', show: true, width: '80', enableSort: false, align: "center", fixed: false},
        {key: 'tradeAmt', name: '任务报酬', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: 'companyName', name: '需求公司', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'adminName', name: '任务分派人', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        // {key: 'isForce', name: '强制接单', show: true, width: '80', enableSort: false, align: "center", fixed: false},
        {key: 'workerName', name: '用户', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'workerPhone', name: '用户手机号', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'idCard', name: '用户身份证号', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {
          key: 'startTimestamp',
          name: '任务发起时间',
          show: true,
          width: '180',
          enableSort: false,
          align: "center",
          fixed: false
        },
        {key: 'phone', name: '联系人手机号', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {
          key: 'endTimestamp',
          name: '任务截止时间',
          show: true,
          width: '180',
          enableSort: false,
          align: "center",
          fixed: false
        },

        {key: 'content', name: '任务内容', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'workCycle', name: '工作周期', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'workPlace', name: '工作地点', show: true, width: '180', enableSort: false, align: "center", fixed: false},

        {key: 'taskStatus', name: '任务状态', show: true, width: '80', enableSort: false, align: "center", fixed: 'right'},
        {key: 'toolButton', name: '操作', show: true, width: '200', enableSort: false, align: "left", fixed: 'right'},
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
    //选择任务
    getTask() {
      let that = this
      this.toast.showSmallModal('选择任务', DirSelectTaskInfo, {}, data => {
        let params = data
        that.assignTask(params)
      })
    },
    //选择任务
    assignTask(params) {
      let that = this
      this.toast.showMiniModal('批量分派任务', GetAssignTask, {params:params}, data => {
        that.errorUrl = data.errorUrl
        data.errorUrl?that.show.errUpload = true : that.show.errUpload = false
        that.goPage(1)
      })
    },
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
        this.btnPerm.updateBtn = true;
        this.btnPerm.editBtn = true;
        this.btnPerm.deleteBtn = true;
        this.btnPerm.backBtn = true;
        this.btnPerm.keyAduitBtn = true;
      } else {
        if (perms.includes('POST /admin/task/order/list')) {
          this.btnPerm.queryBtn = true;
        }
        if (perms.includes('POST /admin/task/order/deals')) {
          this.btnPerm.keyAduitBtn = true;
        }
        if (perms.includes('POST /admin/task/order/change')) {
          this.btnPerm.updateBtn = true;
        }
        if (perms.includes('POST /admin/task/order/create')) {
          this.btnPerm.editBtn = true;
        }
        if (perms.includes('POST /admin/task/order/detail')) {
          this.btnPerm.viewBtn = true;
        }
        if (perms.includes('POST /admin/task/order/delete')) {
          this.btnPerm.deleteBtn = true;
        }
        if (perms.includes('POST /admin/task/order/back')) {
          this.btnPerm.backBtn = true;
        }
      }
    },
    getDataList() {
      try {
        this.loading.list = true;
        //时间转存
        this.query.params.startTime = this.date && this.date.length > 0 ? this.date[0] : null
        this.query.params.endTime = this.date && this.date.length > 0 ? this.date[1] : null
        this.request('api_admin_task_order_list', this.query).then(res => {
          let datas = res.records || []
          for (const data of datas) {
            //时间格式化
            data.startTimestamp = data.startTimestamp && Tools.fmtLong2DateTime(Number(data.startTimestamp))
            data.endTimestamp = data.endTimestamp && Tools.fmtLong2DateTime(Number(data.endTimestamp))
            data.updateTimestamp = data.updateTimestamp && Tools.fmtLong2DateTime(Number(data.updateTimestamp))
            data.insertTimestamp = data.insertTimestamp && Tools.fmtLong2DateTime(Number(data.insertTimestamp))
          }
          this.datas = datas;
          this.temp.dataSize = res.total;
          this.loading.list = false;
        })
      } catch (error) {
        console.log(error)
        this.loading.list = false;
      }
    },
    //一键审核
    oneKeyAudit() {
      let that = this
      let data = this.auditData || []
      if (!data.length) {
        this.$message({
          message: '您还没选择需要审核的数据！',
          type: 'warning'
        });
        return
      }
      if (!this.multiple) {
        this.$message({
          message: '只能选择状态为已提交的任务审核哦！',
          type: 'warning'
        });
        return;
      }
      this.toast.confirm(`是否 审核通过 该 ${data.length} 条数据？`).then(ele => {
        let p = {
          idList: []
        }
        for (const pElement of data) {
          p.idList.push(pElement.id)
        }
        this.request('api_admin_task_order_deals', p).then(res => {
          that.$message({
            message: '审核成功！',
            type: 'success'
          });
          that.multiple = false
          that.getDataList()
        })

      }).catch(err => {
        that.multiple = false
        console.log(err)
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
      this.getDataList();
    },
    //重置查询条件
    resetQuery() {
      this.goPage(1);
    },

    //下载用工模板
    getExample() {
      let params = {};
      this.request('api_admin_task_order_templateDownload', params).then((res) => {
      }).catch((error) => {
      });
    },
    //导出错误
    getError() {
      try {
        this.loading.text = '正在导出，请稍后。。。'
        this.loading.list = true;
        let p = {
          fileUrl: this.errorUrl
        };
        this.request('api_admin_task_order_errExcelOut', p).then((res) => {
          this.loading.list = false;
        }).catch((error) => {
          this.loading.list = false;
        });
      } catch (error) {
        console.log(error)
        this.loading.list = false;
      }

    },
    //添加操作
    goEdit(data) {
      this.show.edit = true
      this.updateData = data || {}
    },
    //关闭编辑
    closeEdit() {
      this.show.edit = false
      this.getDataList()
    },
    closeView() {
      this.show.view = false
    },
    //操作
    goOperate(data) {
      let datas = data ? data : {};
      this.toast.showSmallModal('操作用工信息', ViewOrderInfo, {datas}, () => {
        this.getDataList()
      })
    },
    //删除
    goDelete(data) {
      let p = {
        id: data.id
      }
      let that = this
      this.toast.confirmDelete().then(() => {
        this.request('api_admin_task_order_delete', p).then(res => {
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
    goBackStatus(data) {
      let p = {
        id: data.id
      }
      this.request('api_admin_task_order_back', p).then(res => {
        this.$message({
          message: '驳回成功！',
          type: 'success'
        });
        this.$emit('close')
        this.getDataList()
      }).catch(err => {
        console.log(err)
      })
    },
    vertifySelectData(val) {
      this.auditData = val || []
      let isSubmit = this.auditData.every(ele => {
        return ele.taskStatus === 2
      })
      this.auditData.length && isSubmit ? this.multiple = true : this.multiple = false
    },
    //多选
    multipleSelect(val) {
      this.vertifySelectData(val)
    },
    //全选
    AllSelect(val) {
      this.vertifySelectData(val)
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
$view1: #9857ea;
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
