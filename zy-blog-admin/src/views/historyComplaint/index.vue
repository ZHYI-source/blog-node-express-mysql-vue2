<style lang="scss" src="@/assets/css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-input v-model="queryList.params.problemId" placeholder="案件编号" size="mini" clearable></el-input>
      <el-input v-model="queryList.params.plateNo" placeholder="车牌号" size="mini" clearable></el-input>
      <el-input v-model="queryList.params.zgzNo" placeholder="司机身份证" size="mini" clearable></el-input>
      <el-input v-model="queryList.params.linkPhone" placeholder="用户手机号" size="mini" clearable></el-input>
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
          <el-table-column prop="problemId" label="案件编号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="plateNo" label="车牌号" width="100" align="center">
          </el-table-column>
          <el-table-column prop="jyzName" label="车辆公司" width="300" align="center">
          </el-table-column>
          <el-table-column prop="complaintTime" label="投诉时间" width="180" align="center">
            <template slot-scope="scope">
              {{scope.row.complaintTime | fmtTime }}
            </template>
          </el-table-column>
          <el-table-column prop="content" label="投诉内容" width="400"  align="center">
          </el-table-column>
          <el-table-column prop="linkPhone" label="用户手机号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="jsyName" label="司机姓名" width="150" align="center">
          </el-table-column>
          <el-table-column prop="jsyPhone" label="司机手机号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="zgzNo" label="身份证号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="problemTypeName" label="问题分类" width="100" align="center">
          </el-table-column>
          <el-table-column prop="processResultName" label="处理结果" width="100" align="center">
          </el-table-column>

          <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="150px">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" icon="el-icon-document" v-if="operateButton"
                           @click="handleOperate(scope.row)">详情
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

    <el-dialog title="投诉详情" :visible.sync="operateForm" :close-on-press-escape="false" :close-on-click-modal="false"
               v-loading="operateLoading" element-loading-text="加载中。。。">
      <el-form  ref="dataForm" :model="operateList" label-width="150px" size="mini" style="margin: 20px 30px 40px 10px"
                @submit.native.prevent :hide-required-asterisk="true">
        <el-form-item label="案件编号" prop="problemId" >{{ operateList.problemId }}</el-form-item>
        <el-form-item label="车牌号" prop="plateNo">{{ operateList.plateNo }}</el-form-item>
        <el-form-item label="车辆公司" prop="jyzName" >{{ operateList.jyzName }}</el-form-item>
        <el-form-item label="投诉时间" prop="complaintTime" >{{ operateList.complaintTime  | fmtTime }}</el-form-item>
        <el-form-item label="投诉内容" prop="content" >
          <div style="width: 70%">
          {{ operateList.content }}
          </div>
        </el-form-item>
        <el-form-item label="用户手机号" prop="linkPhone" >{{ operateList.linkPhone }}</el-form-item>
        <el-form-item label="司机姓名" prop="jsyName" >{{ operateList.jsyName }}</el-form-item>
        <el-form-item label="司机手机号" prop="jsyPhone" >{{ operateList.jsyPhone }}</el-form-item>
        <el-form-item label="身份证号码" prop="zgzNo" >{{ operateList.zgzNo }}</el-form-item>
        <el-form-item label="处理日期" prop="handleDate" >{{ operateList.handleDate  | fmtTime }}</el-form-item>
        <el-form-item label="结案日期" prop="endDate" >{{ operateList.endDate  | fmtTime }}</el-form-item>
        <el-form-item label="归属部门" prop="gsajBh" >{{ operateList.gsajBh }}</el-form-item>
        <el-form-item label="投诉电话" prop="jyzPhone" >{{ operateList.jyzPhone }}</el-form-item>
        <el-form-item label="投诉类型" prop="hightType" >{{ operateList.hightType }}</el-form-item>
        <el-form-item label="范围" prop="rangeName" >{{ operateList.rangeName }}</el-form-item>
        <el-form-item label="问题分类" prop="problemTypeName" >{{ operateList.problemTypeName }}</el-form-item>
        <el-form-item label="处理结果" prop="processResultName" >{{ operateList.processResultName }}</el-form-item>
        <el-form-item label="结案日期" prop="theDate" >{{ operateList.theDate | fmtTime }}</el-form-item>
        <el-form-item label="案件地点" prop="theAddr" >{{ operateList.theAddr }}</el-form-item>
        <el-form-item label="结案详情" prop="plot" >
          <div style="width: 70%">
          {{ operateList.plot }}
          </div>
        </el-form-item>
        <el-form-item label="退回处理结果" prop="backSourceHandle" >{{ operateList.backSourceHandle }}</el-form-item>
        <el-form-item label="退回原因" prop="backSource" >{{ operateList.backSource }}</el-form-item>
        <el-form-item label="平台来源" prop="problemSourceName" >{{ operateList.problemSourceName }}</el-form-item>
        <el-form-item label="车辆类型" prop="hylbName" >{{ operateList.hylbName }}</el-form-item>
        <el-form-item label="归属区域" prop="districtName" >{{ operateList.districtName }}</el-form-item>
        <el-form-item label="经办人" prop="processStaff" >{{ operateList.processStaff }}</el-form-item>
        <el-form-item label="案件附件" prop="fileList" v-if="operateList.fileList && operateList.fileList.length > 0">
          <div style="display: flex;flex-direction: column" >
            <div  v-for="(item,index) in operateList.fileList"  :key="index" style="margin-right: 3%">
              <a style="text-decoration: underline; color: #152ef3" :href = 'downloadLinkName(item.uploadAddr)' download="file" title="下载" target="_blank">{{item.fileName}}</a>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div style="display: flex; width: 100%">
        <div style="display: flex; width: 100%; margin-bottom: 50px;margin-top: 20px">
          <el-button size="medium" type="primary" @click="operateForm = false"
                     style="margin: auto">关闭</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { MessageBox } from "element-ui";
  export default {
    data() {
      return {
        queryList: {
          size: 20,
          current: 1,
          params: {
            problemId: '',
            plateNo: '',
            zgzNo: '',
            linkPhone: '',
            startTime: null,
            endTime: null
          }
        },
        operateList: {
          id: '',
          plateNo: '',
          jyzName: '',
          complaintTime: '',
          content: '',
          linkPhone: '',
          jsyName: '',
          jsyPhone: '',
          zgzNo: '',
          handleDate: '',
          endDate: '',
          gsajBh: '',
          jyzPhone: '',
          hightType: '',
          rangeName: '',
          problemTypeName: '',
          processResultName: '',
          fileList: [],
          theDate: '',
          theAddr: '',
          plot: '',
          backSourceHandle: '',
          backSource: '',
          problemSourceName:'',
          hylbName: '',
          districtName: '',
          processStaff: ''
        },
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        stet: [],
        loadingText: '',
        operateLoading: false,
        loading: false,
        operateForm: false,
        listButton: false,
        operateButton: false,
        exportButton:false,
      };
    },
    watch:{},
    filters:{},
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
          this.operateButton = true;
          this.exportButton = true;
        } else {
          if (perms.includes('POST /admin/complaint/historyList')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/complaint/historyDetail')) {
            this.operateButton = true;
          }
          if (perms.includes('POST /admin/complaint/historyExport')) {
            this.exportButton = true;
          }
        }
      },

      handleFilter() {
        this.queryList.current = this.tableData.current
        this.getList();
      },
      getList() {
        if (this.stet && this.stet.length > 1) {
          this.queryList.params.startTime = this.stet[0].getTime();
          this.queryList.params.endTime = this.stet[1].getTime();
          let max = this.queryList.params.endTime / 1000 - this.queryList.params.startTime / 1000;
          if(max > 365 * 24 * 3600){
            MessageBox.alert('查询时间段不能大于一年', '提示', {
              confirmButtonText: '确定',
              type: 'info'
            })
            return
          }
        } else {
          this.queryList.params.startTime = new Date(new Date().setFullYear(new Date().getFullYear()-1)).getTime();
          this.queryList.params.endTime = new Date().getTime();
        }
        this.loadingText = '正在查询中。。。'
        this.loading = true
        this.request('api_admin_complaint_historyList', this.queryList).then((res) => {
          this.tableData = res;
          this.loading = false
        }).catch((error) => {
          console.log(error)
          this.loading = false
        });
      },
      handleOperate(row){
        this.operateList = row
        let p = {
          problemId: row.problemId
        }
        this.operateLoading = true
        this.request('api_admin_complaint_historyDetail',p).then((res) => {
          this.operateList.fileList = res.fileList;
          this.operateLoading = false
          this.operateForm = true
        }).catch((error) => {
          console.log(error)
          this.operateLoading = false
          this.$notify.error({
            title: '失败',
            message: error.msg
          })
        });
      },
      handleExport() {
        if (this.stet && this.stet.length > 1) {
          this.queryList.params.startTime = this.stet[0].getTime();
          this.queryList.params.endTime = this.stet[1].getTime();
          let max = this.queryList.params.endTime / 1000 - this.queryList.params.startTime / 1000;
          if(max > 365 * 24 * 3600){
            MessageBox.alert('查询时间段不能大于一年', '提示', {
              confirmButtonText: '确定',
              type: 'info'
            })
            return
          }
        } else {
          this.queryList.params.startTime = new Date(new Date().setFullYear(new Date().getFullYear()-1)).getTime();
          this.queryList.params.endTime = new Date().getTime();
        }
        this.queryList.current = this.tableData.current
        this.loadingText = '正在导出，请稍后。。。'
        this.loading = true
        this.request('api_admin_complaint_historyExport', this.queryList).then((res) => {
          this.loading = false
        }).catch((error) => {
          this.loading = false
        });
      },
      downloadLinkName(val){
        if(val){
          val = 'https://car.wisdomtaxi.com/'+ val
        }
        return val
      }
    },
    created() {
      this.getPerms()
    },
    mounted() {
      this.getList();
    }
  }
</script>

