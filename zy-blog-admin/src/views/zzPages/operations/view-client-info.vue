/**
*@author ZY
*@date 2022/1/14
*@Description:客户详情
*/
<template>
  <section>
    <lk-view-header @back="$emit('close')" content="客户信息详情"/>
    <section class="view-box " style="width: 900px">
      <section class="employee-info">
        <el-row class="sec-title"><i class="el-icon-guide"></i> 基础信息</el-row>
        <lk-view-row>
          <lk-view-item title="客户名称" label-width="100">{{ form.comName }}</lk-view-item>
          <lk-view-item title="信用代码" label-width="100">{{ form.invoiceNo }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="客户行业" label-width="100">{{ form.industry }}</lk-view-item>
          <lk-view-item title="合作状态" label-width="100">{{ form.status ? '取消合作' : '合作中' }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="客户类型" label-width="100">{{ form.type || '无' }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="实际经营地址" label-width="100">
            <lk-view-textarea :content="form.actualAdd || '无'"/>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="注册地址" label-width="100">
            <lk-view-textarea :content="form.registerAdd || '无'"/>
          </lk-view-item>
        </lk-view-row>
        <el-row class="sec-title"><i class="el-icon-guide"></i>营业执照</el-row>
        <lk-view-row>
          <lk-view-item title="营业执照号" label-width="100">{{ form.licenseNo }}</lk-view-item>
          <lk-view-item title="三证合一" label-width="100">{{ form.isUnited ? '否' : '是' }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="营业期限" label-width="100">
            {{ form.termStart + ' - ' + form.termEnd }}
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="经营范围" label-width="100">
            <lk-view-textarea :content="form.range"/>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="营业执照片" label-width="100">
            <lk-img-list v-if="form.licenseUrl" :urls="[form.licenseUrl || '']"/>
            <span v-else>无</span>
          </lk-view-item>
        </lk-view-row>
        <el-row class="sec-title"><i class="el-icon-guide"></i>法人信息</el-row>
        <lk-view-row>
          <lk-view-item title="法人姓名" label-width="100">{{ form.legalName }}</lk-view-item>
          <lk-view-item title="证件号" label-width="100">{{ form.legalId }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="有效期" label-width="100">
            <lk-view-date :date="form.legalLimit"/>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="身份证正面" label-width="100">
            <lk-img-list v-if="form.cardFront" :urls="[form.cardFront || '']"/>
            <span v-else>无</span>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="身份证反面" label-width="100">
            <lk-img-list v-if="form.cardBack" :urls="[form.cardBack || '']"/>
            <span v-else>无</span>
          </lk-view-item>
        </lk-view-row>
        <el-row class="sec-title"><i class="el-icon-guide"></i>银行信息</el-row>
        <lk-view-row>
          <lk-view-item title="开户名称" label-width="100">{{ form.accountName }}</lk-view-item>
          <lk-view-item title="银行账号" label-width="100">{{ form.account }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="开户行" label-width="100">{{ form.bankName }}</lk-view-item>
          <lk-view-item title="账户类型" label-width="100">{{ form.accountType ? '一般用户' : '基本用户' }}</lk-view-item>
        </lk-view-row>
        <el-row class="sec-title"><i class="el-icon-guide"></i>开票信息</el-row>
        <lk-view-row>
          <lk-view-item title="纳税人类型" label-width="100">{{ form.taxpayerType ? '小规模纳税人' : '一般纳税人' }}</lk-view-item>
          <lk-view-item title="发票税号" label-width="100">{{ form.invoiceNo }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="注册电话" label-width="100">{{ form.taxpayerTel }}</lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="地址" label-width="100">
            <lk-view-textarea :content="form.taxpayerAdd || '无'"/>
          </lk-view-item>
        </lk-view-row>
        <el-row class="sec-title"><i class="el-icon-guide"></i>其他材料</el-row>
        <lk-view-row>
          <lk-view-item title="" label-width="100">
            <lk-img-list v-if="imgs" :urls="imgs"/>
            <span v-else>无</span>
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
  name: "view-client-info",
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
    // console.log(this.datas)
    this.loadData(this.datas);
  },
  methods: {
    loadData(data) {
      this.imgs = data.otherUrl && data.otherUrl.split(',')
      this.form = data || {};
      this.form.termStart = data.termStart ? Tools.fmtLong2DateTime(Number(data.termStart), 'yyyy/MM/dd') : '未知'
      this.form.termEnd = data.termEnd ? Tools.fmtLong2DateTime(Number(data.termEnd), 'yyyy/MM/dd') : '长期'
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
