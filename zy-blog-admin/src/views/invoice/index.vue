<style lang="scss" src="@/assets/css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-input v-model="queryList.params.plateNo" placeholder="用户税号" size="mini" clearable></el-input>
      <el-input v-model="queryList.params.userTel" placeholder="购方手机号" size="mini" clearable></el-input>
      <el-input v-model="queryList.params.userMail" placeholder="购方邮箱" size="mini" clearable></el-input>
      <el-date-picker
        v-model="stet"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期" size="mini">
      </el-date-picker>
      <el-select size="mini" v-model="queryList.params.status" placeholder="开票状态">
        <el-option label="全部" :value="-2"></el-option>
        <el-option label="已开票" :value="1"></el-option>
        <el-option label="开票失败" :value="3"></el-option>
        <el-option label="待填写" :value="2"></el-option>
      </el-select>
      <el-button size="mini" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button size="mini" icon="el-icon-document" @click="handleCreate" v-if="createButton">新增</el-button>
    </div>
    <div class="app-table-contain">
      <div style="height: 100%;" ref="ztable">
        <el-table
          v-loading="loading" :element-loading-text="loadingText"
          :data="tableData.records" :stripe="true" border
          stripe
          height="700"
          show-overflow-tooltip
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column prop="id" label="ID" width="170" align="center">
          </el-table-column>
          <el-table-column prop="userId" label="购方ID" width="170" align="center">
          </el-table-column>
          <el-table-column prop="userTel" label="购方手机号" width="110" align="center">
          </el-table-column>
          <el-table-column prop="userMail" label="购方邮箱" width="160" align="center">
          </el-table-column>
          <el-table-column prop="driverName" label="用户姓名" width="80" align="center">
          </el-table-column>
          <el-table-column prop="idCard" label="用户身份证" width="165" align="center">
          </el-table-column>
          <el-table-column prop="plateNo" label="用户税号" width="100" align="center">
          </el-table-column>
          <el-table-column prop="outTradeNo" label="用工ID" width="170" align="center">
          </el-table-column>
          <el-table-column prop="amount" label="用工金额" width="120" align="center">
          </el-table-column>
          <el-table-column prop="isPersonDesc" label="个人/企业" width="90" align="center">
          </el-table-column>
          <el-table-column prop="isDriverDesc" label="客户/用户" width="90" align="center">
          </el-table-column>
          <el-table-column prop="userInvoiceNo" label="发票税号" width="170" align="center">
          </el-table-column>
          <el-table-column prop="userInvoiceTitle" label="发票抬头" width="300" align="center">
          </el-table-column>
          <el-table-column prop="einvoiceUrl" label="发票链接" width="100" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.einvoiceUrl">
                <a style="text-decoration: underline; color: #152ef3"
                   :href='scope.row.einvoiceUrl'  download="file" title="发票链接" target="_blank">
                  点击查看
                </a>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="invoiceDate" label="开票日期" width="180" align="center">
          </el-table-column>
          <el-table-column align="center" label="开票状态" width="100" fixed="right">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.status === 3"> {{ scope.row.statusDesc }}</el-tag>
              <el-tag type="info" v-if="scope.row.status === 0"> {{ scope.row.statusDesc }}</el-tag>
              <el-tag type="success" v-if="scope.row.status === 1"> {{ scope.row.statusDesc }}</el-tag>
              <el-tag type="warning" v-if="scope.row.status === 2"> {{ scope.row.statusDesc }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="200">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="small" type="primary" icon="el-icon-document"
                           v-if="retryButton && scope.row.status === 3"
                           @click="handleRetry(scope.row)">重新开票
                </el-button>
                <el-button size="small" type="primary" icon="el-icon-document"
                           v-if="updateButton && scope.row.status === 3"
                           @click="handleUpdate(scope.row)">编辑
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
    <el-dialog title="重新开票" :visible.sync="retryForm" v-loading="retryLoading" width="30%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">
      <div style="margin-top: 5%; margin-left: 5%; margin-bottom: 5%">确定要申请重新开票吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="retryForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="retryData">
          确定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增发票" :visible.sync="createForm" v-loading="createLoading" width="45%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">
      <el-form ref="createForm" :rules="createRules" :model="queryCreate" status-icon label-position="right"
               label-width="100px" style="width: 50%; margin-left:150px; margin-top: 35px; margin-bottom: 40px">
        <el-form-item label="抬头类型" prop="isPerson">
          <el-radio-group v-model="queryCreate.isPerson" @change="changeHandler('createForm')">
            <el-radio :label="1">企业/单位</el-radio>
            <el-radio :label="0">个人/非企业</el-radio>
            <el-radio :label="2">手机开票</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="车牌号码" prop="plateNo">
          <el-input v-model="queryCreate.plateNo" clearable/>
        </el-form-item>
        <el-form-item label="发票抬头" prop="userInvoiceTitle" key="7" v-if="queryCreate.isPerson === 1">
          <el-input v-model="queryCreate.userInvoiceTitle" clearable/>
        </el-form-item>
        <el-form-item label="发票税号" prop="userInvoiceNo" key="6" v-if="queryCreate.isPerson === 1">
          <el-input v-model="queryCreate.userInvoiceNo" clearable/>
        </el-form-item>
        <el-form-item label="订单金额" prop="amount">
          <el-input v-model="queryCreate.amount" clearable placeholder="单位（元）"/>
        </el-form-item>
        <el-form-item label="接收手机" prop="userTel">
          <el-input v-model="queryCreate.userTel" clearable/>
        </el-form-item>
        <el-form-item label="接收邮箱" prop="userMail" key="5" v-if="queryCreate.isPerson != 2">
          <el-input v-model="queryCreate.userMail" clearable/>
        </el-form-item>
        <el-form-item label="索要发票时间" prop="insertTimestamp">
          <el-date-picker
            v-model="queryCreate.insertTimestamp"
            type="datetime"
            clearable
            :clearable="false"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开户银行" prop="buyerBank" key="4" v-if="queryCreate.isPerson === 1">
          <el-input v-model="queryCreate.buyerBank" clearable/>
        </el-form-item>
        <el-form-item label="开户账号" prop="buyerAccount" key="3" v-if="queryCreate.isPerson === 1">
          <el-input v-model="queryCreate.buyerAccount" clearable/>
        </el-form-item>
        <el-form-item label="购方电话" prop="buyerPhone" key="2" v-if="queryCreate.isPerson === 1">
          <el-input v-model="queryCreate.buyerPhone" clearable/>
        </el-form-item>
        <el-form-item label="购方地址" prop="buyerAddress" key="1" v-if="queryCreate.isPerson === 1">
          <el-input v-model="queryCreate.buyerAddress" type="textarea" :rows="3" clearable/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="createData">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑发票" :visible.sync="updateForm" v-loading="updateLoading" width="45%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">
      <el-form ref="updateForm" :rules="updateRules" :model="queryUpdate" status-icon label-position="right"
               label-width="100px" style="width: 50%; margin-left:150px; margin-top: 35px; margin-bottom: 40px">
        <el-form-item label="抬头类型" prop="isPerson">
          <el-radio-group v-model="queryUpdate.isPerson" @change="changeHandler('updateForm')">
            <el-radio :label="1">企业/单位</el-radio>
            <el-radio :label="0">个人/非企业</el-radio>

          </el-radio-group>
        </el-form-item>
        <el-form-item label="发票抬头" prop="userInvoiceTitle" v-if="queryUpdate.isPerson === 1">
          <el-input v-model="queryUpdate.userInvoiceTitle" clearable/>
        </el-form-item>
        <el-form-item label="发票税号" prop="userInvoiceNo" v-if="queryUpdate.isPerson === 1">
          <el-input v-model="queryUpdate.userInvoiceNo" clearable/>
        </el-form-item>
        <el-form-item label="接收手机" prop="userTel">
          <el-input v-model="queryUpdate.userTel" clearable/>
        </el-form-item>
        <el-form-item label="接收邮箱" prop="userMail" v-if="queryUpdate.isPerson != 2">
          <el-input v-model="queryUpdate.userMail"/>
        </el-form-item>
        <el-form-item label="插入时间" prop="insertTimestamp">
          <el-date-picker
            v-model="queryUpdate.insertTimestamp"
            type="datetime"
            :clearable="false"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开户银行" prop="buyerBank" v-if="queryUpdate.isPerson === 1">
          <el-input v-model="queryUpdate.buyerBank" clearable/>
        </el-form-item>
        <el-form-item label="开户账号" prop="buyerAccount" v-if="queryUpdate.isPerson === 1">
          <el-input v-model="queryUpdate.buyerAccount" clearable/>
        </el-form-item>
        <el-form-item label="购方电话" prop="buyerPhone" v-if="queryUpdate.isPerson === 1" >
          <el-input v-model="queryUpdate.buyerPhone" clearable/>
        </el-form-item>
        <el-form-item label="购方地址" prop="buyerAddress" v-if="queryUpdate.isPerson === 1">
          <el-input v-model="queryUpdate.buyerAddress" clearable type="textarea" :rows="2"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData">
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
        queryList: {
          size: 20,
          current: 1,
          params: {
            plateNo: '',
            userTel: '',
            userMail: '',
            startTime: null,
            endTime: null,
            status: -2,
            orgId: ''
          }
        },
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        queryCreate: {
          isPerson: 0,
          plateNo: '',
          userInvoiceTitle: '',
          userInvoiceNo: '',
          amount: '',
          userTel: '',
          userMail: '',
          buyerBank: '',
          buyerAccount: '',
          buyerPhone: '',
          buyerAddress: '',
          insertTimestamp: new Date().getTime(),
        },
        queryUpdate: {},
        queryRetry: {
          id: undefined,
        },
        createRules: {
          amount: [
            {required: true, message: '订单金额不能为空', trigger: 'blur'},
            {
              pattern: /(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/,
              message: '金额格式错误'
            }
          ],
          plateNo: [
            {required: true, message: '车牌号码不能为空', trigger: 'blur'}
          ],
          userInvoiceTitle: [
            {required: true, message: '发票抬头不能为空', trigger: 'blur'}
          ],
          userInvoiceNo: [
            {required: true, message: '发票税号不能为空', trigger: 'blur'}
          ],
          userTel: [
            {required: true, message: '接收手机不能为空', trigger: 'blur'},
            {
              pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
              message: '手机号格式错误'
            }
          ],
          userMail: [
            {required: true, message: '接收邮箱不能为空', trigger: 'blur'},
            {
              //测试用例
              // '1234@qq.com',
              // 'zhouyi@126.com',
              // 'zhouyi123@126.com',
              // 'zhouyi123@vip.163.com',
              // 'zhouyi_email@outlook.com',
              // 'zhouyi.email@gmail.com'

              pattern: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,
              message: '邮箱格式错误'
            }
          ],
        },
        updateRules: {
          userInvoiceTitle: [
            {required: true, message: '发票抬头不能为空', trigger: 'blur'}
          ],
          userInvoiceNo: [
            {required: true, message: '发票税号不能为空', trigger: 'blur'}
          ],
          userTel: [
            {required: true, message: '接收手机不能为空', trigger: 'blur'},
            {
              pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
              message: '手机号格式错误'
            }
          ],
          userMail: [
            {required: true, message: '接收邮箱不能为空', trigger: 'blur'},
            {
              pattern: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g,
              message: '邮箱格式错误'
            }
          ],
        },
        stet: [],
        loadingText: '',
        loading: false,
        retryLoading: false,
        createLoading: false,
        updateLoading: false,
        retryForm: false,
        createForm: false,
        updateForm: false,
        listButton: false,
        createButton: false,
        updateButton: false,
        retryButton: false
      };
    },
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
          this.retryButton = true;
          this.updateButton = true;
          this.createButton = true;
        } else {
          if (perms.includes('POST /admin/invoice/list')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/invoice/retry')) {
            this.retryButton = true;
          }
          if (perms.includes('POST /admin/invoice/update')) {
            this.updateButton = true;
          }
          if (perms.includes('POST /admin/invoice/insert')) {
            this.createButton = true;
          }
        }
      },
      handleFilter() {
        if (this.stet && this.stet.length > 1) {
          let start = this.stet[0].getTime();
          let end = this.stet[1].getTime();
          this.queryList.params.startTime = start;
          this.queryList.params.endTime = end;
        } else {
          this.queryList.params.startTime = null;
          this.queryList.params.endTime = null;
        }
        this.queryList.current = this.tableData.current
        this.getList();
      },
      getList() {
        this.loadingText = '正在查询中。。。'
        this.loading = true
        this.request('api_admin_invoice_list', this.queryList).then((res) => {
          this.tableData = res;
          this.loading = false
        }).catch((error) => {
          console.log(error)
          this.loading = false
        });
      },
      handleCreate() {
        this.resetCreate()
        this.createForm = true
        this.$nextTick(() => {
          this.$refs['createForm'].clearValidate()
        })
      },
      resetCreate() {
        this.queryCreate = {
          isPerson: 1,
          plateNo: '',
          userInvoiceTitle: '',
          userInvoiceNo: '',
          amount: '',
          userTel: '',
          userMail: '',
          buyerBank: '',
          buyerAccount: '',
          buyerPhone: '',
          buyerAddress: '',
          insertTimestamp: new Date(),
        }
      },
      changeHandler(createForm){
        //切换一次抬头类型则清除校验
        this.$refs[createForm].clearValidate()
        if(this.queryCreate.isPerson===1){
          this.createRules.userInvoiceNo[0].required=true;
          this.createRules.userInvoiceTitle[0].required=true;
        }
        else if (this.queryCreate.isPerson===2){
          this.queryCreate.userInvoiceTitle = '手机开票'
          this.queryCreate.plateNo = ''
          this.queryCreate.userInvoiceNo = ''
          this.queryCreate.amount = ''
          this.queryCreate.userMail = ''
          this.queryCreate.userTel = ''
          this.queryCreate.buyerBank = ''
          this.queryCreate.buyerAccount = ''
          this.queryCreate.buyerAddress = ''
        }
        else{
          this.createRules.userInvoiceNo[0].required=false;
          this.createRules.userInvoiceTitle[0].required=false;
          this.queryCreate.userInvoiceTitle = '个人'
          this.queryCreate.plateNo = ''
          this.queryCreate.userInvoiceNo = ''
          this.queryCreate.amount = ''
          this.queryCreate.userMail = ''
          this.queryCreate.userTel = ''
          this.queryCreate.buyerBank = ''
          this.queryCreate.buyerAccount = ''
          this.queryCreate.buyerAddress = ''
        }
        if(this.queryUpdate.isPerson===1){
          this.updateRules.userInvoiceNo[0].required=true;
          this.updateRules.userInvoiceTitle[0].required=true;
        }else if (this.queryUpdate.isPerson===2){
          this.queryUpdate.userInvoiceTitle = '手机开票'
        }
        else{
          this.updateRules.userInvoiceNo[0].required=false;
          this.updateRules.userInvoiceTitle[0].required=false;
          this.queryUpdate.userInvoiceTitle = '个人'
          this.queryUpdate.userInvoiceNo = ''
          this.queryUpdate.buyerBank = ''
          this.queryUpdate.buyerAccount = ''
          this.queryUpdate.buyerPhone = ''
          this.queryUpdate.buyerAddress = ''
        }
      },
      createData() {
        this.$refs['createForm'].validate(valid => {
          if (valid) {
            if(this.queryCreate.buyerAddress && !this.queryCreate.buyerPhone || !this.queryCreate.buyerAddress && this.queryCreate.buyerPhone){
              this.$notify.warning({
                title: '提示',
                message: '购方电话和购方地址需要同时填写'
              })
              return
            }
            if(this.queryCreate.buyerBank && !this.queryCreate.buyerAccount || !this.queryCreate.buyerBank && this.queryCreate.buyerAccount){
              this.$notify.warning({
                title: '提示',
                message: '开户银行和开户账号需要同时填写'
              })
              return
            }
            if(this.queryCreate.insertTimestamp.constructor === Date){
              this.queryCreate.insertTimestamp = this.queryCreate.insertTimestamp.getTime();
            }
            this.createLoading = true
            if(this.queryCreate.isPerson === 0){
              this.queryCreate.userInvoiceTitle = '个人'
            }
            console.log(this.queryCreate)
            this.request('api_admin_invoice_createInvoice', this.queryCreate).then((res) => {
              this.createLoading = false
              this.$notify.success({
                title: '成功',
                message: '新增成功'
              })
              this.getList()
              this.createForm = false
            }).catch((error) => {
              this.createLoading = false
              this.$notify.error({
                title: '失败',
                message: error.msg
              })
            });
          }
        })
      },
      handleUpdate(row) {
        this.queryUpdate = row
        if (!row.insertTimestamp) {
          this.queryUpdate.insertTimestamp = new Date();
        }
        this.updateForm = true
        this.$nextTick(() => {
          this.$refs['updateForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['updateForm'].validate(valid => {
          if (valid) {
            this.updateLoading = true
            if(this.queryUpdate.insertTimestamp.constructor === Date){
              this.queryUpdate.insertTimestamp = this.queryUpdate.insertTimestamp.getTime()
            }
            if(this.queryUpdate.isPerson == 0){
              this.queryUpdate.userInvoiceTitle = '个人'
            }
            if(this.queryUpdate.isPerson == 2){
              this.queryUpdate.userInvoiceTitle = '手机开票'
            }
            if(this.queryUpdate.buyerAddress && !this.queryUpdate.buyerPhone || !this.queryUpdate.buyerAddress && this.queryUpdate.buyerPhone){
              this.$notify.warning({
                title: '提示',
                message: '购方电话和购方地址需要同时填写'
              })
              return
            }
            if(this.queryUpdate.buyerBank && !this.queryUpdate.buyerAccount || !this.queryUpdate.buyerBank && this.queryUpdate.buyerAccount){
              this.$notify.warning({
                title: '提示',
                message: '开户银行和开户账号需要同时填写'
              })
              return
            }
            this.updateLoading = true
            this.request('api_admin_invoice_updateInvoice', this.queryUpdate).then((res) => {
              this.updateLoading = false
              this.$notify.success({
                title: '成功',
                message: '编辑成功'
              })
              this.getList()
              this.updateForm = false
            }).catch((error) => {
              this.updateLoading = false
              this.$notify.error({
                title: '失败',
                message: error.msg
              })
            });
          }
        })
      },
      handleRetry(row) {
        this.queryRetry.id = row.id
        this.retryForm = true
      },
      retryData() {
        this.retryLoading = true
        this.request('api_admin_invoice_retry', this.queryRetry).then((res) => {
          this.retryLoading = false
          this.$notify.success({
            title: '成功',
            message: '重新开票申请成功'
          })
          this.getList()
          this.retryForm = false
        }).catch((error) => {
          this.retryLoading = false
          this.$notify.error({
            title: '失败',
            message: error.msg
          })
        });
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


