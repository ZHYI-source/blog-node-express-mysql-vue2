<template>
  <section>
    <d2-container type="card" v-if="!show.edit&&!show.view">
        <template slot="header"><el-button size="mini" icon="el-icon-back" @click="$emit('close')">返回</el-button> </template>
      <section class="data-list-box">
        <el-row>
          <el-col :span="6">
            <div style="display: flex;justify-content: left;flex-wrap: nowrap">
              <el-tag style="margin-right: 10px">表名: {{ tableData.tableName }}</el-tag>
              <el-tag type="warning">数据量: {{ tableData.rowsNum }}</el-tag>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-dark">
              <el-button size="mini" icon="el-icon-download" type="primary" @click="codeGeneration">代码生成</el-button>
<!--              <el-button size="mini" icon="el-icon-upload" @click="exportEcx">导出字段</el-button>-->
              <el-button size="mini" icon="el-icon-refresh-left" @click="goPage(1)">刷新</el-button>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>

        <el-row style="border-bottom: 1px solid #eee">
          <el-col :span="10">
            <mk-el-table @select-all="selectAll" @select="select" @sort="sortChange" :datas="datas" :key="updataKey"
                         :height="tableHeight"
                         :loadingText="loading.text"
                         :loading="loading.list">
              <template v-for="field in fields" v-if="field.show">
                <el-table-column v-if="field.key=='checkBox'" :align="field.align" type="selection"></el-table-column>
                <el-table-column v-else-if="field.key=='toolButton'" :align="field.align" :label="field.name"
                                 :width="field.width" :fixed="field.fixed">
                  <template slot-scope="scope">
                    <mk-tool-button @view="goView(scope.row)"
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
          </el-col>
          <el-col :span="14">
            <el-tabs type="card" :style="{height:tableHeight + 'px'}">
              <el-tab-pane label="LIST ( 列表页 )" style="overflow: auto" >
                <mk-md-editor v-model="list" mode="preview" :height="tableHeight - 80"/>
              </el-tab-pane>
              <el-tab-pane label="GET ( 编辑页 )" style="overflow: auto">
                <mk-md-editor v-model="getTemp" mode="preview" :height="tableHeight- 80"/>
              </el-tab-pane>
              <el-tab-pane label="VIEW  ( 详情页 )" style="overflow: auto">
                <mk-md-editor v-model="viewTemp" mode="preview" :height="tableHeight- 80"/>
              </el-tab-pane>
              <el-tab-pane label="API  ( 接口 )" style="overflow: auto" >
                <div>
                  <el-button v-copy="api" size="mini">复制接口代码</el-button>
                  <mk-md-editor v-model="api" mode="preview" :height="tableHeight- 100"/>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </section>
    </d2-container>
  </section>
</template>

<script>

import {exportExecl} from "@/libs/util.export";
import GetSortInfo from "@/views/client/get-sort-info";
import ViewSortInfo from "@/views/client/view-sort-info";
import {getOneTableInfo} from "@/api/modules/sys.code.api";
import MkBackList from "@/components/common/mk-back-list";
import DirTemplateInfo from "@/views/system/code/template/dir-template-info";
import GetTemplateInfo from "@/views/system/code/template/get-template-info";
import ViewTemplateInfo from "@/views/system/code/template/view-template-info";
import {dirTemplate} from "@/views/system/code/template/dir.template";
import {getTemplate} from "@/views/system/code/template/get.template";
import {viewTemplate} from "@/views/system/code/template/view.template";
import Tinymce from "@/components/Tinymce";
import MkMdEditor from "@/components/md-editor";
import MkViewCode from "@/components/common/mk-view-code";

export default {
  name: 'dir-code-table-info',
  components: {
    MkViewCode,
    MkMdEditor,
    Tinymce, ViewTemplateInfo, GetTemplateInfo, DirTemplateInfo, MkBackList, ViewSortInfo, GetSortInfo,
  },

  props: {
    tableData: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      api: ``,
      list: ``,
      getTemp: ``,
      viewTemp: ``,
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
      //列表渲染数据列
      fields: [
        {key: 'checkBox', name: '全选按钮', show: true, enableSort: false, fixed: false},
        // {key: 'table_name', name: '数据表名', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'fieldName', name: '字段名', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'type', name: '数据类型', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'comment', name: '备注', show: true, align: "center", enableSort: false, fixed: false},
        // {key: 'toolButton', name: '操作', show: true, align: "center", width: '220', enableSort: false, fixed: 'right'},
      ],
      filedArr: [],
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
    this.getDataList(this.tableData);
  },
  methods: {
    selectAll(val) {
      this.filedArr = val
    },
    select(val) {
      this.filedArr = val
    },
    codeGeneration() {
      if (this.filedArr && this.filedArr.length) {
        this.generateApi()
        this.generateList()
        this.generateGet()
        this.generateView()
      } else {
        this.$toast.warning('请选择字段')
      }

    },
    generateView() {
      let viewItemFields = ``

      for (const itemElement of this.filedArr) {
        let viewItem = ``
        if (itemElement.fieldName === 'createdAt' || itemElement.fieldName === 'updatedAt') {
          viewItem = `
        &lt;mk-view-row&gt;
          &lt;mk-view-item title="${itemElement.comment || itemElement.fieldName.toUpperCase()}" label-width="70"&gt;
            &lt;mk-view-date :date="form.${itemElement.fieldName}"/&gt;
          &lt;/mk-view-item&gt;
        &lt;/mk-view-row&gt;
      `
        } else {
          viewItem = `
        &lt;mk-view-row&gt;
          &lt;mk-view-item title="${itemElement.comment || itemElement.fieldName.toUpperCase()}" label-width="70"&gt;
            {{ form.${itemElement.fieldName} }}
          &lt;/mk-view-item&gt;
        &lt;/mk-view-row&gt;
      `
        }
        viewItemFields += viewItem

      }
      let str = this.tableData.tableName.match(/_(\S*)/)[1] //about
      //文件名称
      let viewPageName = `name: 'view-${str}-info'`
      let obj = {
        viewItemFields,
        viewPageName
      }
      this.viewTemp = viewTemplate(obj)
    },
    generateGet() {
      let inputFields = ``
      let rulesFields = ``
      for (const itemElement of this.filedArr) {
        //处理字段 fields
        let inputItem = `
       &lt;mk-get-row&gt;
          &lt;el-form-item label="${itemElement.comment || itemElement.fieldName.toUpperCase()}" prop="${itemElement.fieldName}"&gt;
            &lt;el-input v-model="form.${itemElement.fieldName}" size="mini" class="input-one" clearable placeholder="请输入${itemElement.comment || itemElement.fieldName.toUpperCase()}"&gt;&lt;/el-input&gt;
          &lt;/el-form-item&gt;
        &lt;/mk-get-row&gt;`
        inputFields += inputItem

        let rulesField = `
${itemElement.fieldName}: [{required: true, message: '请输入${itemElement.comment || itemElement.fieldName.toUpperCase()}', trigger: 'blur'},],
        `
        rulesFields += rulesField
      }
      // 处理导入模板
      let str = this.tableData.tableName.match(/_(\S*)/)[1] //about
      let uStr = this.tableData.tableName.match(/_(\S*)/)[1].slice(0, 1).toUpperCase() + this.tableData.tableName.match(/_(\S*)/)[1].slice(1) //About
      let importField = `
import {dir${uStr}Create, dir${uStr}Update} from "@/api/modules/sys.${str}.api";
        `
      //文件名称
      let getPageName = `name: 'get-${str}-info'`
      //接口函数
      let createApiFun = `dir${uStr}Create`
      let updateApiFun = `dir${uStr}Update`

      let obj = {
        inputFields,
        importField,
        getPageName,
        createApiFun,
        updateApiFun,
        rulesFields
      }
      this.getTemp = getTemplate(obj)

    },

    generateList() {
      //字段域
      let fields = `
        {key: 'toolButton', name: '操作', show: true, align: "center", width: '220', enableSort: false, fixed: 'right'},
      `
      //搜索条件
      let searchField = ``
      for (const itemElement of this.filedArr) {
        //处理字段 fields
        let item = `
        {key: '${itemElement.fieldName}', name: '${itemElement.comment || itemElement.fieldName.toUpperCase()}', show: true, align: "center", enableSort: false, fixed: false},`
        fields += item
        //处理 搜索条件
        let searchTemp = `
          &lt;el-form-item class="inline-item" prop="${itemElement.fieldName}"&gt;
            &lt;el-input v-model.trim="query.params.${itemElement.fieldName}" @clear="goPage(1)" @keyup.native.enter="goPage(1)"
                      clearable placeholder="输入${itemElement.comment || itemElement.fieldName.toUpperCase()}搜索"
                      size="mini"&gt;&lt;/el-input&gt;
          &lt;/el-form-item&gt;
      `
        searchField += searchTemp
      }
      // 处理导入模板
      let str = this.tableData.tableName.match(/_(\S*)/)[1] //about
      let uStr = this.tableData.tableName.match(/_(\S*)/)[1].slice(0, 1).toUpperCase() + this.tableData.tableName.match(/_(\S*)/)[1].slice(1) //About
      let importField = `
import {dir${uStr}Delete, dir${uStr}List} from "@/api/modules/sys.${str}.api";
import Get${uStr}Info from "./get-${str}-info";
import View${uStr}Info from "./view-${str}-info";
        `
      //文件名称
      let dirName = `name: 'dir-${str}-info'`
      //引入的组件
      let dirComponents = `{View${uStr}Info, Get${uStr}Info,}`
      let dirSingComponentView = `View${uStr}Info`
      let dirSingComponentGet = `Get${uStr}Info`

      //接口函数
      let dirApiFun = `dir${uStr}List`
      let deleteApiFun = `dir${uStr}Delete`
      let obj = {
        dirApiFun,
        deleteApiFun,
        dirSingComponentGet,
        dirSingComponentView,
        dirComponents,
        dirName,
        importField,
        searchField,
        fields,
      }
      this.list = dirTemplate(obj)
    },
    //创建api模板
    generateApi() {
      let str = this.tableData.tableName.match(/_(\S*)/)[1] //about
      let uStr = this.tableData.tableName.match(/_(\S*)/)[1].slice(0, 1).toUpperCase() + this.tableData.tableName.match(/_(\S*)/)[1].slice(1) //About
      let apiT = `
<pre class="language-javascript"><code>
import {get, post} from "@/api/http";

export const dirTempKeyList = (data) =&gt;
post("/mg/api/private/tempKey/list", data);


export const dirTempKeyDelete = (id) =&gt;
post("/mg/api/private/tempKey/delete", {id});


export const dirTempKeyCreate = (data) =&gt;
post("/mg/api/private/tempKey/create", data);

export const dirTempKeyUpdate = (data) =&gt;
post("/mg/api/private/tempKey/update", data);
</code></pre>`
      //生成api文件
      this.api = apiT.replaceAll('tempKey', str).replaceAll('TempKey', uStr)
    },

    //导出
    exportEcx() {
      exportExecl(this, this.fields, this.datas, '数据表信息', new Date().toLocaleDateString() + '导出的数据库列表')
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
    getDataList(tableData) {
      try {
        this.loading.list = true;
        getOneTableInfo({tableName: tableData.tableName}).then(res => {
          this.datas = res || []
          this.temp.dataSize = res.count;
          this.loading.list = false;
        })
      } catch (err) {
        this.$message.error('数据加载失败')
        this.loading.list = false;
      }
    },
    goDelete(data) {


    },
    close() {
      this.show.edit = false
      this.show.view = false
      this.getDataList()
    },
    //跳到页
    goPage(pageNum) {
      //查询数据
      this.getDataList(this.tableData);
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
//    排序
    sortChange(row) {
      this.query.sort.order = row.order === 'ascending' ? 'asc' : 'desc'
      this.query.sort.prop = row.prop
      this.getDataList()
    },
//添加编辑
    goEdit(data) {
      this.$toast.showMiniModal(data && data.id ? '修改数据库' : '增加数据库', GetSortInfo, {updateData: data}, data => {
        if (data) {
          this.getDataList()
        }
      })
    },
//跳转到查看详情
    goView(data) {
      this.$toast.showMiniModal('查看数据库', ViewSortInfo, {viewData: data || {}}, data => {
        // console.log(data)
      })
    }
  }
}
</script>

<style scoped>

</style>
