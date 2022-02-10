<template>
  <div>
    <div class="container">
      <div class="aside">
        <el-input v-model="filterText" class="filter-item" placeholder="输入关键字进行过滤" clearable
                  style="width: 200px; margin-left: 25px; margin-top: 15px"/>
        <div class="tree">
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
            style="margin-left: 25px; margin-top: 10px; width: 600px; height: 1000px">
          </el-tree>
        </div>
      </div>
      <div>
        <div class="header">
          <div class="row">
            <div class="org-image">
              <img :src="orgInfo.image" v-if="orgInfo.image"/>
            </div>
            <div>
              <div class="org-title">{{orgInfo.orgName}}</div>
              <div class="org-city">{{orgInfo.city}}</div>
            </div>
          </div>
          <div class="body">
            <div class="row">
              <div class="text-title">联系人:</div>
              <div class="text-title">{{orgInfo.contacts}}</div>
            </div>
            <div class="row">
              <div class="text-title">电&ensp;&ensp;话:</div>
              <div class="text-title">{{orgInfo.tel}}</div>
            </div>
            <div class="row button-row">
              <el-button type="primary" size="large" class="button" @click="handleCreate">新增下级机构</el-button>
              <el-button type="primary" size="large" class="button" @click="handleUpdate">编&ensp;&ensp;&ensp;&ensp;辑
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="updateList" @submit.native.prevent
               status-icon label-position="left" label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="机构名称" prop="orgName">
          <el-input v-model="updateList.orgName" class="filter-item" placeholder="输入机构名称" clearable
                    style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="所在区域" prop="selectCity">
          <el-select size="small" style="width: 100px" v-model="updateList.selectProv" placeholder="请选择省份"
                     v-on:change="getProv($event)">
            <el-option v-for="item in provs" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select size="small" style="width: 100px" v-if="updateList.selectProv !== ''"
                     v-model="updateList.selectCity" placeholder="请选择城市" v-on:change="getCity($event)">
            <el-option v-for="item in citys" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="companyAddress">
          <el-input v-model="updateList.companyAddress" class="filter-item" placeholder="输入详细地址"
                    style="width: 200px;" @input="inputUpdate"/>
        </el-form-item>

        <el-form-item label="机构图片" prop="image">
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
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="updateList.contacts" class="filter-item" placeholder="输入机构联系人" clearable
                    style="width: 150px;"/>
        </el-form-item>
        <el-form-item label="联系人电话" prop="tel">
          <el-input v-model="updateList.tel" class="filter-item" placeholder="输入电话" clearable style="width: 150px;"/>
        </el-form-item>
        <el-form-item label="投诉电话" prop="companyTel">
          <el-input v-model="updateList.companyTel" class="filter-item" placeholder="输入投诉电话"
                    @input="inputUpdate" style="width: 150px;" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import impAllCity from './allCity.js';
  import impProvs from './provs.js';

  export default {
    data() {
      return {
        orgInfo: {
          orgId: undefined,
          orgName: '',
          city: '',
          companyAddress: '',
          image: '',
          contacts: '',
          tel: '',
          companyTel: ''
        },
        queryTree: {
          orgId: undefined
        },
        queryCompanyInfo:{
          orgId: undefined
        },
        orgTree: [],
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'orgName'
        },
        treeForm: false,
        listButton: false,
        updateButton: false,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑机构',
          create: '新建机构'
        },
        rules: {
          orgName: [
            {required: true, message: '机构名称不能为空', trigger: 'blur'}
          ],
          image: [
            {required: true, message: '机构图片不能为空', trigger: 'blur'}
          ],
          selectCity: [
            {required: true, message: '城市不能为空', trigger: 'blur'}
          ],
          contacts: [
            {required: true, message: '联系人不能为空', trigger: 'blur'}
          ],
          tel: [
            {required: true, message: '联系人电话不能为空', trigger: 'blur'},
            {
              pattern: /[\d-]+/,
              message: '联系人电话格式错误'
            }
          ],

        },
        updateList: {
          orgId: undefined,
          ppOrgId: undefined,
          orgName: '',
          city: '',
          image: '',
          contacts: '',
          tel: '',
          selectProv: '',
          selectCity: '',
          companyAddress: '',
          companyTel: ''
        },
        provs: [],
        citys: [],
        imageUrl: ''
      };
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
        } else {
          if (perms.includes('POST /org/insert')) {
            this.listButton = true;
          }
        }
      },
      getTree() {
        const that = this
        this.request('orgTree', this.queryTree).then(response => {
          console.log(response)
          that.orgTree = response
          that.orgInfo = that.orgTree[0]
          console.log(that.orgInfo);
        })
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.orgName.indexOf(value) !== -1;
      },
      showTree() {
        this.treeForm = true
      },
      handleNodeClick(data) {
        this.orgInfo = data
        this.queryCompanyInfo.orgId = this.orgInfo.orgId
        console.log('orgInfo')
        console.log(data)
      },
      selectOrg() {
        this.treeForm = false
      },
      resetForm() {
        this.updateList = {
          orgId: undefined,
          ppOrgId: undefined,
          orgName: '',
          city: '',
          image: '',
          contacts: '',
          tel: '',
          companyAddress: '',
          companyTel: ''
        }
        this.imageUrl = ''
      },
    inputUpdate(){
      this.$forceUpdate();
    },
      handleCreate() {
        this.resetForm()
        this.dialogStatus = 'create'
        this.updateList.ppOrgId = this.orgInfo.orgId
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleUpdate() {
        let city = ''
        this.request('api_org_companyInfo', this.queryCompanyInfo).then(response => {
          console.log('info')
          console.log( response)
          this.updateList = this.orgInfo
          this.imageUrl = this.updateList.image
          city = this.orgInfo.city
          this.updateList.companyAddress = response.companyAddress
          this.updateList.companyTel = response.companyTel
          console.log('city')
          console.log(city)
          if (city) {
            let cityArr = city.split('/')
            this.updateList.selectProv = cityArr[0]
            this.updateList.selectCity = cityArr[1]
            this.getProv(cityArr[0])
          }
          console.log('list')
          console.log( this.updateList)
          this.dialogStatus = 'update'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.updateList.city = this.updateList.selectProv + '/' + this.updateList.selectCity;
          let p = this.updateList;
          console.log(p)

          this.request('orgInsert', p).then((res) => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '编辑成功'
            })
            this.getTree()
          }).catch((error) => {
            this.$notify.error({
              title: '失败',
              message: '请稍后重试'
            })
          });
        });
      },
      closeForm() {
        this.dialogFormVisible = false
      },
      getUserInfo() {
        this.queryTree.orgId = this.$store.getters.orgId
        this.queryCompanyInfo.orgId = this.$store.getters.orgId

      },
      /*二级联动选择地区*/
      getProv(prov) {
        let tempCity = [];
        this.citys = [];
        this.selectCity = '';
        let allCity = impAllCity;
        for (var val of allCity) {
          if (prov === val.prov) {
            tempCity.push({label: val.label, value: val.label});
          }
        }
        this.citys = tempCity;
      },
      getCity(city) {
        this.updateList.selectCity = city
        this.$forceUpdate()
        console.log(city);
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
      }
    },
    created() {
      this.getUserInfo()
      this.getPerms()
      setTimeout(this.getTree(), 1000)
    },
    mounted() {
      this.provs = impProvs
      console.log(this.provs);
    }
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .aside {
    width: 400px;
    height: 100%;
    border-right: 1px solid #e3e3e3;
  }

  .row {
    display: flex;
    flex-direction: row;
  }
  .tree{
    width: 400px;
    height: 80%;
    overflow-x: auto;
  }

  .org-image {
    margin-top: 2rem;
    margin-left: 4rem;
    width: 8rem;
    height: 8rem;
    border: 1px solid #99a9bf;
    border-radius: 50%;
  }

  .org-image > img {
    height: 100%;
    width: 100%;
  }

  .org-title {
    margin-left: 2rem;
    margin-top: 3.5rem;
    font-size: 3rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    /*border: 1px solid #99a9bf;*/
  }

  .org-city {
    margin-left: 2rem;
    margin-top: 1rem;
    letter-spacing: 0.1rem;
  }

  .body {
    margin-left: 14rem;
    margin-top: 2rem;
    /*border: 1px solid #99a9bf;*/
  }

  .text-title {
    margin-top: 1rem;
    margin-right: 2rem;
  }

  .button-row {
    margin-top: 3rem;
  }

  .button {
    margin-right: 1rem;
    width: 10rem;
  }

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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

