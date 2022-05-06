<template>
  <section>
    <d2-container type="full" v-if="!show.edit&&!show.view">
      <section class="data-list-box">
        <mk-search-form :model="query" v-if="permBtn.queryButton" @search="goPage(1)">
          <el-form-item class="inline-item" prop="path">
            <el-input v-model.trim="query.params.path" @clear="goPage(1)" @keyup.native.enter="goPage(1)"
                      clearable placeholder="输入友链地址搜索"
                      size="mini"></el-input>
          </el-form-item>

          <el-form-item class="inline-item" prop="siteName">
            <el-input v-model.trim="query.params.siteName" @clear="goPage(1)" @keyup.native.enter="goPage(1)"
                      clearable placeholder="输入友链站点搜索"
                      size="mini"></el-input>
          </el-form-item>

          <el-form-item class="inline-item" prop="email">
            <el-input v-model.trim="query.params.email" @clear="goPage(1)" @keyup.native.enter="goPage(1)"
                      clearable placeholder="输入友链邮箱搜索"
                      size="mini"></el-input>
          </el-form-item>
        </mk-search-form>
        <div class="table-operate">
          <table-field-filter :fields="fields" v-if="show.type" @showChange="updataKey +=1"/>
          <mk-table-button
            dis-delete
            :dis-add="!permBtn.createButton"
            @add="goEdit"
          >
            <el-button type="primary" size="mini" icon="el-icon-more" @click="show.type=!show.type"></el-button>
            <el-button size="mini" icon="el-icon-upload" @click="exportEcx">导出</el-button>
          </mk-table-button>
        </div>

        <div v-if="show.type">
          <mk-el-table @sort="sortChange" :datas="datas" :key="updataKey" :height="tableHeight"
                       :loadingText="loading.text"
                       :loading="loading.list">
            <template v-for="field in fields" v-if="field.show">
              <el-table-column v-if="field.key=='checkBox'" :align="field.align" type="selection"></el-table-column>
              <el-table-column v-else-if="field.key=='toolButton'" :align="field.align" :label="field.name"
                               :width="field.width" :fixed="field.fixed">
                <template slot-scope="scope">
                  <mk-tool-button @view="goView(scope.row)"
                                  :dis-delete="!permBtn.deleteButton"
                                  :dis-edit="!permBtn.updateButton"
                                  @edit="goEdit(scope.row)"
                                  @delete="goDelete(scope.row)">
                  </mk-tool-button>
                </template>
              </el-table-column>
              <el-table-column
                v-else
                show-overflow-tooltip
                :prop="field.key"
                :align="field.align"
                :label="field.name"
                :width="field.width"
                :sortable="field.enableSort?'custom':false"
                :fixed="field.fixed"
              ></el-table-column>
            </template>

          </mk-el-table>
          <mk-pagination :current-page="query.offset" :page-size="query.limit"
                         :data-size="temp.dataSize" @go="goPage" @changePageSize="changePageSize"/>
        </div>
        <div class="card-list" v-if="!show.type" :style="{height:tableHeight + 'px'}">
          <el-card class="box-card"  v-for="item in datas" :key="item.id">
            <div slot="header" class="card-hd">
              <span>{{item.siteName}}</span>
              <el-button  @click="goFriend(item.path)" type="primary" icon="el-icon-view" size="mini" circle></el-button>
            </div>
            <div class="text item">
             邮箱： {{item.email}}
            </div>
            <div class="text item">
              描述：{{item.desc}}
            </div>
          </el-card>
        </div>
        <mk-pagination :current-page="query.offset" :page-size="query.limit"
                       :data-size="temp.dataSize" @go="goPage" @changePageSize="changePageSize"/>
      </section>
    </d2-container>
  </section>
</template>

<script>

import Tools from "@/libs/utils.tool";
import {exportExecl} from "@/libs/util.export";

import {dirFriendsDelete, dirFriendsList} from "@/api/modules/sys.friends.api";
import GetFriendsInfo from "./get-friends-info";
import ViewFriendsInfo from "./view-friends-info";
import util from "@/libs/util";

export default {
  name: 'dir-friends-info',
  components:{ViewFriendsInfo, GetFriendsInfo,},
  data() {
    return {
      show: {
        edit: false,
        view: false,
        type: false,
      },
      updateData: {},
      type: '',
      updataKey: 0,
      heightL: 580,
      tableHeight: 580,
      //查询条件
      query: {
        params: {},
        limit: 15,//每页显示条数
        offset: 1,//页码
        sort: {
          prop: 'createdAt',
          order: 'desc',
        }
      },
      permBtn:{
        createButton:false,
        queryButton:false,
        deleteButton:false,
        updateButton:false,
      },
      //返回数据列表
      datas: [],
      //临时变量
      temp: {
        //数据总调数
        dataSize: 0,
        //当前选中的id
        id: '',
        //
        item: []
      },
      //汇总数据
      totals: [],
      //加载中效果
      loading: {
        //获取列表数据中
        list: false,
        text: '加载中'
      },
      item_data: {},
      //列表渲染数据列
      fields: [
        {key: 'toolButton', name: '操作', show: true, align: "center", width: '220', enableSort: false, fixed: 'right'},

        {key: 'id', name: 'ID', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'path', name: '友链地址', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'siteName', name: '友链站点', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'email', name: '友链邮箱', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'desc', name: '友链描述', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'createdAt', name: '创建时间', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'updatedAt', name: '修改时间', show: true, align: "center", enableSort: false, fixed: false},]
    }
  },
  watch: {
    'heightL'(val) {
      this.updataKey += 1
      this.tableHeight = val
    },
  },
  mounted() {
    this.getWinHeight()
    this.getDataList();
    this.getPerms()
  },
  methods: {
    getPerms() {
       // let perms = this.$store.state.d2admin.perms.permsArr
      let perms =JSON.parse(util.cookies.get('permMenus'))
      if (perms.includes('*')) {
        this.permBtn.createButton = true;
        this.permBtn.queryButton = true;
        this.permBtn.deleteButton = true;
        this.permBtn.updateButton = true;
      } else {
        if (perms.includes('POST /api/private/friends/create')) {
          this.permBtn.createButton = true;
        }
        if (perms.includes('POST /api/private/friends/list')) {
          this.permBtn.queryButton = true;
        }
        if (perms.includes('POST /api/private/friends/update')) {
          this.permBtn.updateButton = true;
        }
        if (perms.includes('POST /api/private/friends/delete')) {
          this.permBtn.deleteButton = true;
        }
      }
    },
    //导出
    exportEcx() {
      exportExecl(this, this.fields, this.datas, '列表', new Date().toLocaleDateString() + '导出的列表')
    },
    //获取窗口高度
    getWinHeight() {
      let that = this
      this.heightL = window.innerHeight - 320
      window.addEventListener('resize', () => {
        that.updataKey += 1
        that.heightL = window.innerHeight - 320
      })
    },
    getDataList() {
      try {
        this.loading.list = true;
        dirFriendsList(this.query).then(res => {
          let datas = res.data || []
          for (const data of datas) {
            //时间格式化
            data.createdAt = data.createdAt && Tools.fmtLong2DateTime(data.createdAt)
            data.updatedAt = data.updatedAt && Tools.fmtLong2DateTime(data.updatedAt)
          }
          this.datas = datas;
          this.temp.dataSize = res.count;
          this.loading.list = false;
        })
      } catch (err) {
        this.$message.error('数据加载失败')
        this.loading.list = false;
      }
    },
    goDelete(data) {
      this.$toast.confirm('此操作将永久删除该条数据, 是否继续?').then(() => {
        dirFriendsDelete(data.id).then(res => {
          this.$toast.success('删除成功')
          this.getDataList()
        }).catch(err => {
          console.log(err)
        })
      });

    },
    close() {
      this.show.edit = false
      this.show.view = false
      this.getDataList()
    },
    //跳到页
    goPage(pageNum) {
      this.query.offset = pageNum
      //查询数据
      this.getDataList();
    },
    //改变每页数据量
    changePageSize(size) {
      this.query.limit = size;
      this.query.offset = 1;
      this.getDataList();
    },
    //重置查询条件
    resetQuery(formName) {
      this.$refs[formName].resetFields();
      this.goPage(1);
    },
    goFriend(url){
      let a = document.createElement('a');
      a.href = url;
      a.click();
    },
    // 排序
    sortChange(row) {
      this.query.sort.order = row.order === 'ascending' ? 'asc' : 'desc'
      this.query.sort.prop = row.prop
      this.getDataList()
    },
    //添加编辑
    goEdit(data) {
      this.$toast.showSmallModal(data && data.id ? '修改友链' : '增加友链', GetFriendsInfo, {updateData: data}, data => {
        if (data) {
          this.getDataList()
        }
      })
    },
    //跳转到查看详情
    goView(data) {
      this.$toast.showSmallModal('查看友链', ViewFriendsInfo, {viewData: data || {}}, data => {
        // console.log(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.text {
  font-size: 12px;
}

.item {
  margin-bottom: 8px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 255px;
  margin: 10px;
  height: 150px;
  .card-hd {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
}
</style>
