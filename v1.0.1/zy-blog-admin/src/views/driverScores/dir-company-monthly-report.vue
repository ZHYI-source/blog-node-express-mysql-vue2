<template>
<!--  企业月报-->
  <section class="data-list-box" >
    <section v-if="!show.view">
      <lk-search-form :model="query" :show-query="btnPerm.queryBtn" @search="goPage(1)">
        <el-form-item class="inline-item" prop="name">
         <lk-select-org v-model="query.params.orgId"/>
        </el-form-item>
        <el-form-item class="inline-item" prop="name">
          <el-date-picker
            v-model="temp.time"
            size="mini"
            type="month"
            placeholder="选择年月(默认当前月)">
          </el-date-picker>
        </el-form-item>
      </lk-search-form>
      <lk-el-table :datas="datas" stripe height="580" :loading="loading.list">
        <template v-for="field in fields" v-if="field.show">
          <el-table-column v-if="field.key=='checkBox'" :align="field.align" type="selection"></el-table-column>

          <el-table-column v-else-if="field.key=='toolButton'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed">
            <template slot-scope="scope">
              <lk-tool-button @view="goView(scope.row)"
                              :disView="!btnPerm.viewBtn"
                              dis-edit dis-delete>
              </lk-tool-button>
            </template>
          </el-table-column>
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
      <lk-pagination :current-page="query.current" :page-size="query.size"
                     :data-size="query.total"  @changePageSize="changePageSize"/>
    </section>
    <view-company-monthly-report v-if="show.view" :datas="temp.datas" @close="closeView"/>
  </section>
</template>
<script>

import ViewDriverPortrait from "@/views/driverScores/view-driver-portrait";
import ViewCompanyMonthlyReport from "@/views/driverScores/view-company-monthly-report";
import LkSelectOrg from "@/components/common/lk-select-org";
export default {
  name: 'driver-portrait',
  components: {
    LkSelectOrg,
    ViewCompanyMonthlyReport,
    ViewDriverPortrait
  },
  data() {
    return {
      show: {
        edit: false,
        view: false
      },
      //查询条件
      query: {
        size: 20,
        current: 1,
        params: {}
      },
      //返回数据列表
      datas: [],
      //临时变量
      temp: {
        //数据总条数
        dataSize: 0,
        datas:{
          time:'',
        },
        time:'',
      },
      tempView:{},
      //汇总数据
      totals: [],
      //加载中效果
      loading: {
        //获取列表数据中
        list: false,
        //行数据的id
        id:''
      },
      btnPerm:{
        queryBtn:false,
        viewBtn:false,
      },
      //列表渲染数据列
      fields: [
        {key: 'orgName', name: '机构名称', show: true, enableSort: false, align:"center", fixed: false},
        {key: 'countCar', name: '企业车辆', show: true, width: '', enableSort: false, align:"center", fixed: false},
        {key: 'score', name: '该月评价得分', show: true, width: '', enableSort: false, align:"center", fixed: false},
        {key: 'countComment', name: '该月评价次数', show: true, width: '', enableSort: false,  align:"center",fixed: false},
        {key: 'toolButton', name: '操作', show: true, width: '100', enableSort: false, align:"center", fixed: 'right'},
      ]
    }
  },
  created() {
    this.getPerms()
    let date = new Date()
    this.temp.time=date
    this.getDataList();
  },
  mounted() {
    let date = new Date()
    this.temp.time=date
    this.getDataList();
  },
  methods: {
    getPerms() {
      let perms = this.$store.getters.perms
      if (perms.includes('*')) {
        this.btnPerm.queryBtn = true;
        this.btnPerm.viewBtn = true;
      } else {
        if (perms.includes('POST /admin/comment/orgReportPerMonth')) {
          this.btnPerm.queryBtn = true;
        }
        if (perms.includes('POST /admin/comment/orgReportDetail')) {
          this.btnPerm.viewBtn = true;
        }
      }
    },
    getDataList() {
      this.temp.datas.time=this.temp.time
      if (this.temp.time){
        this.query.params.time=new Date(Number(this.temp.time)).getTime()
      }
      try {
        this.loading.list = true;
        this.request('api_admin_comment_orgReportPerMonth', this.query).then(res => {
          let datas = res.records || []
          this.datas = datas;
          this.temp.dataSize = res.total;
          this.loading.list = false;
          this.query.params={}
        })
      } catch (error) {
        console.log(error)
        this.query.params={}
        this.loading.list = false;
      }
    },
    //跳到页
    goPage(pageNum) {
      this.query.current = pageNum;
      this.getDataList();
    },
    //改变每页数据量
    changePageSize(size) {
      this.query.size = size;
      this.query.current = 1;
      this.getDataList();
    },
    //排序
    sortChange(sort) {
      // setSortType(this.query, sort);
      this.getDataList();
    },
    //重置查询条件
    resetQuery() {
      this.goPage(1);
    },
    //添加编辑
    goEdit(data) {
      // this.temp.id = data ? data.id : undefined;
      // this.toast.showSmallModal('查看字典', GetDictType, {dataId: '112'})
      // this.show.edit = true;
    },
    //关闭编辑
    closeEdit() {
      // this.getDataList();
    },
    closeView(){
      this.show.view=false
    },
    //跳转到查看详情
    goView(data) {
      this.temp.datas = data ? data : {};
      this.temp.datas.time=new Date(Number(this.temp.time)).getTime()
      this.show.view = true;
      // this.toast.showSmallModal('查看详情',ViewDriverPortrait,data)
    }
  }
}
</script>

<style scoped>

</style>
