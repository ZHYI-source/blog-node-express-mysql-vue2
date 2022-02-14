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
        <el-form-item class="inline-item" prop="id">
          <el-input v-model.trim="query.params.id" clearable placeholder="输入关于ID搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="name">
          <el-input v-model.trim="query.params.name" clearable placeholder="输入音乐名称搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
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
        @sort="sortChange"
        :key="updataKey"
        :height="tableHeight"
        :datas="datas" stripe  :loadingText="loading.text" :loading="loading.list">
        <template v-for="field in fields" v-if="field.show">
          <el-table-column v-if="field.key=='checkBox'" :align="field.align" type="selection"></el-table-column>
          <el-table-column v-else-if="field.key=='aboutContent'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.aboutContent"  v-html="scope.row.aboutContent"></div>
              <sapn v-else>-</sapn>
            </template>
          </el-table-column>
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
    <GetWebMusic v-if="show.edit" :updateData="updateData" @close="closeEdit"/>
  </section>
</template>

<script>
/**
 *@author ZY
 *@date 2021/12/9
 *@Description:站点音乐
 */
import {getToken} from "@/utils/auth";
import {setSortType} from "@/utils/sortUtil";
import GetWebMusic from "@/views/blog/get-web-music";
import ViewWebMusic from "@/views/blog/view-web-music";

export default {
  name: 'dir-web-music',
  components: {
    ViewWebMusic,
    GetWebMusic,
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
        //排序字段
        orderBy: 'insertTime',
        //排序类型
        orderType: 'DESC',
        params: {
          id: '',
          name:''
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
        {key: 'id', name: 'ID', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: 'name', name: '音乐名称', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: 'artist', name: '音乐作者', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: 'url', name: '音乐地址', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: 'cover', name: '音乐封面', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: 'lrc', name: '音乐歌词', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: 'insertTime', name: '插入时间',sort:true, show: true, width: '', enableSort: true, align: "center", fixed: false},
        {key: 'updateTime', name: '修改时间', show: true, width: '', enableSort: true, align: "center", fixed: false},
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
        this.request('api_blog_web_music_list', this.query).then(res => {
          this.datas = res.records || [];
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
      setSortType(this.query, sort);
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
      this.toast.showSmallModal('web音乐详情', ViewWebMusic, {datas})
    },
    //删除文章
    goDelete(data) {
      let p = {
        id: data.id || '',
      }
      this.toast.confirmDelete().then(() => {
        this.request('api_blog_web_music_delete', p).then(res => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.getDataList()
        }).catch(err => {
          this.$message({
            message: err.errMsg,
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
