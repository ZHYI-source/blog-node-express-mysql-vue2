<style lang="scss" src="@/assets/css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <span style=" color:#23262b; font-size:13px; margin-left:17px">领取时间:</span>
      <el-date-picker
        v-model="stet"
        value-format="timestamp"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期" size="mini">
      </el-date-picker>
      <el-button size="mini" icon="el-icon-search" @click="handleFilter()">查询</el-button>
      <el-button @click="doExcelExport" size="mini" icon="el-icon-document">导出</el-button>
    </div>
    <div class="app-table-contain">
      <div style="height: 100%;" ref="ztable">
        <el-table
          v-loading="loading" :element-loading-text="loadingText"
          :data="tableData.records" :stripe="true" border
          stripe
          style="width: 100%;"
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column prop="userId" label="用户ID" width="180" align="center">
          </el-table-column>
          <el-table-column prop="couponId" label="优惠券ID" align="center">
          </el-table-column>
          <el-table-column prop="userNickName" label="用户昵称" align="center">
          </el-table-column>
          <el-table-column prop="userTel" label="手机号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="wxOpenid" label="微信openid"  width="250" align="center">
          </el-table-column>
          <el-table-column prop="discountDesc" label="优惠金额（元）"width="150" align="center">
          </el-table-column>
          <el-table-column prop="insertTimestamp" label="领取时间" width="180" align="center">
          </el-table-column>
          <el-table-column prop="outTradeNo" label="订单号" width="200" align="center">
          </el-table-column>
          <el-table-column prop="payForTime" label="订单时间" width="180" align="center">
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="total,prev, pager, next"
        @current-change="handleFilter"
        :total="tableData.total" :current-page.sync="tableData.current" :page-size="tableData.size"
        style="flex-shrink: 0;padding: 10px">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        queryList: {
          size: 20,
          current: 1,
          params: {
            orgId: '',
            couponId: undefined,
            startTime: null,
            endTime: null,
          }
        },
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        stet: [],
        couponOptions: [],
        loadingText: '',
        loading: false,
        listButton: false,
        exportButton: false
      };
    },
    watch:{},
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
          // this.exportButton = true;
        } else {
          if (perms.includes('POST /admin/couponConsumeListHd')) {
            this.listButton = true;
          }
          // if (perms.includes('POST /admin/couponConsumeExport')) {
          //   this.exportButton = true;
          // }
        }
      },

      handleFilter() {
        this.queryList.params.startTime = null;
        this.queryList.params.endTime = null;
        if (this.stet) { //如果输入了查询时间，添加到查询参数query
          let startTime = this.stet[0];
          let endTime = this.stet[1];
          this.queryList.params.startTime = startTime;
          this.queryList.params.endTime = endTime;
        }
        this.queryList.current = this.tableData.current
        this.getList();
      },
      getList() {
        this.loadingText = '正在查询中。。。'
        this.loading = true
        this.request('api_admin_coupon_listHd', this.queryList).then((res) => {
          this.tableData = res;
          this.loading = false
        }).catch((error) => {
          this.loading = false
        });
      },
      getCoupon() {
        this.request('api_admin_coupon_idList', this.queryList).then((res) => {
          this.couponOptions = res;
        }).catch((error) => {
        });
      },
      doExcelExport() {
        this.queryList.params.startTime = null;
        this.queryList.params.endTime = null;
        if (this.stet) { //如果输入了查询时间，添加到查询参数query
          let startTime = this.stet[0];
          let endTime = this.stet[1];
          this.queryList.params.startTime = startTime;
          this.queryList.params.endTime = endTime;
        }
        this.queryList.current = this.tableData.current
        this.loadingText = '正在导出，请稍后。。。'
        this.loading = true
        this.request('api_admin_coupon_exportHd', this.queryList).then((res) => {
          this.loading = false
        }).catch((error) => {
          this.loading = false
        });
      },
      getUserInfo() {
        this.queryList.params.orgId = this.$store.getters.orgId
      }
    },
    async created() {
      await this.getUserInfo()
      this.getPerms()
      // this.getCoupon()
    },
    mounted() {
      this.getList();
    }
  }
</script>

