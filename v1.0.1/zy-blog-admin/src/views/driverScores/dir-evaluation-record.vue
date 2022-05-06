<template>
<!--  评价记录-->
  <section class="data-list-box" >
    <section>
      <lk-search-form :model="query" @handleExport="handleExport"
                      :show-query="btnPerm.queryBtn"
                      :show-export="btnPerm.exportBtn"
                      @search="goPage(1)" show-export>
        <el-form-item class="inline-item"  prop="idCard">
          <el-input v-model.trim="query.params.idCard" clearable placeholder="输入身份证号搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"></el-input>
        </el-form-item>
        <el-form-item class="inline-item"  prop="driverTel">
          <el-input v-model.trim="query.params.driverTel" clearable placeholder="输入司机号码搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"></el-input>
        </el-form-item>
      </lk-search-form>
      <lk-el-table :datas="datas" stripe height="580" :loadingText="loading.text" :loading="loading.list">
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
          <el-table-column v-else-if="field.key=='items'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed">
            <template slot-scope="scope">
              <div class="col-tags">
                <template v-for="(item,index) in scope.row.items" >
                  <el-tag class="tags" type="info" v-if="item">{{item}}</el-tag>
                </template>
              </div>
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

import ViewEvaluationRecord from "@/views/driverScores/view-evaluation-record";
export default {
  name: 'evaluation-record',
  components: {
    ViewEvaluationRecord,
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
          driverTel: ""
        }
      },
      btnPerm:{
        queryBtn:false,
        viewBtn:false,
        exportBtn:false,
      },
      //返回数据列表
      datas: [],
      //临时变量
      temp: {
        //数据总条数
        dataSize: 0,
      },
      //汇总数据
      totals: [],
      //加载中效果
      loading: {
        text:'数据加载中',
        //获取列表数据中
        list: false,
        //行数据的id
        id:''
      },
      //列表渲染数据列
      fields: [
        {key: 'outTradeNo', name: '订单号', show: true, width: '180', enableSort: false,align:"center", fixed: false},
        {key: 'userTel', name: '乘客号码', show: true, width: '180', enableSort: false, align:"center", fixed: false},
        {key: 'driverName', name: '驾驶员', show: true, width: '180', enableSort: false, align:"center", fixed: false},
        {key: 'idCard', name: '身份证号', show: true, width: '', enableSort: false, align:"center", fixed: false},
        {key: 'driverTel', name: '司机号码', show: true, width: '', enableSort: false,  align:"center",fixed: false},
        {key: 'score', name: '乘客打分', show: true, width: '180', enableSort: false, align:"center", fixed: false},
        {key: 'items', name: '标签', show: true, width: '255', enableSort: false, align:"center", fixed: false},
        {key: 'content', name: '评价内容', show: true, width: '180', enableSort: false, align:"center", fixed: false},
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
        this.btnPerm.exportBtn = true;
      } else {
        if (perms.includes('POST /admin/comment/driverCommentList')) {
          this.btnPerm.queryBtn = true;
        }
        if (perms.includes('POST /admin/comment/driverCommentListExport')) {
          this.btnPerm.exportBtn = true;
        }
        if (perms.includes('POST /admin/comment/commentDetail')) {
          this.btnPerm.viewBtn = true;
        }
      }
    },
    getDataList() {
      try {
        this.loading.list = true;
        this.request('api_admin_comment_driverCommentList', this.query).then(res => {
          let datas = res.records || []
          datas.forEach((value,index) => {
            datas[index].items = value.items.split(',')
            datas[index].score = value.score + ' 分'
          })
          console.log(datas)
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

    },
    //关闭编辑
    closeEdit() {

    },
    closeView(){
      this.show.view=false
    },
    //跳转到查看详情
    goView(data) {
      let datas = data ? data : {};
      this.toast.showSmallModal('查看详情',ViewEvaluationRecord, {datas})
    },
    //导出
    handleExport(){
      try {
        this.loading.text = '正在导出，请稍后。。。'
        this.loading.list = true;
        let p = {
          params: this.query
        };
        this.request('api_admin_comment_driverCommentListExport',p).then((res) => {
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

<style lang="scss" scoped>
.col-tags {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  .tags {
    margin: 2px;
  }
}
</style>
