<template>

  <section class="data-list-box">
    <section>
      <lk-search-form :model="query"

                      @search="goPage(1)">
        <el-form-item class="inline-item" prop="workerName">
          <el-input v-model.trim="query.params.workerName" clearable placeholder="输入用户姓名搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="idCard">
          <el-input v-model.trim="query.params.idCard" clearable placeholder="输入身份证号搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
        <el-form-item class="inline-item" prop="phone">
          <el-input v-model.trim="query.params.phone" clearable placeholder="输入用户手机号搜索" size="mini"
                    @clear="goPage(1)" @keyup.enter.native="goPage(1)"
          ></el-input>
        </el-form-item>
      </lk-search-form>
      <lk-el-table :datas="datas"
                   @select="multipleSelect"
                   @select-all="AllSelect"
                   stripe height="350" :loadingText="loading.text" :loading="loading.list"
      >
        <template v-for="field in fields" v-if="field.show">
          <!--          <el-table-column v-if="field.key=='radio'" :width="field.width" :label="field.name" :align="field.align">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-radio v-model="selectedWorker" :label="scope.row.idCard" @change.native="getCurrentRow(scope.row)"><span></span>-->
          <!--              </el-radio>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <el-table-column v-if="field.key=='checkBox'" :align="field.align" type="selection"></el-table-column>
          <el-table-column v-else-if="field.key=='toolButton'" :align="field.align" :label="field.name"
                           :width="field.width" :fixed="field.fixed"
          >
            <template slot-scope="scope">
              <lk-tool-button @view="goView(scope.row)"
                              :disView="!btnPerm.viewBtn"
                              dis-delete
                              dis-edit
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
<!--    <el-row v-if="employeeArr.length">-->
<!--      <div class="employee-arr">-->
<!--        <span>已选用户：</span>-->
<!--        <el-tag v-for="(item,index) in employeeArr" :key="index" class="p-tag">{{ item.workerName }}</el-tag>-->
<!--      </div>-->
<!--    </el-row>-->
    <el-row>
      <div class="btnss">
        <el-button type="primary" size="mini" @click="saveTask">保存</el-button>
        <el-button type="danger" size="mini" @click="$emit('close')">取消</el-button>
      </div>
    </el-row>
  </section>
</template>
<script>
import ViewEmployeeInfo from "@/views/zzPages/operations/view-employee-info";
import GetEmployeeInfo from "@/views/zzPages/operations/get-employee-info";
import {getToken} from "@/utils/auth";
import Tools from "@/libs/tool";

export default {
  name: 'dir-select-employee-info',
  components: {
    GetEmployeeInfo,
    ViewEmployeeInfo,
  },
  props:{
    employeeData:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      employee: {},
      employeeArr: [],
      uploadHeader: {
        'x-access-token': getToken()
      },
      show: {
        edit: false,
        view: false
      },
      currentWorker: {},
      selectedWorker: '',
      date: [],
      //查询条件
      query: {
        size: 20,
        current: 1,
        params: {
          account: "",
          endTime: null,
          idCard: "",
          phone: "",
          startTime: null,
          workerName: ""
        }
      },
      btnPerm: {
        queryBtn: false,
        viewBtn: false,
        exportBtn: false,
        editBtn: false
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
        // {key: 'radio', name: '选择', show: true, width: '80', enableSort: false, align: "center", fixed: false},
        {key: 'checkBox', name: '选择', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: 'idCard', name: '身份证号', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: 'workerName', name: '用户姓名', show: true, width: '', enableSort: false, align: "center", fixed: false},
        {key: 'phone', name: '用户手机号', show: true, width: '', enableSort: false, align: "center", fixed: false},
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
    //多选
    multipleSelect(val) {
      this.employeeArr = val || []
    },
    //全选
    AllSelect(val) {
      this.employeeArr = val || []
    },
    getDataList() {
      this.loading.list = true;
      let that = this
      //时间转存
      this.query.params.startTime = this.date && this.date.length > 0 ? this.date[0] : null
      this.query.params.endTime = this.date && this.date.length > 0 ? this.date[1] : null
      this.request('api_admin_operate_worker_list', this.query).then(res => {
        let datas = res.records || []
        for (const data of datas) {
          //时间格式化
          data.insertTimestamp = Tools.fmtLong2DateTime(Number(data.insertTimestamp))
          data.updateTimestamp = Tools.fmtLong2DateTime(Number(data.updateTimestamp))
        }
        that.datas = datas;
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
    //保存
    saveTask() {
      if (this.employeeArr.length) {
        this.$emit('close', this.employeeArr)
      } else {
        this.$message.error('请选择用户！');
      }

    },
    //选择用户
    getCurrentRow(val) {
      this.currentWorker = val || {}
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

.employee-arr {
  margin-top: 10px;
  min-height: 40px;
  box-sizing: border-box;
  padding: 5px 10px;
  line-height: 40px;

  span {
    font-size: 14px;
  }

  .p-tag {
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
