<style lang="scss" src="@/assets/css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-input v-model="queryList.params.idCard" placeholder="身份证号" size="mini" clearable></el-input>
      <el-date-picker
        v-model="stet"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期" size="mini">
      </el-date-picker>
      <el-select
        v-model="queryList.params.step"
        @change="handleFilter"
        size="mini"
        placeholder="请选择状态">
        <el-option
          label="余额不足"
          value=1>
        </el-option>
        <el-option
          label="待确认"
          value=2>
        </el-option>
      </el-select>
      <el-button size="mini" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button @click="handleExcelExport" size="mini" icon="el-icon-document" v-if="exportButton">导出</el-button>
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
          <el-table-column prop="id" label="ID" width="180" align="center">
          </el-table-column>
          <el-table-column prop="outTradeNo" label="订单编号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="payChannelDesc" label="支付渠道" width="120" align="center">
          </el-table-column>
          <el-table-column align="center" label="状态" width="120">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.step === 2"> {{ scope.row.stepDesc }} </el-tag>
              <el-tag type="warning" v-if="scope.row.step === 1"> {{ scope.row.stepDesc }} </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="idCard" label="身份证号" width="200" align="center">
          </el-table-column>
          <el-table-column prop="account" label="银行卡号" width="200" align="center">
          </el-table-column>
          <el-table-column prop="orgName" label="机构名称" width="300"  align="center">
          </el-table-column>
          <el-table-column prop="log" label="事件处理备注" width="300"  align="center">
            <template slot-scope="scope">
              <div :style="{'color':scope.row.logStatus ===1? '#191970':'#C0CFCF'}">
                {{scope.row.log | fmtLog }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="提现金额" width="120" align="center">
          </el-table-column>
          <el-table-column prop="discountAmt" label="优惠" width="120" align="center">
          </el-table-column>
          <el-table-column prop="chargeAmt" label="手续费" width="120" align="center">
          </el-table-column>
          <el-table-column prop="activityAmt" label="奖励金额" width="120" align="center">
          </el-table-column>
          <el-table-column prop="balance" label="账户余额" width="120" align="center">
          </el-table-column>
          <el-table-column prop="chargeFee" label="免手续费金额" width="120" align="center">
          </el-table-column>
          <el-table-column prop="insertTimestamp" label="插入时间" width="180" align="center">
            <template slot-scope="scope">
              {{scope.row.insertTimestamp | fmtTime }}
            </template>
          </el-table-column>
          <el-table-column prop="reason" label="原因" width="120" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="250">
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" icon="el-icon-document" v-if="dealButton && scope.row.logStatus === 0"
                           @click="handleDeal(scope.row)">去处理
                </el-button>
                <el-button type="primary" icon="el-icon-document" v-if="updateLogButton && scope.row.logStatus === 1"
                           @click="handleUpdateLog(scope.row)">修改
                </el-button>
                <el-button type="danger" icon="el-icon-document" v-if="repayButton && scope.row.logType === 0"
                           @click="handleRepay(scope.row)">重新打款
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

    <el-dialog title="填写备注信息" :visible.sync="dealForm" v-loading="dealLoading" width="30%"
               :close-on-click-modal="false" element-loading-text="处理中。。。">
      <div style="margin: 6% 15% 2% 15%">
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入事件处理备注"
          v-model="queryUpdateLog.log">
        </el-input>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="dealData" style="display:block;margin:0 auto">
          提交
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改备注信息" :visible.sync="updateLogForm" v-loading="updateLogLoading" width="30%"
               :close-on-click-modal="false" element-loading-text="处理中。。。">
      <div style="margin: 6% 15% 2% 15%">
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入事件处理备注"
          v-model="queryUpdateLog.log">
        </el-input>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="updateLogData" style="display:block;margin:0 auto">
          修改
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="repayForm" v-loading="repayLoading" width="30%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">
      <div style="margin-top: 5%; margin-left: 5%; margin-bottom: 5%">重新打款，请谨慎操作!</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="repayForm = false">
          取消
        </el-button>
        <el-button type="danger" @click="repayData">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        queryList: {
          size: 20,
          current: 1,
          params: {
            startTime: null,
            endTime: null,
            idCard: null,
            orgId: '',
            step:"1"
          }
        },
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        queryUpdateLog:{
          id: undefined,
          log: undefined
        },
        queryRepay:{
          id: undefined,
          outTradeNo: undefined,
        },
        stet:[],
        loadingText: '',
        loading: false,
        repayLoading: false,
        dealLoading: false,
        updateLogLoading: false,
        listButton: false,
        exportButton: false,
        dealButton: false,
        updateLogButton: false,
        repayButton: false,
        dealForm: false,
        updateLogForm: false,
        repayForm: false,
      };
    },
    filters:{
      fmtLog(val){
        if(!val){
          val = '未处理'
        }
        return val
      }
    },
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
          this.exportButton = true;
          this.dealButton = true;
          this.updateLogButton = true;
          this.repayButton = true;
        } else {
          if (perms.includes('POST /admin/system/cashFailList')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/system/cashFailExport')) {
            this.exportButton = true;
          }
          if (perms.includes('POST /admin/system/cashFailDeal')) {
            this.dealButton = true;
          }
          if (perms.includes('POST /admin/system/cashFailUpdateLog')) {
            this.updateLogButton = true;
          }
          if (perms.includes('POST /admin/system/cashFailRepay')) {
            this.repayButton = true;
          }
        }
      },
      handleFilter() {
        if (this.stet && this.stet.length > 1) {
          this.queryList.params.startTime = this.stet[0].getTime();
          this.queryList.params.endTime = this.stet[1].getTime();
        } else {
          this.queryList.params.startTime = null;
          this.queryList.params.endTime = null;
        }
        this.queryList.current = this.tableData.current
        this.getList();
      },
      getList() {
        this.loadingText = '正在查询中。。。'
        this.loading = true
        this.request('api_admin_system_cashFailList', this.queryList).then((res) => {
          this.tableData = res;
          this.loading = false
        }).catch((error) => {
          console.log(error)
          this.loading = false
        });
      },
      handleExcelExport() {
        if (this.stet && this.stet.length > 1) {
          this.queryList.params.startTime = this.stet[0].getTime();
          this.queryList.params.endTime = this.stet[1].getTime();
        } else {
          this.queryList.params.startTime = null;
          this.queryList.params.endTime = null;
        }
        this.loadingText = '正在导出，请稍后。。。'
        this.loading = true
        this.queryList.current = this.tableData.current
        this.request('api_admin_system_cashFailExport', this.queryList).then((res) => {
          this.loading = false
        }).catch((error) => {
          this.loading = false
        });
      },
      handleDeal(row){
        this.queryUpdateLog.id = row.id
        this.queryUpdateLog.log = ''
        this.dealForm = true
      },
      handleUpdateLog(row) {
        this.queryUpdateLog.id = row.id
        this.queryUpdateLog.log = row.log
        this.updateLogForm = true
      },
      dealData() {
        if(!this.queryUpdateLog.log){
          this.$notify.warning({
            title: '提示',
            message: '备注信息不能为空'
          })
          return
        }
        this.dealLoading = true
        this.request('api_admin_system_cashFailDeal', this.queryUpdateLog).then((res) => {
          this.dealLoading = false
          this.dealForm = false
          this.$notify.success({
            title: '成功',
            message: '提交成功'
          })
          this.getList();
        }).catch((error) => {
          this.dealLoading = false
          this.$notify.error({
            title: '失败',
            message: '提交失败，请重试'
          })
        });
      },
      updateLogData() {
        if(!this.queryUpdateLog.log){
          this.$notify.warning({
            title: '提示',
            message: '备注信息不能为空'
          })
          return
        }
        this.updateLogLoading = true
        this.request('api_admin_system_cashFailUpdateLog', this.queryUpdateLog).then((res) => {
          this.updateLogLoading = false
          this.updateLogForm = false
          this.$notify.success({
            title: '成功',
            message: '修改成功'
          })
          this.getList();
        }).catch((error) => {
          this.updateLogLoading = false
          this.$notify.error({
            title: '失败',
            message: '修改失败，请重试'
          })
        });
      },
      handleRepay(row) {
        this.queryRepay.id = row.id
        this.queryRepay.outTradeNo = row.outTradeNo
        this.repayForm = true
      },
      repayData() {
        this.repayLoading = true
        this.request('api_admin_invoice_cashFailRepay', this.queryRepay).then((res) => {
          this.repayLoading = false
          this.repayForm = false
          this.$notify.success({
            title: '成功',
            message: '重新打款成功'
          })
          this.getList();
        }).catch((error) => {
          this.repayLoading = false
          this.$notify.error({
            title: '失败',
            message: '重新打款失败，请重试'
          })
        });
      },
      getUserInfo() {
        this.queryList.params.orgId = this.$store.getters.orgId
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


