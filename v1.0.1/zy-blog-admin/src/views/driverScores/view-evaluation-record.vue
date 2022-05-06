<template>
  <section>
    <section class="driver-view-box">
      <section class="driver-info">
        <lk-view-row>
          <lk-view-item title="订单号" label-width="70">{{ form.outTradeNo }}</lk-view-item>
          <lk-view-item title="乘客号码" label-width="70">{{form.userTel?form.userTel:'无'}}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="驾驶员" label-width="70">{{ form.driverName }}</lk-view-item>
          <lk-view-item title="身份证号" label-width="70">{{form.idCard}}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="驾驶员号码" label-width="70">{{ form.driverTel }}</lk-view-item>
          <lk-view-item title="乘客打分" label-width="70">{{form.score}}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="标签" label-width="70">
            <div class="tagBox" v-if="form.items">
              <template v-for="item in form.items">
                <el-tag style="margin-right: 5px;margin-bottom: 5px"   v-if="item">{{ item }}</el-tag>
              </template>
            </div>
            <div v-else>暂无</div>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="评价内容" label-width="70">
            <lk-view-textarea :content="form.content"/>
          </lk-view-item>
        </lk-view-row>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  name: "view-evaluation-record",
  components: {},
  data(){
    return {
      form:{}
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
  mounted(){
    this.loadData(this.datas);
  },
  methods: {
    loadData(data) {
      this.form = data || {};
      this.form.items=this.form.items.split(',')
    }
  },
}
</script>

<style lang="scss" scoped>

  .driver-view-box {
    width: 100%;
    font-size: 16px;
    padding-left: 10px;
    .box-head {
      padding: 15px 0px;
      color: #000000;
      font-weight: bold;
    }
    .driver-info {
      //padding: 10px;
      //background-color: rgba(191, 190, 190, 0.1);
      border-radius: 8px;

    }
    .driver-chart {
      display: flex;
      flex-wrap: wrap;
      border-radius: 8px;
    }
    .show-section {
      width:calc(30% - 30px);
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
