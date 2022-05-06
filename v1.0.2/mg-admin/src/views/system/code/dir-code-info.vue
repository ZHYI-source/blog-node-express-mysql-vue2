<template>
  <section>
    <d2-container type="full" v-if="!show.edit&&!show.view">
      <section class="data-list-box">
        <div class="table-operate">
          <table-field-filter :fields="fields" @showChange="updataKey +=1"/>
          <mk-table-button
            dis-delete
            :dis-add="false"
            add-text="查询"
            @add="goPage(1)"
          >
            <el-button size="mini" icon="el-icon-upload" @click="exportEcx">导出</el-button>
          </mk-table-button>
        </div>
        <mk-el-table :datas="datas" :key="updataKey" :height="tableHeight"
                     :loadingText="loading.text"
                     :loading="loading.list">
          <template v-for="field in fields" v-if="field.show">
            <el-table-column v-if="field.key=='checkBox'" :align="field.align" type="selection"></el-table-column>
            <el-table-column v-else-if="field.key=='toolButton'" :align="field.align" :label="field.name"
                             :width="field.width" :fixed="field.fixed">
              <template slot-scope="scope">
                <mk-tool-button @view="goView(scope.row)"
                                dis-delete
                                dis-edit>
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
      </section>
    </d2-container>
    <dir-code-table-info v-if="show.view" :tableData="tableData" @close="close"/>
  </section>
</template>

<script>

import {exportExecl} from "@/libs/util.export";
import GetSortInfo from "@/views/client/get-sort-info";
import ViewSortInfo from "@/views/client/view-sort-info";
import {dirTablesList} from "@/api/modules/sys.code.api";
import DirCodeTableInfo from "@/views/system/code/dir-code-table-info";


export default {
  name: 'dir-code-info',
  components: {DirCodeTableInfo, ViewSortInfo, GetSortInfo,},
  data() {
    return {
      show: {
        edit: false,
        view: false
      },
      tableData: {},
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
      item_data: {},
      //列表渲染数据列
      fields: [
        // {key: 'checkBox', name: '全选按钮', show: true, enableSort: false, fixed: false},
        {key: 'tableName', name: '数据表名', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'rowsNum', name: '数据量', show: true, align: "center", enableSort: false, fixed: false},
        {key: 'toolButton', name: '操作', show: true, align: "center", width: '220', enableSort: false, fixed: 'right'},
      ]
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
  },
  methods: {
    //导出
    exportEcx() {
      exportExecl(this, this.fields, this.datas, '数据库列表', new Date().toLocaleDateString() + '导出的数据库列表')
    },
    //获取窗口高度
    getWinHeight() {
      let that = this
      this.heightL = window.innerHeight - 240
      window.addEventListener('resize', () => {
        that.updataKey += 1
        that.heightL = window.innerHeight - 240
      })
    },
    getDataList() {
      try {
        this.loading.list = true;
        dirTablesList(this.query).then(res => {
          this.datas = res || [];
          this.temp.dataSize = res.count;
          this.loading.list = false;
        })
      } catch (err) {
        this.$message.error('数据加载失败')
        this.loading.list = false;
      }
    },
    //跳到页
    goPage(pageNum) {
      this.query.offset = pageNum
      //查询数据
      this.getDataList();
    },
    close() {
      this.show.edit = false
      this.show.view = false
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
      console.log(data)
      this.show.view = true
      this.tableData = data
    }
  }
}
</script>

<style scoped>

</style>
