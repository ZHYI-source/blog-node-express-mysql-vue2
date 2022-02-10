<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-date-picker
        v-model="queryList.month"
        size="mini"
        type="month"
        placeholder="选择月">
      </el-date-picker>
      <el-button @click="handleFilter" size="mini" icon="el-icon-search">查询</el-button>
      <el-button @click="handleExport" size="mini" icon="el-icon-document" v-if="exportButton">导出</el-button>
    </div>
    <div class="app-table-contain">
      <div style="height: 100%;" ref="ztable">
        <el-table
          v-loading="loading" :element-loading-text="loadingText"
          height="650"
          :data="records" :stripe="true" border
          style="width: 100%;"
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column prop="orgName" label="机构名称" fixed="left" width="400" align="center">
          </el-table-column>
          <el-table-column prop="carCount" label="机构车辆数" width="180" align="center">
          </el-table-column>
          <el-table-column prop="thisComplaintCount" label="当月投诉总量" width="180" align="center">
          </el-table-column>
          <el-table-column prop="thisComplaintPercent" label="当月投诉占比" width="180" align="center">
          </el-table-column>
          <el-table-column prop="lastComplaintCount" label="上月投诉总量" width="180" align="center">
          </el-table-column>
          <el-table-column prop="lastComplaintPercent" label="上月投诉占比" width="180" align="center">
          </el-table-column>
          <el-table-column prop="thisResponsibleCount" label="当月有责投诉数" width="180" align="center">
          </el-table-column>
          <el-table-column prop="lastResponsibleCount" label="上月有责投诉数" width="180" align="center">
          </el-table-column>
          <el-table-column prop="thisOverdue" label="当月投诉超期" width="180" align="center">
          </el-table-column>
          <el-table-column prop="lastOverdue" label="上月投诉超期" width="180" align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        queryList: {
          orgId: '',
          month: null
        },
        records: [],
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
          if (perms.includes('POST /admin/complaint/month')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/complaint/monthExport')) {
            this.exportButton = true;
          }
        }
      },
      handleFilter() {
        // if (this.queryList.month) {
        //   this.queryList.month = this.queryList.month.getTime();
        // } else {
        //   this.queryList.month = null;
        // }
        this.getList();
      },
      getList() {
        this.loadingText = '正在查询中。。。'
        this.loading = true
        this.request('api_admin_complaint_month', this.queryList).then((res) => {
          this.records = res
          this.loading = false
          console.log(res)
        }).catch((error) => {
          console.log(error)
          this.loading = false
        });
      },
      handleExport() {
        // if (this.queryList.month) {
        //   this.queryList.month = this.queryList.month.getTime();
        // } else {
        //   this.queryList.month = null;
        // }
        this.loadingText = '正在导出，请稍后。。。'
        this.loading = true
        this.request('api_admin_complaint_monthExport', this.queryList).then((res) => {
          this.loading = false
        }).catch((error) => {
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



