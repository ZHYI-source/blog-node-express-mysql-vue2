<template>
  <section>
    <d2-container type="full" v-if="!show.edit&&!show.view">
      <section class="data-list-box">
        <mk-search-form :model="query" v-if="permBtn.queryButton" @search="goPage(1)">
          <el-form-item class="inline-item" prop="role_name">
            <el-input v-model.trim="query.params.role_name" @clear="goPage(1)" @keyup.native.enter="goPage(1)"
                      clearable placeholder="输入角色名称搜索"
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
                                @edit="goEdit(scope.row)"
                                :dis-delete="!permBtn.deleteButton && scope.row.role_name==='admin'"
                                :dis-edit="!permBtn.updateButton"
                                edit-text="修改/权限"
                                @delete="goDelete(scope.row)">
                  <!--                  <el-button type="primary" size="mini" @click="assignPermissions(scope.row)">权限分配</el-button>-->
                </mk-tool-button>
              </template>
            </el-table-column>
            <el-table-column v-else-if="field.key=='expand'" type="expand">
              <template slot-scope="scope">
                <el-row
                  v-for="(item, i1) in scope.row.menus"
                  :key="item.id"
                  :class="[i1 === 0 ? '' : 'bdtop', 'vcenter']"
                >
                  <!-- 一级权限 -->
                  <el-col :span="5" >
                    <el-tag  @close="removeRightById(scope.row, item.id)"> <i class="el-icon-s-flag"></i>{{ item.title }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 二级和三级 -->
                  <el-col :span="19">
                    <!-- 通过for循环 渲染二级权限 -->
                    <el-row
                      v-for="(item2, i2) in item.children"
                      :key="item2.id"
                    >
                      <el-col :span="6 ">
                        <el-tag
                          type="success"
                        >
                          <i class="el-icon-s-flag"/>
                          {{ item2.title }}
                        </el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <el-col :span="18">
                        <el-tag
                          type="warning"
                          v-for="(item3) in item2.children"
                          :key="item3.id"
                        >
                          <i class="el-icon-s-flag"></i> {{ item3.title }}
                        </el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
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
                       :data-size="temp.dataSize" @go="goPage(1)" @changePageSize="changePageSize"/>
      </section>
    </d2-container>
  </section>
</template>

<script>

import Tools from "@/libs/utils.tool";
import {exportExecl} from "@/libs/util.export";

import {dirRolesDelete, dirRolesList} from "@/api/modules/sys.roles.api";
import GetRolesInfo from "./get-roles-info";
import ViewRolesInfo from "./view-roles-info";
import GetPermInfo from "@/views/system/roles/get-perm-info";
import util from "@/libs/util";


export default {
  name: 'dir-roles-info',
  components: {GetPermInfo, ViewRolesInfo, GetRolesInfo,},
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
        limit: 15,//每页显示条数
        offset: 1,//页码
        sort: {
          prop: 'createdAt',
          order: 'desc',
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
        {key: 'expand', name: '', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'toolButton', name: '操作', show: true, align: "center", width: '280', enableSort: false, fixed: 'right'},
        // {key: 'id', name: 'ID', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'role_name', name: '角色名称', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'role_desc', name: '角色描述', show: true, align: "center", enableSort: false, fixed: false},
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
      let perms = JSON.parse(util.cookies.get('permMenus'))
      if (perms.includes('*')) {
        this.permBtn.createButton = true;
        this.permBtn.queryButton = true;
        this.permBtn.deleteButton = true;
        this.permBtn.updateButton = true;
      } else {
        if (perms.includes('POST /api/private/roles/create')) {
          this.permBtn.createButton = true;
        }
        if (perms.includes('POST /api/private/roles/list')) {
          this.permBtn.queryButton = true;
        }
        if (perms.includes('POST /api/private/roles/update')) {
          this.permBtn.updateButton = true;
        }
        if (perms.includes('POST /api/private/roles/delete')) {
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
        dirRolesList(this.query).then(res => {
          let datas = res.data || []

          for (const data of datas) {
            //时间格式化
            data.createdAt = data.createdAt && Tools.fmtLong2DateTime(data.createdAt)
            data.updatedAt = data.updatedAt && Tools.fmtLong2DateTime(data.updatedAt)
            //排序
            data.menus.sort((a,b)=>{
              return a.id - b.id
            })
            data.menus = Tools.listToTree(data.menus)
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
        dirRolesDelete(data.id).then(res => {
          this.$toast.success('删除成功')
          this.getDataList()
        }).catch(err => {
          console.log(err)
        })
      });

    },
    assignPermissions(row) {
      this.$toast.showSmallModal('权限分配', GetPermInfo, {updateData: row}, data => {
        if (data) {
          this.getDataList()
        }
      })
    },
    //删除权限
    removeRightById(row,itemId){
      console.log(row,itemId)
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
    // 排序
    sortChange(row) {
      this.query.sort.order = row.order === 'ascending' ? 'asc' : 'desc'
      this.query.sort.prop = row.prop
      this.getDataList()
    },
    //添加编辑
    goEdit(data) {
      this.$toast.showSmallModal(data && data.id ? '修改角色' : '增加角色', GetRolesInfo, {updateData: data}, data => {
        if (data) {
          this.getDataList()
        }
      })
    },
    //跳转到查看详情
    goView(data) {
      this.$toast.showSmallModal('查看', ViewRolesInfo, {viewData: data || {}}, data => {
        // console.log(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>
