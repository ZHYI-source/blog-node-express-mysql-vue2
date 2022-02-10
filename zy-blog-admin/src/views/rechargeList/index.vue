<style lang="scss" src="@/assets/css/app.scss"></style>
<template>
  <div class="app-table">
    <recharge-group :groupData="rechargeData" ref="rechargeGroupId"/>
    <div class="app-table-query" v-if="listButton">
      <el-button type="primary" icon="el-icon-document" @click="handleRecharge" style="margin-left: 50px">充值</el-button>
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
          <el-table-column prop="orgName" label="机构名称"  align="center">
          </el-table-column>
          <el-table-column prop="balanceDesc" label="账户余额" align="center">
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

    <el-dialog title="向林客充值费用" :visible.sync="rechargeForm" v-loading="rechargeLoading" width="40%"
               :close-on-click-modal="false" element-loading-text="处理中。。。">
      <el-form ref="dataForm" :rules="rules" :model="queryRecharge" status-icon label-position="right"
               label-width="100px" style="width: 50%; margin-left:150px; margin-top: 35px; margin-bottom: 40px">
        <el-form-item label="充值金额" prop="amount">
          <el-input v-model="queryRecharge.amount"/>
        </el-form-item>
        <el-form-item label="付款账户" prop="accountNo">
          <el-input v-model="queryRecharge.accountNo"/>
        </el-form-item>
        <el-form-item label="付款银行" prop="bankName">
          <el-input v-model="queryRecharge.bankName"/>
        </el-form-item>
        <el-form-item label="银行户名" prop="accountName">
          <el-input v-model="queryRecharge.accountName"/>
        </el-form-item>
        <el-form-item label="纳税人税号" prop="taxNo">
          <el-input v-model="queryRecharge.taxNo"/>
        </el-form-item>
        <el-form-item label="纳税人地址" prop="address">
          <el-input v-model="queryRecharge.address"/>
        </el-form-item>
        <el-form-item label="纳税人电话" prop="taxTel">
          <el-input v-model="queryRecharge.taxTel"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doRecharge" style="width: 200px; display:block;margin:0 auto">
          提交审核
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import RechargeGroup from './components/RechargeGroup'

  export default {
    components: {
      RechargeGroup
    },
    data() {
      return {
        queryList: {
          size: 20,
          current: 1,
          params: {
            orgId: '',
          }
        },
        queryNumber: {
          orgId: '',
        },
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        queryRecharge: {
          orgId: '',
          amount: '',
          accountNo: '',
          bankName: '',
          accountName: '',
          taxNo: '',
          address: '',
          taxTel: '',
        },
        rules: {
          amount: [
            {required: true, message: '充值金额不能为空', trigger: 'blur'},
            {
              pattern: /(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/,
              message: '充值金额格式错误'
            }
          ],
          accountNo: [
            {required: true, message: '付款账户不能为空', trigger: 'blur'}
          ],
          bankName: [
            {required: true, message: '付款银行不能为空', trigger: 'blur'}
          ],
          accountName: [
            {required: true, message: '银行户名不能为空', trigger: 'blur'}
          ],
        },
        rechargeData: {},
        loadingText: '',
        loading: false,
        rechargeLoading: false,
        rechargeForm: false,
        listButton: false,
        rechargeButton: false,
      };
    },
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
          this.rechargeButton = true;
        } else {
          if (perms.includes('POST /admin/invoice/balanceList')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/invoice/recharge')) {
            this.rechargeButton = true;
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
        this.request('api_admin_invoice_balanceList', this.queryList).then((res) => {
          this.tableData = res;
          this.loading = false
        }).catch((error) => {
          console.log(error)
          this.loading = false
        });
        this.request('api_admin_invoice_number', this.queryNumber).then((res) => {
          this.rechargeData.statusDesc = res.statusDesc
          this.rechargeData.balanceDesc = res.balanceDesc
          this.rechargeData.deductionDesc = res.deductionDesc
          this.rechargeData.statusAmtDesc = res.statusAmtDesc
          this.rechargeData.bindingCountDesc = res.bindingCountDesc
          this.rechargeData.unboundCountDesc = res.unboundCountDesc
          this.$refs.rechargeGroupId.setOptions(this.rechargeData)
        }).catch((error) => {
          console.log(error)
        });
      },
      handleRecharge() {
        this.resetForm()
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        this.rechargeForm = true
      },
      doRecharge() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            this.rechargeLoading = true
            this.request('api_admin_invoice_recharge', this.queryRecharge).then((res) => {
              this.rechargeLoading = false
              this.$notify.success({
                title: '成功',
                message: '提交成功'
              })
              this.getList()
              this.rechargeForm = false
            }).catch((error) => {
              this.rechargeLoading = false
              this.$notify.error({
                title: '失败',
                message: '提交失败，请重试'
              })
              this.rechargeForm = false
            });
          }
        })
      },
      resetForm() {
        this.queryRecharge = {
          orgId: this.$store.getters.orgId,
          amount: '',
          accountNo: '',
          bankName: '',
          accountName: '',
          taxNo: '',
          address: '',
          taxTel: '',
        }
      },
      getUserInfo() {
        this.queryList.params.orgId = this.$store.getters.orgId
        this.queryRecharge.orgId = this.$store.getters.orgId
        this.queryNumber.orgId = this.$store.getters.orgId
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


