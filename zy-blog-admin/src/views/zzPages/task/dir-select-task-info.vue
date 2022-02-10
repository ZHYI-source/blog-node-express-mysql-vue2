<template>

  <section class="data-list-box">
    <section v-if="!show.edit">
      <lk-search-form :model="query" @search="goPage(1)">
        <el-form-item class="inline-item" prop="taskName">
          <el-input v-model.trim="query.params.taskName" clearable placeholder="输入任务名称搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
      </lk-search-form>
      <lk-el-table
        :datas="datas" stripe height="355" :loadingText="loading.text" :loading="loading.list"
      >
        <template v-for="field in fields" v-if="field.show">
          <el-table-column v-if="field.key=='radio'" :width="field.width" :label="field.name" :align="field.align">
            <template slot-scope="scope">
              <el-radio v-model="selectedTask" :label="scope.row.id" @change.native="getCurrentRow(scope.row)">
                <span></span>
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='toolButton'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <lk-tool-button @view="goView(scope.row)"
                              @edit="goEdit(scope.row)"
                              :disView="!btnPerm.viewBtn"
                              @delete="goDelete(scope.row)"
              >
              </lk-tool-button>
            </template>
          </el-table-column>
          <el-table-column v-else-if="field.key=='items'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <div class="col-tags">
                <template v-for="(item,index) in scope.row.items">
                  <el-tag class="tags" type="info" v-if="item">{{ item }}</el-tag>
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
    <el-row>
      <div class="btnss">
        <el-button type="primary" size="mini" @click="saveTask">保存</el-button>
        <el-button type="danger" size="mini" @click="$emit('close')">取消</el-button>
      </div>
    </el-row>
    <GetTaskInfo v-if="show.edit" :updateData="updateData" @close="closeEdit"/>
  </section>
</template>

<script>
/**
 *@author ZY
 *@date 2021/12/9
 *@Description:任务信息
 */
import {getToken} from "@/utils/auth";
import ViewTaskInfo from "@/views/zzPages/task/view-task-info";
import GetTaskInfo from "@/views/zzPages/task/get-task-info";
import Tools from "@/libs/tool";
import LkGetButton from "@/components/common/lk-get-button";

export default {
  name: 'dir-select-task-info',
  components: {
    LkGetButton,
    GetTaskInfo,
    ViewTaskInfo,
  },
  data() {
    return {
      selectedTask: '',
      uploadHeader: {
        'x-access-token': getToken()
      },
      updateData: {},//修改任务数据
      show: {
        edit: false,
        view: false,
        update: false
      },
      curentTask: {},
      date: null,
      //查询条件
      query: {
        size: 20,
        current: 1,
        params: {
          endTime: null,
          id: '',
          startTime: null,
          taskName: ""
        }
      },
      btnPerm: {
        queryBtn: false,
        viewBtn: false,
        updateBtn: false,
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
        {key: 'radio', name: '选择', show: true, width: '80', enableSort: false, align: "center", fixed: false},
        {key: 'taskName', name: '任务名称', show: true, width: '180', enableSort: false, align: "center", fixed: false},
        // {key: 'content', name: '任务内容', show: true, width: '', enableSort: false, align: "center", fixed: false},
        // {key: 'budget', name: '任务预算', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: 'companyName', name: '需求公司', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: 'phone', name: '联系人手机号', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {
          key: 'endTimestamp',
          name: '任务截止时间',
          show: true,
          width: '',
          enableSort: false,
          align: "center",
          fixed: false
        },
      ]
    }
  },
  created() {
    this.getDataList();
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.curentTask = {}
      try {
        this.loading.list = true;
        //时间转存
        this.query.params.startTime = this.date && this.date.length > 0 ? this.date[0] : null
        this.query.params.endTime = this.date && this.date.length > 0 ? this.date[1] : null
        this.request('api_admin_task_task_list', this.query).then(res => {
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
    //保存
    saveTask() {
      if (this.curentTask && this.curentTask.id) {
        this.$emit('close', this.curentTask)
      } else {
        this.$message.error('请选择任务！');
      }
    },
    //选择任务
    getCurrentRow(val) {
      this.curentTask = val || {}
    },

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

.btnss {
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-content: center;
  border-top: 1px solid #eee;
  padding-top: 10px;
}
</style>
