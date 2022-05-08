<template>
  <section>
    <d2-container type="full" v-if="!show.edit&&!show.view">
      <section class="data-list-box">
        <mk-search-form :model="query" v-if="permBtn.queryButton" @search="goPage(1)">

          <el-form-item class="inline-item" prop="id">
            <el-input v-model.trim="query.params.id" @clear="goPage(1)" @keyup.native.enter="goPage(1)"
                      clearable placeholder="输入ID搜索"
                      size="mini"></el-input>
          </el-form-item>

          <el-form-item class="inline-item" prop="pid">
            <el-input v-model.trim="query.params.pid" @clear="goPage(1)" @keyup.native.enter="goPage(1)"
                      clearable placeholder="输入父级ID搜索"
                      size="mini"></el-input>
          </el-form-item>

          <el-form-item class="inline-item" prop="title">
            <el-input v-model.trim="query.params.title" @clear="goPage(1)" @keyup.native.enter="goPage(1)"
                      clearable placeholder="输入菜单标题搜索"
                      size="mini"></el-input>
          </el-form-item>
        </mk-search-form>
        <div class="table-operate">
          <table-field-filter :fields="fields" @showChange="updataKey +=1"/>
          <mk-table-button
            dis-delete
            :dis-add="!permBtn.createButton"
            @add="goEdit"
          >
            <el-button size="mini" icon="el-icon-upload" @click="exportEcx">导出</el-button>
          </mk-table-button>
        </div>
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
                  <el-button size="mini" v-if="scope.row.lever!==3 && permBtn.createButton" type="primary" @click="goEditSub(scope.row)">增加子菜单
                  </el-button>
                </mk-tool-button>
              </template>
            </el-table-column>
            <el-table-column v-else-if="field.key=='lever'" :align="field.align" :label="field.name"
                             :width="field.width" :fixed="field.fixed">
              <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.lever===1">一级</el-tag>
                <el-tag type="info" v-if="scope.row.lever===2">二级</el-tag>
                <el-tag type="warning" v-if="scope.row.lever===3">三级</el-tag>
              </template>
            </el-table-column>
            <el-table-column v-else-if="field.key=='icon'" :align="field.align" :label="field.name"
                             :width="field.width" :fixed="field.fixed">
              <template slot-scope="scope">
                <i :class="'fa fa-' + scope.row.icon"></i>
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
        <!--        <mk-pagination :current-page="query.offset" :page-size="query.limit"-->
        <!--                       :data-size="temp.dataSize" @go="goPage" @changePageSize="changePageSize"/>-->
      </section>
    </d2-container>
  </section>
</template>

<script>

import Tools from "@/libs/utils.tool";
import {exportExecl} from "@/libs/util.export";

import {dirMenusDelete, dirMenusList} from "@/api/modules/sys.menus.api";
import GetMenusInfo from "./get-menus-info";
import ViewMenusInfo from "./view-menus-info";
import GetSubMenusInfo from "@/views/system/menus/get-sub-menus-info";
import util from "@/libs/util";


export default {
  name: 'dir-menus-info',
  components: {GetSubMenusInfo, ViewMenusInfo, GetMenusInfo,},
  data() {
    return {
      show: {
        edit: false,
        view: false
      },
      updateData: {},
      type: '',
      updataKey: 0,
      heightL: 580,
      tableHeight: 580,
      //查询条件
      query: {
        params: {},
        limit: 300,//每页显示条数
        offset: 1,//页码
        sort: {
          prop: 'pid',
          order: 'asc',
        }
      },
      permBtn: {
        createButton: false,
        queryButton: false,
        deleteButton: false,
        updateButton: false,
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
        {key: 'toolButton', name: '操作', show: true, align: "center", width: '280', enableSort: false, fixed: 'right'},

        {key: 'id', name: 'ID', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'pid', name: '父级ID', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'path', name: '菜单路径', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'title', name: '菜单标题', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'icon', name: '菜单图标', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'lever', name: '类型', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'authority', name: '权限标识', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'createdAt', name: '创建时间', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'updatedAt', name: '更新时间', show: true, align: "center", enableSort: false, fixed: false},]
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
      let perms = JSON.parse(util.cookies.get('permMenus'))
      if (perms.includes('*')) {
        this.permBtn.createButton = true;
        this.permBtn.queryButton = true;
        this.permBtn.deleteButton = true;
        this.permBtn.updateButton = true;
      } else {
        if (perms.includes('POST /api/private/menus/create')) {
          this.permBtn.createButton = true;
        }
        if (perms.includes('POST /api/private/menus/list')) {
          this.permBtn.queryButton = true;
        }
        if (perms.includes('POST /api/private/menus/update')) {
          this.permBtn.updateButton = true;
        }
        if (perms.includes('POST /api/private/menus/delete')) {
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
      this.heightL = window.innerHeight - 270
      window.addEventListener('resize', () => {
        that.updataKey += 1
        that.heightL = window.innerHeight - 270
      })
    },
    listToTree(list) {
      let map = {}, node, tree = [], i;
      for (i = 0; i < list.length; i++) {
        map[list[i].id] = list[i];
        list[i].children = [];
      }
      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.pid !== 1) {
          map[node.pid].children.push(node);
        } else {
          // delete
          tree.push(node);
        }
      }
      return tree;
    },
    getDataList() {
      try {
        this.loading.list = true;
        dirMenusList(this.query).then(res => {
          let datas = res.data || []
          for (const data of datas) {
            //时间格式化
            data.createdAt = data.createdAt && Tools.fmtLong2DateTime(data.createdAt)
            data.updatedAt = data.updatedAt && Tools.fmtLong2DateTime(data.updatedAt)
          }
          this.datas = this.listToTree(datas);
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
        dirMenusDelete(data.id).then(res => {
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
      // this.query.offset = 1;
      this.getDataList();
    },
    //重置查询条件
    resetQuery(formName) {
      this.$refs[formName].resetFields();
      this.goPage(1);
    },
    // 排序
    sortChange(row) {
      this.query.sort.order = row.order === 'ascending' ? 'asc' : 'desc'
      this.query.sort.prop = row.prop
      this.getDataList()
    },
    //添加编辑
    goEdit(data) {
      this.$toast.showSmallModal(data && data.id ? '修改菜单' : '增加菜单', GetMenusInfo, {updateData: data}, data => {
        this.updataKey += 1
        if (data) {
          this.getDataList()
        }
      })
    },
    //添加编辑
    goEditSub(data) {
      this.$toast.showSmallModal(data && data.id ? '增加子菜单' : '增加子菜单', GetSubMenusInfo, {updateData: data}, data => {
        if (data) {
          this.getDataList()
        }
      })
    },
    //跳转到查看详情
    goView(data) {
      this.$toast.showSmallModal('查看', ViewMenusInfo, {viewData: data || {}}, data => {
        // console.log(data)
      })
    }
  }
}
</script>

<style scoped>

</style>
