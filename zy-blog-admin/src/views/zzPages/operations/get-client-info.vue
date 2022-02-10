<template>
  <section>
    <lk-view-header @back="$emit('close')" :content="isAdd?'添加客户':'修改客户'"/>
    <section class="lk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="140px">
        <el-row class="row-title">基本信息</el-row>
        <lk-get-row>
          <el-form-item label="客户名称" prop="comName">
            <el-input clearable v-model.trim="form.comName" class="input-one" size="mini" placeholder="请输入客户名称"
                      show-word-limit maxlength="50"/>
          </el-form-item>
          <el-form-item label="信用代码" prop="invoiceNo">
            <el-input clearable v-model.trim="form.invoiceNo" class="input-one" size="mini"
                      show-word-limit
                      maxlength="20"
                      placeholder="请输入信用代码"/>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="客户类型" prop="type">
            <el-input clearable v-model.trim="form.type" class="input-one" size="mini" placeholder="请输入客户类型"/>
          </el-form-item>
          <el-form-item label="客户行业" prop="industry">
            <el-input clearable v-model.trim="form.industry" class="input-one" size="mini" placeholder="请输入客户行业"/>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="合作状态" prop="status">
            <el-select
              clearable
              v-model.trim="form.status"
              class="input-one" size="mini" placeholder="请选择合作状态"
            >
              <el-option
                label="合作中"
                :value="0"
              >
              </el-option>
              <el-option
                label="取消合作"
                :value="1"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="注册地址" prop="registerAdd">
            <el-input clearable v-model.trim="form.registerAdd"
                      class="input-one" size="mini"
                      type="textarea"
                      style="width: 600px"
                      placeholder="请输入注册地址"
                      :autosize="{ minRows: 4, maxRows: 12}"
                      maxlength="500"
            />
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="实际经营地址" prop="actualAdd">
            <el-input clearable v-model.trim="form.actualAdd"
                      class="input-one" size="mini"
                      type="textarea"
                      style="width: 600px"
                      placeholder="请输入实际经营地址"
                      :autosize="{ minRows: 4, maxRows: 12}"
                      maxlength="500"
            />
          </el-form-item>
        </lk-get-row>

        <el-row class="row-title">营业执照</el-row>
        <lk-get-row>
          <el-form-item label="营业执照号" prop="licenseNo">
            <el-input clearable v-model.trim="form.licenseNo" class="input-one" size="mini" placeholder="请输入营业执照号"
                      show-word-limit
            />
          </el-form-item>
          <el-form-item label="三证合一" prop="isUnited">
            <el-radio-group v-model="form.isUnited" class="input-one">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="营业期限" prop="term">
            <el-date-picker
              class="input-one"
              v-model="form.termStart"
              size="mini"
              type="date"
              value-format="timestamp"
              placeholder="选择成立日期"
            >
            </el-date-picker>
            -
            <el-date-picker
              class="input-one"
              @change="timeKey+=1"
              :key="timeKey"
              @input="$forceUpdate();"
              v-model="form.termEnd"
              size="mini"
              type="date"
              value-format="timestamp"
              :placeholder="lontime ?'长期':'请选择营业期限'"
              :disabled="lontime"
            >
            </el-date-picker>
            <el-button style="margin-left: 5px" size="mini" type="primary" plain @click="selectLongTime">{{lontime?'自定义':'长期'}}</el-button>
          </el-form-item>

        </lk-get-row>
        <lk-get-row>
          <el-form-item label="经营范围" prop="range">
            <el-input clearable v-model.trim="form.range"
                      class="input-one" size="mini"
                      type="textarea"
                      show-word-limit
                      style="width: 600px"
                      placeholder="请输入经营范围"
                      :autosize="{ minRows: 4, maxRows: 12}"
                      maxlength="500"
            />
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="营业执照" prop="licenseUrl">
            <el-upload
              :key="commonKey+2"
              class="avatar-uploader"
              action="/taxi-file/fileserver/upload/v2"
              :show-file-list="false"
              :on-success="handleAvatarSuccessLicenseUrl"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.licenseUrl"  :src="form.licenseUrl" class="avatar">
              <el-button v-else size="mini" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </lk-get-row>
        <el-row class="row-title">法人信息</el-row>
        <lk-get-row>
          <el-form-item label="法人身份证件" prop="legalId">
            <el-input clearable v-model.trim="form.legalId" class="input-one" size="mini" placeholder="请输入法人身份证件"
                      show-word-limit maxlength="50"
            />
          </el-form-item>
          <el-form-item label="法人姓名" prop="legalName">
            <el-input clearable v-model.trim="form.legalName" class="input-one" size="mini" placeholder="请输入法人姓名"
            />
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="法人有效期" prop="legalLimit">
            <el-date-picker
              class="input-one"
              v-model="form.legalLimit"
              size="mini"
              type="date"
              placeholder="选择法人有效期"
            >
            </el-date-picker>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="身份证反面" prop="cardBack">
            <el-upload
              :key="commonKey+1"
              class="avatar-uploader"
              action="/taxi-file/fileserver/upload/v2"
              :show-file-list="false"
              :on-success="handleAvatarSuccessCardBack"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.cardBack" :src="form.cardBack" class="avatar">
              <el-button v-else size="mini" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="身份证正面" prop="cardFront">
            <el-upload
              :key="commonKey"
              class="avatar-uploader"
              action="/taxi-file/fileserver/upload/v2"
              :show-file-list="false"
              :on-success="handleAvatarSuccessCardFront"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.cardFront" :src="form.cardFront" class="avatar">
              <el-button v-else size="mini" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </lk-get-row>

        <el-row class="row-title">银行信息</el-row>
        <lk-get-row>
          <el-form-item label="银行账号" prop="account">
            <el-input clearable v-model="form.account" class="input-one" size="mini" placeholder="请输入银行账号"
                      show-word-limit maxlength="100"
            />
          </el-form-item>
          <el-form-item label="开户名称" prop="accountName">
            <el-input clearable v-model="form.accountName" class="input-one" size="mini" placeholder="请输入开户名称"
                      show-word-limit maxlength="100"
            />
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="账户类型" prop="accountType">
              <el-select
                clearable
                v-model.trim="form.accountType"
                class="input-one" size="mini" placeholder="请选择账户类型"
              >
                <el-option
                  label="基本用户"
                  :value="0"
                >
                </el-option>
                <el-option
                  label="一般用户"
                  :value="1"
                >
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="开户行" prop="bankName">
            <el-input clearable v-model="form.bankName" class="input-one" size="mini" placeholder="请输入开户行"
                      show-word-limit maxlength="50"
            />
          </el-form-item>
        </lk-get-row>
        <el-row class="row-title">开票信息</el-row>
        <lk-get-row>
          <el-form-item label="纳税人电话" prop="taxpayerTel">
            <el-input clearable v-model.number="form.taxpayerTel" class="input-one" size="mini" placeholder="请输入纳税人电话"
                      show-word-limit maxlength="50"
            />
          </el-form-item>
          <el-form-item label="纳税人类型" prop="taxpayerType">
            <el-select
              clearable
              v-model.trim="form.taxpayerType"
              class="input-one" size="mini" placeholder="请选择纳税人类型"
            >
              <el-option
                label="一般纳税人"
                :value="0"
              >
              </el-option>
              <el-option
                label="小规模纳税人"
                :value="1"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="发票税号" >
            <el-input clearable v-model="form.invoiceNo" disabled class="input-one" size="mini" placeholder="请输入发票税号"
                      show-word-limit/>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="纳税人地址" prop="taxpayerAdd">
            <el-input clearable v-model.trim="form.taxpayerAdd"
                      class="input-one" size="mini"
                      type="textarea"
                      style="width: 600px"
                      placeholder="请输入纳税人地址"
                      show-word-limit
                      :autosize="{ minRows: 4, maxRows: 12}"
                      maxlength="500"
            />
          </el-form-item>
        </lk-get-row>
        <el-row class="row-title">其他材料</el-row>
        <lk-get-row>
          <el-form-item label="材料图片" prop="otherUrl">
            <lk-img-list :urls="otherUrls" show-close @deleteImg="deleteImg"></lk-img-list>
            <el-upload
              class="avatar-uploader"
              multiple
              action="/taxi-file/fileserver/upload/v2"
              :show-file-list="false"
              :on-success="handleAvatarSuccessOtherUrl"
              :before-upload="beforeAvatarUpload">
              <el-button size="mini" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </lk-get-row>

        <el-divider/>
        <lk-get-button @save="save" @close="close(true)"/>
      </el-form>
    </section>
  </section>

</template>

<script>
  import LkGetRow from "@/components/common/lk-get-row";
  import LkGetButton from "@/components/common/lk-get-button";
  import LkBackList from "@/components/common/lk-back-list";
  import LkEdit from "@/components/common/lk-edit";
  import LkImgList from "@/components/common/lk-img-list";

  export default {
    name: "get-client-info",
    components: {LkImgList, LkEdit, LkBackList, LkGetButton, LkGetRow},
    props: {
      updateData: {
        type: Object,
        default() {
          return {};
        }
      },
      routerId: {
        type: [String, Number],
        default() {
          return undefined;
        }
      }
    },
    created() {
      if (this.updateData && this.updateData.id) {
        this.form = this.updateData
        this.otherUrls = this.updateData.otherUrl ? this.updateData.otherUrl.split(',') : []
        console.log(this.form.termEnd)
        this.form.termEnd?this.lontime=false:this.lontime=true
        this.isAdd = false
      }
    },
    data() {
      return {
        lontime:false,
        otherUrls:[],
        commonKey:1,
        timeKey:1,
        form: {
          cardBack: '',
          cardFront: '',
          licenseUrl: '',
          otherUrl: '',
          termEnd:'',
          termStart:'',
        },
        imageUrl: '',
        isAdd: true,
        rules: {
          comName: [{required: true, message: '请输入客户名称', trigger: 'blur'},],
          invoiceNo: [{required: true, message: '请输入社会信用代码', trigger: 'blur'},
            {
              pattern: /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/,
              message: '代码输入错误，请重新填写！'
            }],
          // type: [{required: true, message: '请输入客户类型', trigger: 'blur'},],
          // industry: [{required: true, message: '请输入客户行业', trigger: 'blur'},],
          status: [{required: true, message: '请选择合作状态', trigger: 'blur'},],
          // licenseNo: [{required: true, message: '请输入营业执照号', trigger: 'blur'},],
          // isUnited: [{required: true, message: '请选择是否三证合一', trigger: 'blur'},],
          // legalId: [{required: true, message: '请输入法人身份证号', trigger: 'blur'},],
        }
      }
    },
    methods: {
      //选择长期
      selectLongTime(pra){
        this.form.termEnd=''
        this.lontime = !this.lontime
      },
      deleteImg(idx){
        this.otherUrls.splice(idx,1)
      },
      handleAvatarSuccessCardBack(res, file) {
        this.form.cardBack = res[0].url;
        this.commonKey+=1
      },
      handleAvatarSuccessCardFront(res, file) {
        this.form.cardFront = res[0].url;
        this.commonKey+=1
      },
      handleAvatarSuccessOtherUrl(res, file) {
        console.log('其他资料',res)
        this.otherUrls.push(res[0].url)
      },
      handleAvatarSuccessLicenseUrl(res, file) {
        this.form.licenseUrl = res[0].url;
        this.commonKey+=1
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

      save() {
        this.$refs['formAdd'].validate((valid) => {
          if (valid) {
            this.form.endTimestamp = new Date(this.form.endTimestamp).getTime()
            this.form.otherUrl = this.otherUrls.join()
            this.form.legalLimit = new Date(this.form.legalLimit).getTime()
            this.form.insertTimestamp = new Date(this.form.insertTimestamp).getTime()
            this.form.term = new Date(this.form.term).getTime()
            this.form.updateTimestamp = new Date(this.form.updateTimestamp).getTime()
            let api = this.isAdd ? 'api_admin_operate_company_create' : 'api_admin_operate_company_update'
            this.request(api, this.form).then(res => {
              this.toast.success(this.isAdd ? '新增成功！' : '修改成功！')
              this.$emit('close');
            }).catch(err => {
              this.toast.error(err.msg)
              console.log(err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      close(show) {
        if (show) {
          this.toast.confirmSave().then(() => {
            this.$emit('close');
          });
        } else {
          this.$emit('close');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar {
    width: 120px;
    height: 40px;
    display: block;
  }

</style>
