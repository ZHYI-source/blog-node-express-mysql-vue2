<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <invoice-group :groupData="invoiceData" ref="invoiceGroupId" />
    <div class="app-table-query" v-if="listButton">
      <el-date-picker size="mini"
                      v-model="stet"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
      <el-button @click="handleFilter" size="mini" icon="el-icon-search">查询</el-button>
    </div>
    <div class="app-table-contain">
      <div style="height: 100%;" ref="ztable">
        <el-table
          v-loading="loading" :element-loading-text="loadingText"
          :data="records" :stripe="true" border
          style="width: 100%;"
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column prop="orgName" label="机构名称" align="center">
          </el-table-column>
          <el-table-column prop="invoiceNum" label="本级发票数" width="200" align="center">
          </el-table-column>
          <el-table-column prop="amount" label="本级发票金额" width="300" align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import InvoiceGroup from './components/InvoiceGroup'
  export default {
    components: {
      InvoiceGroup
    },
    data() {
      return {
        queryList: {
          startTime: null,
          endTime: null,
          orgId: '',
        },
        records: [],
        stet:[],
        invoiceData: {},
        loadingText: '',
        loading: false,
        listButton: false,
      };
    },
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
        } else {
          if (perms.includes('POST /admin/invoice/report')) {
            this.listButton = true;
          }
        }
      },
      handleFilter() {
        if (this.stet && this.stet.length > 1) {
          this.queryList.startTime = this.stet[0].getTime();
          this.queryList.endTime = this.stet[1].getTime();
        } else {
          this.queryList.startTime = null;
          this.queryList.endTime = null;
        }
        this.getList();
      },
      getList() {
        this.loadingText = '正在查询中。。。'
        this.loading = true
        this.request('api_admin_invoice_report', this.queryList).then((res) => {
          this.invoiceData.invoiceNoNum = res.invoiceNoNum
          this.invoiceData.invoiceTotalNum = res.invoiceTotalNum
          this.invoiceData.totalAmt = res.totalAmt
          this.invoiceData.orgInvoiceNum = res.orgInvoiceNum
          this.invoiceData.personInvoiceNum = res.personInvoiceNum
          this.$refs.invoiceGroupId.setOptions(this.invoiceData)
          this.records = res.records
          this.loading = false
        }).catch((error) => {
          console.log(error)
          this.loading = false
        });
      },
      getUserInfo(){
        this.queryList.orgId = this.$store.getters.orgId
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



