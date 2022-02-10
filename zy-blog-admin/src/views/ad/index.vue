<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <div class="app-table-query" v-if="listButton">
      <span style=" color:#23262b; font-size:13px; margin-left:17px">创建时间</span>
      <el-date-picker
        v-model="stet"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期" size="mini">
      </el-date-picker>
      <el-select size="mini" v-model="queryList.params.type" placeholder="类型">
        <el-option label="司机APP广告" :value="1"></el-option>
        <el-option label="小程序广告" :value="2"></el-option>
        <el-option label="支付成功广告" :value="3"></el-option>
        <el-option label="优惠券广告" :value="4"></el-option>
        <el-option label="红包广告" :value="5"></el-option>
        <el-option label="APP开屏广告" :value="6"></el-option>
        <el-option label="APP轮播广告" :value="7"></el-option>
        <el-option label="小程序轮播广告" :value="8"></el-option>
      </el-select>
      <el-button @click="handleFilter" size="mini" icon="el-icon-search">查询</el-button>
      <el-button v-if="createButton" icon="el-icon-edit" @click="handleCreate" size="mini">新增</el-button>
    </div>

    <div class="app-table-contain">
      <div style="height: 100%;" >
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
          <el-table-column prop="id" label="广告ID">
          </el-table-column>
          <el-table-column prop="title" label="广告标题">
          </el-table-column>
          <el-table-column label="生效时间">
            <template slot-scope="scope">
              {{scope.row.effectiveTime|fmtTime }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              {{scope.row.publishTime|fmtTime }}
            </template>
          </el-table-column>
          <el-table-column label="广告类型">
            <template slot-scope="scope">
              {{scope.row.type|statusFilter }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="350px">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" icon="el-icon-edit" v-if="updateButton" plain
                           @click="handleUpdate(scope.row)">编辑
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
        @current-change="handleFilter"
        :total="tableData.total" :current-page.sync="tableData.current" :page-size="tableData.size"
        style="flex-shrink: 0;padding: 10px">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="60%"
               :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <div class="app-form-class">
        <el-form ref="dataForm" :model="updateList" :rules="rules" label-width="80px" size="mini"
                 @submit.native.prevent :hide-required-asterisk="true">
          <el-form-item label="广告ID" prop="id" v-if="dialogStatus==='update'">{{ updateList.id }}</el-form-item>
          <el-form-item label="广告标题" prop="title">
            <el-input v-model="updateList.title"/>
          </el-form-item>
          <el-form-item label="广告图片" prop="image">
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
          <el-form-item label="生效时间" prop="effectiveTime" >
            <el-date-picker v-model="updateList.effectiveTime" type="date" class="filter-item" value-format="timestamp" placeholder="请选择" />
          </el-form-item>
          <el-form-item label="使用范围" prop="org" v-if="dialogStatus==='create'">
            <el-button @click="handleRange">点击选择</el-button>
          </el-form-item>
          <el-form-item label="使用范围" v-if="dialogStatus==='update'">{{ orgStr }}
          </el-form-item>
          <el-form-item label="广告类型">
            <el-select size="mini" v-model="updateList.type" placeholder="广告类型">
              <el-option label="司机APP广告" :value="1"></el-option>
              <el-option label="小程序广告" :value="2"></el-option>
              <el-option label="支付成功广告" :value="3"></el-option>
              <el-option label="优惠券广告" :value="4"></el-option>
              <el-option label="红包广告" :value="5"></el-option>
              <el-option label="APP开屏广告" :value="6"></el-option>
              <el-option label="APP轮播广告" :value="7"></el-option>
              <el-option label="小程序轮播广告" :value="8"></el-option>
            </el-select>
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

    <el-dialog title="选择使用范围" :visible.sync="rangeForm" width="45%">
      <div style="text-align: center; padding-bottom: 20px; padding-top: 20px">
        <el-transfer
          ref="transfer"
          style="text-align: left; display: inline-block"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="机构名称筛选"
          v-model="updateList.org"
          @change="handleChange"
          :titles="['待选择机构', '已选择机构']"
          :data="orgData">
        </el-transfer>
        <div slot="footer" class="dialog-footer" style="margin-top: 20px;">
          <el-button @click="closeRange">
            取消
          </el-button>
          <el-button type="primary" @click="closeRange">
            确定
          </el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="deleteForm">
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
  </div>
</template>

<script>
  import E from "wangeditor"
  import { MessageBox } from "element-ui";
  export default {
    data() {
      return {
        mark: true,
        func: {
          initEditor: null
        },
        editor: null,
        orgStr: '',
        tableData: {
          total: 0,
          size: 20,
          current: 1,
          records: []
        },
        queryList: {
          size: 20,
          current: 1,
          params: {
            type: null,
            startTime: null,
            endTime: null,
            orgId: ''
          }
        },
        queryOrg: {
          pageNumber: 1,
          pageSize: 999,
          orgId: ''
        },
        orgList: [],
        orgData: [],
        deleteForm: false,
        rangeForm: false,
        deleteId: '',
        stet: [],
        imageUrl: '',
        typeRadio: 1,
        htmlType: false,
        linkType: true,
        loading: false,
        deleteButton: false,
        updateButton: false,
        listButton: false,
        createButton: false,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑广告',
          create: '新建广告'
        },
        rules: {
          title: [
            {required: true, message: '广告标题不能为空', trigger: 'blur'}
          ],
          image: [
            {required: true, message: '请上传广告图片', trigger: 'blur'}
          ],
          org: [
            {required: true, message: '适用范围不能为空', trigger: 'blur'}
          ],
          effectiveTime: [
            {required: true, message: '生效时间不能为空', trigger: 'blur'},
          ]
        },
        updateList: {
          id: '',
          source: '',
          contentType: 1,
          title: '',
          link: '',
          image: '',
          content: '',
          effectiveTime: null,
          org: [],
          type: 1
        }
      };
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: '司机APP广告',
          2: '小程序广告',
          3: '支付成功广告',
          4: '优惠券广告',
          5: '红包广告',
          6: 'APP开屏广告',
          7: 'APP轮播广告',
          8: '小程序轮播广告'
        }
        return statusMap[status]
      }
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
          this.deleteButton = true;
          this.updateButton = true;
          this.listButton = true;
          this.createButton = true;
        }
        else {
          if (perms.includes('POST /admin/ad/delete')) {
            this.deleteButton = true;
          }
          if (perms.includes('POST /admin/ad/createOrUpdate')) {
            this.updateButton = true;
            this.createButton = true;
          }
          if (perms.includes('POST /admin/ad/list')) {
            this.listButton = true;
          }
        }
      },
      getGenerateData() {
        const data = [];
        for (let org of this.orgList) {
          data.push({
            label: org.orgName,
            key: org.orgId
          });
        }
        return data;
      },
      change (e) {
        this.$forceUpdate()
      },
      handleFilter() {

        if (this.stet && this.stet.length > 1) {
          this.queryList.params.startTime = this.stet[0].getTime()
          this.queryList.params.endTime = this.stet[1].getTime()
        } else {
          this.queryList.params.startTime = null;
          this.queryList.params.endTime = null;
        }
        this.queryList.current = this.tableData.current
        this.getList();
      },
      getList() {
        this.loading = true
        this.request('api_admin_ad_list', this.queryList).then((res) => {
          this.tableData = res;
          this.loading = false
        }).catch((error) => {
          console.log(error)
          this.loading = false
        });
      },
      resetForm() {
        this.updateList = {
          id: '',
          source: this.$store.getters.userId,
          contentType: 1,
          title: '',
          link: '',
          image: '',
          content: '',
          effectiveTime: null,
          org: [],
          type: 1
        }
        this.imageUrl = ''
        this.typeRadio = 1
      },
      handleCreate() {
        this.resetForm()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleUpdate(row) {
        this.orgStr = ''
        this.updateList = Object.assign({}, row)
        let query = {
          id: row.id
        }
        this.request('api_admin_ad_range', query).then((res) => {
          console.log("res.orgStr" + res.orgStr)
          this.orgStr = res.orgStr;
        }).catch((error) => {
          console.log(error)
        });
        this.typeRadio = this.updateList.contentType
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
          if(this.updateList.type!==6 && this.imageUrl && this.dialogStatus === 'create'){
            this.updateList.image = this.imageUrl + '?imageMogr2/thumbnail/990x344!';
          }
          this.updateList.contentType = this.typeRadio
          this.loading = true;
          this.request('api_admin_ad_createOrUpdate', this.updateList).then((res) => {
            this.loading = false;
            this.closeForm()
            this.$notify.success({
              title: '成功',
              message: '更新成功'
            })
            this.getList();
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
        if(row.source === this.$store.getters.userId){
          this.deleteId = row.id
          this.deleteForm = true
        }else{
          MessageBox.alert('只有创建者有权删除广告', '错误', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
      },
      deleteData() {
        let deleteP = {
          id: this.deleteId
        }
        this.request('api_admin_ad_delete', deleteP).then((res) => {
          this.$notify.success({
            title: '成功',
            message: '删除广告成功'
          })
          this.getList()
          this.deleteForm = false
        }).catch(error => {
            this.$notify.error({
              title: '失败',
              message: '删除广告失败'
            })
            this.deleteForm = false
          })
      },
      handleRange() {
        this.rangeForm = true
      },
      closeRange() {
        this.rangeForm = false
        this.$refs['transfer'].clearQuery("left")
        this.$refs['transfer'].clearQuery("right")
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = res[0].url;
        this.updateList.image = this.imageUrl;
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
        this.updateList.org = value;
      },
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      queryOrgList() {
        this.request('orgList', this.queryOrg).then(response => {
          this.orgList = response.records
          this.orgData = this.getGenerateData()
        })
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
        // this.mark = false
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
        this.queryList.params.orgId = this.$store.getters.orgId
        this.queryOrg.orgId = this.$store.getters.orgId
        this.updateList.source = this.$store.getters.userId
      }
    },
    created() {
      this.getUserInfo()
      this.getPerms()
    },
    mounted() {
      this.getList();
      this.queryOrgList()
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
    border: 1px solid #ccc; /*设置下拉棒*/
  }

  .w-e-text-container {
    height: 200px !important; /*!important是重点，因为原div是行内样式设置的高度300px*/
  }

</style>

