<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query">
      <el-input v-model="query.params.orgName" placeholder="组织机构" size="mini" @focus="showTree"></el-input>
      <el-button @click="doQuery()" size="mini" icon="el-icon-search">查询</el-button>
    </div>
    <div class="chart-row">
      <div class="chart-column">
        <div class="chart-title">登录APP司机</div>
        <sign-chart class="chart" :chart-data="signData" />
        <div class="chart-number">
          <div class="chart-number-div">
            <div>{{signData.signDriverTotalCount}}</div>
            <div>&ensp;/&ensp;</div>
            <div>{{signData.driverTotalCount}}</div>
          </div>
        </div>
      </div>
      <div class="chart-column">
        <div class="chart-title">绑卡司机</div>
        <bind-chart :chart-data="bindData" />
        <div class="chart-number">
          <div class="chart-number-div">
            <div>{{bindData.bindDriverTotalCount}}</div>
            <div>&ensp;/&ensp;</div>
            <div>{{bindData.driverTotalCount}}</div>
          </div>
        </div>
      </div>
      <div class="chart-column">
        <div class="chart-title">在线车辆</div>
        <online-car-chart :chart-data="onlineCarData" />
        <div class="chart-number">
          <div class="chart-number-div">
            <div>{{onlineCarData.onlineTotalCount}}</div>
            <div>&ensp;/&ensp;</div>
            <div>{{onlineCarData.carTotalCount}}</div>
          </div>
        </div>
      </div>

      <div class="chart-column">
        <div class="chart-title">昨日活跃车辆</div>
        <car-chart :chart-data="activeCarData" />
        <div class="chart-number">
          <div class="chart-number-div">
            <div>{{activeCarData.activeTotalCount}}</div>
            <div>&ensp;/&ensp;</div>
            <div>{{activeCarData.carTotalCount}}</div>
          </div>
        </div>
      </div>
      <div class="chart-column">
        <div class="chart-title">电子发票</div>
        <ReportPasteChart :chart-data="pasteData" />
        <div class="chart-number">
          <div class="chart-number-div">
            <div>{{pasteData.invoiceTotalCount}}</div>
            <div>&ensp;/&ensp;</div>
            <div>{{pasteData.carTotalCount}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="app-table-contain">
      <div style="height: 100%;" ref="ztable">
        <el-table
          height="800"
          stripe
          v-loading.fullscreen="loading"
          element-loading-text="数据加载中。。。"
          :data="tableData.records" :stripe="true" border
          style="width: 100%;"
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column prop="orgName" label="机构名称" width="400" align="center">
          </el-table-column>
          <el-table-column prop="carCount" label="本级车辆数" width="150" align="center">
          </el-table-column>
          <el-table-column prop="invoiceNoCount" label="电子发票税号数" width="150" align="center">
          </el-table-column>
          <el-table-column prop="driverCount" label="本级司机数" width="150" align="center">
          </el-table-column>
          <el-table-column prop="activeCarCount" label="昨日活跃车辆数" width="150" align="center">
          </el-table-column>
          <el-table-column prop="activeCarPercent" label="昨日活跃率" align="center">
          </el-table-column>
          <el-table-column prop="bindDriverCount" label="绑卡司机数" width="150" align="center">
          </el-table-column>
          <el-table-column prop="bindPercent" label="绑卡率" align="center">
          </el-table-column>
        </el-table>
      </div>
      <!--<el-pagination-->
        <!--background-->
        <!--layout="prev, pager, next"-->
        <!--@current-change="doQuery()"-->
        <!--:total="tableData.total" :current-page.sync="tableData.current" :page-size="tableData.size"-->
        <!--style="flex-shrink: 0;padding: 10px">-->
      <!--</el-pagination>-->
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
  import BindChart from './components/BindChart'
  import OnlineCarChart from './components/OnlineCarChart'
  import CarChart from './components/CarChart'
  import PasteChart from "@/views/max/components/PasteChart";
  import ReportPasteChart from "@/views/max/components/reportPasteChart";
  // import PasteChart from './components/PasteChart'
  export default {
    components: {
      ReportPasteChart,
      PasteChart,
      SignChart,
      BindChart,
      OnlineCarChart,
      CarChart,
      // PasteChart
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
        bindData: {},
        onlineCarData: {},
        clockCarData: {},
        activeCarData: {},
        pasteData: {},
        loading: false,
        listButton: false,
        query: {
          current: 1,
          params: {
            orgId: '',
            orgName: ''
          }
        },
        queryTree:{
          orgId: undefined
        },
        orgTree: [],
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
        } else {
          if (perms.includes('POST /admin/carReport')) {
            this.listButton = true;
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
        this.request('api_admin_carReport', this.query).then((res) => {
          this.tableData = res;
          this.signData = res.sign;
          this.bindData = res.bind;
          this.onlineCarData = res.onlineCar
          this.clockCarData = res.clockCar;
          this.activeCarData =res.activeCar;
          // this.carData.onlineTotalPercent = (this.carData.onlineTotalCount *100.0 / this.carData.carTotalCount1).toFixed(2) + '%';
          // this.carData.notSignCarTotalCount = this.carData.carTotalCount1 - this.carData.onlineTotalCount;
          this.pasteData = res.invoice;
          console.log(this.pasteData)
          // this.pasteData.pasteTotalPercent = (this.pasteData.pasteTotalCount *100.0 / this.carData.carTotalCount).toFixed(2) + '%';
        }).catch((error) => {
        });
      },
      getTree() {
        const that = this
        this.request('orgTree', this.queryTree).then(response => {
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

