<template>
  <section>
    <section class="view-box">
      <section class="employee-info">
        <lk-view-row>
          <lk-view-item title="用户姓名" label-width="70">{{ form.workerName }}</lk-view-item>
          <lk-view-item title="身份证号" label-width="70">{{ form.idCard ? form.idCard : '无' }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="用户手机号" label-width="70">{{ form.phone }}</lk-view-item>
          <lk-view-item title="银行卡号" label-width="70">{{ form.account || '暂无' }}</lk-view-item>
        </lk-view-row>
<!--        <lk-view-row>-->
<!--          <lk-view-item title="是否实名" label-width="70">-->
<!--            <el-tag class="tags" type="danger" v-if="form.isReal == 0">否</el-tag>-->
<!--            <el-tag class="tags" type="success" v-if="form.isReal == 1">是</el-tag>-->
<!--          </lk-view-item>-->
<!--          <lk-view-item title="是否签约" label-width="70">-->
<!--            <el-tag class="tags" type="danger" v-if="form.isSign == 0">否</el-tag>-->
<!--            <el-tag class="tags" type="success" v-if="form.isSign == 1">是</el-tag>-->
<!--          </lk-view-item>-->
<!--        </lk-view-row>-->
        <lk-view-row>
          <lk-view-item title="合同状态" label-width="70">
            <el-tag class="tags" type="danger" v-if="form.status == 0">未签署</el-tag>
            <el-tag class="tags" type="warning" v-if="form.status == 1">已签署</el-tag>
            <el-tag class="tags" type="success" v-if="form.status == 2">已盖章</el-tag>
            <el-tag class="tags" type="info" v-if="form.status == 3">已归档</el-tag>
          </lk-view-item>

        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="插入时间" label-width="70">
            <lk-view-date :date="form.insertTimestamp"/>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="合同信息" label-width="70">
            <a style="color: #1890FF" :href="form.url" target="_blank">{{ form.title }}</a>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row v-if="form.status!=0&&form.status!=3">
          <div class="view-btns">
            <!--已提交-->
            <template>
              <el-button v-if="form.status==1" size="small" icon="el-icon-s-check" type="primary"
                         @click="goSeal"
              >合同盖章
              </el-button>
              <el-button size="small" v-if="form.status==2" icon="el-icon-s-claim" type="danger"
                         @click="goFiling"
              >合同归档
              </el-button>
            </template>
          </div>
        </lk-view-row>
      </section>
    </section>
  </section>
</template>

<script>
import Tools from "@/libs/tool";
import LkImgList from "@/components/common/lk-img-list";


export default {
  name: "view-contract-info",
  components: {LkImgList},
  data() {
    return {
      form: {},
      goUrl: '',
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
      this.getOptUrl(data)
    },
    getOptUrl(data) {
      this.request('api_admin_contract_seal', {contractId: data.id}).then(res => {
        this.goUrl = res.url
      })
    },
    goSeal() {
      this.toast.confirm('是否前往盖章？').then(res => {
        window.open(this.goUrl, '_blank')
        this.$emit('close')
      }).catch(err => {
        console.log(err)
      })
    },
    goFiling() {
      let that = this
      this.request('api_admin_contract_filing', {contractId: this.form.id}).then(res => {
        that.toast.success('归档成功！')
        this.$emit('close')
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

.view-btns {
  width: 100%;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
}
</style>
