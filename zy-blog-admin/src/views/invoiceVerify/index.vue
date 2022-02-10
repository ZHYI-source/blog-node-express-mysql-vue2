<style lang="scss" src="@/assets/css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-input v-model="queryList.params.orgName" placeholder="组织机构" size="mini" @focus="treeForm = true"></el-input>
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
          <el-table-column prop="amountDesc" label="充值金额" width="100" align="center">
          </el-table-column>
          <el-table-column prop="balanceDesc" label="账户余额" width="100" align="center">
          </el-table-column>
          <el-table-column prop="accountNo" label="充值账户号" width="200" align="center">
          </el-table-column>
          <el-table-column prop="accountName" label="充值账户名" width="200" align="center">
          </el-table-column>
          <el-table-column prop="bankName" label="充值银行名" width="200"  align="center">
          </el-table-column>
          <el-table-column prop="taxNo" label="税号" width="200" align="center">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="300" align="center">
          </el-table-column>
          <el-table-column prop="taxTel" label="电话" width="150" align="center">
          </el-table-column>
          <el-table-column prop="insertTimestamp" label="插入时间" width="180" align="center">
            <template slot-scope="scope">
              {{scope.row.insertTimestamp | fmtTime }}
            </template>
          </el-table-column>
          <el-table-column prop="updateTimestamp" label="更新时间" width="180" align="center">
            <template slot-scope="scope">
              {{scope.row.updateTimestamp | fmtTime }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" width="100" fixed="right">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.status === 0"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="info" v-if="scope.row.status === 1"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="danger" v-if="scope.row.status === 2"> {{ scope.row.statusDesc }} </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="200px">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="success" icon="el-icon-document" style="margin-right: 5px"
                           v-if="passButton && scope.row.status === 1"
                           @click="handlePass(scope.row)">通过
                </el-button>
                <el-button size="mini" type="danger" icon="el-icon-document"
                           v-if="passButton && scope.row.status === 1"
                           @click="handleNotPass(scope.row)">驳回
                </el-button>
              </el-button-group>
            </template>
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

    <el-dialog title="通过提示" :visible.sync="passForm" v-loading="passLoading" width="30%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">
      <div style="margin-top: 5%; margin-left: 5%; margin-bottom: 5%">确定要通过充值申请吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passForm = false">
          取消
        </el-button>
        <el-button type="success" @click="passData">
          通过
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="驳回提示" :visible.sync="notPassForm" v-loading="passLoading" width="30%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">
      <div style="margin-top: 5%; margin-left: 5%; margin-bottom: 5%">确定要驳回充值申请吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="notPassForm = false">
          取消
        </el-button>
        <el-button type="danger" @click="notPassData">
          驳回
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        queryList: {
          size: 20,
          current: 1,
          params: {
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
        queryPass: {
          id: undefined,
        },
        queryNotPass: {
          id: undefined,
        },
        queryTree: {
          orgId: undefined
        },
        loadingText: '',
        loading: false,
        passLoading: false,
        passForm: false,
        notPassForm: false,
        treeForm: false,
        listButton: false,
        passButton: false,
        exportButton: false,
        //机构树
        orgTree: [],
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
          this.passButton = true;
          this.exportButton = true;

        } else {
          if (perms.includes('POST /admin/invoice/verifyList')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/invoice/pass')) {
            this.passButton = true;
          }
          if (perms.includes('POST /admin/invoice/verifyExport')) {
            this.exportButton = true;
          }
          if (perms.includes('POST /admin/invoice/notPass')) {
            this.passButton = true;
          }
        }
      },

      handleFilter() {
        this.queryList.current = this.tableData.current
        this.getList();
      },
      getList() {
        this.loadingText = '正在查询中。。。'
        this.loading = true
        this.request('api_admin_invoice_verifyList', this.queryList).then((res) => {
          this.tableData = res;
          this.loading = false
        }).catch((error) => {
          console.log(error)
          this.loading = false
        });
      },
      handlePass(row) {
        this.queryPass.id = row.id
        this.passForm = true
      },
      passData() {
        this.passLoading = true
        this.request('api_admin_invoice_pass', this.queryPass).then((res) => {
          this.passLoading = false
          this.$notify.success({
            title: '成功',
            message: '审核已通过'
          })
          this.getList()
          this.passForm = false
        }).catch((error) => {
          this.passLoading = false
          this.$notify.error({
            title: '失败',
            message: '审核通过失败，请重试'
          })
          this.passForm = false
        });
      },
      handleNotPass(row) {
        this.queryNotPass.id = row.id
        this.notPassForm = true
      },
      notPassData() {
        this.passLoading = true
        this.request('api_admin_invoice_notPass', this.queryNotPass).then((res) => {
          this.passLoading = false
          this.$notify.success({
            title: '成功',
            message: '审核已驳回'
          })
          this.getList()
          this.notPassForm = false
        }).catch((error) => {
          this.passLoading = false
          this.$notify.error({
            title: '失败',
            message: '驳回失败，请重试'
          })
          this.notPassForm = false
        });
      },
      handleExcelExport() {
        this.loadingText = '正在导出，请稍后。。。'
        this.loading = true
        this.queryList.current = this.tableData.current
        this.request('api_admin_invoice_verifyExport', this.queryList).then((res) => {
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
      this.getList();
    }
  }
</script>



