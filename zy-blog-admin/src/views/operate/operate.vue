<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-input v-model="query.org_name" placeholder="组织机构"  @focus="showTree"></el-input>
      <el-date-picker
        v-model="query.month"
        type="month"
        placeholder="时间"
        value-format="timestamp">
      </el-date-picker>
      <el-select v-model="query.status" placeholder="状态">
        <el-option label="未上线" :value="0"></el-option>
        <el-option label="已上线" :value="1"></el-option>
        <el-option label="已激活" :value="2"></el-option>
      </el-select>
      <el-button @click="doQuery()" icon="el-icon-search">查询</el-button>
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
                        'font-size': '14px'}"
        v-loading="tableLoading">
          <el-table-column width="200" prop="plateNo" label="车牌号">
          </el-table-column>
          <el-table-column width="200" prop="facType" label="车型">
          </el-table-column>
          <el-table-column width="200" prop="companyName" label="公司">
          </el-table-column>
          <el-table-column prop="payMoney" label="交易额(元)">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="auto" align="center">
            <template slot-scope="scope">
              {{scope.row.status|fmtPayStatus}}
            </template>
          </el-table-column>
<!--          <el-table-column label="操作" align="center" fixed="right" width="180">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" icon="el-icon-edit"
                           @click="doEdit(scope.$index, scope.row)">查看
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>-->
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
    <el-dialog title="用户详情" :visible.sync="ctl.show" :close-on-press-escape="false" :close-on-click-modal="false">
      <viewinfo v-if="ctl.show" ref="view" :read="ctl.read" v-on:appClose="ctl.read=false;ctl.show=false;"
                v-on:reload="doQuery()"></viewinfo>
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
  import viewinfo from './operateView.vue';

  export default {
    components: {viewinfo},
    data() {
      return {
        ctl: {
          show: false,
          read: false,
          delShow: false
        },
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        viewVal: {},
        listButton: false,
        query: {
          org_id: '',
          org_name: '',
          month:''
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
        tableLoading: false,
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
          if (perms.includes('POST /admin/operatelst')) {
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
          that.$refs.reg.open({}, false);
        }, 100);
      },
      doEdit(index, val) {
        this.$router.push({path: '/workhistory', query: {plateNo: val.plateNo}});
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
        this.tableLoading = true;
        let p = {
          current: this.tableData.current,
          params: this.query
        };
        this.queryData(p);
      },
      queryData(val) {
        console.log(val);
        this.request('api_admin_operate_index', val).then((res) => {
          console.log(res);
          this.tableData = res;
          this.tableLoading = false;
        }).catch((error) => {
          this.tableLoading = false;
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
      this.query.month = new Date().getTime();
      this.queryTree.orgId = this.$store.getters.orgId
      this.query.org_id = this.$store.getters.orgId
      this.doQuery()
      //this.queryData(this.query);
      // console.log(this.$refs.ztable);
    }

  }
</script>

<style scoped>

</style>
