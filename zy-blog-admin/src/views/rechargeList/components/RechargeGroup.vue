 <template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="9" :sm="9" :lg="4" class="card-panel-col">
      <div class="card-panel" style="position: relative">
        <div class="card-panel-description">
          <div class="card-panel-text">
            账户余额(元)
          </div>
          <count-to :start-val="0" :end-val="rechargeData.balanceDesc" :duration="1000" :decimals="2" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="9" :sm="9" :lg="4" class="card-panel-col">
      <div class="card-panel" style="position: relative">
        <div class="card-panel-description">
          <div class="card-panel-text" style="margin-left: -10% ">
            下一年度扣款(元)
          </div>
          <count-to :start-val="0" :end-val="rechargeData.deductionDesc" :duration="1000" :decimals="2" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="9" :sm="9" :lg="4" class="card-panel-col">
      <div class="card-panel" style="position: relative">
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ rechargeData.statusDesc }}(元)
          </div>
          <count-to :start-val="0" :end-val="rechargeData.statusAmtDesc" :duration="1000" :decimals="2" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="9" :sm="9" :lg="4" class="card-panel-col">
      <div class="card-panel" style="position: relative">
        <div class="card-panel-description">
          <div class="card-panel-text">
            绑定车辆(台)
          </div>
          <count-to :start-val="0" :end-val="rechargeData.bindingCountDesc" :duration="1000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="9" :sm="9" :lg="4" class="card-panel-col">
      <div class="card-panel" style="position: relative">
        <div class="card-panel-description">
          <div class="card-panel-text">
            未绑定车辆(台)
          </div>
          <count-to :start-val="0" :end-val="rechargeData.unboundCountDesc" :duration="1000" class="card-panel-num" />
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
      rechargeData: {
        statusDesc: '查询中',
        balanceDesc: 0,
        deductionDesc: 0,
        statusAmtDesc: 0,
        bindingCountDesc:0,
        unboundCountDesc: 0
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
      deep: true
    }
  },
  methods: {
    setOptions(data) {
      this.rechargeData.statusDesc = data.statusDesc ?  data.statusDesc : '查询中';
      this.rechargeData.balanceDesc = data.balanceDesc ?  parseFloat(data.balanceDesc): 0;
      this.rechargeData.deductionDesc = data.deductionDesc ?  parseFloat(data.deductionDesc) : 0;
      this.rechargeData.statusAmtDesc = data.statusAmtDesc ? parseFloat(data.statusAmtDesc) : 0;
      this.rechargeData.bindingCountDesc = data.bindingCountDesc ? parseFloat(data.bindingCountDesc) : 0;
      this.rechargeData.unboundCountDesc = data.unboundCountDesc ? parseFloat(data.unboundCountDesc) : 0;
      console.log(this.rechargeData);
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
      margin-left:30%;
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
