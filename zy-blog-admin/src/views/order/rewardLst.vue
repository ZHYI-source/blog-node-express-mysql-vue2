<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-input v-model="query.org_name" placeholder="组织机构" size="mini" @focus="showTree"></el-input>
      <el-input size="mini" v-model="query.user_real_name" placeholder="司机姓名" style="width: 100%"></el-input>
      <el-date-picker size="mini"
                      v-model="query.stet"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>

      <el-button @click="doQuery()" size="mini" icon="el-icon-search">查询</el-button>
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
            <el-form-item label="提现时间">
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
        <el-button size="mini" type="primary" v-popover:ex1 icon="el-3-icon el-3-icondaochu" @click="ctl.exportShow = true" v-if="exportButton">
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
          <el-table-column width="200" prop="idCard" label="身份证号" align="center">
          </el-table-column>
          <el-table-column width="80" prop="userRealName" label="姓名" align="center">
          </el-table-column>
          <el-table-column width="120" prop="userTel" label="手机号" align="center">
          </el-table-column>
          <el-table-column width="180" prop="merchantNo" label="商户号" align="center">
          </el-table-column>
          <el-table-column width="180" prop="outTradeNo" label="订单号" align="center">
          </el-table-column>
          <el-table-column width="180" prop="payForTime" label="奖励时间" align="center">
            <template slot-scope="scope">
              {{scope.row.payCreateTime|fmtTime}}
            </template>
          </el-table-column>
          <el-table-column prop="tradeAmtStr" label="奖励金额" align="center">
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
  import tool from '@libs/tool';

  export default {
    data() {
      return {
        ctl: {
          show: false,
          read: false,
          regShow: false,
          exportShow: false
        },
        excelExport: {
          user_real_name: '',
          stet: [],
          flg: 1,
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
    filters:{
      fmtAmount(val){
        if (val === '' || val === null || val === undefined) {
          val = '0.0';
        }
        return val
      }
    },
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.exportButton = true;
          this.listButton = true;
        } else {
          if (perms.includes('POST /admin/exportReward')) {
            this.exportButton = true;
          }
          if (perms.includes('POST /admin/rewardLst')) {
            this.listButton = true;
          }
        }
      },
      doDel(index, val, ref) {
        console.log(val.carId);
        ref.doClose();
      },
      doAdd() {
        this.ctl.show = true;
        this.ctl.read = false;
        let that = this;
        //这里element弹框有延迟问题，view组件未加载
        setTimeout(function () {
          that.$refs.view.open({}, false);
        }, 100);
      },
      doReReg(index, val) {
        this.ctl.regShow = true;
        let that = this;
        //这里element弹框有延迟问题，view组件未加载
        setTimeout(function () {
          that.$refs.reg.open(val);
        }, 100);
      },
      doEdit(index, val) {
        this.ctl.show = true;
        this.ctl.read = false;
        let that = this;
        //这里element弹框有延迟问题，view组件未加载
        setTimeout(function () {
          that.$refs.view.open(val, false);
        }, 100);
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
      doExcelExport() {
        if (this.excelExport.stet && this.excelExport.stet.length > 1) {
          this.excelExport.st = this.excelExport.stet[0].getTime() / 1000;
          this.excelExport.et = this.excelExport.stet[1].getTime() / 1000;
        } else {
          this.excelExport.st = null;
          this.excelExport.et = null;
        }
        let p = {
          current: this.excelExport.flg === 1 ? null : this.tableData.current,
          params: this.excelExport
        };
        this.request('api_admin_exportReward', p).then((res) => {
          // this.tableData = res;
        }).catch((error) => {
          window.Bus.$emit('yolo_pop_message_emit', error);
        });

        this.ctl.exportShow = false;
      },
      doQuery() {
        if (this.query.stet && this.query.stet.length > 1) {
          this.query.st = this.query.stet[0].getTime() / 1000;
          this.query.et = this.query.stet[1].getTime() / 1000;
        } else {
          this.query.st = null;
          this.query.et = null;
        }
        this.excelExport = tool.cloneObj(this.query);
        this.$set(this.excelExport, 'flg', 2);
        let p = {
          current: this.tableData.current,
          params: this.query
        };
        this.queryData(p);
      },
      queryData(val) {
        let p = val;
        this.request('api_admin_rewardLst', p).then((res) => {
          this.tableData = res;
        }).catch((error) => {
          window.Bus.$emit('yolo_pop_message_emit', error);
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
      let p = {
        current: 1,
        params:{
          org_id: this.$store.getters.orgId
        }
      };
      this.queryData(p);
    }

  }
</script>

