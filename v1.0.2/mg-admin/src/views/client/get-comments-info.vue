<template>
  <section>
    <section class="mk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">

        <mk-get-row>
          <el-form-item label="ID" prop="id">
            <el-input v-model="form.id" size="mini" class="input-one" clearable placeholder="请输入ID"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="文章ID" prop="article_id">
            <el-input v-model="form.article_id" size="mini" class="input-one" clearable placeholder="请输入文章ID"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="文章标题" prop="article_title">
            <el-input v-model="form.article_title" size="mini" class="input-one" clearable placeholder="请输入文章标题"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="父级评论Id" prop="pid">
            <el-input v-model="form.pid" size="mini" class="input-one" clearable placeholder="请输入父级评论Id"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="评论来源Id" prop="from_userId">
            <el-input v-model="form.from_userId" size="mini" class="input-one" clearable placeholder="请输入评论来源Id"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="评论来源" prop="from_username">
            <el-input v-model="form.from_username" size="mini" class="input-one" clearable placeholder="请输入评论来源"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="来源评论用户头像" prop="from_user_logo">
            <el-input v-model="form.from_user_logo" size="mini" class="input-one" clearable placeholder="请输入来源评论用户头像"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="回复评论用户Id" prop="to_userId">
            <el-input v-model="form.to_userId" size="mini" class="input-one" clearable placeholder="请输入回复评论用户Id"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="回复评论名称" prop="to_username">
            <el-input v-model="form.to_username" size="mini" class="input-one" clearable placeholder="请输入回复评论名称"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="回复评论用户头像" prop="to_user_logo">
            <el-input v-model="form.to_user_logo" size="mini" class="input-one" clearable placeholder="请输入回复评论用户头像"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="回复评论内容" prop="content">
            <el-input v-model="form.content" size="mini" class="input-one" clearable placeholder="请输入回复评论内容"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="创建时间" prop="createdAt">
            <el-input v-model="form.createdAt" size="mini" class="input-one" clearable placeholder="请输入创建时间"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="更新时间" prop="updatedAt">
            <el-input v-model="form.updatedAt" size="mini" class="input-one" clearable placeholder="请输入更新时间"></el-input>
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

import {dirCommentsCreate, dirCommentsUpdate} from "@/api/modules/sys.comments.api";


export default {
  name: 'get-comments-info',
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

        id: [{required: true, message: '请输入ID', trigger: 'blur'},],

        article_id: [{required: true, message: '请输入文章ID', trigger: 'blur'},],

        article_title: [{required: true, message: '请输入文章标题', trigger: 'blur'},],

        pid: [{required: true, message: '请输入父级评论Id', trigger: 'blur'},],

        from_userId: [{required: true, message: '请输入评论来源Id', trigger: 'blur'},],

        from_username: [{required: true, message: '请输入评论来源', trigger: 'blur'},],

        from_user_logo: [{required: true, message: '请输入来源评论用户头像', trigger: 'blur'},],

        to_userId: [{required: true, message: '请输入回复评论用户Id', trigger: 'blur'},],

        to_username: [{required: true, message: '请输入回复评论名称', trigger: 'blur'},],

        to_user_logo: [{required: true, message: '请输入回复评论用户头像', trigger: 'blur'},],

        content: [{required: true, message: '请输入回复评论内容', trigger: 'blur'},],

        createdAt: [{required: true, message: '请输入创建时间', trigger: 'blur'},],

        updatedAt: [{required: true, message: '请输入更新时间', trigger: 'blur'},],

      }
    }
  },
  methods: {
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          let _FUC = ''
          _FUC = this.isAdd ? dirCommentsCreate : dirCommentsUpdate
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
