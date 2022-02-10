<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query">
      <el-input v-model="query.params.orgName" placeholder="组织机构" size="mini" @focus="showTree"></el-input>
      <el-input size="mini" v-model="query.params.userRealName" placeholder="司机姓名" style="width: 100%"></el-input>
      <el-input size="mini" v-model="query.params.plateNo" placeholder="车牌号" style="width: 100%"></el-input>
      <el-select size="mini" v-model="query.params.isWork" placeholder="状态" clearable>
        <el-option label="上班" :value="1"></el-option>
        <el-option label="未上班" :value="0"></el-option>
      </el-select>
      <el-date-picker size="mini"
                      v-model="query.stet"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
      <el-button @click="doQuery()" size="mini" icon="el-icon-search">查询</el-button>
      <el-button @click="handleWork" size="mini" icon="el-icon-document">上班</el-button>
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
          <el-table-column prop="orgName" label="公司名称" align="center" width="350">
          </el-table-column>
          <el-table-column prop="idCard" label="身份证号"  align="center">
          </el-table-column>
          <el-table-column prop="userRealName" label="司机姓名" align="center">
          </el-table-column>
          <el-table-column prop="userTel" label="手机号"  align="center">
          </el-table-column>
          <el-table-column  prop="onTime" label="上班时间" align="center">
            <template slot-scope="scope">
              {{scope.row.onTime|fmtTime}}
            </template>
          </el-table-column>
          <el-table-column  prop="plateNo" label="车牌号" align="center">
            <template slot-scope="scope">
              {{scope.row.plateNo|fmtPlate}}
            </template>
          </el-table-column>
          <el-table-column prop="statusDesc" label="状态"  align="center">
          </el-table-column>

          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" icon="el-icon-document" v-if="scope.row.status === 1 && goOffWorkButton"
                           @click="handleNotWork(scope.row)">强制下班
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
    <el-dialog title="提示" :visible.sync="offWorkForm">
      <div style="margin:15px 10px 20px 20px">确定要让该司机强制下班吗?</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="offWorkForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="doNotWork">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="司机上班" :visible.sync="onWorkForm" v-loading="onWorkLoading" width="40%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">
      <el-form ref="form" :model="queryOnWork" :rules="rules" label-width="35%" size="mini" @submit.native.prevent
               :hide-required-asterisk="true">
        <el-form-item label="身份证号" prop="idCard" style="margin-top: 5%">
          <el-input v-model="queryOnWork.idCard" style="width: 50%;">
          </el-input>
        </el-form-item>
        <el-form-item label="车牌号码" prop="plateNo" style="margin-top: 5%">
          <el-input v-model="queryOnWork.plateNo" style="width: 50%;">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onWorkForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="goOnWork">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        viewVal: {},
        listButton: false,
        goOffWorkButton: false,
        goOnWorkButton: false,
        query: {
          current: 1,
          params: {
            userRealName: '',
            stet: [],
            isWork: null,
            plateNo:null,
            orgId: '',
            orgName: ''
          }
        },
        queryTree:{
          orgId: undefined
        },
        queryOnWork:{
          idCard:undefined,
          plateNo: undefined
        },
        queryNotWork:{
          idCard:undefined,
          carId: undefined
        },
        rules: {
          idCard: [
            {required: true, message: '身份证不能为空', trigger: 'blur'},
            {
              pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
              message: '身份证格式错误'
            }
          ],
          plateNo: [
            {required: true, message: '车牌号不能为空', trigger: 'blur'},
          ],
        },
        orgTree: [],
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'orgName'
        },
        treeForm: false,
        offWorkForm: false,
        onWorkForm: false,
        onWorkLoading: false
      };
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    filters:{
      fmtPlate(val){
        if (val === '' || val === null || val === undefined) {
          val = '- -'
        }
        return val
      }
    },
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
          this.goOffWorkButton = true;
          this.goOnWorkButton = true;
        } else {
          if (perms.includes('POST /admin/driverSign')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/goOffWorkForced')) {
            this.goOffWorkButton = true;
          }
          if (perms.includes('POST /admin/goOnWorkForced')) {
            this.goOnWorkButton = true;
          }
        }
      },
      doQuery() {
        if (this.query.stet && this.query.stet.length > 1) {
          this.query.params.startTime = this.query.stet[0].getTime() / 1000;
          this.query.params.endTime = this.query.stet[1].getTime() / 1000;
        } else {
          this.query.params.startTime = null;
          this.query.params.endTime = null;
        }
        this.query.current = this.tableData.current
        this.queryData();
      },
      queryData() {
        if(!this.query.params.orgId){
          this.query.params.orgId = this.$store.getters.orgId
        }
         this.request('api_admin_driverSign', this.query).then((res) => {
           this.tableData = res;
        }).catch((error) => {
        });
      },
      handleWork(){
        this.queryOnWork = {
          idCard:undefined,
          plateNo: undefined
        }
        this.onWorkForm = true
      },
      goOnWork(){
        this.onWorkLoading = true
        this.request('api_admin_goOnWorkForced',this.queryOnWork).then((res) => {
          this.onWorkLoading = false
          this.$notify.success({
            title: '成功',
            message: '操作成功'
          })
          this.queryData();
          this.onWorkForm = false
        }).catch((error) => {
          this.onWorkLoading = false
          this.$notify.error({
            title: '失败',
            message: error.msg
          })
          this.onWorkForm = false
        });
      },
      handleNotWork(row){
        this.queryNotWork.carId = row.carId
        this.queryNotWork.idCard = row.idCard
        this.offWorkForm = true
      },
      doNotWork(){
        this.request('api_admin_goOffWorkForced', this.queryNotWork).then((res) => {
          this.queryData()
          this.offWorkForm = false
          this.$notify.success({
            title: '成功',
            message: '操作成功'
          })
        }).catch((error) => {
          this.$notify.error({
            title: '失败',
            message: '操作失败，请重试'
          })
          this.offWorkForm = false
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
        console.log('click' + this.query.params.orgId)
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

