<template>
  <section>
    <lk-view-header @back="$emit('close')" content="配置用户合同"/>
    <section class="lk-add-pop">
      <el-form v-loading="loading" ref="formAdd" :model="form" :rules="rules" label-width="140px">
        <lk-get-row>
          <el-form-item label="用户ID" prop="idCard">
            <el-input clearable v-model.trim="form.idCard" class="input-one" size="mini" placeholder="请输入用户ID"
                      show-word-limit maxlength="50"
            />
            <el-button size="mini" style="margin-left: 10px" type="primary" @click="goSelectEmployee">选择用户</el-button>
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
import LkBackList from "@/components/common/lk-back-list";
import LkEdit from "@/components/common/lk-edit";
import LkSelectEmployeeInfo from "@/components/common/lk-select-employee-info";

export default {
  name: "get-contract-info",
  components: {LkSelectEmployeeInfo, LkEdit, LkBackList, LkGetButton, LkGetRow},
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
  created() {
    if (this.updateData && this.updateData.id) {
      this.form = this.updateData
      this.isAdd = false
    }
  },
  data() {
    return {
      loading: false,
      form: {
        idCard: ''
      },
      //查询条件
      query: {
        size: 20,
        current: 1,
        params: {
          endTime: null,
          startTime: null,
          status: '',
          id: '',
          idCard: '',
          phone: '',
          workerName: '',
        }
      },
      isAdd: true,
      rules: {
        idCard: [{required: true, message: '请输入用户ID', trigger: 'blur'},],
      }
    }
  },
  methods: {
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          let that = this
          this.loading = true
          this.query.params.idCard = this.form.idCard
          this.request('api_admin_contract_list', this.query).then(res => {
            let hasNoSign = res.records.some(ele => {
              return ele.status == 0
            })
            if (hasNoSign) {
              that.loading = false
              that.$notify.error({
                title: '配置失败',
                message: '该用户还有未签署的合约！',
                type: 'warning'
              })
              return
            }
            this.request('api_admin_contract_create', this.form).then(res => {
              this.loading = false
              this.toast.success('配置成功！')
              this.$emit('close');
            }).catch(err => {
              this.loading = false
              console.log(err)
            })
          })
        } else {
          this.loading = false
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
    },
    goSelectEmployee() {
      this.toast.showSmallModal('选择用户', LkSelectEmployeeInfo, {}, (res) => {
        this.form.idCard = res.idCard || ''
      })
    }
  }
}
</script>

<style scoped>

</style>
