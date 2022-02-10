 <template>
  <el-row :gutter="20" class="panel-group">
    <el-col :xs="4" :sm="4" :lg="4" class="card-panel-col">
      <div class="card-panel" style="position: relative">
        <div class="card-panel-description">
          <div class="card-panel-text">
            司机税号总数
          </div>
          <count-to :start-val="0" :end-val="invoiceData.invoiceNoNum" :duration="1000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="4" :sm="4" :lg="4" class="card-panel-col">
      <div class="card-panel" style="position: relative">
        <div class="card-panel-description">
          <div class="card-panel-text">
            发票总数
          </div>
          <count-to :start-val="0" :end-val="invoiceData.invoiceTotalNum" :duration="1000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="4" :sm="4" :lg="4" class="card-panel-col">
      <div class="card-panel" style="position: relative">
        <div class="card-panel-description">
          <div class="card-panel-text">
            发票总金额
          </div>
          <count-to :start-val="0" :end-val="invoiceData.totalAmt" :duration="1000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="4" :sm="4" :lg="4" class="card-panel-col">
      <div class="card-panel" style="position: relative">
        <div class="card-panel-description">
          <div class="card-panel-text">
            企业发票总数
          </div>
          <count-to :start-val="0" :end-val="invoiceData.orgInvoiceNum" :duration="1000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="4" :sm="4" :lg="4" class="card-panel-col">
      <div class="card-panel" style="position: relative">
        <div class="card-panel-description">
          <div class="card-panel-text">
            个人发票总数
          </div>
          <count-to :start-val="0" :end-val="invoiceData.personInvoiceNum" :duration="1000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      tempSize:0,
      queryReport: {
        current: 1,
        params: {
          orgId: '',
          orgName: ''
        }
      },
      invoiceData: {
        invoiceNoNum: 0,
        invoiceTotalNum: 0,
        totalAmt: 0,
        orgInvoiceNum: 0,
        personInvoiceNum: 0
      }
    }
  },
  props: {
    props: ['groupData']
  },
  watch: {
    groupData: {
      handler: function (val) {
        this.setOptions(val)
      },
      //对象内部的属性监听，也叫深度监听
      deep: true
    }
  },
  mounted(){
    this.queryReport.params.orgId = this.$store.getters.orgId
    this.request('api_admin_carReport', this.queryReport).then((res) => {
      this.tempSize = res.invoice.invoiceTotalCount
    }).catch((error) => {
    });
  },
  methods: {

    setOptions(data) {
      this.invoiceData.invoiceNoNum = data.invoiceNoNum ?  parseFloat(data.invoiceNoNum) : 0;
      this.invoiceData.invoiceTotalNum = data.invoiceTotalNum ?  parseFloat(data.invoiceTotalNum) : 0;
      this.invoiceData.totalAmt = data.totalAmt ? parseFloat(data.totalAmt) : 0;
      this.invoiceData.orgInvoiceNum = data.orgInvoiceNum ? parseFloat(data.orgInvoiceNum) : 0;
      this.invoiceData.personInvoiceNum = data.personInvoiceNum ? parseFloat(data.personInvoiceNum) : 0;
      console.log(this.invoiceData);
    },
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      font-weight: bold;
      margin-left:20%;
      margin-top: 30px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
