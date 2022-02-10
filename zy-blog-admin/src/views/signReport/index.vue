<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query">
      <el-input v-model="query.params.orgName" placeholder="组织机构" size="mini" @focus="showTree"></el-input>
      <span style=" color:#23262b; font-size:13px; margin-left:17px">运行时间</span>
      <el-date-picker
        size="mini"
        v-model="stet"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']">
      </el-date-picker>
      <el-select size="mini" v-model="query.params.status" placeholder="类型">
        <el-option label="打卡营运" :value="0"></el-option>
        <el-option label="未打卡营运" :value="1"></el-option>
      </el-select>
      <el-button @click="doQuery" size="mini" icon="el-icon-search">查询</el-button>
      <el-button @click="doExcelExport" size="mini" icon="el-icon-document" v-if="exportButton">导出</el-button>

    </div>
    <div class="chart-row">
      <div class="chart-column">
        <div class="chart-title">打卡车辆</div>
        <sign-chart class="chart" :chart-data="signData" />
        <div class="chart-number">
          <div class="chart-number-div">
            <div>{{signData.signCarTotalCount}}</div>
            <div>&ensp;/&ensp;</div>
            <div>{{signData.dutyCarTotalCount}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="app-table-contain">
      <div style="height: 100%;" ref="ztable">
        <el-table
          stripe
          v-loading="loading"
          :element-loading-text="loadingText"
          :data="tableData.records" :stripe="true" border
          style="width: 100%;"
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column prop="orgName" label="机构名称" align="center">
          </el-table-column>
          <el-table-column prop="plateNo" label="车牌号" width="150" align="center">
          </el-table-column>
          <el-table-column prop="gpsTime" label="运行时间" width="180" align="center">
            <template slot-scope="scope">
              {{scope.row.gpsTime| fmtTime}}
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="当班司机" width="150" align="center">
          </el-table-column>
          <el-table-column prop="onTime" label="当班时间" width="180" align="center">
            <template slot-scope="scope">
              {{scope.row.onTime| fmtTime}}
            </template>
          </el-table-column>
          <el-table-column prop="statusDesc" label="状态" width="150" align="center">
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="doQuery()"
        :total="tableData.total" :current-page.sync="tableData.current" :page-size="tableData.size"
        style="flex-shrink: 0;padding: 10px">
      </el-pagination>
    </div>

    <el-dialog title="机构筛选" :visible.sync="treeForm">

      <el-input v-model="filterText" class="filter-item" placeholder="输入关键字进行过滤" clearable style="width: 200px; margin-left: 25px; margin-top: 15px" />

      <el-tree
        class="filter-tree"
        :data="orgTree"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
        :highlight-current="true"
        ref="tree"
        style="margin-left: 25px; margin-top: 10px">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="selectOrg">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import SignChart from './components/SignChart'
  export default {
    components: {
      SignChart
    },
    data() {
      return {
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        signData: {},
        listButton: false,
        exportButton: false,
        loading: false,
        loadingText: '',
        query: {
          current: 1,
          params: {
            orgId: '',
            orgName: '',
            gpsTime: undefined,
            status: null
          }
        },
        queryTree:{
          orgId: undefined
        },
        orgTree: [],
        stet: [],
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'orgName'
        },
        treeForm: false,
      };
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
          this.exportButton = true;
        } else {
          if (perms.includes('POST /admin/signReport')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/signReportExport')) {
            this.exportButton = true;
          }
        }
      },
      doQuery() {
        this.query.current = this.tableData.current
        this.queryData();
      },
      queryData() {
        if (this.stet && this.stet.length > 1) {
          this.query.params.startTime = this.stet[0].getTime() / 1000;
          this.query.params.endTime = this.stet[1].getTime() / 1000;
        } else {
          this.query.params.startTime = null;
          this.query.params.endTime = null;
        }
        if(!this.query.params.orgId){
          this.query.params.orgId = this.$store.getters.orgId
        }
        this.loadingText = '正在查询中。。。'
        this.loading = true
        this.request('api_admin_signReport', this.query).then((res) => {
          this.tableData = res;
          this.signData = res.sign;
          this.loading = false
        }).catch((error) => {
          this.loading = false
        });
      },
      doExcelExport() {
        if (this.stet && this.stet.length > 1) {
          this.query.startTime = this.stet[0].getTime() / 1000;
          this.query.endTime = this.stet[1].getTime() / 1000;
        } else {
          this.query.startTime = null;
          this.query.endTime = null;
        }
        this.loadingText = '正在导出，请稍后。。。'
        this.loading = true
        this.query.current = this.tableData.current
        this.request('api_admin_signReport_export', this.query).then((res) => {
          this.loading = false
        }).catch((error) => {
          this.loading = false
        });
      },
      getTree() {
        const that = this
        this.request('orgTree', this.queryTree).then(response => {
          console.log(response)
          that.orgTree = response
        })
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.orgName.indexOf(value) !== -1;
      },
      showTree() {
        this.treeForm = true
      },
      handleNodeClick(data) {
        this.query.params.orgId = data.orgId
        this.query.params.orgName = data.orgName
      },
      selectOrg() {
        this.treeForm = false
      },
      getUserInfo(){
        this.queryTree.orgId = this.$store.getters.orgId
        this.query.params.orgId = this.$store.getters.orgId
      }
    },
    async created() {
      await this.getUserInfo()
      this.getPerms()
      this.getTree()
    },
    mounted() {
      this.queryData();
    }
  }
</script>
<style scoped>
  .chart-row{
    display: flex;
    flex-direction: row;
    /*height: 400px;*/
  }
  .chart-column{
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    padding-bottom: 30px;
    /*height: 400px;*/
    width: 60%;
  }
  .chart-title{
    width: 100%;
    font-size: 1.5rem;
    color: #484848;
    letter-spacing: 0.1rem;
    text-align: center;
  }
  .chart-number{
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .chart-number-div{
    display: flex;
    margin: auto;
    font-size: 1.5rem;
    color: #484848;
  }
  .chart{
    margin: auto;
  }
</style>

