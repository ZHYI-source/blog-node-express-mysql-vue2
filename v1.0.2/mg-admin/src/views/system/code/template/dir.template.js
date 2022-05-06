export const dirTemplate = function (dirObj) {
  return `
   <pre class="language-js"><code>&lt;template&gt;
  &lt;section&gt;
    &lt;d2-container type="full" v-if="!show.edit&amp;&amp;!show.view"&gt;
      &lt;section class="data-list-box"&gt;
        &lt;mk-search-form :model="query" @search="goPage(1)"&gt;
          ${dirObj.searchField}
        &lt;/mk-search-form&gt;
        &lt;div class="table-operate"&gt;
          &lt;table-field-filter :fields="fields" @showChange="updataKey +=1"/&gt;
          &lt;mk-table-button
            dis-delete
            :dis-add="false"
            @add="goEdit"
          &gt;
            &lt;el-button size="mini" icon="el-icon-upload" @click="exportEcx"&gt;导出&lt;/el-button&gt;
          &lt;/mk-table-button&gt;
        &lt;/div&gt;
        &lt;mk-el-table @sort="sortChange" :datas="datas" :key="updataKey" :height="tableHeight"
                     :loadingText="loading.text"
                     :loading="loading.list"&gt;
          &lt;template v-for="field in fields" v-if="field.show"&gt;
            &lt;el-table-column v-if="field.key=='checkBox'" :align="field.align" type="selection"&gt;&lt;/el-table-column&gt;
            &lt;el-table-column v-else-if="field.key=='toolButton'" :align="field.align" :label="field.name"
                             :width="field.width" :fixed="field.fixed"&gt;
              &lt;template slot-scope="scope"&gt;
                &lt;mk-tool-button @view="goView(scope.row)"
                                @edit="goEdit(scope.row)"
                                @delete="goDelete(scope.row)"&gt;
                &lt;/mk-tool-button&gt;
              &lt;/template&gt;
            &lt;/el-table-column&gt;
            &lt;el-table-column
              v-else
              show-overflow-tooltip
              :prop="field.key"
              :align="field.align"
              :label="field.name"
              :width="field.width"
              :sortable="field.enableSort?'custom':false"
              :fixed="field.fixed"
            &gt;&lt;/el-table-column&gt;
          &lt;/template&gt;

        &lt;/mk-el-table&gt;
        &lt;mk-pagination :current-page="query.offset" :page-size="query.limit"
                       :data-size="temp.dataSize" @go="goPage" @changePageSize="changePageSize"/&gt;
      &lt;/section&gt;
    &lt;/d2-container&gt;
  &lt;/section&gt;
&lt;/template&gt;

&lt;script&gt;

import Tools from "@/libs/utils.tool";
import {exportExecl} from "@/libs/util.export";
${dirObj.importField}

export default {
  ${dirObj.dirName},
  components:${dirObj.dirComponents},
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
      fields: [${dirObj.fields}]
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
      exportExecl(this, this.fields, this.datas, '列表', new Date().toLocaleDateString() + '导出的列表')
    },
    //获取窗口高度
    getWinHeight() {
      let that = this
      this.heightL = window.innerHeight - 320
      window.addEventListener('resize', () =&gt; {
        that.updataKey += 1
        that.heightL = window.innerHeight - 320
      })
    },
    getDataList() {
      try {
        this.loading.list = true;
        ${dirObj.dirApiFun}(this.query).then(res =&gt; {
          let datas = res.data || []
          for (const data of datas) {
            //时间格式化
            data.createdAt = data.createdAt &amp;&amp; Tools.fmtLong2DateTime(data.createdAt)
            data.updatedAt = data.updatedAt &amp;&amp; Tools.fmtLong2DateTime(data.updatedAt)
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
      this.$toast.confirm('此操作将永久删除该条数据, 是否继续?').then(() =&gt; {
        ${dirObj.deleteApiFun}(data.id).then(res =&gt; {
          this.$toast.success('删除成功')
          this.getDataList()
        }).catch(err =&gt; {
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
    // 排序
    sortChange(row) {
      this.query.sort.order = row.order === 'ascending' ? 'asc' : 'desc'
      this.query.sort.prop = row.prop
      this.getDataList()
    },
    //添加编辑
    goEdit(data) {
      this.$toast.showSmallModal(data &amp;&amp; data.id ? '修改' : '增加', ${dirObj.dirSingComponentGet}, {updateData: data}, data =&gt; {
        if (data) {
          this.getDataList()
        }
      })
    },
    //跳转到查看详情
    goView(data) {
      this.$toast.showSmallModal('查看', ${dirObj.dirSingComponentView}, {viewData: data || {}}, data =&gt; {
        // console.log(data)
      })
    }
  }
}
&lt;/script&gt;

&lt;style scoped&gt;

&lt;/style&gt;
</code></pre>
    `
}
