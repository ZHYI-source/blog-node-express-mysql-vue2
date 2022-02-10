<template>
  <section class="lk-add-pop">
    <el-form ref="formAdd" :model="form" :rules="rules" label-width="110px">
      <lk-get-row>
        <el-form-item label="用户姓名" prop="workerName">
          <el-input clearable v-model.trim="form.workerName"
                    class="input-one" size="mini" placeholder="请输入用户姓名"
                    show-word-limit maxlength="50"
          />
        </el-form-item>
      </lk-get-row>
      <lk-get-row>
        <el-form-item label="身份证号" prop="idCard">
          <el-input clearable v-model.trim="form.idCard"
                    :disabled="Boolean(datas.idCard)"
                    class="input-one" size="mini" placeholder="请输入身份证号"
                    show-word-limit maxlength="20"
          />
        </el-form-item>
        <el-form-item label="用户手机号" prop="phone">
          <el-input clearable v-model.trim="form.phone"
                     class="input-one"  size="mini" placeholder="请输入用户手机号"
                    show-word-limit maxlength="30"
          />
        </el-form-item>
      </lk-get-row>
      <lk-get-row>
        <el-form-item label="银行名称" prop="bankName">
          <el-input clearable v-model.trim="form.bankName"

                    class="input-one" size="mini" placeholder="请输入银行名称"

          />
        </el-form-item>
        <el-form-item label="银行卡号" prop="account" >
          <el-input clearable v-model.trim="form.account"  class="input-one" size="mini" placeholder="请输入银行卡号"
          />
        </el-form-item>
      </lk-get-row>
      <lk-get-row>
        <el-form-item label="是否签约" prop="sign">
          <el-radio-group disabled v-model="form.sign" class="input-one">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否实名" prop="real">
          <el-radio-group disabled v-model="form.real" class="input-one">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
      </lk-get-row>
      <lk-get-row>
        <el-form-item label="居住地址" prop="address">
          <el-input clearable v-model.trim="form.address"
                    class="input-one" size="mini"
                    type="textarea"
                    style="width: 600px"
                    placeholder="请输入居住地址"
                    maxlength="100"
          />
        </el-form-item>
      </lk-get-row>
      <lk-get-row>
        <el-form-item label="用户籍贯" prop="nativePlace">
          <el-input clearable v-model.trim="form.nativePlace"
                    type="textarea"
                    style="width: 600px"
                    class="input-one" size="mini" placeholder="请输入用户籍贯"
                    maxlength="100"
          />
        </el-form-item>
      </lk-get-row>
      <el-divider/>
      <lk-get-button @save="save" @close="close(true)"/>
    </el-form>
  </section>
</template>

<script>
import LkGetRow from "@/components/common/lk-get-row";
import LkGetButton from "@/components/common/lk-get-button";
import Tools from "@/utils/tool";
import {isPoneAvailable} from "@/utils/validate";

export default {
  name: "get-employee-info",
  components: {LkGetButton, LkGetRow},
  props: {
    datas: {
      type: Object,
      default() {
        return null;
      }
    },
    routerId: {
      type: [String, Number],
      default() {
        return undefined;
      }
    }
  },
  created() {
    console.log(this.datas)
    if (this.datas.idCard){
      this.form = this.datas
      this.form.sign = this.datas.isSign
      this.form.real = this.datas.isReal

      return
    }
  },
  data() {
    var verCard = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户身份证号'));
      } else {
        let a = Tools.identityIDCard(value)
        if (!a.isPass) {
          callback(new Error(a.errorMessage));
        }
        callback();
      }
    };
    var verPhone = (rule, value, callback) => {
      console.log(value)
      if (!value) {
        callback(new Error('请输入用户手机号'));
      } else {
        let a = isPoneAvailable(value)
        if (!a) {
          callback(new Error('手机号格式不正确'));
        }
        callback();
      }
    };
    return {
      form: {
        sign:0,
        real: 0,
        bankCardNum:''
      },
      rules: {
        workerName: [{required: true, message: '请输入用户名称', trigger: 'blur'},],
        idCard: [{required: true, validator: verCard,  trigger: 'blur'},],
        phone: [{required: true, validator: verPhone, trigger: 'blur'},],
        sign: [{required: true, message: '请选择是否签约', trigger: 'blur'},],
        real: [{required: true, message: '请选择是否实名', trigger: 'blur'},],
        address: [{required: true, message: '请输入居住地址', trigger: 'blur'},],
        nativePlace: [{required: true, message: '请输入用户籍贯', trigger: 'blur'},],
      }
    }
  },
  methods: {
    save() {
      let url= this.datas.idCard?'api_admin_operate_worker_update':'api_admin_operate_worker_create'
      let that = this
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          this.form.bankCardNum = this.form.account
          this.request(url, this.form).then(res => {
            this.toast.success(that.datas.idCard?'更新成功！':'添加成功！')
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
