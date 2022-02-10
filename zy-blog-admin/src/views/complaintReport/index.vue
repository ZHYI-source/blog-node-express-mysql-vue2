<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-date-picker
        v-model="stet"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期" size="mini">
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
          <el-table-column prop="raolu" label="绕路"  align="center">
          </el-table-column>
          <el-table-column prop="juzai" label="拒载" align="center">
          </el-table-column>
          <el-table-column prop="taidu" label="服务态度差"  align="center">
          </el-table-column>
          <el-table-column prop="dabiao" label="不打表" align="center">
          </el-table-column>
          <el-table-column prop="pinche" label="拼车"  align="center">
          </el-table-column>
          <el-table-column prop="xiyan" label="吸烟" align="center">
          </el-table-column>
          <el-table-column prop="dongxi" label="吃东西" align="center">
          </el-table-column>
          <el-table-column prop="dianhua" label="打电话" align="center">
          </el-table-column>
          <el-table-column prop="shuaike" label="甩客" align="center">
          </el-table-column>
          <el-table-column prop="yijia" label="议价" align="center">
          </el-table-column>
          <el-table-column prop="tiaoke" label="挑客" align="center">
          </el-table-column>
          <el-table-column prop="tutan" label="吐痰" align="center">
          </el-table-column>
          <el-table-column prop="yibiao" label="疑表" align="center">
          </el-table-column>
          <el-table-column prop="qita" label="其他" align="center">
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
          startTime: null,
          endTime: null,
        },
        records: [],
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
          if (perms.includes('POST /admin/complaint/report')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/complaint/reportExport')) {
            this.exportButton = true;
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
        this.request('api_admin_complaint_report', this.queryList).then((res) => {
          this.records = res
          this.loading = false
        }).catch((error) => {
          console.log(error)
          this.loading = false
        });
      },
      handleExport() {
        if (this.stet && this.stet.length > 1) {
          this.queryList.startTime = this.stet[0].getTime();
          this.queryList.endTime = this.stet[1].getTime();
        } else {
          this.queryList.startTime = null;
          this.queryList.endTime = null;
        }
        this.loadingText = '正在导出，请稍后。。。'
        this.loading = true
        this.request('api_admin_complaint_reportExport', this.queryList).then((res) => {
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



