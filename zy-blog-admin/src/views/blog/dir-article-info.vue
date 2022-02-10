<template>

  <section class="data-list-box">
    <section v-if="!show.edit">
      <lk-search-form :model="query"
                      :key="updataKey + 1"
                      :show-query="btnPerm.queryBtn"
                      :showAdd="btnPerm.editBtn"
                      @edit="goEdit()"
                      @search="goPage(1)"
      >
        <el-form-item class="inline-item" prop="taskName">
          <el-input v-model.trim="query.params.taskName" clearable placeholder="输入文章名称搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="id">
          <el-input v-model.trim="query.params.id" clearable placeholder="输入文章ID搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="date">
          <el-date-picker
            size="mini"
            v-model="date"
            @change="goPage(1)"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>

      </lk-search-form>
      <div class="table-operate">
        <lk-table-field-filter :fields="fields" @showChange="updataKey +=1"/>
        <lk-table-button
          dis-delete
          dis-add
        >
        </lk-table-button>
      </div>
      <lk-el-table
        :key="updataKey"
        :height="tableHeight"
        :datas="datas" stripe  :loadingText="loading.text" :loading="loading.list">
        <template v-for="field in fields" v-if="field.show">
          <el-table-column v-if="field.key=='checkBox'" :align="field.align" type="selection"></el-table-column>

          <el-table-column v-else-if="field.key=='toolButton'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <lk-tool-button @view="goView(scope.row)"
                              @edit="goEdit(scope.row)"
                              @delete="goDelete(scope.row)"
                              :dis-edit="!btnPerm.updateBtn"
                              :dis-delete="!btnPerm.updateBtn"
              >
              </lk-tool-button>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='isTop'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <el-tag class="tags" type="warning" v-if="scope.row.isTop == 1">是</el-tag>
                <el-tag class="tags" type="" v-if="scope.row.isTop == 0">否</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='isHot'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <el-tag class="tags" type="warning" v-if="scope.row.isHot == 1">是</el-tag>
                <el-tag class="tags" type="" v-if="scope.row.isHot == 0">否</el-tag>
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
                     :data-size="temp.dataSize" @changePageSize="changePageSize" @go="goPage"
      />
    </section>
    <GetArticleInfo v-if="show.edit" :updateData="updateData" @close="closeEdit"/>
  </section>
</template>

<script>
/**
 *@author ZY
 *@date 2021/12/9
 *@Description:文章信息
 */
import {getToken} from "@/utils/auth";

import Tools from "@/libs/tool";
import GetArticleInfo from "@/views/blog/get-article-info";
import ViewArticleInfo from "@/views/blog/view-article-info";

export default {
  name: 'dir-article-info',
  components: {
    ViewArticleInfo,
    GetArticleInfo,
  },
  watch: {
    'heightL'(val) {
      this.updataKey+=1
      this.tableHeight = val
    },
  },
  data() {
    return {
      heightL:580,
      tableHeight:580,
      updataKey:0,
      uploadHeader: {
        'x-access-token': getToken()
      },
      updateData: {},//修改文章数据
      show: {
        edit: false,
        view: false,
        update: false
      },
      date: null,
      //查询条件
      query: {
        size: 20,
        current: 1,
        params: {
          endTime: null,
          id: '',
          startTime: null,
          taskName: "",
          // status:0
        }
      },
      btnPerm: {
        queryBtn: false,
        viewBtn: false,
        updateBtn: false,
        editBtn: false,
        deleteBtn: false,
      },
      //返回数据列表
      datas: [],
      //临时变量
      temp: {
        //数据总条数
        dataSize: 0,
        id: ''
      },
      //汇总数据
      totals: [],
      //加载中效果
      loading: {
        text: '数据加载中',
        //获取列表数据中
        list: false,
        //行数据的id
        id: ''
      },
      //列表渲染数据列
      fields: [
        {key: 'id', name: 'ID', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'title', name: '文章标题', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'summary', name: '文章简介', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'commentsCount', name: '评论数', show: true, width: '120', enableSort: false, align: "center", fixed: false},
        {key: 'viewsCount', name: '浏览人数', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'img', name: '文章图片', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'content', name: '文章内容', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'isTop', name: '是否置顶', show: true, width: '80', enableSort: false, align: "center", fixed: false},
        {key: 'isHot', name: '是否火热', show: true, width: '80', enableSort: false, align: "center", fixed: false},
        {key: 'pubTime', name: '发布时间', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        {key: 'insertTime', name: '插入时间', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: 'updateTime', name: '修改时间', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: 'toolButton', name: '操作', show: true, width: '200', enableSort: false, align: "center", fixed: 'right'},
      ]
    }
  },
  created() {
    this.getPerms()
    this.getDataList();
  },
  mounted() {
    this.getWinHeight()
    this.getDataList();
  },
  methods: {
    //获取窗口高度
    getWinHeight(){
      let that = this
      this.heightL = window.innerHeight - 340
      window.addEventListener('resize', () =>{
        that.updataKey+=1
        that.heightL = window.innerHeight - 340
      })
    },
    //权限判断
    getPerms() {
      let perms = this.$store.getters.perms
      if (perms.includes('*')) {
        this.btnPerm.queryBtn = true;
        this.btnPerm.viewBtn = true;
        this.btnPerm.updateBtn = true;
        this.btnPerm.editBtn = true;
        this.btnPerm.deleteBtn = true;
      } else {
        if (perms.includes('POST /admin/task/task/list')) {
          this.btnPerm.queryBtn = true;
        }
        if (perms.includes('POST /admin/task/task/change')) {
          this.btnPerm.updateBtn = true;
        }
        if (perms.includes('POST /admin/task/task/create')) {
          this.btnPerm.editBtn = true;
        }
      }
    },
    getDataList() {
      try {
        this.loading.list = true;
        //时间转存
        this.query.params.startTime = this.date && this.date.length > 0 ? this.date[0] : null
        this.query.params.endTime = this.date && this.date.length > 0 ? this.date[1] : null
        this.request('api_blog_article_list', this.query).then(res => {
          let datas = res.records || []
          for (const data of datas) {
            //时间格式化
            data.startTimestamp = Tools.fmtLong2DateTime(Number(data.startTimestamp))
            data.endTimestamp && (data.endTimestamp = Tools.fmtLong2DateTime(Number(data.endTimestamp)))
            data.updateTimestamp = Tools.fmtLong2DateTime(Number(data.updateTimestamp))
          }
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
    onSuccess(response, file, fileLile) {
      this.loading = false
      if (response.result === 0) {
        this.errorUrl = response.errFile;
        this.ctl.excelResult = true;

      } else {
        this.$message('导入成功');
      }
      this.doQuery()
    },
    onError(err, file, fileList) {
      this.loading = false
    },
    onProgress() {
      this.loadingText = '导入中，请稍后。。。'
      this.loading = true
    },

    //添加编辑
    goEdit(data) {
      this.show.edit = true
      this.updateData = data || {}
    },
    //关闭编辑
    closeEdit() {
      this.show.edit = false
      this.getDataList()
    },
    closeView() {
      this.show.view = false
    },
    //跳转到查看详情
    goView(data) {
      let datas = data ? data : {};
      this.toast.showSmallModal('文章详情', ViewArticleInfo, {datas})
    },
    //删除文章
    goDelete(data) {
      let p = {
        id: data.id || '',
        status: 1
      }
      this.toast.confirmDelete().then(() => {
        this.request('api_admin_task_task_change', p).then(res => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.getDataList()
        }).catch(err => {
          this.$message({
            message: err.msg,
            type: 'error'
          });
          // console.log(err)
        })
      })

    },
  }
}
</script>

<style lang="scss" scoped>
.col-tags {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .tags {
    margin: 2px;
  }
}
</style>
