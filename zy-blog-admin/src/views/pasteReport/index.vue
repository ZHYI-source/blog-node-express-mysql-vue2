<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query">
      <el-input v-model="query.params.orgName" placeholder="组织机构" size="mini" @focus="showTree"></el-input>
      <el-select size="mini" v-model="query.params.paste" placeholder="类型">
        <el-option label="未贴码" :value="0"></el-option>
        <el-option label="已贴码" :value="1"></el-option>
      </el-select>
      <el-button @click="doQuery" size="mini" icon="el-icon-search">查询</el-button>
      <el-button @click="doExcelExport" size="mini" icon="el-icon-document" v-if="exportButton">导出</el-button>

    </div>
    <div class="chart-row">
      <div class="chart-column">
        <div class="chart-title">贴码车辆</div>
        <paste-chart :chart-data="pasteData" />
        <div class="chart-number">
          <div class="chart-number-div">
            <div>{{pasteData.pasteTotalCount}}</div>
            <div>&ensp;/&ensp;</div>
            <div>{{pasteData.carTotalCount}}</div>
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
          <el-table-column prop="orgName" label="机构名称" width="400" align="center">
          </el-table-column>
          <el-table-column prop="plateNo" label="车牌号"  align="center">
          </el-table-column>
          <el-table-column prop="isPastedDesc" label="贴码状态" align="center">
          </el-table-column>
          <el-table-column prop="driverName" label="当班司机"  align="center">
            <template slot-scope="scope">
              {{scope.row.driverName| fmtInfo}}
            </template>
          </el-table-column>
          <el-table-column prop="userTel" label="手机号" align="center">
            <template slot-scope="scope">
              {{scope.row.userTel| fmtInfo}}
            </template>
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
  import pasteChart from './components/pasteChart'
  export default {
    components: {
      pasteChart
    },
    data() {
      return {
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        pasteData: {},
        listButton: false,
        exportButton: false,
        loading: false,
        loadingText: '',
        query: {
          current: 1,
          params: {
            orgId: '',
            orgName: '',
            paste: null
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
    filters: {
      fmtInfo(val){
        if(!val){
          val = '-----'
        }
        return val
      }
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
          if (perms.includes('POST /admin/pasteReport')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/pasteReportExport')) {
            this.exportButton = true;
          }
        }
      },
      doQuery() {
        this.query.current = this.tableData.current
        this.queryData();
      },
      queryData() {
        if(!this.query.params.orgId){
          this.query.params.orgId = this.$store.getters.orgId
        }
        this.loadingText = '正在查询中。。。'
        this.loading = true
        this.request('api_admin_pasteReport', this.query).then((res) => {
          this.tableData = res;
          this.pasteData = res.paste;
          this.loading = false
        }).catch((error) => {
          this.loading = false
        });
      },
      doExcelExport() {
        this.loadingText = '正在导出，请稍后。。。'
        this.loading = true
        this.query.current = this.tableData.current
        this.request('api_admin_pasteReport_export', this.query).then((res) => {
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

