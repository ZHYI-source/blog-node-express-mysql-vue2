<template>
  <!-- 客户信息 -->
  <section class="data-list-box">
    <section v-if="!show.view&&!show.edit">
      <lk-search-form :model="query"
                      :key="updataKey + 1"
                      :show-query="btnPerm.queryBtn"
                      :show-add="btnPerm.editBtn"
                      @edit="goEdit()"
                      @search="goPage(1)"
      >

        <el-form-item class="inline-item" prop="id">
          <el-input v-model.trim="query.params.id" clearable placeholder="输入用户ID搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="username">
          <el-input v-model.trim="query.params.username" clearable placeholder="输入用户名称搜索" size="mini"
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
      <lk-el-table :key="updataKey" :datas="datas" stripe :height="tableHeight" :loadingText="loading.text"
                   :loading="loading.list"
      >
        <template v-for="field in fields" v-if="field.show">
          <el-table-column v-if="field.key=='checkBox'" :align="field.align" type="selection"></el-table-column>

          <el-table-column v-else-if="field.key=='toolButton'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <lk-tool-button @view="goView(scope.row)"
                              @edit="goEdit(scope.row)"
                              @delete="goDelete(scope.row)"
              >
              </lk-tool-button>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='accountType'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <template>
                  <el-tag class="tags" type="info" v-if="scope.row.accountType == 0">基本用户</el-tag>
                  <el-tag class="tags" type="success" v-if="scope.row.accountType == 1">一般用户</el-tag>
                </template>
              </div>
            </template>
          </el-table-column>

          <el-table-column v-else-if="field.key=='licenseUrl'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <template>
                  <a class="link" v-if="scope.row.licenseUrl" :href="scope.row.licenseUrl" target="_blank">查看</a>
                  <span v-else>-</span>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='taxpayerType'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <template>
                  <el-tag class="tags" type="info" v-if="scope.row.taxpayerType == 0">一般纳税人</el-tag>
                  <el-tag class="tags" type="info" v-if="scope.row.taxpayerType == 1">小规模纳税人</el-tag>
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
                     :data-size="temp.dataSize" @changePageSize="changePageSize" @go="goPage"
      />
    </section>
    <view-user-info v-if="show.view" @close="closeView" :datas="viewData"/>
    <get-user-info v-if="show.edit" @close="closeEdit" :updateData="updateData"/>
  </section>
</template>
<script>
import {getToken} from "@/utils/auth";
import ViewUserInfo from "@/views/system/view-user-info";
import GetUserInfo from "@/views/system/get-user-info";

export default {
  name: 'dir-user-info',
  components: {
    GetUserInfo,
    ViewUserInfo,
  },
  data() {
    return {
      uploadHeader: {
        'x-access-token': getToken()
      },
      heightL: 580,
      tableHeight: 580,
      updataKey: 0,
      updateData: {},
      viewData: {},
      show: {
        edit: false,
        view: false,
        errUpload: false//错误信息导入
      },
      editData: {},
      date: [],
      //查询条件
      query: {
        size: 20,
        current: 1,
        //排序字段
        orderBy: 'insertTime',
        //排序类型
        orderType: 'DESC',
        params: {
          id: "",
          username: '',
        }
      },
      btnPerm: {
        queryBtn: false,
        viewBtn: false,
        editBtn: false,
      },
      //返回数据列表
      datas: [],
      //临时变量
      temp: {
        //数据总条数
        dataSize: 0,
        id: ''
      },
      ctl: {
        view: false,
        loading: false
      },
      errorUrl: '',
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
        {key: 'username', name: '账号', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: 'password', name: '密码', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {
          key: 'insertTime',
          name: '插入时间',
          show: true,
          width: '',
          enableSort: false,
          align: "center",
          fixed: false
        },
        {
          key: 'updateTime',
          name: '更新时间',
          show: true,
          width: '',
          enableSort: false,
          align: "center",
          fixed: false
        },
        {key: 'toolButton', name: '操作', show: true, width: '200', enableSort: false, align: "center", fixed: 'right'},
      ]
    }
  },
  watch: {
    'heightL'(val) {
      this.updataKey += 1
      this.tableHeight = val
    },
  },
  created() {
    this.getPerms()
    this.getDataList();
  },

  methods: {
    //获取窗口高度
    getWinHeight() {
      let that = this
      this.heightL = window.innerHeight - 340
      window.addEventListener('resize', () => {
        that.updataKey += 1
        that.heightL = window.innerHeight - 340
      })
    },
    //权限判断
    getPerms() {
      let perms = this.$store.getters.perms
      if (perms.includes('*')) {
        this.btnPerm.queryBtn = true;//查询
        this.btnPerm.viewBtn = true;//查看
        this.btnPerm.importBtn = true;//导入
        this.btnPerm.editBtn = true;//新增
        this.btnPerm.templateDownload = true;//下载用户模板
      } else {
        if (perms.includes('POST /admin/operate/worker/list')) {
          this.btnPerm.queryBtn = true;
        }
        if (perms.includes('POST /admin/operate/worker/import')) {
          this.btnPerm.importBtn = true;
        }
        if (perms.includes('POST /admin/operate/worker/create')) {
          this.btnPerm.editBtn = true;
        }
        if (perms.includes('POST /admin/operate/templateDownload')) {
          this.btnPerm.templateDownload = true;
        }
      }
    },

    getDataList() {
      this.loading.list = true;
      let that = this
      this.request('api_admin_user_list', this.query).then(res => {
        let datas = res.records || []
        that.datas = datas || [];
        that.temp.dataSize = res.total;
        that.loading.list = false;
      }).catch(err => {
        console.log(error)
        this.loading.list = false;
      })

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
      this.loading.list = false
      if (response.result === 0) {
        this.errorUrl = response.errFile;
        this.show.errUpload = true
        this.$message.error('导入失败，可以点击错误信息导出查看详情！');
        console.log("错误信息", this.errorUrl);
      } else {
        this.$message({
          message: '导入成功',
          type: 'success'
        });
      }
      this.goPage(1)
    },
    onError(err, file, fileList) {
      this.loading.list = false
    },
    onProgress() {
      this.loading.text = '导入中，请稍后。。。'
      this.loading.list = true
    },

    //添加编辑
    goEdit(data) {
      this.updateData = data || {}
      this.show.edit = true
    },
    //删除客户
    goDelete(data) {
      let that = this
      this.toast.confirmDelete().then(() => {
        this.request('api_admin_user_delete', {id: data.id}).then(res => {
          that.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.getDataList()
        }).catch(err => {
          console.log(err)
        })
      })
    },
    //关闭编辑
    closeEdit() {
      this.show.edit = false
      this.getDataList();
    },
    closeView() {
      this.show.view = false
      this.getDataList();
    },
    //跳转到查看详情
    goView(data) {
      this.viewData = data ? data : {};
      this.show.view = true
    },


  },
  mounted() {
    this.getWinHeight()
    this.getDataList();
  },
}
</script>

<style lang="scss" scoped>
.col-tags {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .time-item {
    padding: 0 5px;
    color: #696a6a;
    font-weight: 530;
  }

  .tags {
    margin: 2px;
  }
}

.downMB {
  font-size: 14px;
  line-height: 28px;
  padding: 0 8px;
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  color: #0a76a4;

  &:hover {
    color: #1890FF;
    text-decoration: underline;
  }
}

.link {
  color: #1989fa;
}
</style>
