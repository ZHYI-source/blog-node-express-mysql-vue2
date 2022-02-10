<style lang="scss" src="@css/app.scss"></style>
<template>
  <div>
    <div  class="tree-form">
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
        formVal: {},
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
          vehicleCarType: [
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
      open(val, read) {
        this.formVal = tool.cloneObj(val);
        if (!this.objEmpty(this.formVal)) {
          this.formVal.tradeAmt = this.formVal.tradeAmt / 100.0;
          if (this.formVal.plateNo.indexOf('贵') !== -1) {
            this.formVal.plateNo = this.formVal.plateNo.substr(1);
          }
        }
        this.ctl.view = read;
      }
    },
    mounted() {

    }

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
  .mask{

  }
</style>
