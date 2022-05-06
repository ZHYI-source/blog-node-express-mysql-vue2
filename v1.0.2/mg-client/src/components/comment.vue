<template>
  <div class="comment" :id="`comment${comment.id}`">
    <div class="comment-head">
      <div class="user-avatar"><img :src="comment.from_user_logo" alt=""></div>
      <div class="head-right">
        <section-title>
          <div style="display: flex;align-items: center;justify-content: space-between;">
            <div>
              <span class="from-user user-name">{{ comment.from_username }}</span>
              <span class="to-user" v-if="comment.to_userId"><span style="margin: 0 5px;">@</span><span
                  class="user-name">{{ comment.to_username }}</span></span>
            </div>
            <div style="font-size: 13px;">
              <span style="color: #9c9c9c;margin-right: 20px;">{{ comment.createdAt | parseTime }}</span>
              <span @click.stop="showCommentEditor=true" style="cursor: pointer;">回复</span>
            </div>
          </div>
        </section-title>
      </div>
    </div>
    <div class="comment-body">
      <div class="content-text">
        <p v-html="comment.content || '还没有评论，快来评论吧'"></p>
      </div>
      <div v-if="showCommentEditor" @click.stop="">
        <comment-message-editor :inline="true" buttonText="回复" @submit="submitReply"></comment-message-editor>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import sectionTitle from '@/components/section-title'
import commentMessageEditor from 'comment-message-editor'
import {getCommentsCreate} from "../api/article";

export default {
  name: "comment",
  props: {
    comment: {
      type: Object
    }
  },
  created() {
    this.form = this.comment || {}
  },
  data() {
    return {
      form: {},
      showCommentEditor: false
    }
  },
  watch: {
    showCommentEditor(value) {
      if (value) {
        document.body.addEventListener('click', this.close)
      } else {
        document.body.removeEventListener('click', this.close)
      }
    }
  },
  components: {
    sectionTitle,
    commentMessageEditor
  },
  methods: {
    reply(id) {
      const ref = `comment${id}`
    },
    submitReply(v) {
      let p = {
        article_id: this.form.article_id,//文章id
        pid: this.form.id,//父级id
        from_userId: '1',//用户ID
        from_username: '周杰伦',//用户名称
        from_user_logo: 'https://ci.xiaohongshu.com/9c287080-630d-33ad-a988-76a8cf21e152?imageView2/2/w/540/format/jpg',//用户头像
        content: v || '',//评论内容
        to_userId: this.form.from_userId,//回复对象ID
        to_username: this.form.from_username,//回复对象名称
        to_user_logo: this.form.from_user_logo,//回复对象头像
      }
      //限制只有在两级数据
      if (this.form.to_userId) {
        p.pid=this.form.pid
      }
      getCommentsCreate(p).then(res => {
        this.$message({
          message: '评论成功！',
          type: 'success'
        });
        this.showCommentEditor = false //隐藏输入框
        this.$emit('reply', this.form.article_id)
      })
    },
    close() {
      this.showCommentEditor = false
    }
  }
}
</script>

<style scoped lang="less">
.comment {
  margin: 20px 0;
}

.comment-head {
  display: flex;

  .head-right {
    flex: 1;
  }

  .user-name {
    color: #8fd0cc;
  }
}

.comment-body {
  padding-left: 80px;

  .content-text {
    /*padding-bottom: 30px;*/
    margin-bottom: 30px;
    font-size: 14px;
    color: #9c9c9c;
    line-height: 1.3rem;
  }
}

.user-avatar {
  width: 50px;
  height: 50px;
  margin-right: 30px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
}

@media (max-width: 600px) {
  .comment-body {
    padding-left: 15px;

    .content-text {
      margin-top: 10px;
    }
  }

  .user-avatar {
    margin-right: 10px;
  }
}
</style>
