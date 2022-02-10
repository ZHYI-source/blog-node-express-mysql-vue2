/**
*@author ZY
*@date 2022/2/9
*@Description:批量分派任务
*/
<template>
  <section>
    <section class="lk-add-pop" v-loading="loading.list" :element-loading-text="loading.text">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">
        <lk-get-row>
          <el-form-item label="任务ID">
            <el-input clearable v-model.trim="form.id" class="input-one" size="mini" disabled
                      placeholder="选择任务自动填充"
                      show-word-limit maxlength="50"
            />
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="任务名称">
            <el-input clearable v-model.trim="form.taskName" class="input-one" size="mini" disabled
                      placeholder="选择任务自动填充"
                      show-word-limit maxlength="50"
            />
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="需求公司" >
            <el-input clearable v-model.trim="form.companyName"
                      disabled
                      class="input-one" size="mini" placeholder="选择任务自动填充"
                      show-word-limit maxlength="50"
            />
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="截止时间" >
            <el-date-picker
              class="input-one"
              disabled
              v-model="form.endTimestamp"
              size="mini"
              type="datetime"
              placeholder="选择任务自动填充"
            >
            </el-date-picker>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="导入用工" prop="taskName">
            <el-upload
              :headers="uploadHeader"
              class="input-one"
              accept=".xlsx,.xls"
              :data="{id:form.id || ''}"
              :show-file-list="false"
              action="/zz-server/admin/task/order/import"
              :on-success="onSuccess"
              :on-progress="onProgress"
              :on-error="onError"
            >
              <el-button type="primary" plain size="mini" class="lk-btn" icon="el-icon-download">
                批量导入用工
              </el-button>
            </el-upload>
          </el-form-item>
        </lk-get-row>
        <el-alert
          style="margin-left: 80px;width: 455px"
          title="请以用工模板文件格式导入"
          close-text="知道了"
          type="warning">
        </el-alert>
        <el-divider/>
        <lk-get-button disSave @close="close(true)"/>
      </el-form>
    </section>
  </section>
</template>

<script>
import LkGetRow from "@/components/common/lk-get-row";
import LkGetButton from "@/components/common/lk-get-button";
import LkBackList from "@/components/common/lk-back-list";
import LkEdit from "@/components/common/lk-edit";
import {getToken} from "@/utils/auth";

export default {
  name: "get-assign-task",
  components: {LkEdit, LkBackList, LkGetButton, LkGetRow},
  props: {
    params: {
      type: Object,
      default() {
        return {};
      }
    },
    taskId: {
      type: [String, Number],
      default() {
        return undefined;
      }
    }
  },
  created() {
    this.form = this.params || {}
    this.reqParams = {id: this.params.id}
  },
  data() {
    return {
      form: {},
      //加载中效果
      loading: {
        text: '数据加载中',
        //获取列表数据中
        list: false,
        //行数据的id
        id: ''
      },
      reqParams: {},
      uploadHeader: {
        'x-access-token': getToken()
      },
      errorUrl: '',
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
    onSuccess(response, file, fileLile) {
      this.loading.list = false
      if (response.result === 0) {
        this.errorUrl = response.errFile;
        this.$message.error('导入失败，可以点击错误信息导出查看详情！');
        this.close()
      } else {
        this.$message({
          message: '导入成功',
          type: 'success'
        });
        this.close()
      }
    },
    onError(err, file, fileList) {
      this.loading.list = false
    },
    onProgress() {
      this.loading.text = '导入中，请稍后。。。'
      this.loading.list = true
    },
    save() {

    },
    close(show) {
      if (show) {
        this.toast.confirmSave().then(() => {
          this.$emit('close', {errorUrl: ''});
        });
      } else {
        this.$emit('close', {errorUrl: this.errorUrl || ''});
      }
    }
  }
}
</script>

<style scoped>

</style>
