<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <amount-group :groupData="amountData" ref="amountGroupId" />
    <div class="app-table-query">
      <el-input size="mini" v-model="query.idCard" placeholder="身份证" style="width: 100%" clearable></el-input>
      <span style=" color:#23262b; font-size:13px; margin-left:17px">插入时间</span>
      <el-date-picker
        v-model="query.stet"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期" size="mini">
      </el-date-picker>
      <el-select size="mini" v-model="query.cashType" placeholder="类型">
        <el-option label="出租车费" :value="1"></el-option>
        <el-option label="平台奖励" :value="2"></el-option>
        <el-option label="提现" :value="3"></el-option>
      </el-select>
      <el-button @click="doQuery()" size="mini" icon="el-icon-search">查询</el-button>
      <el-button @click="doExcelExport" size="mini" icon="el-icon-document" v-if="exportButton">导出</el-button>
    </div>
    <div class="app-table-contain">
      <div style="height: 100%;" ref="ztable">
        <el-table
          v-loading="loading"
          :element-loading-text="loadingText"
          :data="tableData.records" :stripe="true" border
          stripe
          style="width: 100%;"
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column prop="driverName" label="司机姓名" width="auto" align="center">
          </el-table-column>
          <el-table-column width="180" prop="idCard" label="身份证号" align="center">
          </el-table-column>
          <el-table-column prop="cashTypeDesc" label="收益类型" width="150" align="center">
          </el-table-column>
          <el-table-column prop="feeDesc" label="金额" width="auto" align="center">
          </el-table-column>
          <el-table-column prop="intTimeDesc" label="插入时间" width="180" align="center">
          </el-table-column>
          <el-table-column prop="applyStateDesc" label="申请状态" width="auto" align="center">
          </el-table-column>
          <el-table-column prop="balanceDesc" label="余额" width="100" align="center">
          </el-table-column>
          <el-table-column prop="payAmtDesc" label="实际支付" width="auto" align="center">
          </el-table-column>
          <el-table-column prop="discountAmtDesc" label="优惠金额" width="auto" align="center">
          </el-table-column>
          <el-table-column prop="merchantNo" label="商户号" width="190" align="center">
          </el-table-column>
          <el-table-column prop="isSettledDesc" label="是否清算" width="150" align="center">
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="total,prev, pager, next"
        @current-change="doQuery()"
        :total="tableData.total" :current-page.sync="tableData.current" :page-size="tableData.size"
        style="flex-shrink: 0;padding: 10px">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import AmountGroup from './components/AmountGroup'
  export default {
    name: 'DriverOrder',
    components: {
      AmountGroup
    },
    data() {
      return {
        query: {
          idCard: '',
          cashType:undefined,
          stet: [],
        },
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        amountData: {},
        date: [],
        loading: false,
        loadingText: '',
        listButton: false,
        exportButton: false,
      }
    },
    created() {
      // await this.getUserInfo()
      this.getPerms()
    },
    mounted() {
    },
    methods: {
      doQuery() {
        if (this.query.stet && this.query.stet.length > 1) {
          this.query.st = this.query.stet[0].getTime() / 1000;
          this.query.et = this.query.stet[1].getTime() / 1000;
        } else {
          this.query.st = null;
          this.query.et = null;
        }
        const p = {
          current:this.tableData.current,
          params: this.query
        }
        this.loadingText = '查询中。。。'
        this.loading = true
        this.request('api_admin_system_bill', p).then((res) => {
          this.loading = false
          this.tableData = res
          this.amountData.totalFee = res.totalFee
          this.amountData.cashOutTotalFee = res.cashOutTotalFee
          this.amountData.balance = res.balance
          this.$refs.amountGroupId.setOptions(this.amountData)
        }).catch((error) => {
          this.loading = false
        })
      },
      doExcelExport() {
        if (this.query.stet && this.query.stet.length > 1) {
          this.query.st = this.query.stet[0].getTime() / 1000;
          this.query.et = this.query.stet[1].getTime() / 1000;
        } else {
          this.query.st = null;
          this.query.et = null;
        }
        this.loadingText = '正在导出，请稍后。。。'
        this.loading = true
        let p = {
          params: this.query
        };
        this.request('api_admin_system_billExport',p).then((res) => {
          this.loading = false
        }).catch((error) => {
          this.loading = false
        });
      },
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
          this.exportButton = true;
        } else {
          if (perms.includes('POST /admin/system/bill')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/system/billExport')) {
            this.exportButton = true;
          }
        }
      },
      // getUserInfo() {
      //   this.query.orgId = this.$store.getters.orgId
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }

    .title_font{
      color: white;
      font-weight: bold;
      font-size: 20px;
      margin:10px ;
      padding: 10px;
      text-align: center;
    }
    .div_red{
      background-color: #ce3b3b;
    }
    .div_blue{
      background-color: #6888ff;
    }
    .div_yellow{
      background-color: orange;
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
