<template>
  <section>
    <section class="mk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">

        <mk-get-row>
          <el-form-item label="友链地址" prop="path">
            <el-input clearable v-model.trim="form.path" size="mini" style="width: 600px" type="textarea"
                      :rows="2"
                      maxlength="255"
                      show-word-limit
                      placeholder="请输入友链地址"
            />
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="站点名称" prop="siteName">
            <el-input v-model="form.siteName" size="mini" class="input-one" clearable placeholder="请输入站点名称"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="友链邮箱" prop="email">
            <el-input v-model="form.email" size="mini" class="input-one" clearable placeholder="请输入友链邮箱"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="友链描述" prop="desc">
            <el-input clearable v-model.trim="form.desc" size="mini" style="width: 600px" type="textarea"
                      :rows="3"
                      maxlength="255"
                      show-word-limit
                      placeholder="请输入友链描述"
            />
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

import {dirFriendsCreate, dirFriendsUpdate} from "@/api/modules/sys.friends.api";


export default {
  name: 'get-friends-info',
  components: { MkBackList, MkGetButton, MkGetRow},
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
        path: [{required: true, message: '请输入友链地址', trigger: 'blur'},],

        siteName: [{required: true, message: '请输入友链站点', trigger: 'blur'},],

        email: [
          {required: true, message: '请输入友链邮箱', trigger: 'blur'},
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],

        desc: [{required: true, message: '请输入友链描述', trigger: 'blur'},],

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
          _FUC = this.isAdd ? dirFriendsCreate : dirFriendsUpdate
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
