<template>
  <d2-container>
    <mk-back-list title="添加" @goBack="$emit('close')"/>
    <section class="lk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px" :key="isAdd">
        <mk-get-row>
          <el-form-item label="博文内容" prop="article_content">
          </el-form-item>
        </mk-get-row>
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="Markdown" name="md">
            <mk-md-editor v-model="form.article_content"/>
          </el-tab-pane>
          <el-tab-pane label="Tinymce" name="mce">
            <Tinymce v-model="form.article_content" :height="300"/>
          </el-tab-pane>
        </el-tabs>
        <mk-get-row>
          <el-form-item   prop="article_content">
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="博文标题" prop="article_title">
            <el-input clearable v-model.trim="form.article_title" size="mini" style="width: 600px" type="textarea"
                      :rows="2"
                      maxlength="255"
                      show-word-limit
                      placeholder="请输入博文标题"
            />
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="博文封面" prop="article_cover">
            <el-input clearable v-model.trim="form.article_cover" size="mini" style="width: 600px" type="textarea"
                      :rows="3"
                      placeholder="请输入在线图片地址"
            />
            <mk-upload v-model="form.article_cover"/>
            <div class="material-box">
              <a href="https://wallhaven.cc/" title="图片素材库" target="_blank">wallhaven</a>
              <a href="https://wallpaperhub.app/"  title="图片素材库" target="_blank">wallpaperhub</a>
              <a href="https://www.pexels.com/zh-cn/" title="图片素材库" target="_blank">pexels</a>
            </div>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="是否火热" prop="isHot">
            <el-switch v-model="form.isHot" active-color="#13ce66">
            </el-switch>
          </el-form-item>
          <el-form-item label="是否顶置" prop="isTop">
            <el-switch v-model="form.isTop" active-color="#13ce66">
            </el-switch>
          </el-form-item>
          <el-form-item label="是否推荐" prop="isRecommend">
            <el-switch v-model="form.isRecommend" active-color="#13ce66">
            </el-switch>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="博文状态" prop="isPublish">
            <el-switch
              v-model="form.isPublish"
              active-color="#13ce66"
              active-text="发布"
              inactive-text="草稿"
            >
            </el-switch>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="博文类型" prop="sort_id">
            <mk-select-sort class="input-one" v-model="form.sort_id"/>
          </el-form-item>
          <el-form-item label="博文标签" prop="tag_ids">
            <mk-select-tag :width="255" class="input-one" v-model="form.tag_ids"/>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="是否转载">
            <el-switch v-model="isRelink" active-color="#13ce66">
            </el-switch>
          </el-form-item>
        </mk-get-row>
        <mk-get-row v-if="isRelink">
          <el-form-item label="转载链接" prop="reprint">
            <el-input clearable v-model.trim="form.reprint" size="mini" style="width: 600px" type="textarea"
                      :rows="2"
                      placeholder="请输入博文转载链接"
            />
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="博文摘要" prop="article_summary">
            <el-input clearable v-model.trim="form.article_summary" size="mini" style="width: 600px" type="textarea"
                      :rows="4"
                      maxlength="200"
                      show-word-limit
                      placeholder="请输入博文摘要"
            />
          </el-form-item>
        </mk-get-row>
        <mk-get-button @save="save" @close="close(true)"/>
      </el-form>
    </section>
  </d2-container>
</template>
<script>

import MkGetRow from "@/components/common/mk-get-row";
import MkGetButton from "@/components/common/mk-get-button";
import MkSelectPage from "@/components/common/mk-select-page";
import MkBackList from "@/components/common/mk-back-list";
import Tinymce from "@/components/Tinymce";
import MkSelectSort from "@/components/common/mk-select-sort";
import MkSelectTag from "@/components/common/mk-select-tag";
import {dirArticleCreate, dirArticleUpdate} from "@/api/modules/sys.article.api";
import MkUpload from "@/components/common/mk-upload";
import MkImgList from "@/components/common/mk-img-list";
import MkMdEditor from "@/components/md-editor";

export default {
  name: "get-article-info",
  components: {
    MkMdEditor,
    MkImgList,
    MkUpload,
    MkSelectTag,
    MkSelectSort,
    Tinymce,
    MkBackList,
    MkSelectPage,
    MkGetButton,
    MkGetRow,
  },
  props: {
    updateData: {
      type: Object,
      default() {
        return {};
      }
    },
  },

  beforeUpdate(){
    this.headerUpdate()
  },
  updated() {
    this.headerUpdate()
  },
  created() {
    this.headerUpdate()
  },
  data() {
    return {
      activeName: 'md',
      isRelink: false,
      form: {
        isPublish: true,
        isRecommend: true,
        activeName:'md',
        article_cover:'http://zhouyi.run:5222/api/public/admin/getFiles?id=e52cfbc48528687fd6100e33e40f49ae.jpg&&mimetype=image/jpeg'
      },
      isAdd: true,
      rules: {
        article_title: [{required: true, message: '请输入博文标题', trigger: 'blur'},],
        article_content: [{required: true, message: '请输入博文内容', trigger: 'blur'},],
        sort_id: [{required: true, message: '请选择博文类型', trigger: 'blur'},],
        isPublish: [{required: true, message: '请选择是否发布', trigger: 'blur'},],
      }
    }
  },
  methods: {
    headerUpdate() {
      if (this.updateData && this.updateData.id) {
        this.form = this.updateData
        this.activeName = this.form.editType || 'md'
        let arr = []
        //转换一下回填v-selectpage
        for (const argument of this.updateData.tags) {
          arr.push(argument.tagId)
        }
        this.form.tag_ids = arr.join(",")

        this.isAdd = false
      }
    },
    save() {
      let that = this
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          let _FUC = ''
          _FUC = this.isAdd ? dirArticleCreate : dirArticleUpdate
          if (this.isAdd&&!this.form.article_summary){
            this.form.article_summary = this.form.article_title
          }
          this.form.editType = this.activeName
          _FUC(this.form).then(res => {
            that.$message.success('修改成功')
            that.$emit('close');
          }).catch(err => {
            console.log(err)
            return that.$message.error(err.msg)
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
.material-box {
  a {
    padding: 6px 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    font-weight: bold;
    color: #a0a0a0;
    &:hover {
      color: #40e373;
      transition: all .2s linear;
    }
  }
}
</style>
