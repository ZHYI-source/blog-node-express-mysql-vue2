<template>
  <section>
    <lk-view-header @back="$emit('close')" content="用户信息详情"/>
    <section class="view-box " style="width: 900px">
      <section class="employee-info">
        <el-row class="sec-title"><i class="el-icon-guide"></i> 基础信息</el-row>
        <lk-view-row>
          <lk-view-item title="用户名称" label-width="100">{{ form.username }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="客户名称" label-width="100">{{ form.password }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="插入时间" label-width="100">
            <lk-view-date :date="form.insertTime"/>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="修改日期" label-width="100">
            <lk-view-date :date="form.updateTime"/>
          </lk-view-item>
        </lk-view-row>
      </section>
    </section>
  </section>
</template>

<script>
import Tools from "@/libs/tool";
import LkImgList from "@/components/common/lk-img-list";

export default {
  name: "view-user-info",
  components: {LkImgList},
  data() {
    return {
      form: {
        licenseUrl: ''
      },
      imgs: []
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
    .sec-title {
      font-weight: 600;
      font-size: 15px;
      padding: 5px 0px;
      border-bottom: 1px solid #eee;
    }

    .sec-title-two {
      color: #a0a0a0;
    }
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
