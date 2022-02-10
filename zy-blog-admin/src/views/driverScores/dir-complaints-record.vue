<template>
<!--  投诉履历-->
  <section class="data-list-box" >
    <section>
      <lk-search-form :model="query" :show-query="btnPerm.queryBtn" @search="goPage(1)">
        <el-form-item class="inline-item"  prop="idCard">
          <el-input v-model.trim="query.params.idCard" clearable placeholder="请输入身份证号搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"></el-input>
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
            v-else-if="field.key=='complaintTime'"
            show-overflow-tooltip
            :align="field.align"
            :prop="field.key"
            :label="field.name"
            :width="field.width"
            :sortable="field.enableSort?'custom':false"
            :fixed="field.fixed"
          >
            <template slot-scope="scope">
             {{$tools.fmtLong2DateTime(Number(scope.row.complaintTime))  }}
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="field.key=='statusDesc'"
            show-overflow-tooltip
            :align="field.align"
            :prop="field.key"
            :label="field.name"
            :width="field.width"
            :sortable="field.enableSort?'custom':false"
            :fixed="field.fixed"
          >
              <template slot-scope="scope">
                <!-- 待通知-->
                <el-tag type="danger" v-if="scope.row.status === 0 || scope.row.status === 1 || scope.row.status === -1"> {{ scope.row.statusDesc }} </el-tag>
                <!-- 待申诉-->
                <el-tag type="warning" v-if="scope.row.status === 2"> {{ scope.row.statusDesc }} </el-tag>
                <!-- 待处理-->
                <el-tag type="primary" v-if="scope.row.status === 3"> {{ scope.row.statusDesc }} </el-tag>
                <!-- 待结案-->
                <el-tag type="info" v-if="scope.row.status === 4"> {{ scope.row.statusDesc }} </el-tag>
                <!-- 已结案-->
                <el-tag type="success" v-if="scope.row.status === 5"> {{ scope.row.statusDesc }} </el-tag>
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
  </section>
</template>
<script>

import ViewDriverPortrait from "@/views/driverScores/view-driver-portrait";
import ViewComplaintsRecord from "@/views/driverScores/view-complaints-record";
export default {
  name: 'driver-portrait',
  components: {
    ViewComplaintsRecord,
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
        params: {
          idCard: "",
        }
      },
      //返回数据列表
      datas: [],
      //临时变量
      temp: {
        //数据总条数
        dataSize: 0,
        datas:{}
      },
      //汇总数据
      totals: [],
      btnPerm:{
        queryBtn:false,
        viewBtn:false,
      },
      //加载中效果
      loading: {
        //获取列表数据中
        list: false,
        //行数据的id
        id:''
      },
      //列表渲染数据列
      fields: [
        // {key: 'checkBox', name: '全选按钮', show: true, enableSort: false, align:"center", fixed: false},
        {key: 'complaintTime', name: '时间日期', show: true, width: '', enableSort: false, align:"center", fixed: false},
        {key: 'driverName', name: '驾驶员姓名', show: true, width: '', enableSort: false, align:"center", fixed: false},
        {key: 'idCard', name: '身份证号', show: true, width: '', enableSort: false,  align:"center",fixed: false},
        {key: 'orgName', name: '所属机构', show: true, width: '', enableSort: false, align:"center", fixed: false},
        {key: 'plateNo', name: '驾驶车号', show: true, width: '', enableSort: false, align:"center", fixed: false},
        {key: 'sort', name: '被诉类型', show: true, width: '', enableSort: false, align:"center", fixed: false},
        {key: 'responsibleDesc', name: '投诉类型', show: true, width: '', enableSort: false, align:"center", fixed: false},
        {key: 'statusDesc', name: '案件状态', show: true, width: '', enableSort: false, align:"center", fixed: false},
        {key: 'replyInfo', name: '结案处理结论', show: true, width: '', enableSort: false, align:"center", fixed: false},
        {key: 'toolButton', name: '操作', show: true, width: '100', enableSort: false, align:"center", fixed: 'right'},
      ]
    }
  },
  created() {
    this.getPerms()
    this.getDataList();

  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getPerms() {
      let perms = this.$store.getters.perms
      if (perms.includes('*')) {
        this.btnPerm.queryBtn = true;
        this.btnPerm.viewBtn = true;
      } else {
        if (perms.includes('POST /admin/comment/driverComplaintList')) {
          this.btnPerm.queryBtn = true;
        }
        if (perms.includes('POST /admin/comment/driverComplaintDetail')) {
          this.btnPerm.viewBtn = true;
        }
      }
    },
    getDataList() {
      try {
        this.loading.list = true;
        this.request('api_admin_comment_driverComplaintList', this.query).then(res => {
          let datas = res.records || []
          this.datas = datas;
          this.temp.dataSize = res.total;
          this.loading.list = false;
        })
      } catch (error) {
        console.log(error)
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
      this.temp.datas = data ? data: {};
      this.toast.showSmallModal('查看详情',ViewComplaintsRecord,{datas:this.temp.datas})
    }
  }
}
</script>

<style scoped>

</style>
