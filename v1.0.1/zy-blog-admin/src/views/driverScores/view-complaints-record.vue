<template>
  <section>
    <section class="driver-view-box">
      <section class="driver-info">
        <lk-view-row>
          <lk-view-item title="驾驶员">{{form.driverName}}</lk-view-item>
          <lk-view-item title="身份证号">{{form.idCard}}</lk-view-item>

        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="所属机构">{{form.orgName}}</lk-view-item>
          <lk-view-item title="时间日期">{{ $tools.fmtLong2DateTime(Number(form.complaintTime))}}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
        <lk-view-item title="驾驶车号">{{ form.plateNo}}</lk-view-item>
          <lk-view-item title="投诉类型">
            {{form.responsibleDesc}}
          </lk-view-item>
      </lk-view-row>
        <lk-view-row>
          <lk-view-item title="被诉类型">
            <div class="tagBox">
              <el-tag class="tag" type="info" v-for="(item,index) in form.sort" :key="index">{{item}}</el-tag>
            </div>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="案件状态">
            <div class="tagBox">
              <el-tag type="danger" v-if="form.status === 0 || form.status === 1 || form.status === -1"> {{ form.statusDesc }} </el-tag>
              <!-- 待申诉-->
              <el-tag type="warning" v-if="form.status === 2"> {{ form.statusDesc }} </el-tag>
              <!-- 待处理-->
              <el-tag type="primary" v-if="form.status === 3"> {{ form.statusDesc }} </el-tag>
              <!-- 待结案-->
              <el-tag type="info" v-if="form.status === 4"> {{ form.statusDesc }} </el-tag>
              <!-- 已结案-->
              <el-tag type="success" v-if="form.status === 5"> {{ form.statusDesc }} </el-tag>
            </div>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="结案结论" >
            <lk-view-textarea :content="form.replyInfo?form.replyInfo:'无'"/>
          </lk-view-item>
        </lk-view-row>
      </section>

    </section>
  </section>
</template>

<script>
import LkViewRow from "@/components/common/lk-view-row";
import LkViewItem from "@/components/common/lk-view-item";
import CarChart from "@/views/max/components/CarChart";
import LkChart from "@/components/common/lk-chart";
import LkViewTextarea from "@/components/common/lk-view-textarea";
import LkViewDate from "@/components/common/lk-view-date";
export default {
  name: "view-complaints-record",
  components: {LkViewDate, LkViewTextarea, LkChart, CarChart, LkViewItem, LkViewRow},
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
  data(){
    return {
      form:{},
    }
  },
  methods: {
    loadData(data) {
        this.form = data || {};
        this.form.sort=this.form.sort.split(',')
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
        margin-bottom: 5px;
      }
    }

  }
  .tagBox {

    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-top: -5px;
  }
</style>
