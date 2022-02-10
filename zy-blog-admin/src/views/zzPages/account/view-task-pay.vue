/**
*@author ZY
*@date 2022/1/14
*@Description:任务付款详情
*/
<template>
  <section>
    <section class="view-box ">
      <section class="employee-info">
        <lk-view-row>
          <lk-view-item title="业务流水号" label-width="100">暂无</lk-view-item>
          <lk-view-item title="持卡人姓名" label-width="100">暂无</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="身份证号" label-width="100">{{ form.idCard ? form.idCard : '无' }}</lk-view-item>
          <lk-view-item title="银行卡号" label-width="100">{{ form.idCard ? form.idCard : '无' }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="创建时间" label-width="100">暂无</lk-view-item>
          <lk-view-item title="完成时间" label-width="100">暂无</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="交易状态" label-width="100">-</lk-view-item>
          <lk-view-item title="任务ID" label-width="100">暂无</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="任务名称" label-width="100">暂无</lk-view-item>
          <lk-view-item title="任务类型" label-width="100">暂无</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="任务内容" label-width="100">暂无</lk-view-item>
          <lk-view-item title="税前金额" label-width="100">暂无</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="个人所得税" label-width="100">暂无</lk-view-item>
          <lk-view-item title="税后金额" label-width="100">暂无</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="支付状态" label-width="100">暂无</lk-view-item>
          <lk-view-item title="插入时间" label-width="100">暂无</lk-view-item>
        </lk-view-row>

      </section>
    </section>
  </section>
</template>

<script>
import Tools from "@/libs/tool";
import LkImgList from "@/components/common/lk-img-list";

export default {
  name: "view-task-pay",
  components: {LkImgList},
  data() {
    return {
      form: {},
      imgs: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
      ]
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
    }
  },
}
</script>

<style lang="scss" scoped>

.view-box {
  width: 100%;
  font-size: 16px;
  padding-left: 10px;

  .box-head {
    padding: 15px 0px;
    color: #000000;
    font-weight: bold;
  }

  .employee-info {
    padding-top: 10px;
    //background-color: rgba(191, 190, 190, 0.1);
  }

  .driver-chart {
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
</style>
