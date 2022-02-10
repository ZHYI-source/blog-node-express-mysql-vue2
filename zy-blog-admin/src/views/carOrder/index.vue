<style lang="scss" src="@/assets/css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-input v-model="queryList.params.orgName" placeholder="组织机构" size="mini" @focus="treeForm = true"></el-input>
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
          <el-table-column prop="orgName" label="机构名称" width="300" align="center">
          </el-table-column>
          <el-table-column prop="modeDesc" label="运营模式分类" width="120" align="center">
          </el-table-column>
          <el-table-column prop="plateNo" label="车牌号" width="120" align="center">
          </el-table-column>
          <el-table-column prop="invoiceNo" label="纳税人识别号" width="300" align="center">
          </el-table-column>
          <el-table-column prop="userTel" label="手机号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="orderAmountDesc" label="交易总金额" align="center">
          </el-table-column>
          <el-table-column prop="invoiceAmountDesc" label="开票总金额" align="center">
          </el-table-column>
          <el-table-column prop="invoiceCount" label="开票张数"  align="center">
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

    <el-dialog title="机构筛选" :visible.sync="treeForm">
      <el-input v-model="filterText" class="filter-item" placeholder="输入关键字进行过滤" clearable
                style="width: 200px; margin-left: 25px; margin-top: 15px"/>
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
        <el-button type="primary" @click="treeForm = false">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { MessageBox } from "element-ui";
  export default {
    data() {
      return {
        queryList: {
          size: 20,
          current: 1,
          params: {
            startTime: null,
            endTime: null,
            orgId: '',
            orgName: ''
          }
        },
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        queryTree: {
          orgId: undefined
        },
        loadingText: '',
        loading: false,
        treeForm: false,
        listButton: false,
        exportButton: false,
        //机构树
        orgTree: [],
        stet: [],
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'orgName'
        },
      };
    },
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
          this.exportButton = true;
        } else {
          if (perms.includes('POST /admin/invoice/carOrderList')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/invoice/carOrderExport')) {
            this.exportButton = true;
          }
        }
      },
      handleFilter() {
        if (this.stet && this.stet.length > 1) {
          this.queryList.params.startTime = this.stet[0].getTime();
          this.queryList.params.endTime = this.stet[1].getTime();
          let max = this.queryList.params.endTime / 1000 - this.queryList.params.startTime / 1000;
          if(max > 31 * 24 * 3600){
            MessageBox.alert('查询时间段不能超过31天', '提示', {
              confirmButtonText: '确定',
              type: 'info'
            })
            return
          }
        } else {
          MessageBox.alert('请选择查询时间，不能超过31天', '提示', {
            confirmButtonText: '确定',
            type: 'info'
          })
          return
        }
        this.queryList.current = this.tableData.current
        this.getList();
      },
      getList() {
        this.loadingText = '正在查询中。。。'
        this.loading = true
        this.request('api_admin_invoice_carOrderList', this.queryList).then((res) => {
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
        this.request('api_admin_invoice_carOrderExport', this.queryList).then((res) => {
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
      handleNodeClick(data) {
        this.queryList.params.orgId = data.orgId
        this.queryList.params.orgName = data.orgName
      },
      getUserInfo() {
        this.queryList.params.orgId = this.$store.getters.orgId
        this.queryTree.orgId = this.$store.getters.orgId
      }
    },
    async created() {
      await this.getUserInfo()
      this.getPerms()
      this.getTree()
    },
    mounted() {
      // this.getList();
    }
  }
</script>


