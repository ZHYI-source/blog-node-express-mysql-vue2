<style lang="scss" src="@/assets/css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-input v-model="queryList.vehicleNo" placeholder="车牌号" size="mini" clearable></el-input>
      <el-select size="mini" v-model="queryList.vehicleNoColor" placeholder="车牌颜色">
        <el-option label="蓝色" :value="1"></el-option>
        <el-option label="黄色" :value="2"></el-option>
        <el-option label="黑色" :value="3"></el-option>
        <el-option label="白色" :value="4"></el-option>
        <el-option label="绿色" :value="5"></el-option>
        <el-option label="其他颜色" :value="9"></el-option>
        <el-option label="渐变绿色" :value="96"></el-option>
        <el-option label="黄绿双拼色" :value="97"></el-option>
        <el-option label="农蓝" :value="11"></el-option>
        <el-option label="农黄" :value="12"></el-option>
        <el-option label="农绿" :value="13"></el-option>
      </el-select>
      <el-input v-model="queryList.partyIDCard" placeholder="身份证" size="mini" clearable></el-input>
      <el-select size="mini" v-model="queryList.closeStatus" placeholder="结案状态">
        <el-option label="全部" :value="2"></el-option>
        <el-option label="未结案" :value="0"></el-option>
        <el-option label="已结案" :value="1"></el-option>
      </el-select>
      <el-select size="mini" v-model="queryList.pojId" placeholder="处罚对象">
        <el-option label="个人" :value="1"></el-option>
        <el-option label="公司" :value="2"></el-option>
        <el-option label="全部" :value="3"></el-option>
      </el-select>
      <el-date-picker
        v-model="stet"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期" size="mini">
      </el-date-picker>
      <el-button size="mini" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button @click="handleExport" size="mini" icon="el-icon-document" v-if="exportButton">导出</el-button>
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
          <el-table-column prop="vehicleNo" label="车牌号" align="center">
          </el-table-column>
          <el-table-column prop="vehicleNoColor" label="车牌颜色"  align="center">
          </el-table-column>
          <el-table-column prop="partyName" label="当事人名" align="center">
          </el-table-column>
          <el-table-column prop="businessName" label="业户名称" align="center">
          </el-table-column>
          <el-table-column prop="placeInspect" label="查处地点" align="center">
          </el-table-column>
          <el-table-column prop="illegalTime" label="查处时间" width="180" align="center">
          </el-table-column>
          <el-table-column prop="complain" label="投诉内容" align="center">
          </el-table-column>
          <el-table-column prop="deptName" label="执法部门" align="center">
          </el-table-column>
          <el-table-column prop="cent" label="车辆扣分" align="center">
          </el-table-column>
          <el-table-column prop="centPerson" label="人员扣分" align="center">
          </el-table-column>
          <el-table-column prop="pojId" label="处罚对象" align="center">
          </el-table-column>
          <el-table-column prop="closeTime" label="结案时间" width="180" align="center">
          </el-table-column>
          <el-table-column align="center" label="结案状态" width="100" fixed="right">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.closeStatus === 0"> {{ scope.row.closeStatusDesc }} </el-tag>
              <el-tag type="success" v-if="scope.row.closeStatus === 1"> {{ scope.row.closeStatusDesc }} </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="100">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" icon="el-icon-document"
                           @click="handleView(scope.row)">详情
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

    <el-dialog title="案件详情" :visible.sync="viewForm">
      <el-form  :model="viewData" label-width="100px" size="mini" style="margin: 20px 30px 40px 10px"
                @submit.native.prevent :hide-required-asterisk="true">
        <el-form-item label="当事人名" prop="partyName" >{{ viewData.partyName }}</el-form-item>
        <el-form-item label="车牌号码" prop="vehicleNo" >{{ viewData.vehicleNo }}</el-form-item>
        <el-form-item label="业户名称" prop="businessName" >{{ viewData.businessName }}</el-form-item>
        <el-form-item label="违章时间" prop="illegalTime" >{{ viewData.illegalTime }}</el-form-item>
        <el-form-item label="违章地点" prop="placeInspect" >{{ viewData.placeInspect }}</el-form-item>
        <el-form-item label="执法部门" prop="deptName" >{{ viewData.deptName }}</el-form-item>
        <el-form-item label="车辆扣分" prop="cent" >{{ viewData.cent }}</el-form-item>
        <el-form-item label="人员扣分" prop="centPerson" >{{ viewData.centPerson }}</el-form-item>
        <el-form-item label="投诉内容" prop="reason" >
          <div style="width:80%;word-wrap:break-word">
            {{ viewData.complain }}
          </div>
        </el-form-item>
        <el-form-item label="违章原因" prop="reason" >
          <div style="width:80%;word-wrap:break-word">
            {{ viewData.reason }}
          </div>
        </el-form-item>
        <el-form-item label="结案状态" prop="statusDesc" >
          <el-tag type="danger" v-if="viewData.closeStatus === 0" style="margin-right: 20px;"> {{ viewData.closeStatusDesc }} </el-tag>
          <el-tag type="success" v-if="viewData.closeStatus === 1" style="margin-right: 20px;"> {{ viewData.closeStatusDesc }} </el-tag>
        </el-form-item>
        <el-form-item label="结案时间" prop="closeTime" >{{ viewData.closeTime }}</el-form-item>
        <el-form-item label="处罚对象" prop="pojId" >{{ viewData.pojId }}</el-form-item>
      </el-form>
      <div style="width: 100%; height: 60px"></div>
    </el-dialog>

  </div>
</template>

<script>
  import {MessageBox} from "element-ui";
  export default {
    data() {
      return {
        queryList: {
          vehicleNo: '',
          vehicleNoColor: '',
          partyIDCard: '',
          startTime: null,
          endTime: null,
          orgId: '',
          closeStatus:'',
          pojId: ''
        },
        viewData: {
          partyName: '',
          vehicleNo: '',
          businessName: '',
          illegalTime: '',
          placeInspect: '',
          deptName: '',
          cent: '',
          centPerson: '',
          complain: '',
          reason: '',
          closeStatus: '',
          closeStatusDesc: '',
          closeTime: '',
          pojId: '',
        },
        tableData: {
          total: 0,
          size: 20,
          current: 1,
          records: [],
          all: []
        },
        stet: [],
        loadingText: '',
        loading: false,
        viewForm: false,
        listButton: false,
        exportButton:false
      };
    },
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
          this.exportButton = true;
        } else {
          if (perms.includes('POST /admin/violation/list')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/violation/export')) {
            this.exportButton = true;
          }
        }
      },

      handleFilter() {
        if (this.stet && this.stet.length > 1) {
          let start = this.stet[0].getTime();
          let end = this.stet[1].getTime();
//          if(end - start > 6 * 30 * 24 * 3600 * 1000){
//            MessageBox.alert('查询时间范围不能大于6个月', '错误', {
//              confirmButtonText: '确定',
//              type: 'error'
//            });
//            return
//          }
          this.queryList.startTime = start;
          this.queryList.endTime = end;
        } else {
          let end = new Date().getTime();
          let start = end - 1*365 * 24 * 3600 * 1000;
          this.queryList.startTime = start;
          this.queryList.endTime = end;
        }
        if(!this.queryList.vehicleNo && !this.queryList.partyIDCard && !this.queryList.pojId){
          MessageBox.alert('身份证、车牌号、处罚对象，请至少填写一个', '错误', {
            confirmButtonText: '确定',
            type: 'error'
          });
          return
        }
        if((this.queryList.vehicleNo && !this.queryList.vehicleNoColor) || (!this.queryList.vehicleNo && this.queryList.vehicleNoColor)){
          MessageBox.alert('车牌号和车牌颜色必须同时填写', '错误', {
            confirmButtonText: '确定',
            type: 'error'
          });
          return
        }
//        if(!this.queryList.vehicleNo && !this.queryList.partyIDCard && this.queryList.pojId
//          && !this.queryList.startTime && !this.queryList.endTime){
//          MessageBox.alert('若只查询处罚对象，请选择时间范围', '错误', {
//            confirmButtonText: '确定',
//            type: 'error'
//          });
//          return
//        }
        this.getList();
      },
      getList() {
        this.loadingText = '正在查询中。。。'
        this.loading = true
        console.log(this.queryList.closeStatus)
        if(this.queryList.closeStatus == 2){
          this.queryList.closeStatus=null;
        }
        this.request('api_admin_violation_list', this.queryList).then((res) => {
          this.tableData.all = res;
          this.doQuery();
          this.loading = false
        }).catch((error) => {
          console.log(error)
          this.loading = false
        });
      },
      doQuery(){
        this.tableData.total = this.tableData.all.length;
        this.tableData.records = this.tableData.all.slice(this.tableData.size*(this.tableData.current-1),this.tableData.size*this.tableData.current>this.tableData.all.length?this.tableData.all.length:this.tableData.size*this.tableData.current);
      },
      handleView(row){
        this.viewData  = row;
        this.viewForm = true
      },
      handleExport() {
        this.loadingText = '正在导出，请稍后。。。'
        this.loading = true

        if(this.queryList.closeStatus == 2){
          this.queryList.closeStatus=null;
        }
        this.request('api_admin_violation_export', this.queryList).then((res) => {
          this.loading = false
        }).catch((error) => {
          this.loading = false
        });
      },
      getUserInfo() {
        this.queryList.orgId = this.$store.getters.orgId
      }
    },
    async created() {
      await this.getUserInfo()
      this.getPerms()
    },
    mounted() {
      this.queryList.pojId=3;
      this.queryList.closeStatus=0;
      let end = new Date().getTime();
      let start = end - 1*365 * 24 * 3600 * 1000;
      this.stet[0] = new Date(start);
      this.stet[1] = new Date(end);
    }
  }
</script>


