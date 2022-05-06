<template>
  <section>
    <section class="mk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">
        <mk-get-row>
          <el-form-item label="标签名称" prop="tag_name">
            <el-input v-model="form.tag_name" size="mini" class="input-one" clearable placeholder="请输入标签名称"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="描述" prop="tag_desc">
            <el-input v-model="form.tag_desc" size="mini"
                      type="textarea"
                      :rows="2"
                      class="input-one" clearable placeholder="描述"></el-input>
          </el-form-item>
        </mk-get-row>
        <el-divider/>
        <mk-get-button @save="save" @close="close(true)"/>
      </el-form>
    </section>
  </section>
</template>

<script>
import MkBackList from "@/components/common/mk-back-list";
import {dirTagsCreate, dirTagsUpdate} from "@/api/modules/sys.tags.api";

export default {
  name: "get-tags-info",
  components: {MkBackList},
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
      this.isAdd = false
    }
  },
  data() {
    return {
      commonKey: 0,
      form: {},
      isAdd: true,
      rules: {
        tag_name: [{required: true, message: '请输入标签名称', trigger: 'blur'},],
      }
    }
  },
  methods: {
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          let _FUC = ''
          _FUC = this.isAdd ? dirTagsCreate : dirTagsUpdate
          _FUC(this.form).then(res => {
            this.$toast.success('添加成功！')
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
