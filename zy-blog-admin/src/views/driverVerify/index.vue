<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query">
      <el-input v-model="queryList.params.orgName" placeholder="组织机构" size="mini" @focus="showTree"></el-input>
      <el-input size="mini" v-model="queryList.params.driverName" placeholder="司机姓名" style="width: 100%"></el-input>
      <el-input size="mini" v-model="queryList.params.idCard" placeholder="身份证号" style="width: 100%"></el-input>
      <el-select size="mini" v-model="queryList.params.channel" placeholder="渠道">
        <el-option label="农行" :value="2"></el-option>
        <el-option label="交行" :value="3"></el-option>
        <el-option label="招行" :value="4"></el-option>
        <el-option label="招行个人" :value="5"></el-option>
      </el-select>
      <el-select size="mini" v-model="queryList.params.status" placeholder="审核状态">
        <el-option label="正常" :value="0"></el-option>
        <el-option label="审核中" :value="1"></el-option>
        <el-option label="待激活" :value="2"></el-option>
        <el-option label="已激活" :value="3"></el-option>
        <el-option label="其他" :value="4"></el-option>
        <el-option label="招行审核中" :value="5"></el-option>
        <el-option label="招行审核成功" :value="6"></el-option>
        <el-option label="微信认证中" :value="7"></el-option>
        <el-option label="审核失败" :value="8"></el-option>
      </el-select>
      <el-date-picker
        v-model="stet"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期" size="mini">
      </el-date-picker>
      <el-button size="mini" icon="el-icon-search" @click="handleFilter()">查询</el-button>
      <el-button @click="handleExport" size="mini" icon="el-icon-document" v-if="exportButton">导出</el-button>
    </div>
    <div class="app-table-contain">
      <div style="height: 100%;" ref="table">
        <el-table
          stripe
          v-loading="loading"
          :element-loading-text="loadingText"
          :data="tableData.records" :stripe="true" border
          style="width: 100%;"
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column prop="orgName" label="公司名称" align="center" width="350">
          </el-table-column>
          <el-table-column prop="idCard" label="身份证号"  align="center" width="180">
          </el-table-column>
          <el-table-column prop="driverName" label="司机姓名" align="center">
          </el-table-column>
          <el-table-column prop="userTel" label="手机号"  align="center">
          </el-table-column>
          <el-table-column prop="accNo" label="银行卡号"  align="center" width="180">
          </el-table-column>
          <el-table-column prop="channelDesc" label="渠道"  align="center">
          </el-table-column>
          <el-table-column  label="状态" align="center">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.status === 1"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="success" v-if="scope.row.status === 0"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="danger" v-if="scope.row.status === 2"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="success" v-if="scope.row.status === 3"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="info" v-if="scope.row.status === 4"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="info" v-if="scope.row.status === 5"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="info" v-if="scope.row.status === 6"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="info" v-if="scope.row.status === 7"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="danger" v-if="scope.row.status === 8"> {{ scope.row.statusDesc }} </el-tag>
            </template>
          </el-table-column>
          <el-table-column  prop="insertTimeDesc" label="插入时间" align="center" width="180">
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="350">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" icon="el-icon-document" v-if="scope.row.status === 1 && verifyButton"
                           @click="handleVerify(scope.row)">审核通过
                </el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" v-if="deleteButton"
                           @click="handleDelete(scope.row)">删除
                </el-button>
                <el-button size="mini" icon="el-icon-document" v-if="scope.row.status !== 0 && scope.row.channel === 5"
                           @click="handleChange(scope.row)">个人转企业
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="getList"
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

    <el-dialog title="审核提示" :visible.sync="verifyForm" v-loading="verifyLoading" width="40%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">
      <div style="margin:15px 10px 20px 20px">确定要审核通过吗?</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="verifyForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="verifyData">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除提示" :visible.sync="deleteForm" v-loading="deleteLoading" width="40%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">
      <div style="margin:15px 10px 20px 20px">确定要删除此条记录吗?</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteForm = false">
          取消
        </el-button>
        <el-button type="danger" @click="deleteData">
          删除
        </el-button>
      </div>
    </el-dialog>


    <el-dialog title="操作提示" :visible.sync="changeForm" v-loading="changeLoading" width="40%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">
      <div style="margin:15px 10px 20px 20px">确定要将此条记录转换为企业记录吗?</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="changeData">
          转换
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
        queryList: {
          size: 20,
          current: 1,
          params: {
            orgName: '',
            driverName: '',
            idCard: '',
            channel: 4,
            startTime: null,
            endTime: null,
            orgId: '',
            status: 1
          }
        },
        queryTree:{
          orgId: undefined
        },
        queryVerify:{
          idCard:undefined,
          accNo:undefined
        },
        queryDelete:{
          idCard:undefined
        },
        queryChange:{
          idCard:undefined
        },
        orgTree: [],
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'orgName'
        },
        stet: [],
        treeForm: false,
        verifyForm: false,
        deleteForm: false,
        changeForm: false,
        loading: false,
        loadingText: '',
        verifyLoading: false,
        deleteLoading: false,
        changeLoading: false,
        listButton: false,
        exportButton: false,
        verifyButton: false,
        deleteButton: false,
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
          this.verifyButton = true;
          this.exportButton = true;
          this.deleteButton = true;
        } else {
          if (perms.includes('POST /admin/system/verifyList')) {
            this.listButton = true;
          }
          if (perms.includes( 'POST /admin/system/verifyPass')) {
            this.verifyButton = true;
          }
          if (perms.includes('POST /admin/system/verifyExport')) {
            this.exportButton = true;
          }
          if (perms.includes('POST /admin/system/verifyDelete')) {
            this.deleteButton = true;
          }
        }
      },
      handleFilter() {
        if (this.stet && this.stet.length > 1) {
          this.queryList.params.startTime = this.stet[0].getTime();
          this.queryList.params.endTime = this.stet[1].getTime();
        } else {
          this.queryList.params.startTime = null;
          this.queryList.params.endTime = null;
        }
        this.queryList.current = this.tableData.current
        this.getList();
      },
      getList() {
        this.loadingText = '正在查询中。。。'
        this.loading = true;
        this.queryList.current = this.tableData.current;
        this.request('api_admin_system_verifyList', this.queryList).then((res) => {
          this.tableData.total = res.total;
          this.tableData.size = res.size;
//            size: null,
//            current: 1,
            this.tableData.records = res.records
//          this.tableData.
//          let p = this.tableData.current;
//          console.log(this.tableData.current);
//          this.tableData = res;
//          this.tableData.current = ;
          this.loading = false
        }).catch((error) => {
          console.log(error)
          this.loading = false
        });
      },
      handleExport() {
        this.loadingText = '正在导出，请稍后。。。'
        this.loading = true
        this.request('api_admin_system_verifyExport', this.queryList).then((res) => {
          this.loading = false
        }).catch((error) => {
          this.loading = false
        });
      },
      handleVerify(row){
        this.queryVerify.idCard = row.idCard
        this.queryVerify.accNo = row.accNo
        this.verifyForm = true
      },
      verifyData(){
        this.verifyLoading = true
        this.request('api_admin_system_verifyPass', this.queryVerify).then((res) => {
          this.verifyLoading = false
          this.$notify.success({
            title: '成功',
            message: '审核成功'
          })
          this.getList()
          this.verifyForm = false
        }).catch((error) => {
          this.verifyLoading = false
          this.$notify.error({
            title: '失败',
            message: '审核失败，请重试'
          })
          this.verifyForm = false
        });
      },
      handleDelete(row) {
        this.queryDelete.idCard = row.idCard
        this.deleteForm = true
      },
      deleteData() {
        this.deleteLoading = true
        this.request('api_admin_system_verifyDelete', this.queryDelete).then((res) => {
          this.deleteLoading = false
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
          this.getList()
          this.deleteForm = false
        }).catch((error) => {
          this.deleteLoading = false
          this.$notify.error({
            title: '失败',
            message: '删除失败，请重试'
          })
          this.deleteForm = false
        });
      },
      handleChange(row){
        this.queryChange.idCard = row.idCard
        this.changeForm = true
      },
      changeData(){
        this.changeLoading = true
        this.request('api_admin_system_verifyChange', this.queryChange).then((res) => {
          this.changeLoading = false
          this.$notify.success({
            title: '成功',
            message: '转换成功'
          })
          this.getList()
          this.changeForm = false
        }).catch((error) => {
          this.changeLoading = false
          this.$notify.error({
            title: '失败',
            message: error.msg
          })
          this.changeForm = false
        });
      },
      getTree() {
        this.request('orgTree', this.queryTree).then(response => {
          console.log(response)
          this.orgTree = response
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
        this.queryList.params.orgId = data.orgId
        this.queryList.params.orgName = data.orgName
        console.log('click' + this.queryList.params.orgId)
      },
      selectOrg() {
        this.treeForm = false
      },
      getUserInfo(){
        this.queryTree.orgId = this.$store.getters.orgId
        this.queryList.params.orgId = this.$store.getters.orgId
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

