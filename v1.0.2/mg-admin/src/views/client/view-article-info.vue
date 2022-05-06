<template>
  <d2-container >
    <section >
      <mk-back-list title="" @goBack="$emit('close')"/>
      <section class="article-head">
        <h3 class="article-title"> {{ form.article_title }}</h3>
        <div class="article-desc">
          <div class="desc-item" v-if="form.reprint"> <el-link type="primary" :href="form.reprint" style="font-size: 12px"><i class="el-icon-link"/>转载地址</el-link></div>
          <div class="desc-item">评论数：{{ form.commentsCount }}</div>
          <div class="desc-item">浏览量：{{ form.viewsCount }}</div>
          <div class="desc-item">发布：{{ form.isPublish }}</div>
          <div class="desc-item">顶置：{{ form.isTop }}</div>
          <div class="desc-item">火热：{{ form.isHot }}</div>
          <div class="desc-item">推荐：{{ form.isRecommend }}</div>
          <div class="desc-item"><i class="el-icon-date"/>：{{form.updatedAt}}</div>
        </div>
      </section>
      <el-alert
        title="摘要"
        type="info"
        :description="form.article_summary"
        show-icon>
      </el-alert>
      <mk-md-editor v-model="form.article_content" mode="preview" :key="form.id" :height="600"/>
    </section>
  </d2-container>
</template>

<script>

import MkMdEditor from "@/components/md-editor";
import MkBackList from "@/components/common/mk-back-list";

export default {
  name: 'view-articles-info',
  components: {MkBackList, MkMdEditor},
  data() {
    return {
      heightL: 580,
      tableHeight: 580,
      form: {}
    }
  },
  watch: {
    'heightL'(val) {
      this.updataKey += 1
      this.tableHeight = val
    },
  },
  props: {
    viewData: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  created() {

    this.loadData(this.viewData);
  },
  mounted() {
    this.getWinHeight()
  },
  methods: {
    //获取窗口高度
    getWinHeight() {
      let that = this
      this.heightL = window.innerHeight - 320
      window.addEventListener('resize', () => {
        that.updataKey += 1
        that.heightL = window.innerHeight - 320
      })
    },
    loadData(data) {
      this.form = data || {};
    },
  },
}
</script>

<style lang="scss" scoped>

.article-head {
  margin-bottom: 15px;
}
  .article-title {
    text-align: center;
  }
  .article-desc {
    display: flex;
    justify-content: center;
    align-content: center;
    font-size: 12px;
    color: #999;
    .desc-item {
      padding: 0px 10px;
    }
  }
</style>
