<style lang="scss" src="@/assets/css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-input v-model="queryList.params.plateNo" placeholder="车牌号" size="mini" clearable></el-input>
      <el-input v-model="queryList.params.invoiceId" placeholder="发票ID" size="mini" clearable></el-input>
      <el-date-picker
        v-model="stet"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期" size="mini">
      </el-date-picker>
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
          <el-table-column prop="id" label="ID" width="170" align="center">
          </el-table-column>
          <el-table-column prop="invoiceId" label="发票ID" width="170" align="center">
          </el-table-column>
          <el-table-column prop="plateNo" label="车牌号" width="100" align="center">
          </el-table-column>
          <el-table-column prop="userRealName" label="开票人姓名" width="100" align="center">
          </el-table-column>
          <el-table-column prop="invoiceNo" label="税号" width="200" align="center">
          </el-table-column>
          <el-table-column prop="log" label="log" align="center">
          </el-table-column>
          <el-table-column prop="insertTimestamp" label="插入时间" width="180" align="center">
            <template slot-scope="scope">
              {{scope.row.insertTimestamp | fmtTime }}
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
            plateNo: '',
            invoiceId: '',
            startTime: null,
            endTime: null,
          }
        },
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        stet: [],
        loadingText: '',
        loading: false,
        listButton: false,
        exportButton: false,
      };
    },
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
          this.exportButton = true;
        } else {
          if (perms.includes('POST /admin/invoice/logList')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/invoice/logExport')) {
            this.exportButton = true;
          }
        }
      },
      handleFilter() {
        if (this.stet && this.stet.length > 1) {
          let start = this.stet[0].getTime();
          let end = this.stet[1].getTime();
          this.queryList.params.startTime = start;
          this.queryList.params.endTime = end;
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
        this.request('api_admin_invoice_logList', this.queryList).then((res) => {
          this.tableData = res;
          this.loading = false
        }).catch((error) => {
          console.log(error)
          this.loading = false
        });
      },
      handleExcelExport() {
        if (this.stet && this.stet.length > 1) {
          let start = this.stet[0].getTime();
          let end = this.stet[1].getTime();
          this.queryList.params.startTime = start;
          this.queryList.params.endTime = end;
        } else {
          this.queryList.params.startTime = null;
          this.queryList.params.endTime = null;
        }
        this.loadingText = '正在导出，请稍后。。。'
        this.loading = true
        this.queryList.current = this.tableData.current
        this.request('api_admin_invoice_logExport', this.queryList).then((res) => {
          this.loading = false
        }).catch((error) => {
          this.loading = false
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


