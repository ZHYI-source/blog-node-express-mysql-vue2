<template>
  <section>
    <lk-view-header @back="$emit('close')" :content="isAdd?'添加任务':'修改任务'"/>
    <section class="lk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">
        <lk-get-row>
          <el-form-item label="任务名称" prop="taskName">
            <el-input clearable v-model.trim="form.taskName" class="input-one" size="mini" placeholder="请输入任务名称"
                      show-word-limit maxlength="50"
            />
          </el-form-item>
        </lk-get-row>

        <lk-get-row>
          <el-form-item label="需求公司" prop="companyName">
            <el-input clearable v-model.trim="form.companyName" class="input-one" size="mini" placeholder="请输入需求公司名称"
                      show-word-limit maxlength="50"
            />
          </el-form-item>
          <el-form-item label="截止时间" prop="endTimestamp">
            <el-date-picker
                class="input-one"
                v-model="form.endTimestamp"
                size="mini"
                type="datetime"
                placeholder="选择截止时间"
            >
            </el-date-picker>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="联系人电话" prop="phone">
            <el-input clearable v-model.number="form.phone" class="input-one" size="mini" placeholder="请输入联系人电话"
                      show-word-limit maxlength="50"
            />
          </el-form-item>
          <el-form-item label="任务类型" prop="taskType">
            <el-select
                clearable
                style="padding-top: 3px"
                v-model.trim="form.taskType"
                class="input-one" size="mini" placeholder="请选择任务类型"
                show-word-limit maxlength="20"
            >
              <el-option
                  label="类型1"
                  :value="0"
              >
              </el-option>
              <el-option
                  label="类型2"
                  :value="1"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="任务内容" prop="content">
            <el-input type="textarea"
                      placeholder="请输入任务内容"
                      :autosize="{ minRows: 6}"
                      maxlength="275"
                      v-model="form.content" style="width: 610px;"
            ></el-input>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="工作周期" prop="workCycle">
            <el-input type="textarea"
                      placeholder="请输入工作周期"
                      :autosize="{ minRows: 2}"
                      maxlength="275"
                      v-model="form.workCycle" style="width: 610px;"
            ></el-input>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="工作地点" prop="workPlace">
            <el-input type="textarea"
                      placeholder="请输入工作地点"
                      :autosize="{ minRows: 2}"
                      maxlength="275"
                      v-model="form.workPlace" style="width: 610px;"
            ></el-input>
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

export default {
  name: "get-article-info",
  components: {LkEdit, LkBackList, LkGetButton, LkGetRow},
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
      form: {},
      isAdd: true,
      rules: {
        taskName: [{required: true, message: '请输入任务名称', trigger: 'blur'},],
        companyName: [{required: true, message: '请输入需求公司名称', trigger: 'blur'},],
        content: [{required: true, message: '请输入任务内容', trigger: 'blur'},],
        endTimestamp: [{required: true, message: '请选择截止时间', trigger: 'blur'},],
        taskType: [{required: true, message: '请输入任务类型', trigger: 'blur'},],
        phone: [{required: true, message: '请输入联系人电话', trigger: 'blur'},],
        budget: [{required: true, message: '请输入任务预算', trigger: 'blur'},],
      }
    }
  },
  methods: {
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          this.form.endTimestamp = new Date(this.form.endTimestamp).getTime()
          this.form.taskType = parseInt(this.form.taskType)
          let api = this.isAdd ? 'api_admin_task_task_create' : 'api_admin_task_task_change'
          this.request(api, this.form).then(res => {
            this.toast.success(this.isAdd ? '发布成功！' : '修改成功！')
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

</style>
