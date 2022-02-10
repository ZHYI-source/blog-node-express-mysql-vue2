<template>
  <section>
    <section class="view-box">
      <section class="employee-info">
        <lk-view-row>
          <lk-view-item title="用户姓名" label-width="70">{{ form.workerName }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="身份证号" label-width="70">{{ form.idCard ? form.idCard : '无' }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="用户手机号" label-width="70">{{ form.phone }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="银行卡号" label-width="70">{{ form.account || '暂无' }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="银行名称" label-width="70">{{ form.bankName || '暂无' }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="是否实名" label-width="70">
            <el-tag class="tags" type="danger" v-if="form.isReal == 0">否</el-tag>
            <el-tag class="tags" type="success" v-if="form.isReal == 1">是</el-tag>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="是否签约" label-width="70">
            <el-tag class="tags" type="danger" v-if="form.isSign == 0">否</el-tag>
            <el-tag class="tags" type="success" v-if="form.isSign == 1">是</el-tag>
          </lk-view-item>
        </lk-view-row>

        <lk-view-row>
          <lk-view-item title="用户籍贯" label-width="70">{{ form.nativePlace || '暂无' }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="居住地址" label-width="70">{{ form.address || '暂无' }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="插入时间" label-width="70">
            <lk-view-date :date="form.insertTimestamp"/>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="身份证照片" label-width="70">
            <el-image
              v-if="form.headImg"
              style="width: 80px; height:70px"
              :src="form.headImg"
              :preview-src-list="[form.headImg || '']"
              >
            </el-image>
            <span v-else>无</span>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="合同信息" label-width="70" :key="keyi">
            <div class="contract-box" v-if="form.conData">
              <div class="box-item" v-for="item in form.conData" :key="item.id">
                <a :href="item.url" target="_blank">{{ "《" + item.title + "》" }}</a>
                <span
                  :style="{
                  backgroundColor:item.status==0?
                  '#F56C6C':item.status==1?
                  '#E6A23C':item.status==2?
                  '#67C23A':item.status==3?
                  '#909399':'#409EFF'}"
                >{{
                    item.status == 0 ?
                      '未签约' : item.status == 1 ?
                      '已签约' : item.status == 2 ?
                        '已盖章' : item.status == 3 ?
                          '已归档' : ''
                  }}</span>
              </div>
            </div>
            <div v-else>暂无</div>
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
  name: "view-employee-info",
  components: {LkImgList},
  data() {
    return {
      keyi: 0,
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
      form: {
        conData: []
      },
      imgs: [],

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
  mounted() {
    this.loadData(this.datas);
  },
  created() {
    this.loadData(this.datas);
  },
  methods: {
    loadData(data) {
      console.log(data)
      this.form = data || {};
      this.query.params.idCard = data.idCard
      this.request('api_admin_contract_list', this.query).then(res => {
        this.keyi += 1
        this.form.conData = res.records || []
      })
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

.contract-box {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .box-item {
    border: 1px solid #eee;
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 10px;

    a {
      color: #3A71A8;

      &:hover {
        color: #0a76a4;
      }
    }

    span {
      font-size: 12px;
      padding: 1px 10px;
      line-height: 24px;
      margin-left: 10px;
      background-color: #99d6e8;
      border-radius: 2px;
      color: #fff;
    }
  }


}
</style>
