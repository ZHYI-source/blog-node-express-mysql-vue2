<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query">
      <el-input v-model="query.params.org_name" placeholder="组织机构" size="mini" @focus="showTree"></el-input>
      <el-input size="mini" v-model="query.params.plate_no" placeholder="车牌号" style="width: 100%"></el-input>
      <el-date-picker size="mini"
                      v-model="query.stet"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
      <el-button @click="doQuery()" size="mini" icon="el-icon-search">查询</el-button>
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
          <el-table-column  prop="reqTime" label="操作时间" align="center">
            <template slot-scope="scope">
              {{scope.row.reqTime|fmtTime}}
            </template>
          </el-table-column>
          <el-table-column prop="userRealName" label="当班司机" width="200" align="center">
          </el-table-column>
          <el-table-column prop="plateNo" label="车牌号" width="200" align="center">
          </el-table-column>
          <el-table-column prop="changeUserRealName" label="换班司机" width="200" align="center">
          </el-table-column>
          <el-table-column prop="historyTypeDesc" label="状态" width="200" align="center">
          </el-table-column>

          <el-table-column label="操作" align="center" fixed="right" width="180">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" icon="el-icon-document"
                           @click="doView(scope.$index, scope.row)">查看
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
    <el-dialog title="司机详情" :visible.sync="ctl.show" :close-on-press-escape="false" :close-on-click-modal="false">
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
  import viewinfo from './historyView.vue';

  export default {
    components: {viewinfo},
    data() {
      return {
        ctl: {
          show: false,
          read: false
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
          current: 1,
          params: {
            plate_no:'',
            user_real_name: '',
            stet: [],
            carId: null,
            org_id: '',
            org_name: ''
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
          if (perms.includes('POST /admin/workHistorylst')) {
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
      doQuery() {
        if (this.query.stet && this.query.stet.length > 1) {
          this.query.params.st = this.query.stet[0].getTime() / 1000;
          this.query.params.et = this.query.stet[1].getTime() / 1000;
        } else {
          this.query.params.st = null;
          this.query.params.et = null;
        }

        this.queryData();
      },
      queryData() {
        if(!this.query.params.org_id){
          this.query.params.org_id = this.$store.getters.orgId
        }
         this.request('api_admin_workHistorylst', this.query).then((res) => {
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
        this.query.params.org_id = data.orgId
        this.query.params.org_name = data.orgName
        console.log('click' + this.query.params.org_id)
      },
      selectOrg() {
        this.treeForm = false
      },
      getUserInfo(){
        this.queryTree.orgId = this.$store.getters.orgId
        this.query.params.org_id = this.$store.getters.orgId
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

