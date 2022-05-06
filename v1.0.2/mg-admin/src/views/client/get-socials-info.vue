<template>
  <section>
    <section class="mk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">
        <mk-get-row>
          <el-form-item label="图标" prop="icon">
            <el-input v-model="form.icon" size="mini" class="input-one" clearable placeholder="请输入图标"></el-input>
          </el-form-item>
          <el-form-item label="Title" prop="title">
            <el-input v-model="form.title" size="mini" class="input-one" clearable placeholder="请输入Title"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="图标颜色" prop="color">
            <el-color-picker v-model="form.color" size="mini" style="padding-top: 10px"></el-color-picker>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="社交方式" prop="type">
            <el-radio-group v-model="form.type">
              <el-radio :label="1">链接</el-radio>
              <el-radio :label="2">图片</el-radio>
              <el-radio :label="3">文字</el-radio>
            </el-radio-group>
          </el-form-item>
        </mk-get-row>
        <mk-get-row v-if="form.type===1">
          <el-form-item label="社交链接" prop="href">
            <el-input clearable v-model.trim="form.href" size="mini" style="width: 600px" type="textarea"
                      :rows="2"
                      maxlength="255"
                      show-word-limit
                      placeholder="请输入社交链接"
            />
          </el-form-item>
        </mk-get-row>
        <mk-get-row v-if="form.type===3">
          <el-form-item label="文字说明" prop="text">
            <el-input clearable v-model.trim="form.text" size="mini" style="width: 600px" type="textarea"
                      :rows="2"
                      maxlength="200"
                      show-word-limit
                      placeholder="请输入文字说明"
            />
          </el-form-item>
        </mk-get-row>
        <mk-get-row v-if="form.type===2">
          <el-form-item label="社交图片" prop="img">
            <el-input clearable v-model.trim="form.img" size="mini" style="width: 600px" type="textarea"
                      :rows="3"
                      maxlength="255"
                      show-word-limit
                      placeholder="请输入在线图片地址"
            />
            <mk-upload v-model="form.img"/>
          </el-form-item>
        </mk-get-row>

        <el-divider/>
        <mk-get-button @save="save" @close="close(true)"/>
      </el-form>
    </section>
  </section>

</template>

<script>
import MkGetRow from "@/components/common/mk-get-row";
import MkGetButton from "@/components/common/mk-get-button";
import MkBackList from "@/components/common/mk-back-list";
import {dirSocialsCreate, dirSocialsUpdate} from "@/api/modules/sys.socials.api";
import MkUpload from "@/components/common/mk-upload";


export default {
  name: 'get-socials-info',
  components: { MkUpload, MkBackList, MkGetButton, MkGetRow},
  props: {
    updateData: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  created() {
    if (this.updateData && this.updateData.id) {
      this.form = this.updateData
      this.$set(this.form,'type',this.updateData.href?1:this.updateData.img?2:this.updateData.text?3:0)
      this.isAdd = false
    }
  },
  data() {
    return {
      commonKey: 0,
      form: {
        type:1
      },
      isAdd: true,
      rules: {
        icon: [{required: true, message: '请输入图标', trigger: 'blur'},],

        color: [{required: true, message: '请输入图标颜色', trigger: 'blur'},],

        href: [{required: true, message: '请输入社交链接', trigger: 'blur'},],

        text: [{required: true, message: '请输入社交文字说明', trigger: 'blur'},],

        img: [{required: true, message: '请输入社交图片', trigger: 'blur'},],

        createdAt: [{required: true, message: '请输入创建时间', trigger: 'blur'},],

        updatedAt: [{required: true, message: '请输入修改时间', trigger: 'blur'},],

      }
    }
  },
  methods: {
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          let _FUC = ''
          _FUC = this.isAdd ? dirSocialsCreate : dirSocialsUpdate
          _FUC(this.form).then(res => {
            this.$toast.success(this.isAdd ?'添加成功！':'修改成功！')
            this.$emit('close',true);
          }).catch(err => {
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
        this.$toast.confirmSave().then(() => {
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

</style>
