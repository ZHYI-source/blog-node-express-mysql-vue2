<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <el-input size="mini" v-model="query.userRealName" placeholder="姓名" style="width: 100%"></el-input>
      <el-input size="mini" v-model="query.userTel" placeholder="手机号" style="width: 100%"></el-input>
      <el-input size="mini" v-model="query.idCard" placeholder="身份证号" style="width: 100%"></el-input>
      <el-button @click="doQuery()" size="mini" icon="el-icon-search">查询</el-button>
    </div>
    <div class="app-table-contain">
      <div style="height: 100%;" ref="ztable">
        <el-table
          :data="tableData.records" :stripe="true" border
          style="width: 100%;"
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column width="130" prop="userTel" label="手机号">
          </el-table-column>
          <el-table-column width="130" prop="userNickName" label="昵称">
          </el-table-column>
          <el-table-column width="80" prop="userRealName" label="姓名">
            <template slot-scope="{row}">
              {{row.userRealName | fmtName}}
            </template>
          </el-table-column>
          <el-table-column width="200" prop="idCard" label="身份证号">
            <template slot-scope="{row}">
              {{row.idCard | fmtIdCard}}
            </template>
          </el-table-column>
          <el-table-column width="300" prop="wxOpenid" label="微信ID">
          </el-table-column>
          <el-table-column width="300" prop="aliOpenid" label="阿里ID">
          </el-table-column>
          <el-table-column width="100" label="注册时间">
            <template slot-scope="scope">
              {{scope.row.regTime|fmtTime('yyyy-MM-dd')}}
            </template>
          </el-table-column>
          <el-table-column width="120" prop="userBirth" label="生日">
          </el-table-column>
          <el-table-column width="70" prop="userSex" label="性别">
          </el-table-column>
          <el-table-column width="110" prop="city" label="城市">
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
  </div>
</template>

<script>

  export default {
    data() {
      return {
        query: {
          userRealName: '',
          userTel: '',
          idCard: ''
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
    filters:{
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
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
        } else {
          if (perms.includes('POST /admin/passengerLst')) {
            this.listButton = true;
          }
        }
      },
      doQuery() {
        let p = {
          current: this.tableData.current,
          params: this.query
        };
        this.queryData(p);
      },
      queryData(val) {
        let p = val;
        this.request('api_admin_passengerLst', p).then((res) => {
          this.tableData = res;
          console.log(res)
        }).catch((error) => {
          window.Bus.$emit('api_admin_passengerLst', error);
        });
      }
    },
    created() {
      this.getPerms()
    },
    mounted() {
      //this.queryData();
      // console.log(this.$refs.ztable);
    }

  }
</script>

<style scoped>
  .idCard-label{
    margin-left: 10%;
    color: #0039bd;
    text-decoration:underline;
  }
</style>
