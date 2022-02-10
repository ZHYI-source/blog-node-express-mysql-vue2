<template>
  <section>
    <lk-view-header @back="$emit('close')" :content="this.updateData && this.updateData.id?'修改电子发票':'添加电子发票'"/>
    <section class="lk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <div class="row-title">销方信息：</div>
        </el-row>
        <lk-get-row>
          <el-form-item label="销方抬头" prop="temp.workerName">
            <el-input clearable v-model.trim="form.temp.workerName" disabled class="input-one" size="mini" placeholder="请输入销方抬头"
                      show-word-limit
            />
            <el-button v-if="isAdd" style="margin-left: 10px" type="primary" size="mini" icon="el-icon-plus"
                       @click="getOrderInfo"
            >
              选择开票销方
            </el-button>
          </el-form-item>
        </lk-get-row>
        <template v-if="form.temp.workerName">
          <lk-get-row>
            <el-form-item label="用工ID" prop="orderId">
              <el-input clearable v-model.trim="form.temp.orderId" disabled class="input-one" size="mini" placeholder="请输入用工ID"
                        show-word-limit
              />
            </el-form-item>
            <el-form-item label="任务状态" prop="taskStatus">
              <!-- 被退回-->
              <el-tag type="danger" v-if="form.temp.taskStatus == 9"> 被退回</el-tag>
              <!-- 被拒绝-->
              <el-tag type="danger" v-if="form.temp.taskStatus == 8"> 被拒绝</el-tag>
              <!-- 新发布-->
              <el-tag type="warning" v-if="form.temp.taskStatus === 0"> 新发布</el-tag>
              <!-- 待接单-->
              <el-tag type="primary" v-if="form.temp.taskStatus === 1"> 待接单</el-tag>
              <!-- 已提交-->
              <el-tag type="info" v-if="form.temp.taskStatus === 2"> 已提交</el-tag>
              <!-- 已完工-->
              <el-tag type="success" v-if="form.temp.taskStatus === 3"> 已完工</el-tag>
            </el-form-item>
          </lk-get-row>
          <lk-get-row>
            <el-form-item label="任务名称" prop="taskName">
              <el-input clearable
                        style="padding-top: 3px"
                        v-model.trim="form.temp.taskName"
                        disabled
                        class="input-one" size="mini"
                        placeholder="请输入任务名称"
                        show-word-limit maxlength="15"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="开票金额" prop="tradeAmt">
              <el-input clearable
                        style="padding-top: 3px"
                        disabled
                        v-model.trim="form.temp.tradeAmt"
                        class="input-one" size="mini"
                        placeholder="请输入开票金额"
                        show-word-limit maxlength="15"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </lk-get-row>
          <lk-get-row>
            <el-form-item label="用户税号" prop="temp.invoiceNo">
              <el-input clearable
                        style="padding-top: 3px"
                        disabled
                        v-model.trim="form.temp.invoiceNo"
                        class="input-one" size="mini"
                        placeholder="请输入用户税号"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="完工时间" prop="finishTimestamp">
              <el-date-picker
                disabled
                class="input-one"
                v-model="form.temp.finishTimestamp"
                size="mini"
                type="datetime"
                placeholder="完工时间"
              >
              </el-date-picker>
            </el-form-item>
          </lk-get-row>
        </template>
        <el-row>
          <div class="row-title">购方信息：</div>
        </el-row>
        <lk-get-row>
          <el-form-item label="抬头类型" prop="invoiceType">
            <el-radio-group v-model="form.invoiceType" @change="clearData">
              <el-radio :label="1">企业/单位</el-radio>
              <el-radio :label="0">个人/非企业</el-radio>
              <!--<el-radio :label="2">手机开票</el-radio>-->
            </el-radio-group>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="发票抬头" prop="invoiceTitle">
            <el-input clearable v-model.trim="form.invoiceTitle" class="input-one" size="mini" placeholder="请输入发票抬头"
                      show-word-limit
            />
          </el-form-item>
          <el-form-item label="发票税号" prop="invoiceNo">
            <el-input clearable v-model.trim="form.invoiceNo" class="input-one" size="mini" placeholder="请输入发票税号"
                      show-word-limit maxlength="20"
            />
          </el-form-item>
        </lk-get-row>
        <lk-get-row>

          <el-form-item label="索要发票时间" prop="insertTimestamp">
            <el-date-picker
              class="input-one"
              v-model="form.insertTimestamp"
              size="mini"
              type="datetime"
              placeholder="选择索要发票时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="购方电话" prop="buyerPhone">
            <el-input class="input-one" size="mini" placeholder="请输入购方电话" v-model.trim="form.buyerPhone" clearable/>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="接收手机" prop="payerPhone">
            <el-input clearable v-model.number="form.payerPhone" class="input-one" size="mini" placeholder="请输入接收手机"
                      show-word-limit maxlength="15"
            />
          </el-form-item>
          <el-form-item label="接收邮箱" prop="payerMail">
            <el-input clearable
                      v-model.trim="form.payerMail"
                      class="input-one" size="mini" placeholder="请输入接收邮箱"
                      show-word-limit maxlength="32"
            >
            </el-input>
          </el-form-item>
        </lk-get-row>
        <template v-if="form.invoiceType == 1">
          <lk-get-row>
            <el-form-item label="开户银行" prop="buyerBank">
              <el-input class="input-one" size="mini" placeholder="请输入开户银行" v-model.trim="form.buyerBank" clearable/>
            </el-form-item>
            <el-form-item label="开户账号" prop="buyerAccount">
              <el-input class="input-one" size="mini" placeholder="请输入开户账号" v-model.trim="form.buyerAccount" clearable/>
            </el-form-item>
          </lk-get-row>

          <lk-get-row>
            <el-form-item label="购方地址" prop="buyerAddress">
              <el-input class="input-one" size="mini" placeholder="请输入购方地址" style="width: 550px"
                        v-model.trim="form.buyerAddress"
                        type="textarea" :rows="2" clearable
              />
            </el-form-item>
          </lk-get-row>
        </template>
        <el-divider/>
        <lk-get-button @save="save" @close="close(true)"/>
      </el-form>
    </section>
  </section>
</template>

<script>
import LkGetRow from "@/components/common/lk-get-row";
import LkGetButton from "@/components/common/lk-get-button";
import LkBackList from "@/components/common/lk-back-list";
import LkEdit from "@/components/common/lk-edit";
import SelectOrderInfo from "@/views/zzPages/tax/select-order-info";

export default {
  name: "get-invoice-info",
  components: {SelectOrderInfo, LkEdit, LkBackList, LkGetButton, LkGetRow},
  props: {
    updateData: {
      type: Object,
      default() {
        return {};
      }
    },
    routerId: {
      type: [String, Number],
      default() {
        return undefined;
      }
    }
  },
  watch: {
    //切换抬头类型清空校验
    'form.invoiceType'(val) {
      this.$nextTick(() => {
        this.$refs['formAdd'].clearValidate()
      })
    }
  },
  created() {
    console.log("32",this.updateData)
    if (this.updateData && this.updateData.id) {
      this.form = this.updateData
      this.form.temp={}
      this.form.temp.workerName = this.updateData.workerName || ''
      this.form.temp.taskStatus = 3
      this.form.temp.tradeAmt = this.updateData.amount
      this.form.temp.orderId = this.updateData.orderId
      this.form.invoiceType = parseInt(this.updateData.invoiceType)
      this.isAdd = false
    }
  },
  data() {
    return {
      form: {
        temp:{
          workerName:''
        },
        invoiceType: 1,
        invoiceNo: '91520102MAAJW2782C',
        invoiceTitle: '中智贵阳人力资本科技有限公司',
        buyerBank: '兴业银行贵阳瑞金北路支行',
        buyerAccount: '602080100100015219',
        buyerPhone: '0851-88622569',
        buyerAddress: '贵州省贵阳市南明区花果园五里冲花果园项目V区15栋1单元（亚太中心）3201、3212室',
        insertTimestamp: new Date()
      },
      isAdd: true,
      rules: {
        'temp.workerName': [{required: true, message: '请输入销方抬头', trigger: 'blur'},],
        invoiceType: [{required: true, message: '请选择抬头类型', trigger: 'blur'},],
        invoiceTitle: [{required: true, message: '请输入发票抬头', trigger: 'blur'},],
        invoiceNo: [{required: true, message: '请输入税号', trigger: 'blur'},
          {
            pattern: /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/,
            message: '税号输入错误，请重新填写！'
          }],
        insertTimestamp: [{required: true, message: '请选择索要时间', trigger: 'blur'},],
        payerMail: [
          {message: '请输入接收邮箱', trigger: 'blur'},
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
        payerPhone: [
          {
            pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
            message: '手机号格式错误',
            trigger: 'blur'
          }],
        amount: [{required: true, message: '请输入开票金额', trigger: 'blur'},],
      }
    }
  },
  methods: {
    //选择任务ID
    getOrderInfo() {
      this.toast.showSmallModal('选择开票销方', SelectOrderInfo, {}, (res) => {
        console.log('选择任务', res)
        this.form.temp = res || {}

      })
    },

    clearData(val) {
      // console.log(val)

    },
    validateOther() {
      if (this.form.buyerBank && !this.form.buyerAccount || !this.form.buyerBank && this.form.buyerAccount) {
        this.$notify.warning({
          title: '提示',
          message: '开户银行和开户账号需要同时填写'
        })
        return false
      }
      if (this.form.buyerAddress && !this.form.buyerPhone || !this.form.buyerAddress && this.form.buyerPhone) {
        this.$notify.warning({
          title: '提示',
          message: '购方电话和购方地址需要同时填写'
        })
        return false
      }
      return true
    },
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          //校验非必填选项
          if (!this.validateOther()) {
            return
          }
          this.form.insertTimestamp = new Date(this.form.insertTimestamp).getTime()
          this.form.invoiceType = parseInt(this.form.invoiceType)
          this.form.id = this.form.temp.orderId
          this.form.amount = this.form.tradeAmt
          let api = this.isAdd ? 'api_admin_invoice_insert' : 'api_admin_invoice_update'
          this.request(api, this.form).then(res => {
            this.toast.success(this.isAdd ? '添加成功！' : '修改成功！')
            this.$emit('close');
          }).catch(err => {
            this.toast.error(err.msg)
            console.log(err)
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    close(show) {
      if (show) {
        this.toast.confirmSave().then(() => {
          this.$emit('close');
        });
      } else {
        this.$emit('close');
      }
    }
  }
}
</script>

<style scoped>

</style>
