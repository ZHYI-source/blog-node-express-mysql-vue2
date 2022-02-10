<style lang="scss" src="@css/app.scss"></style>
<template>
  <div>
    <div class="app-form-class">
      <el-form ref="form" :model="formVal" :rules="rules" label-width="90px" size="mini" @submit.native.prevent
               :hide-required-asterisk="ctl.view" v-loading="formLoading" :element-loading-text="loadingText">
        <el-row :gutter="20" type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="车牌号" :required="true" prop="plateNo">
              <el-input v-model="formVal.plateNo" :disabled="ctl.view">
                <span slot="prefix" style="font-size: 16px;color: #3395ff">贵·</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="车架号">
              <el-input v-model="formVal.vin" :disabled="ctl.view"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="品牌型号" :required="true" prop="vehicleCarBrand">
              <el-input v-model="formVal.vehicleCarBrand" :disabled="ctl.view"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="所属公司"  prop="orgName">
              <el-input v-model="formVal.orgName" :disabled="ctl.view" placeholder="请选择" @focus="showTree"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="发证时间" :required="true" prop="vehicleCarPubTime">
              <el-date-picker style="width:100%;" :disabled="ctl.view" format="yyyy-MM-dd"
                              v-model="formVal.vehicleCarPubTime"
                              type="date"
                              placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="运营模式">
              <el-radio-group v-model="formVal.mode" :disabled="ctl.view">
                <el-radio :label="0">自营</el-radio>
                <el-radio :label="1">挂靠</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="车机号">
              <el-input v-model="formVal.din" :disabled="ctl.view"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="二维码信息">
              <el-input :placeholder="qrCode" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="是否贴码">
              <el-checkbox v-model="formVal.pasteCode" :disabled="ctl.view" style="z-index: 0;">贴码</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <div class="terminal-div">
              <el-form-item label="终端号">
                <el-input v-model="formVal.terminalNo" placeholder="编辑车辆生成终端号" :disabled="true"></el-input>
                <!--<el-select v-model="formVal.terminalNo" placeholder="请选择" :disabled="ctl.view">-->
                  <!--<el-option-->
                    <!--v-for="item in terminalList"-->
                    <!--:key="item"-->
                    <!--:label="item"-->
                    <!--:value="item">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              </el-form-item>
              <el-button v-if="!formVal.terminalNo && !ctl.view" type="primary" class="terminal-button" @click="getTerminal">生成终端号</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="space-between">
          <el-col :span="11" v-if="formVal.qrCodeImg">
            <el-form-item label="二维码图片">
              <img :src="formVal.qrCodeImg" :disabled="ctl.view" style="width: 100px; height: 100px"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row type="flex" justify="center" style="padding: 16px">
      <el-col :span="12" style="display:flex;justify-content: center">
        <el-button type="primary" @click="addOrUdt()" v-if="!ctl.view" :loading="ctl.loading">保存</el-button>
        <el-button @click="appClose()">关闭</el-button>
      </el-col>
    </el-row>
    <div v-if="treeForm" class="tree-form">
      <div class="tree-form-title">选择机构</div>
      <el-input v-model="filterText" class="filter-item" placeholder="输入关键字进行过滤" clearable style="width: 200px; margin-left: 25px; margin-top: 15px" />
      <div class="tree-box">
        <el-tree
          class="filter-tree"
          :data="propTree"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          :expand-on-click-node="false"
          :highlight-current="true"
          ref="tree"
          style="margin-left: 25px; margin-top: 10px">
        </el-tree>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="treeForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="selectOrg">
          确定
        </el-button>
      </div>
    </div>
  </div>

</template>

<script>
  import tool from '@libs/tool';

  export default {
    components: {},
    props: {
      propTree: {
        type: Array,
        default: []
      },
    },
    data() {
      return {
        ctl: {
          view: false,
          loading: false
        },
        formLoading: false,
        loadingText: '',
        formVal: {},
        terminalList:[],
        rules: {
          plateNo: [
            {required: true, message: '请输入车牌'},
            {pattern: /^[a-zA-Z0-9]+$/, message: '车牌格式错误'}
          ],
          vehicleCarPubTime: [
            {required: true, message: '请选择发证时间'},
            {required: true, message: '请选择发证时间'},
          ],
          // orgName: [
          //   {required: true, message: '请选择所属公司', trigger: 'blur'},
          // ],
          vehicleCarBrand: [
            {required: true, message: '请填写车型'},
          ]
        },
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'orgName'
        },
        treeForm: false,
      };
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    computed: {
      qrCode: function () {
        if (this.formVal.plateNo !== undefined && this.formVal.plateNo.length > 0) {
          let plate = this.formVal.plateNo.toUpperCase();
          // if (this.formVal.plateNo.indexOf('贵')!==-1) {
          //     plate=plate.substr(1);
          // }
          return '00851' + plate;
        }
        return '';
      }
    },
    methods: {
      appClose() {
        this.$emit('appClose');
      },
      addOrUdt() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return false;
          }
          let p = tool.cloneObj(this.formVal);
          p.plateNo = '贵' + p.plateNo;
          this.ctl.loading = true;
          this.request('api_admin_addOrUptCar', p).then((res) => {
            this.ctl.loading = false;
            this.$emit('reload');
            this.$emit('appClose');
            this.$notify.success({
              title: '成功',
              message: '编辑车辆成功'
            })
          }).catch((error) => {
            this.ctl.loading = false;
            this.$notify.error({
              title: '失败',
              message: error.msg
            })
          });
        });
      },
      showTree(){
        if(!this.ctl.view){
          this.treeForm = true
        }
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.orgName.indexOf(value) !== -1;
      },
      handleNodeClick(data) {
        this.formVal.orgId = data.orgId
        this.formVal.orgName = data.orgName
      },
      selectOrg() {
        this.treeForm = false
      },
      getTerminal(){
        let p = {
          orgId: this.$store.getters.orgId,
          plateNo: '贵'+ this.formVal.plateNo.toUpperCase()
        }
        this.formLoading = true
        this.loadingText = '终端号生成中...'
        this.request('api_admin_getTerminalNo', p).then((res) => {
          this.formLoading = false
          this.formVal.terminalNo = res.terminalNo
          this.$forceUpdate()
        }).catch((error) => {
          this.formLoading = false
          console.log(error)
        });
      },
      open(val, read) {
        this.formVal = tool.cloneObj(val);
        // if(!read){
        //   this.formVal.pasteCode = false
        // }
        if (!this.objEmpty(this.formVal) && this.formVal.plateNo) {
          this.formVal.tradeAmt = this.formVal.tradeAmt / 100.0;
          if (this.formVal.plateNo.indexOf('贵') !== -1) {
            this.formVal.plateNo = this.formVal.plateNo.substr(1);
          }
        }
        this.ctl.view = read;
        // if(!this.ctl.view){
        //   let p = {
        //     orgId: ''
        //   }
        //   this.request('api_admin_terminalList', p).then((res) => {
        //     this.terminalList = res
        //   }).catch((error) => {
        //     console.log(error)
        //   });
        // }
      }
    },
  }
</script>

<style scoped>
  .tree-form{
    position: absolute;
    left: 0;
    top: 0;
    background-color: white;
    /*height: 100%;*/
    width: 100%;
  }
  .tree-form-title{
    font-size: 1.1rem;
    letter-spacing: 0.1rem;
    padding: 1rem 0.8rem 0.8rem 1rem;
    border-bottom: 1px solid #e7e7e7;
  }
  .tree-box{
    margin: 20px 0;
    overflow-y: auto;
    max-height: 250px;
  }
  .terminal-div{
    display: flex;
    flex-direction: row;
  }
  .terminal-button{
    height: 30px;
    line-height: 10px;
    margin-left: 10px;
  }
</style>
