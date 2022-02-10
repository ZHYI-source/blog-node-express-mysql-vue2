<template>
  <section>
    <section class="task-view-box">
      <section class="task-info">
        <lk-view-row>
          <lk-view-item title="任务ID" label-width="70">{{ form.id }}</lk-view-item>
          <lk-view-item title="任务名称" label-width="70">{{ form.taskName }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="任务类型" label-width="70">{{ form.taskType == 0 ? '类型1' : '类型2' }}</lk-view-item>
          <lk-view-item title="联系人号码" label-width="70">{{ form.phone }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <!--          <lk-view-item title="任务预算" label-width="70">{{ form.budget + ' 元'}}</lk-view-item>-->
          <lk-view-item title="需求公司" label-width="70">{{ form.companyName }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="发起时间" label-width="70">
            <lk-view-date :date="form.startTimestamp"/>
          </lk-view-item>
          <lk-view-item title="截止时间" label-width="70">
            <lk-view-date :date="form.endTimestamp"/>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="更新时间" label-width="70">
            <lk-view-date :date="form.updateTimestamp"/>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="工作周期" label-width="70">
            <lk-view-textarea :content="form.workCycle|| '无'"/>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="工作地点" label-width="70">
            <lk-view-textarea :content="form.workPlace || '无'"/>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="任务内容" label-width="70">
            <lk-view-textarea :content="form.content"/>
          </lk-view-item>
        </lk-view-row>
      </section>
    </section>
  </section>
</template>

<script>
/**
 *@author ZY
 *@date 2021/12/9
 *@Description:任务详情
 */
export default {
  name: "view-task-info",
  data() {
    return {
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
  methods: {
    loadData(data) {
      this.form = data || {};
    },
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
