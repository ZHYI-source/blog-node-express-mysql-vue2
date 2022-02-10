 <template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="9" :sm="9" :lg="4" class="card-panel-col">
      <div class="card-panel" style="position: relative">
        <div class="card-panel-description">
          <div class="card-panel-text">
            未结案
          </div>
          <count-to :start-val="0" :end-val="complaintData.openCaseNum" :duration="1000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="9" :sm="9" :lg="4" class="card-panel-col">
      <div class="card-panel" style="position: relative">
        <div class="card-panel-description">
          <div class="card-panel-text">
            无责投诉
          </div>
          <count-to :start-val="0" :end-val="complaintData.notResponsibleNum" :duration="1000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="9" :sm="9" :lg="4" class="card-panel-col">
      <div class="card-panel" style="position: relative">
        <div class="card-panel-description">
          <div class="card-panel-text">
            有责投诉
          </div>
          <count-to :start-val="0" :end-val="complaintData.responsibleNum" :duration="1000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="9" :sm="9" :lg="4" class="card-panel-col">
      <div class="card-panel" style="position: relative">
        <div class="card-panel-description">
          <div class="card-panel-text">
            非投诉
          </div>
          <count-to :start-val="0" :end-val="complaintData.notComplaintNum" :duration="1000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="9" :sm="9" :lg="4" class="card-panel-col">
      <div class="card-panel" style="position: relative">
        <div class="card-panel-description">
          <div class="card-panel-text">
            待查案件
          </div>
          <count-to :start-val="0" :end-val="complaintData.investigatedNum" :duration="1000" class="card-panel-num" />
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
      complaintData: {
        openCaseNum: 0,
        notResponsibleNum: 0,
        responsibleNum: 0,
        notComplaintNum: 0,
        investigatedNum: 0
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
  methods: {
    setOptions(data) {
      this.complaintData.openCaseNum = data.openCaseNum ?  parseFloat(data.openCaseNum) : 0;
      this.complaintData.notResponsibleNum = data.notResponsibleNum ?  parseFloat(data.notResponsibleNum) : 0;
      this.complaintData.responsibleNum = data.responsibleNum ? parseFloat(data.responsibleNum) : 0;
      this.complaintData.notComplaintNum = data.notComplaintNum ? parseFloat(data.notComplaintNum) : 0;
      this.complaintData.investigatedNum = data.investigatedNum ? parseFloat(data.investigatedNum) : 0;
      console.log(this.complaintData);
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
      margin-left:45%;
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
