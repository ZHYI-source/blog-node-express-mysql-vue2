<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-input v-model="query.org_name" placeholder="组织机构" size="mini" @focus="showTree"></el-input>
      <el-input size="mini" v-model="query.user_real_name" placeholder="司机姓名"></el-input>
      <el-input size="mini" v-model="query.totalAmt" placeholder="最小金额">
        <span slot="suffix">元</span>
      </el-input>
      <el-date-picker size="mini"
                      v-model="query.stet"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
      <el-button size="mini" icon="el-icon-search" @click="doQuery()">查询</el-button>
    </div>
    <div class="app-table-tools">
      <div>
        <el-popover ref="ex1" placement="right" width="400px" v-model="ctl.exportShow" size="mini">
          <div class="app-table-tools-pop-title">
            导出设置
          </div>
          <el-form size="mini" @submit.native.prevent label-width="100px">
            <el-form-item label="导出模式">
              <el-radio v-model="excelExport.flg" :label="1">全部</el-radio>
              <el-radio v-model="excelExport.flg" :label="2">当前页</el-radio>
            </el-form-item>
            <el-form-item label="司机姓名">
              <el-input v-model="excelExport.user_real_name" placeholder="司机姓名"></el-input>
            </el-form-item>
            <el-form-item label="最小金额">
              <el-input v-model="excelExport.totalAmt" placeholder="最小金额">
                <span slot="suffix">元</span>
              </el-input>
            </el-form-item>
            <el-form-item label="统计时间">
              <el-date-picker
                v-model="excelExport.stet"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>


          </el-form>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="ctl.exportShow = false">取消</el-button>
            <el-button type="primary" size="mini" @click="doExcelExport()">确定</el-button>
          </div>

        </el-popover>
        <el-button size="mini" type="primary" v-popover:ex1 icon="el-3-icon el-3-icondaochu"  @click="ctl.exportShow = true" v-if="exportButton">
          导出
        </el-button>
      </div>
    </div>
    <div class="app-table-contain">
      <div style="height: 100%;" ref="ztable">
        <el-table
          stripe
          :data="tableData.records" :stripe="true" border
          style="width: 100%;"
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column width="180" prop="idCard" label="身份证号" align="center">
          </el-table-column>
          <el-table-column prop="userRealName" label="姓名" width="auto" align="center">
          </el-table-column>
          <el-table-column width="180" prop="userTel" label="手机号" align="center">
          </el-table-column>

          <el-table-column prop="orderTotal" label="订单数量" width="auto" align="center">
            <template slot-scope="scope">
              {{scope.row.orderTotal}}
            </template>
          </el-table-column>
          <el-table-column prop="totalAmt" label="总金额" width="auto" align="center">
            <template slot-scope="scope">
              {{scope.row.totalAmt}}
            </template>
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
  import viewinfo from './view.vue';
  import tool from '@libs/tool';
  import {MessageBox} from "element-ui";
  export default {
    components: {viewinfo},
    data() {
      return {
        ctl: {
          show: false,
          read: false,
          exportShow: false
        },
        excelExport: {
          user_real_name: '',
          stet: [],
          trade_status: null,
          flg: 1,
          pay_chanel: null,
          totalAmt: 10,
          org_id: ''
        },
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        viewVal: {},
        listButton: false,
        exportButton: false,
        query: {
          user_real_name: '',
          stet: [],
          trade_status: null,
          pay_chanel: null,
          totalAmt: 10,
          current: 1,
          org_id: '',
          org_name: ''
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
          this.exportButton = true;
          this.listButton = true;
        } else {
          if (perms.includes('POST /admin/exportOrderStatistics')) {
            this.exportButton = true;
          }
          if (perms.includes('POST /admin/orderStatistics')) {
            this.listButton = true;
          }
        }
      },
      doExcelExport() {
        if (this.excelExport.stet && this.excelExport.stet.length > 1) {
          this.excelExport.st = this.excelExport.stet[0].getTime() / 1000;
          this.excelExport.et = this.excelExport.stet[1].getTime() / 1000;
          if(this.excelExport.et - this.excelExport.st > 3 * 30 * 24 * 3600){
            MessageBox.alert('导出时间范围不能大于90天', '错误', {
              confirmButtonText: '确定',
              type: 'error'
            });
            return
          }
        } else {
          this.excelExport.et = new Date().getTime() / 1000;
          this.excelExport.st = this.excelExport.et - 30 * 24 * 3600;
        }
        if (this.excelExport.totalAmt !== '' && this.excelExport.totalAmt !== undefined) {
          this.excelExport.totalAmt = parseFloat(this.excelExport.totalAmt);
        }
        let p = {
          current: this.excelExport.flg === 1 ? null : this.tableData.current,
          params: this.excelExport
        };
        this.request('api_admin_exportOrderStatistics', p).then((res) => {
          // this.tableData = res;
        }).catch((error) => {
        });

        this.ctl.exportShow = false;
      },
      doView(index, val) {
        this.ctl.show = true;
        this.ctl.read = true;
        let that = this;
        //这里element弹框有延迟问题，view组件未加载
        setTimeout(function () {
          that.$refs.view.open(val, true);
        }, 100);
      },
      doQuery() {
        if (this.query.stet && this.query.stet.length > 1) {
          this.query.st = this.query.stet[0].getTime() / 1000;
          this.query.et = this.query.stet[1].getTime() / 1000;
          if(this.query.et - this.query.st > 3 * 30 * 24 * 3600){
            MessageBox.alert('查询时间范围不能大于90天', '错误', {
              confirmButtonText: '确定',
              type: 'error'
            });
            return
          }
        } else {
          this.query.et = new Date().getTime() / 1000;
          this.query.st = this.query.et - 30 * 24 * 3600;
        }
        if (this.query.totalAmt !== '' && this.query.totalAmt !== undefined) {
          this.query.totalAmt = parseFloat(this.query.totalAmt);
        }
        this.excelExport = tool.cloneObj(this.query);
        this.$set(this.excelExport, 'flg', 2);
        let p = {
          current: this.tableData.current,
          params: this.query
        };
        console.log(p);
        this.queryData(p);
      },
      queryData(val) {
        let p = val;
        this.request('api_admin_orderStatistics', p).then((res) => {
          this.tableData = res;
        }).catch((error) => {
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
        this.query.org_id = data.orgId
        this.query.org_name = data.orgName
        console.log(data)
      },
      selectOrg() {
        this.treeForm = false
      },
      getUserInfo(){
        this.queryTree.orgId = this.$store.getters.orgId
        this.query.org_id = this.$store.getters.orgId
        this.excelExport.org_id = this.$store.getters.orgId
      }
    },
    async created() {
      await this.getUserInfo()
      this.getPerms()
      this.getTree()
    },
    mounted() {
      this.doQuery();
    }

  }
</script>

<style scoped>

</style>
