<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <span style=" color:#23262b; font-size:13px; margin-left:17px">创建时间</span>
      <el-date-picker
        size="mini"
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        value-format="timestamp">
      </el-date-picker>
      <el-button @click="doQuery()" size="mini" icon="el-icon-search">查询</el-button>
      <el-button v-if="createButton" icon="el-icon-edit" @click="handleCreate" size="mini">新增</el-button>
    </div>
    <div class="app-table-contain">
      <div style="height: 100%;" ref="ztable">
        <el-table
          v-loading="loading"
          stripe
          :data="tableData.records" :stripe="true" border
          style="width: 100%;"
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column width="200" prop="id" label="消息ID">
          </el-table-column>
          <el-table-column prop="title" label="消息标题" width="200">
          </el-table-column>
          <el-table-column prop="abstractInfo" label="消息概要">
          </el-table-column>
          <el-table-column label="创建时间" width="200">
            <template slot-scope="scope">
              {{scope.row.insertTimestamp|fmtTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="350px">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" icon="el-icon-edit" v-if="updateButton" plain
                           @click="handleUpdate(scope.row)">编辑
                </el-button>
                <el-button size="mini" type="primary" v-if="sendButton"
                           @click="handleSend(scope.row)">发送
                </el-button>
                <el-button size="mini" type="primary" v-if="historyButton" plain
                           @click="handleView(scope.row)">历史记录
                </el-button>
                <el-button size="mini" type="danger" v-if="deleteButton" plain
                           @click="handleDelete(scope.row)">删除
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="doQuery()"
        :total="tableData.total" :current-page.sync="tableData.current" :page-size="tableData.size"
        style="flex-shrink: 0;padding: 10px">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="55%"
               :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <div class="app-form-class">
        <el-form ref="dataForm" :model="updateList" :rules="rules" label-width="80px" size="mini" @submit.native.prevent
                 :hide-required-asterisk="true">
          <el-form-item label="消息ID" prop="id" v-if="dialogStatus==='update'">{{ updateList.id }}</el-form-item>
          <el-form-item label="消息标题" prop="title">
            <el-input v-model="updateList.title"/>
          </el-form-item>
          <el-form-item label="消息概要" prop="abstractInfo">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入消息概要"
              v-model="updateList.abstractInfo">
            </el-input>
          </el-form-item>
          <el-form-item label="消息图片" prop="image">
            <el-upload
              class="avatar-uploader"
              action="/taxi-file/fileserver/upload/v2"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="跳转类型">
            <el-radio-group v-model="typeRadio">
              <el-radio :label="1">外部连接</el-radio>
              <el-radio :label="2">自行编辑</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="外部链接" prop="link" v-if="linkType">
            <el-input v-model="updateList.link" @input="change($event)"/>
          </el-form-item>
          <el-form-item label="详细内容" prop="content" v-if="htmlType">
            <div ref="editor" style="text-align:left"></div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeForm">取消</el-button>
          <el-button type="primary" @click="updateData">保存</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="选择司机所在机构" :visible.sync="treeForm" v-loading="orgLoading"
               element-loading-text="拼命查询中">

      <el-input v-model="filterText" class="filter-item" placeholder="机构筛选" clearable
                style="width: 200px; margin-left: 25px; margin-top: 15px"/>

      <el-tree
        class="filter-tree"
        :data="orgTree"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
        :highlight-current="true"
        ref="tree"
        style="margin-left: 25px; margin-top: 10px">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="treeForm = false">
          确定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择发送司机" :visible.sync="sendForm" width="45%" v-loading="sendLoading"
               element-loading-text="正在发送中。。。">
      <div style="text-align: center; padding-bottom: 20px; padding-top: 20px">
        <el-transfer
          ref="transfer"
          style="text-align: left; display: inline-block"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="司机姓名筛选"
          v-model="sendList.idCards"
          @change="handleChange"
          :titles="['待选择司机', '已选择司机']"
          :data="driverData">
        </el-transfer>
        <div slot="footer" class="dialog-footer" style="margin-top: 20px">
          <el-button @click="closeSend">
            取消
          </el-button>
          <el-button type="primary" @click="sendData">
            确定
          </el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="deleteForm" width="35%">
      <div style="margin:20px 30px 30px 30px; font-weight: bold; font-size: 20px">确定要删除这条消息吗?</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteForm = false">
          取消
        </el-button>
        <el-button type="danger" @click="deleteData">
          删除
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="历史记录" :visible.sync="historyForm" width="900px" style="align-items: center;align-content: center">

      <el-table v-loading="historyLoading" :data="historyList.records" element-loading-text="正在查询中。。。"
                stripe border highlight-current-row>
        <el-table-column label="发送时间" width="300px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.insertTimestamp | fmtTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="接收人" width="600px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.driverName }}</span>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="historyList.total > 0" :total="historyList.total" :page.sync="historyList.current"
                  :limit.sync="historyList.size" @pagination="historyData"
                  style="margin-top: -20px; margin-bottom: -20px"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="historyForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="sendData">
          发送
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {MessageBox} from "element-ui";
  import E from "wangeditor"
  import Pagination from '@/components/Pagination'

  export default {
    components: {Pagination},
    data() {
      return {
        sendLoading: false,
        mark: true,
        orgLoading: false,
        func: {
          initEditor: null
        },
        editor: null,
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        queryHistory: {
          id: '',
          type: 2,
          current: 1,
          size: 10
        },
        queryTree: {
          orgId: undefined
        },
        orgTree: [],
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'orgName'
        },
        treeForm: false,
        historyList: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        driverList: [],
        driverData: [],
        deleteForm: false,
        sendForm: false,
        historyForm: false,
        deleteId: '',
        date: null,
        imageUrl: '',
        historyLoading: false,
        typeRadio: 1,
        htmlType: false,
        linkType: true,
        loading: false,
        deleteButton: false,
        historyButton: false,
        sendButton: false,
        updateButton: false,
        listButton: false,
        createButton: false,
        query: {
          orgId: '',
          current: 1,
          size: 10,
          type: 2
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑消息',
          create: '新建消息'
        },
        rules: {
          title: [
            {required: true, message: '消息标题不能为空', trigger: 'blur'}
          ],
          abstractInfo: [
            {required: true, message: '消息概要不能为空', trigger: 'blur'},
          ]
        },
        queryDriver: {
          params: {
            org_id: '',
            status: 1
          },
          current: 1,
          size: 999
        },
        updateList: {
          id: '',
	        abstractInfo: '',
	        contentType: 1,
          title: '',
	        link: '',
          image: '',
          content: '',
          orgId: '',
          type: 2
        },
        sendList: {
          idCards: [],
          messageId: '',
          source: ''
        }
      };
    },
    watch: {
      htmlType(val) {
        if (val) {
          this.initDispatch();
        }
      },
      typeRadio(val){
        if(val === 1){
          this.htmlType = false
          this.linkType = true
          if (this.editor) {
            if (this.editor.txt) {
              this.editor.txt.clear()
            }
          }
        }else if(val === 2){
          this.htmlType = true
          this.linkType = false
          this.updateList.link = ''
        }
      }
    },
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.historyButton = true;
          this.sendButton = true;
          this.deleteButton = true;
          this.updateButton = true;
          this.listButton = true;
          this.createButton = true;
        }
        else {
          if (perms.includes('POST /message/messageHistory')) {
            this.historyButton = true;
          }
          if (perms.includes('POST /message/messageSend')) {
            this.sendButton = true;
          }
          if (perms.includes('POST /message/messageDelete')) {
            this.deleteButton = true;
          }
          if (perms.includes('POST /message/messageUpdate')) {
            this.updateButton = true;
            this.createButton = true;
          }
          if (perms.includes('POST /message/messageList')) {
            this.listButton = true;
          }
        }
      },
      getGenerateData() {
        const data = [];
        for (let driver of this.driverList) {
          data.push({
            label: driver.userRealName,
            key: driver.idCard
          });
        }
        this.sendForm = true
        return data;
	      },
      change (e) {
        this.$forceUpdate()
      },
      doQuery() {
        this.query.startTime = null;
        this.query.endTime = null;
        if (this.date) { //如果输入了查询时间，添加到查询参数query
          let startTime = this.date[0];
          let endTime = this.date[1];
          this.query.startTime = startTime;
          this.query.endTime = endTime;
        }
        this.query.current = this.tableData.current
        this.queryData();
      },
      queryData() {
        this.loading = true;
        this.request('messageList', this.query).then((res) => {
          this.tableData = res;
          this.loading = false;
        }).catch((error) => {
          // MessageBox.alert('消息列表加载失败，请重试', '错误', {
          //   confirmButtonText: '确定',
          //   type: 'error'
          // })
        });
      },
      resetForm() {
        this.updateList = {
          id: '',
          contentType: 1,
          title: '',
          abstractInfo: '',
          image: '',
          link: '',
          content: '',
          orgId: '',
          type: 2
        }
        this.imageUrl = ''
        this.typeRadio = 1
      },
      handleCreate() {
        this.resetForm()
        this.updateList.orgId = this.$store.getters.orgId
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleUpdate(row) {
        this.updateList = Object.assign({}, row)
        this.imageUrl = this.updateList.image
        this.dialogStatus = 'update'
        if (this.editor) {
          if (this.editor.txt) {
            this.editor.txt.html(this.updateList.content)
          }
        }
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) {
            return false;
          }
          let p = this.updateList;
	        this.updateList.contentType = this.typeRadio
          this.loading = true;
          this.request('messageUpdate', p).then((res) => {
            this.loading = false;
            this.closeForm()
            this.$notify.success({
              title: '成功',
              message: '更新成功'
            })
            this.queryData();
          }).catch((error) => {
            this.loading = false;
            this.closeForm()
            this.$notify.error({
              title: '失败',
              message: '更新失败，请重试'
            })
          });
        });
      },
      handleDelete(row) {
        this.deleteForm = true
        this.deleteId = row.id
      },
      deleteData() {
        let deleteP = {
          id: this.deleteId
        }
        this.request('messageDelete', deleteP).then((res) => {
          this.$notify.success({
            title: '成功',
            message: '删除消息成功'
          })
          this.queryData()
          this.deleteForm = false
        })
          .catch(response => {
            this.$notify.error({
              title: '失败',
              message: '删除消息失败'
            })
            this.deleteForm = false
          })
      },
      handleSend(row) {
        this.sendList.messageId = row.id
        this.treeForm = true
      },
      sendData() {
        this.sendLoading = true;
        this.request('messageSend', this.sendList).then((res) => {
          this.$notify.success({
            title: '成功',
            message: '发送消息成功'
          })
          this.closeSend()
        })
          .catch(response => {
            this.$notify.error({
              title: '失败',
              message: '发送消息失败，请重试'
            })
            this.closeSend()
          })
      },
      closeSend() {
        this.sendLoading = false;
        this.sendForm = false
        this.treeForm = false
        this.$refs['transfer'].clearQuery("left")
        this.$refs['transfer'].clearQuery("right")
        this.sendList.idCards = []
      },
      handleView(row) {
        this.queryHistory.id = row.id
        this.historyForm = true
        this.historyData()
      },
      historyData() {
        this.historyLoading = true
        this.request('messageHistory', this.queryHistory).then((res) => {
          this.historyList = res
          this.historyLoading = false
        })
          .catch(response => {
            MessageBox.alert('历史记录加载失败，请重试', '错误', {
              confirmButtonText: '确定',
              type: 'error'
            })
            this.historyForm = false
          })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = res[0].url;
        this.updateList.image = this.imageUrl + '?imageMogr2/thumbnail/990x344!';
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
          this.$message.error('请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片');
          return
        }

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      handleChange(value) {
        this.sendList.idCards = value;
      },
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      getOrgName(id) {
        for (let org of this.orgList) {
          if (id === org.orgId) {
            return org.orgName
          }
        }
      },
      getDriverList() {
        this.orgLoading = true;
        this.request('api_admin_driverlst', this.queryDriver).then((res) => {
          console.log(res);
          this.orgLoading = false;
          this.driverList = res.records;
          this.driverData = this.getGenerateData()
        }).catch((error) => {
          this.orgLoading = false;
          MessageBox.alert('获取司机列表失败，请重试', '错误', {
            confirmButtonText: '确定',
            type: 'error'
          })
        });
      },
      getTree() {
        const that = this
        this.request('orgTree', this.queryTree).then(response => {
          console.log(response)
          that.orgTree = response
        })
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.orgName.indexOf(value) !== -1;
      },
      handleNodeClick(data) {
        this.queryDriver.params.org_id = data.orgId
        this.getDriverList()
      },
      createEditor() {
        this.editor = new E(this.$refs.editor)
        this.editor.config.onchange = (html) => {
          this.updateList.content = html
        }
        this.editor.config.uploadImgServer = '/taxi-file/fileserver/upload/v2'
        this.editor.config.uploadImgMaxLength = 1
        this.editor.config.uploadImgHooks = {
          before: function (xhr, editor, files) {
          },
          success: function (xhr, editor, result) {
            console.log(xhr)
            console.log(result)
          },
          fail: function (xhr, editor, result) {
          },
          error: function (xhr, editor) {
            console.log(xhr)
          },
          timeout: function (xhr, editor) {
          },
          customInsert: function (insertImg, result, editor) {

            var url = result[0].url
            insertImg(url)
          }
        }

        this.editor.create()
        this.editor.txt.html(this.updateList.content)
        //this.mark = false
      },
      initDispatch() {
        this.$nextTick(() => {
          // if (undefined !== this.$refs.dataForm) {
          //   this.$refs.dataForm.resetFields();
          // }
          this.func.initEditor();
        });
      },
      closeForm() {
        this.dialogFormVisible = false
        // this.$refs.dataForm.resetFields();
        if (this.editor) {
          if (this.editor.txt) {
            this.editor.txt.clear()
          }
        }
      },
      getUserInfo() {
        this.query.orgId = this.$store.getters.orgId
        this.sendList.source = this.$store.getters.orgId
        this.queryTree.orgId = this.$store.getters.orgId
      }
    },
    created() {
      this.getUserInfo()
      this.getPerms()
    },
    mounted() {
      this.queryData();
      this.getTree()
      if (this.mark) {
        this.func.initEditor = this.createEditor
      }
    }

  }
</script>

<style>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 40px;
    display: block;
  }

  .toolbar {
    border: 1px solid #ccc;/*设置下拉棒*/
  }
  .w-e-text-container{
    height: 200px !important;/*!important是重点，因为原div是行内样式设置的高度300px*/
  }

</style>
