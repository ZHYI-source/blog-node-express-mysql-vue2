<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query">
      <el-input v-model="query.org_name" placeholder="组织机构" size="mini" @focus="showTree"></el-input>
      <el-input size="mini" v-model="query.user_real_name" placeholder="司机姓名" style="width: 100%"></el-input>
      <el-date-picker size="mini"
                      v-model="query.stet"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>

      <el-button @click="doQuery()" size="mini" icon="el-icon-search" v-if="listButton">查询</el-button>
      <el-button @click="doExcelExport()" size="mini" icon="el-icon-search" v-if="exportButton">导出</el-button>
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
          <el-table-column width="180" prop="shopno" label="商户号" align="center">
          </el-table-column>
          <el-table-column width="180" prop="rewardId" label="红包单号" align="center">
          </el-table-column>
          <el-table-column width="180" prop="payForTime" label="时间" align="center">
            <template slot-scope="scope">
              {{scope.row.insertTimestamp|fmtTime}}
            </template>
          </el-table-column>
          <el-table-column prop="tradeAmt" label="金额" align="center">
            <template slot-scope="scope">
              {{scope.row.amountStr}}
            </template>
          </el-table-column>
          <el-table-column width="180" prop="expire" label="过期时间" align="center">
            <template slot-scope="scope">
              {{scope.row.expire|fmtTime}}
            </template>
          </el-table-column>
          <el-table-column width="180" prop="updateTimestamp" label="操作时间" align="center">
            <template slot-scope="scope">
              {{scope.row.updateTimestamp|fmtTime}}
            </template>
          </el-table-column>
          <el-table-column width="180" prop="rewardType" label="奖励类型" align="center">
            <template slot-scope="scope">
              {{scope.row.rewardType|fmtRewardState}}
            </template>
          </el-table-column>
          <el-table-column width="180" prop="isReceive" label="状态" align="center">
            <template slot-scope="scope">
              {{scope.row.isReceive|fmtSetState}}
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" fixed="right" width="180">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" icon="el-icon-document"
                           @click="updateOrder(scope.row)"
                           v-if="dealButton && scope.row.rewardType === 3 && scope.row.isReceive === 0">处理
                </el-button>

              </el-button-group>
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
  // import viewinfo from './operateView.vue';
  // import reg from './reg.vue';
  import tool from '@libs/tool';

  export default {
    // components: {viewinfo, reg},
    data() {
      return {
        ctl: {
          show: false,
          read: false,
          regShow: false,
          exportShow: false
        },
        dialogVisible: false,
        excelExport: {
          user_real_name: '',
          stet: [],
          flg: 1
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
        dealButton:false,
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
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.exportButton = true;
          this.listButton = true;
          this.dealButton = true;
        } else {
          if (perms.includes('POST /admin/exportDriverReward')) {
            this.exportButton = true;
          }
          if (perms.includes('POST /admin/driverRewardList')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/updateRewardStatus')) {
            this.dealButton = true;
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
      setStatus(index, val) {
        this.ctl.show = true;
        this.ctl.read = true;
        let that = this;
        //这里element弹框有延迟问题，view组件未加载
        setTimeout(function () {
          that.$refs.view.open(val, true);
        }, 100);
      },
      doExcelExport() {
//                if (this.excelExport.stet && this.excelExport.stet.length > 1) {
//                    this.excelExport.st = this.excelExport.stet[0].getTime() / 1000;
//                    this.excelExport.et = this.excelExport.stet[1].getTime() / 1000;
//                } else {
//                    this.excelExport.st = null;
//                    this.excelExport.et = null;
//                }
        let p = {
          params: this.query
        };
        this.request('api_admin_reward_exlout', p).then((res) => {
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
        this.request('api_admin_reward_list', p).then((res) => {
          this.tableData = res;
        }).catch((error) => {
          window.Bus.$emit('yolo_pop_message_emit', error);
        });
      },
      updateOrder(val) {
        this.$confirm('请确认是否已处理该业务？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
          let params = {};
          params.keyId = val.rewardId
          this.request('api_admin_reward_update', params).then((res) => {
            if (res.status === 0) {
              this.$message('修改成功');
              this.doQuery();
            } else {
              this.$message(res.error);
            }
          }).catch((error) => {
            this.$message('修改失败');
          });
        }).catch(action => {
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
      }
    },
    created() {
      this.getUserInfo()
      this.getPerms()
      setTimeout(this.getTree(), 1000)
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

