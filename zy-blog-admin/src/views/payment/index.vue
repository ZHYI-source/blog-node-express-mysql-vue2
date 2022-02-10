<style lang="scss" src="@css/app.scss"></style>
<template>
  <div class="app-table">
    <el-collapse  v-model="activeName" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <div class="title-class">充值相关</div>
        </template>
        <div class="app-table-query" style="margin-left: 20px" >
          <el-select size="mini" v-model="depositType" placeholder="类型">
            <el-option label="未选择" :value="0"></el-option>
            <el-option label="代付账户" :value="1"></el-option>
            <el-option label="垫资账户" :value="2"></el-option>
          </el-select>
          <el-input size="mini" v-model="queryDeposit.orderAmount" placeholder="输入金额(单位:分)" style="width: 100%"></el-input>
          <el-button size="mini"  type="primary" icon="el-icon-document" @click="toDeposit">生成付款链接</el-button>
        </div>
        <div class="app-table-query" style="margin-left: 20px" v-if="resultLink">
          <el-input type="textarea" :rows="2" class="result-link" id="result" v-model="resultLink"></el-input>
          <el-tooltip content="点击复制" placement="bottom" effect="light">
            <el-button size="mini"  type="primary" icon="el-icon-document" @click="copyLink">复制付款链接</el-button>
          </el-tooltip>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <div class="title-class">余额相关</div>
        </template>
        <div class="app-table-query" style="margin-left: 20px" >
          <el-select size="mini" v-model="feeType" placeholder="类型">
            <el-option label="未选择" :value="0"></el-option>
            <el-option label="代付账户" :value="1"></el-option>
            <el-option label="垫资账户" :value="2"></el-option>
          </el-select>
          <div class="show-amount">{{depositAmount | fmtAmount}}</div>
          <el-button size="mini"  type="primary" icon="el-icon-search" @click="getSubmerchatFee">查询余额</el-button>
        </div>
        <div class="app-table-query" style="margin-left: 20px" v-if="balanceButton">
          <el-input size="mini" v-model="queryIdCardBalance.idCard" placeholder="身份证号" style="width: 100%; margin-right:16px"></el-input>
          <div class="show-amount">{{ idCardAmount | fmtAmount }}</div>
          <el-button size="mini"  type="primary" icon="el-icon-search" @click="getIdCardBalance">查询余额</el-button>
        </div>
        <div class="app-table-query" style="margin-left: 20px" v-if="balanceButton" >
          <el-input size="mini" v-model="queryMerchantNoBalance.merchantNo" placeholder="商户号" style="width: 100%;margin-right:16px"></el-input>
          <div class="show-amount">{{merchantNoAmount | fmtAmount}}</div>
          <el-button size="mini"  type="primary" icon="el-icon-search" @click="getMerchantNoBalance">查询余额</el-button>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <div class="title-class">司机相关</div>
        </template>
        <div class="app-table-query" style="margin-left: 20px" v-if="outPayButton">
          <el-input size="mini" v-model="queryOutPay.idCard" placeholder="身份证号" style="width: 100%;margin-right:16px"></el-input>
          <el-button size="mini"  type="primary" icon="el-icon-edit-outline" @click="toOutPay">余额提现</el-button>
        </div>
        <div class="app-table-query" style="margin-left: 20px" v-if="guaranteePayButton">
          <el-input size="mini" v-model="queryGuaranteePay.idCard" placeholder="身份证号" style="width: 100%; margin-right:16px"></el-input>
          <el-button size="mini"  type="primary" icon="el-icon-edit-outline" @click="toGuaranteePay">垫资担保</el-button>
        </div>
        <div class="app-table-query" style="margin-left: 20px" v-if="updateAccountButton">
          <el-input size="mini" v-model="queryUpdateAccount.idCard" placeholder="身份证号" style="width: 100%;margin-right:16px"></el-input>
          <el-input size="mini" v-model="queryUpdateAccount.account" placeholder="银行卡号" style="width: 100%;margin-right:16px"></el-input>
          <el-button size="mini"  type="primary" icon="el-icon-edit" @click="queryUpdate">修改银行卡号</el-button>
        </div>
        <div class="app-table-query" style="margin-left: 20px" v-if="unbindButton">
          <el-input size="mini" v-model="queryUnbind.idCard" placeholder="身份证号" style="width: 100%; margin-right:16px"></el-input>
          <el-button size="mini"  type="primary" icon="el-icon-edit-outline" @click="toUnbindAccount">解绑银行卡</el-button>
        </div>
        <div class="app-table-query" style="margin-left: 20px" v-if="ZHSelectButton || ZHUpdateButton">
          <el-input size="mini" v-model="queryZHUpdate.idCard" placeholder="身份证号" style="width: 100%; margin-right:16px"></el-input>
          <el-input size="mini" v-model="queryZHUpdate.userRealName" placeholder="司机姓名" style="width: 100%; margin-right:16px"></el-input>
          <el-input size="mini" v-model="queryZHUpdate.account" placeholder="银行卡号" style="width: 100%; margin-right:16px"></el-input>
          <el-button size="mini"  type="primary" icon="el-icon-search" @click="handleCmbSelect" v-if="ZHSelectButton">招行查询</el-button>
          <el-button size="mini"  type="primary" icon="el-icon-edit-outline" @click="handleCmbUpdate" v-if="ZHUpdateButton">招行修改</el-button>
        </div>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <div class="title-class">红包相关</div>
        </template>
        <div class="app-table-query" style="margin-left: 20px" v-if="redEnvelopeButton">
          <el-input size="mini" v-model="queryRedEnvelope.idCard" placeholder="身份证号" style="width: 100%;margin-right:16px"></el-input>
          <el-input size="mini" v-model="queryRedEnvelope.amount" placeholder="红包金额(分)" style="width: 100%;margin-right:16px"></el-input>
          <el-button size="mini"  type="primary" icon="el-icon-edit-outline" @click="grantRedEnvelope">发放红包</el-button>
        </div>
      </el-collapse-item>
      <el-collapse-item name="5">
        <template slot="title">
          <div class="title-class">农行上传材料</div>
        </template>
        <div style="margin-left: 20px" v-if="NHUploadButton">
            <el-upload
              class="upload-demo"
              ref="upload"
              accept=".zip"
              :headers="uploadHeader"
              :data="queryUpload"
              :show-file-list="true"
              :limit="1"
              action="taxi-server/admin/system/uploadFileToAbc"
              :on-exceed="handleExceed"
              :before-upload="beforeNHUpload"
              :on-success="onSuccess"
              :on-error="onError"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>

          <div id="uploadResult"> </div>
          <div class="flex-row">
            <div class="text-title">二级商户号</div>
            <input class="text-text" v-model="queryUpload.subMerchantId"/>
          </div>
          <div class="flex-row">
            <div class="text-title">上传标识</div>
            <el-select size="mini" v-model="queryUpload.flag" placeholder="请选择">
              <el-option label="营业执照照片" :value="1"></el-option>
              <el-option label="身份证正反面" :value="2"></el-option>
              <el-option label="辅助证明材料" :value="3"></el-option>
            </el-select>
          </div>
          <el-button size="mini"  type="primary" icon="el-icon-edit-outline" @click="submitUpload">提交</el-button>

        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import {getToken} from '@/utils/auth'
    export default {
        name: "payment",
      data() {
        return {
          activeName: '1',
          queryDeposit: {
            receiveSubMerchantNo: undefined,
            orderAmount: ''
          },
          querySubmerchatFee:{
            shopNo: undefined
          },
          queryIdCardBalance: {
            idCard: undefined
          },
          queryMerchantNoBalance: {
            merchantNo: undefined
          },
          queryUpdateAccount:{
            idCard: undefined,
            account: undefined
          },
          queryOutPay:{
            idCard: undefined
          },
          queryGuaranteePay: {
            idCard: undefined
          },
          queryUnbind: {
            idCard: undefined
          },
          queryRedEnvelope:{
            idCard: undefined,
            amount: undefined
          },
          queryUpload:{
            subMerchantId:'',
            flag:''
          },
          queryZHUpdate:{
            idCard: undefined,
            userRealName: undefined,
            account: undefined
          },
          uploadHeader: {
            'x-access-token': getToken()
          },
          depositAmount: '',
          idCardAmount: '',
          merchantNoAmount: '',
          resultLink: '',
          balanceButton: false,
          outPayButton: false,
          guaranteePayButton: false,
          updateAccountButton: false,
          redEnvelopeButton: false,
          unbindButton: false,
          NHUploadButton: false,
          ZHSelectButton: false,
          ZHUpdateButton: false,
          depositType: 0,
          feeType: 0
        };
      },
      watch:{
        depositType(val){
          if(val === 0){
            this.queryDeposit.receiveSubMerchantNo = undefined
          }
          if(val === 1){
            this.queryDeposit.receiveSubMerchantNo = '1038823100003610003'
          }
          if(val === 2){
            this.queryDeposit.receiveSubMerchantNo = '1038823100003610001'
          }
        },
        feeType(val){
          if(val === 0){
            this.querySubmerchatFee.shopNo = undefined
          }
          if(val === 1){
            this.querySubmerchatFee.shopNo = '1038823100003610003'
          }
          if(val === 2){
            this.querySubmerchatFee.shopNo = '1038823100003610001'
          }
        }
      },
      methods:{
        getPerms() {
          let perms = this.$store.getters.perms
          if (perms.includes('*')) {
            this.balanceButton = true;
            this.outPayButton = true;
            this.guaranteePayButton = true;
            this.updateAccountButton = true;
            this.redEnvelopeButton = true;
            this.unbindButton = true;
            this.NHUploadButton = true;
            this.ZHSelectButton = true;
            this.ZHUpdateButton = true;
          } else {
            if (perms.includes('POST /admin/system/getMerchantBalance')) {
              this.balanceButton = true;
            }
            if (perms.includes('POST /admin/system/outPay')) {
              this.outPayButton = true;
            }
            if (perms.includes('POST /admin/system/guaranteePay')) {
              this.guaranteePayButton = true;
            }
            if (perms.includes('POST /admin/system/updateAccount')) {
              this.updateAccountButton = true;
            }
            if (perms.includes('POST /admin/system/grantRedEnvelope')) {
              this.redEnvelopeButton = true;
            }
            if (perms.includes('POST /admin/system/unbindAccount')) {
              this.unbindButton = true;
            }
            if (perms.includes('POST /admin/system/uploadFileToAbc')) {
              this.NHUploadButton = true;
            }
            if (perms.includes('POST /admin/system/selectCmbInfo')) {
              this.ZHSelectButton = true;
            }
            if (perms.includes('POST /admin/system/updateCmbInfo')) {
              this.ZHUpdateButton = true;
            }
          }
        },
        copyLink(){
          let link=document.getElementById("result");
          link.select(); // 选择对象
          document.execCommand("Copy"); // 执行浏览器复制命令
          this.$message({
            message: '复制链接成功',
            type: 'success'
          });
        },
        toDeposit(){
          if(!this.queryDeposit.receiveSubMerchantNo){
            this.$notify.error({
              title: '失败',
              message: '请先选择支付账户'
            })
            return
          }
          this.request('api_admin_system_nhDeposit',this.queryDeposit).then((res) => {
            this.resultLink = res.payUrl
          }).catch((error) => {
            console.log(error)
            this.$notify.error({
              title: '失败',
              message: error.msg
            })
          });
        },
        getSubmerchatFee(){
          if(!this.querySubmerchatFee.shopNo){
            this.$notify.error({
              title: '失败',
              message: '请先选择支付账户'
            })
            return
          }
          this.request('api_admin_system_submerchatFee',this.querySubmerchatFee).then((res) => {
            this.depositAmount = res.balance;
          }).catch((error) => {
            console.log(error)
            this.$notify.error({
              title: '失败',
              message: error.msg
            })
          });
        },
        getIdCardBalance(){
          this.request('api_admin_system_merchantBalance',this.queryIdCardBalance).then((res) => {
            this.idCardAmount = res.balance;
          }).catch((error) => {
            console.log(error)
            this.$notify.error({
              title: '失败',
              message: error.msg
            })
          });
        },
        getMerchantNoBalance(){
          this.request('api_admin_system_merchantBalance',this.queryMerchantNoBalance).then((res) => {
            this.merchantNoAmount = res.balance;
          }).catch((error) => {
            console.log(error)
            this.$notify.error({
              title: '失败',
              message: error.msg
            })
          });
        },
        queryUpdate(){
          this.request('api_admin_system_updateAccount',this.queryUpdateAccount).then((res) => {
            this.$notify.success({
              title: '成功',
              message: '银行卡更新成功'
            })
          }).catch((error) => {
            console.log(error)
            this.$notify.error({
              title: '失败',
              message: error.msg
            })
          });
        },
        toOutPay(){
          this.request('api_admin_system_outPay',this.queryOutPay).then((res) => {
            this.$notify.success({
              title: '成功',
              message: '提现成功'
            })
          }).catch((error) => {
            console.log(error)
            this.$notify.error({
              title: '失败',
              message: error.msg
            })
          });
        },
        toGuaranteePay(){
          this.request('api_admin_system_guaranteePay',this.queryGuaranteePay).then((res) => {
            this.$notify.success({
              title: '成功',
              message: '担保成功'
            })
          }).catch((error) => {
            console.log(error)
            this.$notify.error({
              title: '失败',
              message: error.msg
            })
          });
        },
        toUnbindAccount(){
          this.request('api_admin_system_unbindAccount',this.queryUnbind).then((res) => {
            this.$notify.success({
              title: '成功',
              message: '解绑成功'
            })
          }).catch((error) => {
            console.log(error)
            this.$notify.error({
              title: '失败',
              message: error.msg
            })
          });
        },
        grantRedEnvelope(){
          this.request('api_admin_system_grantRedEnvelope',this.queryRedEnvelope).then((res) => {
            this.$notify.success({
              title: '成功',
              message: '红包发放成功'
            })
          }).catch((error) => {
            console.log(error)
            this.$notify.error({
              title: '失败',
              message: error.msg
            })
          });
        },
        handleExceed(files, fileList) {
          this.$message.error('最多只能上传1个文件');
        },
        beforeNHUpload(file) {
          const fileSize = file.size / 1024 / 1024 < 1.5;

          console.log("file",file);
          console.log("filesize=",fileSize);
          console.log("type=",file.type);

          if (file.type == 'application/x-zip-compressed' || file.type == 'application/zip') {}
          else{
            this.$message.error('请上传zip格式的文件');
            return false
          }
          if (!fileSize) {
            this.$message.error('上传文件大小不能超过 1.5MB!');
          }
          return fileSize;
        },
        onSuccess(response, file, fileLile) {
          this.$notify.success({
            title: '成功',
            message: '提交成功'
          })
        },
        onError(err, file, fileList) {
          this.$notify.error({
            title: '失败',
            message: '提交失败'
          })
        },
        submitUpload() {
          if(!this.queryUpload.subMerchantId){
            this.$notify.error({
              title: '失败',
              message: '二级商户号不能为空'
            });
            return
          }
          if(!this.queryUpload.flag){
            this.$notify.error({
              title: '失败',
              message: '上传标识不能为空'
            });
            return
          }
          // if(!this.fileList){
          //   this.$notify.error({
          //     title: '失败',
          //     message: '上传文件不能为空'
          //   });
          //   return
          // }
          this.$refs.upload.submit();
        },
        handleCmbSelect(){
          if(!this.queryZHUpdate.idCard){
            this.$notify.warning({
              title: '提示',
              message: '身份证号不能为空'
            })
            return
          }
          this.request('api_admin_system_selectCmbInfo',this.queryZHUpdate).then((res) => {
            this.queryZHUpdate.userRealName = res.userRealName
            this.queryZHUpdate.account = res.account
          }).catch((error) => {
            console.log(error)
            this.$notify.error({
              title: '失败',
              message: error.msg
            })
          });
        },
        handleCmbUpdate(){
          if(!this.queryZHUpdate.idCard){
            this.$notify.warning({
              title: '提示',
              message: '身份证号不能为空'
            })
            return
          }
          if(!this.queryZHUpdate.userRealName || !this.queryZHUpdate.account){
            this.$notify.warning({
              title: '提示',
              message: '姓名和卡号不能为空'
            })
            return
          }
          this.request('api_admin_system_updateCmbInfo',this.queryZHUpdate).then((res) => {
            this.$notify.success({
              title: '成功',
              message: '信息更新成功'
            })
          }).catch((error) => {
            console.log(error)
            this.$notify.error({
              title: '失败',
              message: error.msg
            })
          });
        },
      },
      filters:{
          fmtAmount(val){
            if(!val){
              val = '查询后显示余额'
            }
            return val
          }
      },
      created(){
          this.getPerms()
      }
    }
</script>

<style scoped>
  .title-class{
    margin-left: 20px;
    font-weight: bold;
  }
  .result-link{
    width: 345px;
    height: 50px;
    font-size: 15px;

  }
  .show-amount{
    border: 1px solid #dcdcdc;
    padding: 1px 80px 1px 80px;
    height: 28px;
    border-radius: 5px;
    color: #a2aaba;
  }
  .flex-row{
    display: flex;
    flex-direction: row;
    margin-top: 10px;
  }
  .text-title{
    width: 100px;
  }
  .text-text{
    width: 170px;
    height: 30px;
    border-radius: 7%;
    border-color: rgba(199, 208, 224, 0.96);
    outline: #18c0ff thick;
  }

</style>
