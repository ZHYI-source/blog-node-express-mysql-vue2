<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-input size="mini" v-model="query.userRealName" placeholder="姓名" style="width: 100%"></el-input>
      <el-input size="mini" v-model="query.userTel" placeholder="手机号" style="width: 100%"></el-input>
      <el-input size="mini" v-model="query.driverIdCard" placeholder="司机身份证号" style="width: 100%"></el-input>
      <el-input size="mini" v-model="query.driverName" placeholder="司机姓名" style="width: 100%"></el-input>
      <el-input size="mini" v-model="query.plateNo" placeholder="车牌号" style="width: 100%"></el-input>
      <el-date-picker size="mini"
                      v-model="query.stet"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
      <el-button @click="doQuery()" size="mini" icon="el-icon-search">查询</el-button>
    </div>
    <div class="app-table-contain">
      <div style="height: 100%;" ref="ztable">
        <el-table
          @cell-click="cellClick"
          :data="tableData.records" :stripe="true" border
          style="width: 100%;"
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column width="200" prop="userTel" label="手机号">
            <template slot-scope="{row}">
              <div style="color: #409EFF">
                {{row.userTel}}
              </div>
            </template>
          </el-table-column>
          <el-table-column width="80" prop="userRealName" label="姓名">
            <template slot-scope="{row}">
              {{row.userRealName | fmtName}}
            </template>
          </el-table-column>
          <el-table-column width="200" prop="userIdCard" label="身份证号">
            <template slot-scope="{row}">
              {{row.userIdCard | fmtIdCard}}
            </template>
          </el-table-column>
          <el-table-column width="200" prop="userIdCard" label="健康状态">
            <template slot-scope="{row}">
              <el-tag type="success" v-if="row.healthCode === 1"> {{ row.healthCodeDesc }} </el-tag>
              <el-tag type="warning" v-if="row.healthCode === 2"> {{ row.healthCodeDesc }} </el-tag>
              <el-tag type="danger" v-if="row.healthCode === 3"> {{ row.healthCodeDesc }} </el-tag>
              <el-tag type="info" v-if="row.healthCode === 4"> {{ row.healthCodeDesc }} </el-tag>
              <el-tag type="warning" v-if="row.healthCode === 6"> {{ row.healthCodeDesc }} </el-tag>
              <el-tag type="danger" v-if="row.healthCode === 7"> {{ row.healthCodeDesc }} </el-tag>
            </template>
          </el-table-column>
          <el-table-column width="100" prop="plateNo" label="车牌号">
            <template slot-scope="{row}">
              <div style="color: #409EFF">
                {{row.plateNo}}
              </div>
            </template>
          </el-table-column>
          <el-table-column width="80" prop="driverRealName" label="司机姓名">
            <template slot-scope="{row}">
              {{row.driverRealName}}
            </template>
          </el-table-column>
          <el-table-column width="200" prop="driverIdCard" label="司机身份证号">
            <template slot-scope="{row}">
              <div style="color: #409EFF">
                {{row.driverIdCard | fmtIdCard}}
              </div>
            </template>
          </el-table-column>
          <el-table-column width="200" prop="startTime" label="起点时间">
            <template slot-scope="scope">
              {{scope.row.startTime|fmtTime}}
            </template>
          </el-table-column>
          <el-table-column width="200" prop="endTime" label="终点时间">
            <template slot-scope="scope">
              {{scope.row.endTime|fmtTime}}
            </template>
          </el-table-column>
          <el-table-column width="300" prop="startAddress" label="起点地址">
          </el-table-column>
          <el-table-column width="300" prop="endAddress" label="终点地址">
          </el-table-column>
          <el-table-column width="300" prop="outTradeNo" label="订单号">
          </el-table-column>
          <el-table-column width="80" label="类型">
            <template slot-scope="scope">
              {{scope.row.status| statusFilter }}
            </template>
          </el-table-column>
          <el-table-column width="100" label="时间">
            <template slot-scope="scope">
              {{scope.row.insertTimestamp|fmtTime('yyyy-MM-dd')}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="180">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" icon="el-icon-document"
                           @click="doView(scope.$index, scope.row)">详细</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="doQuery()"
        :total="tableData.total" :current-page.sync="tableData.current" :page-size="tableData.size"
        style="flex-shrink: 0;padding: 10px">
      </el-pagination>
    </div>
    <el-dialog title="记录详情" :visible.sync="ctl.show" :close-on-press-escape="false" :close-on-click-modal="false"
               width="70%">
      <viewinfo v-if="ctl.show" ref="view" :read="ctl.read" v-on:appClose="ctl.read=false;ctl.show=false;"
                v-on:reload="doQuery()"></viewinfo>
    </el-dialog>
  </div>
</template>

<script>
  import viewinfo from './rideView';
  import axios from '@/utils/axios';

  export default {
    components: {viewinfo},
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: '行程开始',
          2: '行程结束'
        }
        return statusMap[status]
      },
      fmtName(val){
        // console.log(val)

        if(val !== undefined && val !== null){
          return val.substring(0, 1) + '*' + val.substring(2, val.length)
        }
        return val;
      },
      fmtIdCard(val){
        if(val !== undefined && val !== null){
          return val.substring(0, 9) + '*******' + val.substring(16, val.length)
        }
        return val;
      }
    },
    data() {
      return {
        ctl: {
          show: false,
          read: false
        },
        query: {
          userRealName: '',
          driverName: '',
          userTel:'',
          driverIdCard:'',
          plateNo: '',
          stet: []
        },
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        listButton : false,
      };
    },
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
        } else {
          if (perms.includes('POST /admin/getRideRecord')) {
            this.listButton = true;
          }
        }
      },
      doView(index, val) {
        this.ctl.show = true;
        this.ctl.read = true;
        let that = this;
        //这里element弹框有延迟问题，view组件未加载
        setTimeout(function () {
          that.$refs.view.open(val, true);
        }, 100);
      },
      doQuery() {
        if (this.query.stet && this.query.stet.length > 1) {
          this.query.st = this.query.stet[0].getTime() / 1000;
          this.query.et = this.query.stet[1].getTime() / 1000;
        } else {
          this.query.st = null;
          this.query.et = null;
        }
        let p = {
          current: this.tableData.current,
          params: this.query
        };
        this.queryData(p);
      },
      queryData(val) {
        let that = this;
        let p = val;
        this.request('api_admin_rideRecord', p).then((res) => {
          this.tableData = res;
          console.log(this.tableData)
          if (this.tableData.records.length > 0){
            for (const trace of this.tableData.records) {
              that.parseStartAddress(trace);
              that.parseEndAddress(trace);
            }
          }
        }).catch((error) => {
        });
      },
      cellClick(row, column, cell, event){
        if (column.property === 'userTel'){
          this.tableData.current = 1;
          this.query.userTel = row.userTel;
          this.query.plateNo = '';
          this.query.driverIdCard = '';
          if(this.query.userTel){
            this.doQuery();
          }
        }
        if (column.property === 'plateNo'){
          this.tableData.current = 1;
          this.query.userTel = '';
          this.query.plateNo = row.plateNo;
          this.query.driverIdCard = '';
          if(this.query.plateNo){
            this.doQuery();
          }
        }
        if (column.property === 'driverIdCard'){
          this.tableData.current = 1;
          this.query.userTel = '';
          this.query.plateNo = '';
          this.query.driverIdCard = row.driverIdCard;
          if(this.query.driverIdCard){
            this.doQuery();
          }
        }

      },
      parseStartAddress(trace) {
        const location = trace.startAddr;
        if (location){
          axios.get('/v3/geocode/regeo?key=956fa8426889423864f4840af45f1b25&location=' + location + '&poitype=&radius=1000&extensions=base&batch=false&roadlevel=0').then((res) => {
            console.log(res)
            this.$set(trace, 'startAddress', res.data.regeocode.formatted_address);
          }).catch((error) => {
            console.log(error);
          });
        }else{
          this.$set(trace, 'startAddress', '');
        }
      },
      parseEndAddress(trace) {
        const location = trace.endAddr;
        if (location){
          axios.get('/v3/geocode/regeo?key=956fa8426889423864f4840af45f1b25&location=' + location + '&poitype=&radius=1000&extensions=base&batch=false&roadlevel=0').then((res) => {
            console.log('res:');
            console.log(res);
            this.$set(trace, 'endAddress', res.data.regeocode.formatted_address);
          }).catch((error) => {
            console.log(error);
          });
        }else{
          this.$set(trace, 'endAddress', '');

        }
      }
    },
    created() {
      this.getPerms()
    },
    mounted() {
      // this.query.plate_no = this.$route.query.plateNo;
      //this.queryData();
      // console.log(this.$refs.ztable);
    }

  }
</script>
