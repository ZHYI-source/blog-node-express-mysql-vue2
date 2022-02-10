<style lang="scss" src="@/assets/css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-input v-model="query.org_name" placeholder="组织机构" size="mini" @focus="showTree"></el-input>
      <el-input v-model="query.user_real_name" placeholder="司机姓名" size="mini" clearable></el-input>
      <el-input v-model="query.plate_no" placeholder="车牌号" size="mini" clearable></el-input>
      <el-input v-model="query.idCard" placeholder="身份证号" size="mini" clearable></el-input>
      <el-date-picker
        v-model="query.stet"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期" size="mini">
      </el-date-picker>
      <el-select v-model="query.trade_status" :disabled="ctl.view" placeholder="订单状态" size="mini">
        <el-option key="1" label="未支付" :value="1"></el-option>
        <el-option key="3" label="已支付" :value="3"></el-option>
      </el-select>
      <el-select v-model="query.pay_chanel" :disabled="ctl.view" placeholder="支付渠道" size="mini">
        <!--<el-option key="1" label="翼支付" :value="1"></el-option>-->
        <el-option key="2" label="农行支付" :value="2"></el-option>
        <el-option key="3" label="交行支付" :value="3"></el-option>
        <el-option key="4" label="招行支付" :value="4"></el-option>
        <el-option key="5" label="招行个人支付" :value="5"></el-option>
      </el-select>
      <el-button size="mini" icon="el-icon-search" @click="doQuery()">查询</el-button>
      <el-button size="mini" icon="el-icon-document" @click="doExcelExport">导出</el-button>
    </div>
    <div class="app-table-contain">
      <div style="height: 100%;" ref="ztable">
        <el-table
          :data="tableData.records" :stripe="true" border
          stripe
          style="width: 100%;"
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column prop="outTradeNo" label="订单号" width="190" align="center">
          </el-table-column>
          <el-table-column prop="tradeStatus" label="支付状态" width="auto" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.tradeStatus===3?'success':'danger'">
                {{scope.row.tradeStatus|fmtPayState}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column width="180" prop="idCard" label="身份证号" align="center">
          </el-table-column>
          <el-table-column prop="userRealName" label="司机姓名" width="auto" align="center">
          </el-table-column>
          <el-table-column prop="plateNo" label="车牌号" width="100" align="center">
          </el-table-column>
          <el-table-column prop="tradeAmt" label="订单金额" width="auto" align="center">
            <template slot-scope="scope">
              {{scope.row.tradeAmt|fmtMoney}}
            </template>
          </el-table-column>
          <el-table-column prop="payAmt" label="支付金额" width="auto" align="center">
            <template slot-scope="scope">
              {{scope.row.payAmt|fmtMoney}}
            </template>
          </el-table-column>
          <el-table-column prop="discountAmt" label="优惠金额" width="auto" align="center">
            <template slot-scope="scope">
              {{scope.row.discountAmt|fmtMoney}}
            </template>
          </el-table-column>
          <el-table-column prop="payType" label="支付方式" width="auto" align="center">
            <template slot-scope="scope">
              {{scope.row.payType| fmtPayType}}
            </template>
          </el-table-column>
          <el-table-column prop="payChanel" label="支付渠道" width="auto" align="center">
            <template slot-scope="scope">
              {{scope.row.payChanel| fmtPayChanel}}
            </template>
          </el-table-column>
          <el-table-column prop="invoiceStatusDesc" label="发票状态" width="100" align="center">
          </el-table-column>
          <el-table-column prop="payForTime" label="创建时间" width="180" align="center">
            <template slot-scope="scope">
              {{scope.row.payCreateTime| fmtTime}}
            </template>
          </el-table-column>
          <el-table-column prop="payForTime" label="支付时间" width="180" align="center">
            <template slot-scope="scope">
              {{scope.row.payForTime| fmtTime}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="100px">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="small" type="primary" icon="el-icon-document"
                           @click="doView(scope.$index, scope.row)">查看
                </el-button>
              </el-button-group>
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
    <el-dialog title="订单详情" :visible.sync="ctl.show" :close-on-press-escape="false" :close-on-click-modal="false">
      <viewinfo v-if="ctl.show" ref="view" :read="ctl.read"
                v-on:appClose="ctl.read=false;ctl.show=false;" v-on:orderUpdate="handleStatusUpdate"></viewinfo>
    </el-dialog>
    <el-dialog title="是否进行担保交易" :visible.sync="ctl.showGuanteePay" :close-on-press-escape="false"
               :close-on-click-modal="false">
      <el-button @click="ctl.showGuanteePay = false">取 消</el-button>
      <el-button type="primary" @click="doGuanteePay">确 定</el-button>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="updateStatusForm" :close-on-press-escape="false"
               :close-on-click-modal="false">
      <span style="margin: 30px">是否确定更新支付状态?</span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="updateStatusForm = false">取 消</el-button>
      <el-button type="primary" @click="orderStatusUpdate">确 定</el-button>
      </span>
    </el-dialog>
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
  import { MessageBox} from "element-ui";

  export default {
    components: {viewinfo},
    data() {
      return {
        ctl: {
          show: false,
          read: false,
          exportShow: false,
          showGuanteePay: false //显示担保支付确认框
        },
        guantee: {
          splitMerchantID: '',
        },
        query: {
          user_real_name: '',
          idCard: '',
          stet: [],
          trade_status: null,
          pay_chanel: null,
          org_id: '',
          org_name: ''
        },
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        orgTree: [],
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'orgName'
        },
        queryTree:{
          orgId: undefined
        },
        queryUpdateOrder: {
          outTradeNo: undefined
        },
        treeForm: false,
        updateStatusForm: false,
        viewVal: {},
        exportButton: false,
        guaranteeButton: false,
        stateButton: false,
        listButton : false,
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
          this.guaranteeButton = true;
          this.stateButton = true;
          this.listButton = true;
        } else {
          if (perms.includes('POST /admin/exportOrder')) {
            this.exportButton = true;
          }
          if (perms.includes('POST /admin/guarantee')) {
            this.guaranteeButton = true;
          }
          if (perms.includes('POST /admin/changeState')) {
            this.stateButton = true;
          }
          if (perms.includes('POST /admin/orderlst')) {
            this.listButton = true;
          }
        }
      },
      doExcelExport() {
        if (this.query.stet && this.query.stet.length > 1) {
          this.query.st = this.query.stet[0].getTime() / 1000;
          this.query.et = this.query.stet[1].getTime() / 1000;
          let max = this.query.et - this.query.st;
          if(max > 30 * 24 * 3600){
            MessageBox.alert('导出订单时间段不能大于一个月', '提示', {
              confirmButtonText: '确定',
              type: 'info'
            })
            return
          }
        } else {
          MessageBox.alert('导出订单时间段不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'info'
          })
          return
        }
        let p = {
          params: this.query
        };
        this.request('api_admin_exportOrder', p).then((res) => {
          console.log(res)
          // this.tableData = res;
        }).catch((error) => {
          console.log(error)
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
      displayGuanteePayView(index, val) {
        console.log(val);
        this.ctl.showGuanteePay = true;

        this.guantee.originalOrderNo = val.outTradeNo;
        this.guantee.confirmedOrderNo = val.outTradeNo;
        this.guantee.orderAmount = val.payAmt;
        this.guantee.splitAmount = val.payAmt;
        this.guantee.advancedFund = '0';

        var that = this;

        let p = {
          idCard: val.idCard,
          noCache: ''
        };
        this.request('api_admin_getDriverInfo', p).then((res) => {
          console.log(res);
          that.guantee.splitMerchantID = res.merchantNo;
          console.log(that.guantee);
        }).catch((error) => {
          window.Bus.$emit('yolo_pop_message_emit', error);
        });
      },
      doGuanteePay(index, val) {
        this.ctl.showGuanteePay = false;

        let that = this;
        let p = this.guantee;
        this.request('api_admin_nhGuanteePay', p).then((res) => {
          console.log(res);
          if (res) {
            this.$notify({
              title: '提示',
              message: '担保交易成功！',
              type: 'success',
              duration: 0,
              offset: 100
            });
          } else {
            this.$notify.error({
              title: '提示',
              message: '担保交易失败',
              duration: 0,
              offset: 100
            });
          }
        }).catch((error) => {
          window.Bus.$emit('yolo_pop_message_emit', error);
        });

      },
      doQuery() {
        if (this.query.stet && this.query.stet.length > 1) {
          this.query.st = this.query.stet[0].getTime() / 1000;
          this.query.et = this.query.stet[1].getTime() / 1000;
        } else {
          this.query.st = null;
          this.query.et = null;
        }

        let p = {
          current: this.tableData.current,
          params: this.query
        };
        this.queryData(p);
      },
      queryData(val) {
        let p = val;
        console.log(p);
        this.request('api_admin_orderlst', p).then((res) => {
          this.tableData = res;
        }).catch((error) => {
        });
      },
      updateOrder(val) {
        let params = {};
        params.outTradeNo = val.outTradeNo
        this.request('api_admin_order_update', params).then((res) => {
          if (res.status === 0) {
            this.$message('修改成功');
          } else {
            this.$message(res.error);
          }
        }).catch((error) => {
          this.$message('修改失败');
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
      handleStatusUpdate(val){
        console.log('val')
        console.log(val)
        this.queryUpdateOrder.outTradeNo = val
        this.updateStatusForm = true
      },
      orderStatusUpdate(){
        this.request('api_admin_updateOrder', this.queryUpdateOrder).then((res) => {
          this.$notify.success({
            title: '成功',
            message: '更新订单状态成功'
          })
          this.updateStatusForm = false
          this.ctl.show = false
        }).catch((error) => {
          this.$notify.error({
            title: '失败',
            message: '更新订单状态失败'
          })
          this.updateStatusForm = false
          this.ctl.show = false
        });
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
      // console.log(this.$refs.ztable);
    }

  }
</script>

<style scoped>

</style>
