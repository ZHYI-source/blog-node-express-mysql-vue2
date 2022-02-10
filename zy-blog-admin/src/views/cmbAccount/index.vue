<template>
  <section class="data-list-box" >
    <section>
      <lk-search-form :model="queryList"  @search="handleFilter" @handleExport="handleExport" show-export>
        <el-form-item class="inline-item" label="日期" prop="month" label-width="45px">
          <el-date-picker
            v-model="time"
            size="mini"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['08:00:00']"
            :picker-options="pickerBeginDateBefore"
            @change="showOther"
            @clear="handleFilter" @keyup.enter.native="handleFilter"
           >
          </el-date-picker>
        </el-form-item>
        <template v-if="showS">
          <el-form-item class="inline-item" label="收(付)方名称" prop="month" label-width="100px">
            <el-input v-model.trim="queryList.params.accountName"
                      @clear="handleFilter" @keyup.enter.native="handleFilter"
                      clearable placeholder="输入收(付)方名称搜索" size="mini"/>
          </el-form-item>
          <el-form-item class="inline-item" label="交易金额" prop="month">
            <div class="gold-box">
              <el-input class="box-item"
                        @clear="handleFilter" @keyup.enter.native="handleFilter"
                        v-model.trim="queryList.params.minAmount" clearable placeholder="输入最小交易金额搜索" size="mini"/>
              <span class="box-line">-</span>
              <el-input class="box-item"
                        @clear="handleFilter" @keyup.enter.native="handleFilter"
                        v-model.trim="queryList.params.maxAmount" clearable placeholder="输入最大交易金额搜索" size="mini"/>
            </div>
          </el-form-item>
        </template>

      </lk-search-form>
      <lk-el-table :datas="datas"
                   stripe
                   height="650"
                   :loading="loading.list"
                   :loadingText="loading.text"
      >
        <template v-for="field in fields" v-if="field.show">
          <el-table-column v-if="field.key=='checkBox'" :align="field.align" type="selection"></el-table-column>
          <el-table-column
            v-else
            show-overflow-tooltip
            :align="field.align"
            :prop="field.key"
            :label="field.name"
            :width="field.width"
            :sortable="field.enableSort?'custom':false"
            :fixed="field.fixed"
          ></el-table-column>
        </template>
      </lk-el-table>
    </section>
  </section>
</template>

<script>
  export default {
    data() {
      let _minTime = null
      let _maxTime = null
      return {
        time:[],
        queryList: {
          current:1,
          params: {
            accountName:'',
            remark: "",
            startTime:0,
            endTime: 0,
            maxAmount:'',
            minAmount:'',
          },
          size:20,
        },
        pickerMinDate:'',
        isDefault:true,//控制初始状态时不能选择今天以后的时间
        pickerBeginDateBefore:{
          onPick: (time) => {
            // 如果选择了只选择了一个时间
            if (!time.maxDate) {
              this.isDefault=false
              let timeRange = 6*24*60*60*1000  // 6天
              _minTime = time.minDate.getTime() - timeRange // 最小时间
              _maxTime = time.minDate.getTime() + timeRange // 最大时间
              // 如果选了两个时间，那就清空本次范围判断数据，以备重选
            } else {
              this.isDefault=true
              _minTime = _maxTime = null
            }
          },
          disabledDate: (time) => {
            if (this.isDefault) {
              return time.getTime() > Date.now()
            }else {
              if(_minTime && _maxTime){
                return time.getTime() < _minTime || time.getTime() > _maxTime || time.getTime() > Date.now()
              }
            }
          }
        },
        //返回数据列表
        datas: [],
        //加载中效果
        loading: {
          //获取列表数据中
          list: false,
          text:'数据加载中',
          //行数据的id
          id:''
        },
        showS:false,
        btnPerm:{
          queryBtn:false,
          exportBtn:false,
        },
        loadingText: '',
        listButton: false,
        exportButton: false,
        //列表渲染数据列
        fields: [
          // {key: 'checkBox', name: '全选按钮', show: true, enableSort: false, align:"center", fixed: false},
          {key: 'reqAccount', name: '账号', show: true, enableSort: false, align:"center", fixed: false},
          {key: 'reqAccountName', name: '账号名称', show: true, width: '', enableSort: false, align:"center", fixed: false},
          {key: 'tradeDate', name: '交易日期', show: true, width: '', enableSort: false,  align:"center",fixed: false},
          {key: 'tradeTime', name: '交易时间', show: true, width: '', enableSort: false,  align:"center",fixed: false},
          {key: 'valueDate', name: '起息日', show: true, width: '', enableSort: false,  align:"center",fixed: false},
          {key: 'tradeType', name: '交易类型', show: true, width: '', enableSort: false,  align:"center",fixed: false},
          {key: 'orderId', name: '业务参考号', show: true, width: '', enableSort: false,  align:"center",fixed: false},
          {key: 'debitAmount', name: '借方金额', show: true, width: '', enableSort: false, align:"center", fixed: false},
          {key: 'creditAmount', name: '贷方金额', show: true, width: '100', enableSort: false, align:"center", fixed: false},
          {key: 'balance', name: '金额', show: true, width: '100', enableSort: false, align:"center", fixed: false},
          {key: 'remark', name: '用途', show: true, width: '100', enableSort: false, align:"center", fixed: false},
          {key: 'accountName', name: '收(付)方名称', show: true, width: '180', enableSort: false, align:"center", fixed: false},
          {key: 'account', name: '收(付)方账号', show: true, width: '180', enableSort: false, align:"center", fixed: false},
        ]
      };
    },
    methods: {
      showOther(val){
        val ? this.showS=true : this.showS=false
      },
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.btnPerm.queryBtn = true;
          this.btnPerm.exportBtn = true;
        } else {
          if (perms.includes('POST /admin/cmbCheck')) {
            this.btnPerm.queryBtn = true;
          }
          if (perms.includes('POST /admin/cmbCheckExport')) {
            this.btnPerm.exportBtn = true;
          }
        }
      },

      handleFilter() {
        this.getList();
      },
      getList() {
        this.loading.text = '正在查询中。。。'
        this.loading.list = true;
        if (this.showS){
          this.queryList.params.startTime=new Date(this.time[0]).getTime()
          this.queryList.params.endTime=new Date(this.time[1]).getTime()
          let one = this.queryList.params.startTime
          let two = this.queryList.params.endTime
          if (one == two) {
            this.$message.error('开始时间和结束时间不能同一时间！');
            this.loading.list = false;
            return
          }
        }

        this.request('api_admin_cmbCheck', this.queryList).then((res) => {
          this.datas = res.records
          this.loading.list = false
        }).catch((error) => {
          console.log(error)
          this.loading.list = false
        });
      },
      handleExport() {
        if (this.showS) {
          this.queryList.params.startTime = new Date(this.time[0]).getTime()
          this.queryList.params.endTime = new Date(this.time[1]).getTime()
        }
        this.loading.text = '正在导出，请稍后。。。'
        this.loading.list= true
        this.request('api_admin_cmbCheckExport', this.queryList).then((res) => {
          this.loading.list = false
        }).catch((error) => {
          this.loading.list= false
        });
      },
      getUserInfo(){
        // this.queryList.orgId = this.$store.getters.orgId
      }
    },
    created() {
      this.getPerms()
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style lang="scss" scoped>
  .gold-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .box-line {
      display: inline-block;
      padding: 0px 10px;
    }
    .box-item {
      width:calc(50% - 10px);
    }
  }

</style>

