<template>
<!--  司机月评-->
  <section class="data-list-box" >
    <section v-if="!show.view">
      <lk-search-form :model="query" @handleExport="handleExport"
                      :show-query="btnPerm.queryBtn"
                      :showExport="btnPerm.exportBtn" @search="goPage(1)">
        <el-form-item class="inline-item" prop="idCard">
          <el-input v-model.trim="query.params.idCard" clearable placeholder="输入身份证号搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="driverTel">
          <el-input v-model.trim="query.params.driverTel" clearable placeholder="输入手机号搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"></el-input>
        </el-form-item>
        <el-form-item class="inline-item"  prop="time">
          <el-date-picker
            clearable
            v-model="temp.time"
            @clear="goPage(1,temp.time)"
            @keyup.enter.native="goPage(1)"
            size="mini"
            type="month"
            placeholder="选择年月(默认当前月)">
          </el-date-picker>
        </el-form-item>
      </lk-search-form>
      <lk-el-table :datas="datas" stripe :loading-text="loading.text"  @sort="sortChange" :loading="loading.list">
        <template v-for="field in fields" v-if="field.show">
          <el-table-column v-if="field.key=='checkBox'" :align="field.align" type="selection"></el-table-column>

          <el-table-column v-else-if="field.key=='toolButton'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed">
            <template slot-scope="scope">
              <lk-tool-button @view="goView(scope.row)"
                              :dis-view="!btnPerm.viewBtn"
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
                     :data-size="temp.dataSize"  @changePageSize="changePageSize" @go="goPage"/>
    </section>
      <view-monthly-report :data-id="temp.id" :baseData="baseData" v-if="show.view" @close="closeView"/>
  </section>
</template>
<script>
import ViewMonthlyReport from "@/views/driverScores/view-monthly-report";
export default {
  name: 'monthly-report',
  components: {
    ViewMonthlyReport,
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
      btnPerm:{
        queryBtn:false,
        viewBtn:false,
        exportBtn: false
      },
      baseData:{
        time:''
      },
      //临时变量
      temp: {
        //数据总条数
        dataSize: 0,
        time:'',
      },
      //汇总数据
      totals: [],
      //加载中效果
      loading: {
        text:'数据加载中...',
        //获取列表数据中
        list: false,
        //行数据的id
        id:''
      },
      //返回数据列表
      datas: [],
      //列表渲染数据列
      fields: [
        {key: 'orgName', name: '所属机构', show: true, enableSort: false, align:"center", fixed: false},
        {key: 'driverName', name: '驾驶员', show: true, width: '', enableSort: false, align:"center", fixed: false},
        {key: 'idCard', name: '身份证号', show: true, width: '', enableSort: false, align:"center", fixed: false},
        {key: 'driverTel', name: '电话号码', show: true, width: '', enableSort: false,  align:"center",fixed: false},
        {key: 'score', name: '该月得分', show: true, width: '', enableSort: true, align:"center", fixed: false},
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
        this.btnPerm.exportBtn = true;
      } else {
        if (perms.includes('POST /admin/comment/reportPerMonth')) {
          this.btnPerm.queryBtn = true;
        }
        if (perms.includes('POST /admin/comment/reportPerMonthDetail')) {
          this.btnPerm.viewBtn = true;
        }
        if (perms.includes('POST /admin/comment/reportPerMonthExport')) {
          this.btnPerm.exportBtn = true;
        }
      }
    },
    getDataList() {
      if (this.temp.time){
        this.query.params.time=new Date(Number(this.temp.time)).getTime()
      }
      try {
        this.loading.list = true;
        this.request('api_admin_comment_reportPerMonth', this.query).then(res => {
          this.datas = res.records || [];
          this.temp.dataSize = res.total;
          this.loading.list = false;

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
      if (sort.order=="ascending") {
        this.query.params.sort=0
      }else {
        this.query.params.sort=1
      }
      this.getDataList();
    },
    //重置查询条件
    resetQuery() {
      this.goPage(1);
    },
    //添加编辑
    goEdit(data) {

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
      this.temp.id = data ? data.idCard : '';
      this.baseData=data
      this.baseData.time = this.temp.time
      this.show.view=true
      // this.toast.showSmallModal('查看详情',ViewMonthlyReport,{dataId:this.temp.id})
    },
    //导出
    handleExport(){
      try {
        this.loading.text = '正在导出，请稍后。。。'
        this.loading.list = true;
        let p = {
          params: this.query
        };
        this.request('api_admin_comment_reportPerMonthExport',p).then((res) => {
          this.loading.list = false;
        }).catch((error) => {
          this.loading.list = false;
        });
      } catch (error) {
        console.log(error)
        this.loading.list = false;
      }

    }
  }
}
</script>

<style scoped>

</style>
