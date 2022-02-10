<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query">
      <el-input size="mini" v-model="queryList.userName" placeholder="司机姓名" style="width: 100%"></el-input>
      <el-button @click="handleFilter" size="mini" icon="el-icon-search">查询</el-button>
      <el-button v-if="createButton" icon="el-icon-edit" @click="handleCreate" size="mini">新增</el-button>
      <el-upload
        :headers="uploadHeader"
        class="upload-demo"
        accept=".xlsx,.xls"
        :show-file-list="false"
        action="/taxi-server/admin/sms/importExcel"
        :on-success="onSuccess"
        :on-error="onError">
        <el-button size="mini" icon="el-icon-document" v-if="importButton">
          导入
        </el-button>
      </el-upload>
      <div style="text-decoration: underline; color: #3b91b6" @click="getExample" v-if="importButton">导入模板下载</div>
    </div>
    <div class="app-table-contain">
      <div style="height: 100%;" >
        <el-table
          v-loading="loading"
          stripe
          :data="tableData.records" :stripe="true" border
          style="width: 100%;"
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column prop="userName" label="司机姓名" width="150" align="center">
          </el-table-column>
          <el-table-column prop="company" label="公司名称" width="300" align="center">
          </el-table-column>
          <el-table-column prop="userTel" label="手机号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="templateName" label="短信模板名称" width="200" align="center">
          </el-table-column>
          <el-table-column prop="content" label="短信内容" align="center">
          </el-table-column>
          <el-table-column label="发送时间" width="200" align="center">
            <template slot-scope="scope">
              {{scope.row.time|fmtTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="200px">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" icon="el-icon-edit"
                           @click="handleView(scope.row)">查看
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="getList()"
        :total="tableData.total" :current-page.sync="tableData.current" :page-size="tableData.size"
        style="flex-shrink: 0;padding: 10px">
      </el-pagination>
    </div>

    <el-dialog title="发送短信" :visible.sync="createForm" width="45%"
               :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <div class="app-form-class">
        <el-form ref="dataForm" :model="createList" :rules="rules" label-width="80px" size="mini"
                 @submit.native.prevent :hide-required-asterisk="true">
          <el-form-item label="手机号" prop="userTel" style="width: 70%;">
            <el-input v-model="createList.userTel"/>
          </el-form-item>
          <el-form-item label="司机姓名" prop="userName"  v-show="createList.templateId==1" style="width: 70%;">
            <el-input v-model="createList.userName"/>
          </el-form-item>
          <el-form-item label="公司名称" prop="company" v-show="createList.templateId!=1" style="width: 70%;">
            <el-input v-model="createList.company"/>
          </el-form-item>
          <el-form-item label="车牌号" prop="plateNo" style="width: 70%;">
            <el-input v-model="createList.plateNo"/>
          </el-form-item>
          <el-form-item label="模板选择" >
            <el-select v-model="createList.templateId" placeholder="请选择">
              <el-option label="非法营运" :value="1"></el-option>
              <el-option label="异地载客" :value="2"></el-option>
              <el-option label="巡游揽客" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间" prop="effectiveTime" >
            <el-date-picker v-model="createList.time" type="datetime" class="filter-item" value-format="timestamp" placeholder="请选择" />
          </el-form-item>
          <el-form-item label="地点" prop="place"  style="width: 70%;">
            <el-input v-model="createList.place"/>
          </el-form-item>
          <!--<el-form-item label="短信内容" prop="content" style="width: 70%;">-->
            <!--<el-input-->
              <!--type="textarea"-->
              <!--:rows="6"-->
              <!--placeholder="请输入短信内容"-->
              <!--v-model="createList.content"-->
              <!--style="width: 100%; margin-bottom: 2%">-->
            <!--</el-input>-->
          <!--</el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createForm = false" style="margin: 5% 0 0 60%">取消</el-button>
          <el-button type="primary" @click="createData">立即发送</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="记录详情" :visible.sync="viewForm" width="60%"
               :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="app-form-class">
        <el-form ref="dataForm" :model="viewList"  label-width="80px" size="mini"
                 @submit.native.prevent :hide-required-asterisk="true">
          <el-form-item label="手机号" prop="userTel" >{{ viewList.userTel }}</el-form-item>
          <el-form-item label="司机姓名" prop="userName">{{ viewList.userName }}</el-form-item>
          <el-form-item label="公司名称" prop="userName">{{ viewList.company }}</el-form-item>
          <el-form-item label="车牌号" prop="plateNo">{{ viewList.plateNo }}</el-form-item>
          <el-form-item label="短信模板" prop="templateName">{{ viewList.templateName }}</el-form-item>
          <el-form-item label="发送时间" prop="time">{{ viewList.time | fmtTime }}</el-form-item>
          <el-form-item label="地点" prop="place">{{ viewList.place }}</el-form-item>
          <el-form-item label="短息内容" prop="content">{{ viewList.content }}</el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog title="导入提示" :visible.sync="excelResult" width="30%">
      <div style="margin: 7% 0 7% 7%;">导入失败，是否下载错误信息</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="excelResult = false">取 消</el-button>
        <el-button type="primary" @click="downFile">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getToken } from '@/utils/auth'
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
            userName: '',
            orgId: ''
          }
        },
        uploadHeader: {
          'x-access-token': getToken()
        },

        errorUrl: null,
        viewList:{},
        createList: {},
        createForm: false,
        viewForm: false,
        loading: false,
        createLoading: false,
        listButton: false,
        createButton: false,
        viewButton: false,
        importButton: false,
        excelResult: false,
        rules: {
          // userName: [
          //   {required: true, message: '司机姓名不能为空', trigger: 'blur'}
          // ],
          userTel: [
            {required: true, message: '手机号不能为空', trigger: 'blur'},
            {
              pattern: /^[1][3|4|5|6|7|8|9][0-9]{9}$/,
              message: '手机号格式错误'
            }
          ],
          plateNo: [
            {required: true, message: '车牌号不能为空', trigger: 'blur'}
          ]
        },
      };
    },
    filters: {},
    watch: {},
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
          this.createButton = true;
          this.importButton = true;
        }
        else {
          if (perms.includes('POST /admin/sms/importExcel')) {
            this.importButton = true;
          }
          if (perms.includes('POST /admin/sms/send')) {
            this.createButton = true;
          }
          if (perms.includes('POST /admin/sms/smsHistory')) {
            this.listButton = true;
          }
        }
      },
      handleFilter() {
        this.queryList.current = this.tableData.current
        this.getList();
      },
      getList() {
        this.loading = true
        this.request('api_admin_sms_list', this.queryList).then((res) => {
          this.tableData = res;
          this.loading = false
        }).catch((error) => {
          console.log(error)
          this.loading = false
        });
      },
      handleView(row) {
        this.viewList = row
        this.viewForm = true
      },
      handleCreate() {
        this.resetForm()
        this.createForm = true
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.createLoading = true;
          this.request('api_admin_sms_send', this.createList).then((res) => {
            this.createLoading = false
            this.createForm = false
            this.$notify.success({
              title: '成功',
              message: '发送成功'
            })
            this.getList();
          }).catch((error) => {
            this.createLoading = false
            this.createForm = false
            this.$notify.error({
              title: '失败',
              message: '发送失败，请重试'
            })
          });
        });
      },
      onSuccess(response, file, fileLile) {
        if (response.result === 0) {
          this.errorUrl = response.errFile;
          this.excelResult = true;
          console.log(this.errorUrl);
        } else {
          this.$notify.success({
            title: '成功',
            message: '导入成功'
          })
          this.getList();
        }
      },
      onError(err, file, fileList) {
        console.log(err);
      },
      downFile() {
        this.excelResult = false;
        let params = {};
        params.fileUrl = this.errorUrl;
        this.request('api_admin_sms_err', params).then((res) => {
          console.log(res);
        }).catch((error) => {
        });
      },
      getExample() {
        let params = {};
        this.request('api_admin_sms_templateDownload', params).then((res) => {
        }).catch((error) => {
        });
      },
      resetForm(){
        this.createList = {
          userTel: '',
          userName: '',
          plateNo: '',
          templateId: 1,
          place: '',
          time: '',
          operator: this.$store.getters.userId
        }
      },
      getUserInfo() {
        this.queryList.params.orgId = this.$store.getters.orgId
      }
    },
    async created() {
      await this.getUserInfo()
      this.getPerms()
    },
    mounted() {
      this.getList();
    }

  }
</script>

