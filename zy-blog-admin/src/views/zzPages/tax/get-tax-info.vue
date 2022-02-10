<template>
  <section>
    <lk-view-header @back="$emit('close')" :content="isadd?'添加税号信息':'修改用户税号信息'"/>

    <section class="lk-add-pop">

      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">
        <lk-get-row>
          <el-form-item label="用户姓名" prop="realName">
            <el-input clearable :disabled="isadd" v-model.trim="form.realName" class="input-one" size="mini"
                      placeholder="请输入用户姓名"
                      show-word-limit maxlength="50"
            />
            <el-button v-if="isadd" style="margin-left: 10px" type="primary" size="mini" icon="el-icon-plus"
                       @click="getWorker"
            >
              选择用户
            </el-button>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="身份证号" prop="idCard">
            <el-input clearable v-model.trim="form.idCard"
                      :disabled="isadd"
                      class="input-one" size="mini" placeholder="请输入身份证号"
                      show-word-limit maxlength="20"
            />
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="用户手机号" prop="phone">
            <el-input clearable :disabled="isadd" v-model.trim="form.phone" class="input-one" size="mini"
                      placeholder="请输入用户手机号"
                      show-word-limit maxlength="50"
            />
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="税号" prop="invoiceNo">
            <el-input clearable v-model.trim="form.invoiceNo" class="input-one" size="mini" placeholder="请输入用户税号"
                      show-word-limit maxlength="20"
            />
          </el-form-item>
        </lk-get-row>
        <el-divider/>

        <lk-get-button @save="save" @close="close(true)"/>
      </el-form>
    </section>

  </section>
</template>

<script>
import LkGetRow from "@/components/common/lk-get-row";
import LkGetButton from "@/components/common/lk-get-button";
import DirSelectEmployeeInfo from "@/views/zzPages/task/dir-select-employee-info";
import LkSelectEmployeeInfo from "@/components/common/lk-select-employee-info";

export default {
  name: "get-tax-info",
  components: {LkSelectEmployeeInfo, DirSelectEmployeeInfo, LkGetButton, LkGetRow},
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

    if (this.datas && this.datas.id) {
      this.form = this.datas
      this.isadd = false
      return
    }
    this.form = {}
  },
  data() {
    return {
      form: {},
      isadd: true,
      rules: {
        realName: [{required: true, message: '请输入用户名称', trigger: 'blur'},],
        idCard: [{required: true, message: '请输入用户身份证号', trigger: 'blur'},],
        phone: [{required: true, message: '请输入用户手机号', trigger: 'blur'},],
        invoiceNo: [{required: true, message: '请输入用户税号', trigger: 'blur'},
          {
            pattern: /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/,
            message: '税号输入错误，请重新填写！'
          }],
      }
    }
  },
  methods: {
    getWorker() {
      this.toast.showSmallModal('选择用户', LkSelectEmployeeInfo, {}, data => {
        this.form = data || {}
        this.form.realName = data.workerName
        console.log('选择的用户', data)
      })
    },
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          let url = this.datas && this.datas.id ? 'api_admin_invoice_updateOrg' : 'api_admin_invoice_insertOrg'
          this.request(url, this.form).then(res => {
            this.toast.success(this.datas && this.datas.id ? '修改成功' : '添加成功！')
            this.$emit('close');
          }).catch(err => {
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
.add-btns {
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
}
</style>
