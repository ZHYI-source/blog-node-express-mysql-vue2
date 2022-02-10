<template>
  <section>
    <lk-view-header @back="$emit('close')" content="添加用工信息"/>

    <section class="lk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">
        <lk-get-row>
          <el-form-item label="选择任务" prop="taskForm.id">
            <el-button style="margin-left: 10px" type="primary" size="mini" icon="el-icon-plus" @click="getTask"
                       :disabled="isUpdateData"
            >选择任务
            </el-button>
          </el-form-item>
        </lk-get-row>
        <template v-if="form.taskForm.id">
          <lk-get-row>
            <el-form-item label="任务ID">
              <el-input clearable v-model.trim="form.taskForm.id" class="input-one" size="mini" disabled
                        placeholder="选择任务自动填充"
                        show-word-limit maxlength="50"
              />
            </el-form-item>
            <el-form-item label="任务名称" prop="taskName">
              <el-input clearable v-model.trim="form.taskForm.taskName" disabled class="input-one" size="mini"
                        placeholder="选择任务自动填充"
                        show-word-limit maxlength="50"
              />
            </el-form-item>
          </lk-get-row>
          <lk-get-row>
            <el-form-item label="需求公司" prop="companyName">
              <el-input clearable v-model.trim="form.taskForm.companyName"
                        disabled
                        class="input-one" size="mini" placeholder="选择任务自动填充"
                        show-word-limit maxlength="50"
              />
            </el-form-item>
            <el-form-item label="截止时间" prop="endTimestamp">
              <el-date-picker
                class="input-one"
                disabled
                v-model="form.taskForm.endTimestamp"
                size="mini"
                type="datetime"
                placeholder="选择任务自动填充"
              >
              </el-date-picker>
            </el-form-item>
          </lk-get-row>
          <lk-get-row>
            <el-form-item label="联系人电话" prop="phone">
              <el-input clearable v-model.trim="form.taskForm.phone"
                        disabled
                        class="input-one" size="mini" placeholder="选择任务自动填充"
                        show-word-limit maxlength="50"
              />
            </el-form-item>
            <el-form-item label="任务类型" prop="taskType">
              <el-select
                clearable
                disabled
                style="padding-top: 3px"
                v-model.trim="form.taskForm.taskType"
                class="input-one" size="mini" placeholder="选择任务自动填充"
                show-word-limit maxlength="20"
              >
                <el-option label="类型2" :value="1"></el-option>
                <el-option label="类型1" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </lk-get-row>
          <lk-get-row>
            <el-form-item label="工作周期" prop="workCycle">
              <el-input type="textarea"
                        disabled
                        :autosize="{ minRows: 2}"
                        maxlength="275"
                        v-model="form.taskForm.workCycle || '无'" style="width: 610px;"
              ></el-input>
            </el-form-item>
          </lk-get-row>
          <lk-get-row>
            <el-form-item label="工作地点" prop="workPlace">
              <el-input type="textarea"
                        disabled
                        :autosize="{ minRows: 2}"
                        maxlength="275"
                        v-model="form.taskForm.workPlace || '无'" style="width: 610px;"
              ></el-input>
            </el-form-item>
          </lk-get-row>
          <lk-get-row>
            <el-form-item label="任务内容" prop="content">
              <!--<lk-edit v-model="form.content"/>-->
              <el-input type="textarea"
                        :autosize="{minRows: 3}"
                        disabled
                        placeholder="请输入任务内容"
                        v-model="form.taskForm.content" style="width: 610px"
              ></el-input>
            </el-form-item>
          </lk-get-row>
        </template>
        <lk-get-row>
          <el-form-item label="选择用户" prop="employeeIdcard">
            <el-button style="margin-left: 8px" type="primary" size="mini" :disabled="isUpdateData"
                       icon="el-icon-plus" @click="getWorker"
            >
              选择用户
            </el-button>
          </el-form-item>
        </lk-get-row>
        <lk-get-row v-if="form.employeeFormArr&&form.employeeFormArr.length">
          <div class="employee-table">
            <lk-el-table :datas="form.employeeFormArr"
                         :key="updataKey"
                         stripe
                         max-height="355"
            >
              <template v-for="field in fields" v-if="field.show">
                <el-table-column v-if="field.key=='checkBox'" :align="field.align" type="selection"></el-table-column>
                <el-table-column v-else-if="field.key=='toolButton'" :align="field.align" :label="field.name"
                                 :width="field.width" :fixed="field.fixed"
                >
                  <template slot-scope="scope">
                    <lk-tool-button
                      dis-edit
                      dis-view
                      :dis-delete="isUpdateData"
                      @delete="goDelete(scope.$index)"
                    >
                    </lk-tool-button>
                  </template>
                </el-table-column>
                <el-table-column v-else-if="field.key=='force'" :align="field.align" :label="field.name"
                                 :width="field.width" :fixed="field.fixed"
                >
                  <template slot-scope="scope">
                    <div class="budget-input">
                      <el-switch
                        v-model="scope.row.force"
                        :disabled="isUpdateData"
                        active-text="是"
                        inactive-text="否"
                        active-color="#13ce66"
                        inactive-color="#EAECF0"
                      >
                      </el-switch>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column v-else-if="field.key=='budget'" :align="field.align" :label="field.name"
                                 :width="field.width" :fixed="field.fixed"
                >
                  <template slot-scope="scope">
                    <div class="budget-input">
                      <el-input clearable
                                v-model.trim="scope.row.budget"
                                size="mini" placeholder="请输入任务报酬"
                                show-word-limit maxlength="20"
                      >
                        <template slot="append">元</template>
                      </el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  v-else
                  show-overflow-tooltip
                  :align="field.align"
                  :prop="field.key"
                  :label="field.name"
                  :width="field.width"
                  :sortable="field.enableSort?'custom':false"
                  :fixed="field.fixed"
                ></el-table-column>
              </template>
            </lk-el-table>
          </div>
        </lk-get-row>
        <el-divider/>
        <lk-get-button :saveText="isUpdateData?'修改':'分派'" @save="save" @close="close(true)"/>
      </el-form>
    </section>
  </section>
</template>

<script>
import LkGetRow from "@/components/common/lk-get-row";
import LkGetButton from "@/components/common/lk-get-button";
import LkBackList from "@/components/common/lk-back-list";
import LkEdit from "@/components/common/lk-edit";
import DirEmployeeInfo from "@/views/zzPages/operations/dir-employee-info";
import DirTaskInfo from "@/views/zzPages/task/dir-task-info";
import DirSelectTaskInfo from "@/views/zzPages/task/dir-select-task-info";
import DirSelectEmployeeInfo from "@/views/zzPages/task/dir-select-employee-info";

export default {
  name: "get-order-info",
  components: {
    DirSelectEmployeeInfo,
    DirSelectTaskInfo,
    DirTaskInfo,
    DirEmployeeInfo,
    LkEdit,
    LkBackList,
    LkGetButton,
    LkGetRow
  },
  props: {
    updateData: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  data() {
    return {
      updataKey: 0,
      isUpdateData: false,
      form: {
        employeeFormArr: [],
        taskForm: {},
        employeeIdcard: ''
      },
      //列表渲染数据列
      fields: [
        {key: 'idCard', name: '身份证号', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'workerName', name: '用户姓名', show: true, width: '130', enableSort: false, align: "center", fixed: false},
        {key: 'phone', name: '用户手机号', show: true, width: '130', enableSort: false, align: "center", fixed: false},
        // {key: 'force', name: '是否强制接单', show: true, width: '130', enableSort: false, align: "center", fixed: false},
        {key: 'budget', name: '任务报酬', show: true, width: '255', enableSort: false, align: "center", fixed: false},
        {key: 'toolButton', name: '操作', show: true, width: '80', enableSort: false, align: "center", fixed: 'right'},
      ],
      rules: {
        'taskForm.id': [{required: true, message: '请选择任务', trigger: 'blur'},],
        'employeeIdcard': [{required: true, message: '请选择用户', trigger: 'blur'},],
      }
    }
  },
  created() {
    this.getData(this.updateData)
  },
  methods: {
    getData(data) {
      //数据回填
      if (data && data.id) {
        this.isUpdateData = true
        this.form.taskForm.id = data.taskId || '' //任务ID
        this.form.taskForm.taskName = data.taskName || ''
        this.form.taskForm.budget = data.budget || ''
        this.form.taskForm.companyName = data.companyName || ''
        this.form.taskForm.endTimestamp = data.endTimestamp || ''
        this.form.taskForm.phone = data.phone || ''
        this.form.taskForm.taskType = data.taskType || ''
        this.form.taskForm.content = data.content || ''
        this.form.taskForm.workCycle = data.workCycle || ''
        this.form.taskForm.workPlace = data.workPlace || ''
        this.form.employeeIdcard = data.idCard
        let obj = {
          idCard: data.idCard || '',//用户身份证
          phone: data.workerPhone || '',
          force: data.isForce == 1 ? true : false,
          budget: data.tradeAmt || '',
          workerName: data.workerName || '',
        }
        this.form.employeeFormArr.push(obj)
      } else {
        this.form.taskForm = {}
        this.form.employeeFormArr = []
      }
    },
    //删除用户
    goDelete(idx) {
      this.form.employeeFormArr.splice(idx, 1)
    },
    //选择任务
    getTask() {
      this.toast.showSmallModal('选择任务', DirSelectTaskInfo, {}, data => {
        this.form.taskForm = data || {}
        console.log(data)
        this.updataKey += 1
      })
    },
    //数组对象去重
    unique(arr, key) {
      let map = new Map();
      for (let item of arr) {
        if (!map.has(item[key])) {
          map.set(item[key], item);
        }
      }
      return [...map.values()];
    },
    //选择用户
    getWorker() {
      this.toast.showSmallModal('选择用户', DirSelectEmployeeInfo, {employeeData: this.form.employeeFormArr}, data => {
        this.updataKey += 1
        if (data && data.length) {
          this.form.employeeIdcard = data[0].idCard
          for (const datum of data) {
            //暂存一下
            this.form.employeeFormArr.push(datum)
          }
          this.form.employeeFormArr = this.unique(this.form.employeeFormArr, "idCard")
        }
      })
    }
    ,
//保存
    save() {
      let that = this
      this.$refs['formAdd'].validate((valid) => {
        let p = {}
        if (valid) {
          if (that.updateData.id) {
            for (const that1 of that.form.employeeFormArr) {
              if (!that1.budget) {
                this.$message({
                  message: `用户${that1.workerName}还没输入任务报酬！`,
                  type: 'warning'
                });
                return
              }
              p = {
                id: that.updateData.id,
                // force: that1.force ? 1 : 2, // 1强制 2不强制
                force: 1, // 1强制 2不强制
                idCard: that1.idCard || '',
                taskId: that.updateData.taskId || '',
                tradeAmt: that1.budget || 0
              }
            }
          } else {
            p.records = []
            for (const that1 of that.form.employeeFormArr) {
              if (!that1.budget) {
                this.$message({
                  message: `用户${that1.workerName}还没输入任务报酬！`,
                  type: 'warning'
                });
                return
              }
              let obj = {
                // force: that1.force ? 1 : 2, // 1强制 2不强制
                force: 1, // 1强制 2不强制
                idCard: that1.idCard || '',
                taskId: that.form.taskForm.id || '',
                tradeAmt: that1.budget || 0
              }
              p.records.push(obj)
            }
          }
          let url = that.updateData && that.updateData.id ? 'api_admin_task_order_change' : 'api_admin_task_order_create'
          this.request(url, p).then(res => {
            this.toast.success(that.updateData && that.updateData.id ? '修改成功' : '分派成功！')
            this.$emit('close');
          }).catch(err => {
            console.log(err)
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
    ,
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

<style lang="scss" scoped>
.employee-table {
  width: 900px;
  padding-left: 100px;

}
</style>
