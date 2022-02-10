<template>
  <section>
    <section class="task-view-box">
      <section class="task-info">
        <lk-view-row>
          <lk-view-item title="任务名称" label-width="70">{{ form.taskName }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="任务ID" label-width="70">{{ form.taskId }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="任务报酬" label-width="70">{{ form.tradeAmt + '元' }}</lk-view-item>
          <lk-view-item title="需求公司" label-width="70">{{ form.companyName }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="用户姓名" label-width="70">
            <span :class="{'blue':form.taskStatus==2}">{{ form.workerName }}</span>
          </lk-view-item>
          <lk-view-item title="用户手机" label-width="70">
            <span :class="{'blue':form.taskStatus==2}">{{ form.workerPhone }}</span>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="身份证号"
                        label-width="70"
          >
            <span :class="{'blue':form.taskStatus==2}">{{ form.idCard }}</span>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="任务状态" label-width="70">
            <!-- 被驳回-->
            <el-tag type="danger" v-if="form.taskStatus == 9"> 被驳回</el-tag>
            <!-- 被拒绝-->
            <el-tag type="danger" v-if="form.taskStatus == 8"> 被拒绝</el-tag>
            <!-- 待申诉-->
            <el-tag type="warning" v-if="form.taskStatus === 0"> 新发布</el-tag>
            <!-- 待处理-->
            <el-tag type="primary" v-if="form.taskStatus === 1"> 待接单</el-tag>
            <!-- 待结案-->
            <el-tag type="info" v-if="form.taskStatus === 2"> 已提交</el-tag>
            <!-- 已结案-->
            <el-tag type="success" v-if="form.taskStatus === 3"> 已完工</el-tag>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="发起时间" label-width="70">
            <lk-view-date :date="form.startTimestamp"/>
          </lk-view-item>
          <lk-view-item title="截止时间" label-width="70">
            <lk-view-date :class="{'blue':form.taskStatus === 2}" :date="form.endTimestamp"/>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <!--分派时间不在新发布出现-->
          <lk-view-item title="分派时间" label-width="70">
            <lk-view-date :date="form.insertTimestamp"/>
          </lk-view-item>
          <!--完成时间只是在完工后出现-->
          <lk-view-item title="完成时间" label-width="70" v-if="form.taskStatus === 3">
            <lk-view-date :class="{'blue':form.taskStatus === 3}" :date="form.updateTimestamp"/>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row v-if="form.taskStatus >1&&form.taskStatus <4">
          <lk-view-item title="完工凭证" label-width="70" >
            <lk-img-list :urls="form.imgList"/>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="工作周期" label-width="70">
            <lk-view-textarea :content="form.workCycle||'无'"/>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="工作地点" label-width="70">
            <lk-view-textarea :content="form.workPlace||'无'"/>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="任务内容" label-width="70">
            <lk-view-textarea :content="form.content||'无'"/>
          </lk-view-item>
        </lk-view-row>
        <!--        <lk-view-row>-->
        <!--          <lk-view-item title="用户协议" label-width="70" v-if="form.taskStatus === 2">-->
        <!--            <a class="concat-link" target="_blank"-->
        <!--               href="http://www.pwithe.com/Public/Upload/download/20170211/589ebf8e5bb13.pdf"-->
        <!--            >-->
        <!--              <i class="el-icon-s-order"></i> 协议文件-->
        <!--            </a>-->
        <!--            <i class="el-icon-circle-check"></i>-->
        <!--          </lk-view-item>-->
        <!--        </lk-view-row>-->
        <!--已完工就取消操作-->
        <lk-view-row v-if="form.taskStatus < 3">
          <div class="view-btns">
            <!--已结单-->
            <div v-if="form.taskStatus === 1"><i class="el-icon-s-opportunity"></i>等待用户操作...</div>
            <!--已提交-->
            <template v-if="form.taskStatus == 2">
              <el-button size="small" type="primary"
                         @click="getVerified"
              >审核通过
              </el-button>
              <el-button size="small" type="danger"
                         @click="getReject"
              >回退
              </el-button>
            </template>

          </div>
        </lk-view-row>
      </section>
    </section>
  </section>
</template>

<script>
import LkImgList from "@/components/common/lk-img-list";
import Tools from "@/libs/tool";

export default {
  name: "view-order-info",
  components: {LkImgList},
  data() {
    return {
      urls: [],
      phoneError: false,//电话输入框的红色边框
      form: {}
    }
  },
  props: {
    datas: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  created() {
    this.loadData(this.datas);
  },
  mounted() {
    this.loadData(this.datas);
  },
  methods: {
    loadData(data) {

      this.form = data || {};

    },

    //审核通过
    getVerified() {
      let p = {
        id: this.form.id
      }
      this.request('api_admin_task_order_deal', p).then(res => {
        this.$message({
          message: '审核通过！',
          type: 'success'
        });
        this.$emit('close')
      }).catch(err => {
        console.log(err)
      })

    },
    //驳回操作
    getReject() {
      let p = {
        id: this.form.id
      }
      this.request('api_admin_task_order_back', p).then(res => {
        this.$message({
          message: '驳回成功！',
          type: 'success'
        });
        this.$emit('close')
      }).catch(err => {
        console.log(err)
      })

    }
  },
}
</script>

<style lang="scss" scoped>

.task-view-box {
  width: 100%;
  font-size: 16px;
  padding-left: 10px;

  .box-head {
    padding: 15px 0px;
    color: #000000;
    font-weight: bold;
  }

  .task-info {
    padding-top: 10px;
    //background-color: rgba(191, 190, 190, 0.1);
    border-radius: 8px;

  }

  .task-chart {
    display: flex;
    flex-wrap: wrap;
    border-radius: 8px;
  }

  .show-section {
    width: calc(30% - 30px);
    min-width: 450px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 15px;
    border-radius: 8px;
  }

  .icon-bangzhu {
    font-size: 14px;
    cursor: pointer;

    &:hover {
      color: #1890FF;
    }
  }

  .icon-weibiaoti-_huabanfuben {
    color: #FCDC00;
    font-size: 14px;
  }

  .tagBox {
    display: flex;

    .tag {
      margin-right: 5px;
    }
  }

}

.tagBox {
  max-width: 550px;
  margin-top: -5px;
  display: flex;
  flex-wrap: wrap;
}

//强调字体颜色
.blue {
  color: #1890FF;
}
//强调字体颜色
.red {
  color: #ea4860;
}

.concat-link {
  color: rgba(24, 144, 255, 0.75);

  &:hover {
    color: #1890FF;
  }
}

.el-icon-circle-check {
  color: green;
}

.view-btns {
  margin-top: 10px;
  display: flex;
  width: 100%;
  border-top: 1px solid #eee;
  padding: 25px 0px;
  padding-left: 100px;

  .el-icon-s-opportunity {
    color: orange;
    margin-right: 5px;
  }
}

.inputError {
  border-color: red;
}
</style>
