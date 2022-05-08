<template>
  <div class="articles">
    <banner></banner>
    <div class="site-content animate">
      <!-- 文章目录 -->
      <!--      <div id="article-menus">-->
      <!--        <menu-tree :menus="menus" child-label="child"></menu-tree>-->
      <!--      </div>-->
      <main class="site-main ">
        <article class="hentry grid-line">
          <!-- 文章头部 -->
          <header class="entry-header">
            <!-- 标题输出 -->
            <h1 class="entry-title">{{ articleData.article_title }}</h1>
            <hr>
            <div class="breadcrumbs">
              <div id="crumbs">最后更新时间：{{ articleData.updatedAt | parseTimeFull }}</div>
            </div>
          </header>
          <!-- 正文输出 -->
          <div class="entry-content " v-if="articleData.editType==='mce'" v-highlight
               v-html="articleData.article_content">
          </div>
          <mk-md-editor class="md-edit" v-else mode="preview"   v-model="articleData.article_content"/>
          <!-- 文章底部 -->
          <section-title>
            <footer class="post-footer">
              <!-- 阅读次数 -->
              <div class="post-like">
                <i class="iconfont iconeyes"></i>
                <span class="count">{{ articleData.viewsCount }}</span>
              </div>
              <!-- 赞助按钮 -->
              <div class="donate" @click="showDonate=!showDonate">
                <span>赏</span>
                <ul class="donate_inner" :class="{'show':showDonate}">
                  <li class="wedonate"><img src="@/assets/img/vx.jpg">
                    <p>微信</p></li>
                  <li class="alidonate"><img src="@/assets/img/zfb.jpg">
                    <p>支付宝</p></li>
                </ul>
              </div>
              <!-- 文章标签 -->
              <div class="post-tags">
                <i class="iconfont iconcategory"></i>
                <span @click="goCategory(articleData.cate)">{{ cateName }}</span>
              </div>
            </footer>
          </section-title>
          <div class="tags-box">
            <div class="tag-item" v-for="item in articleData.tags">{{ item.name }}</div>
          </div>
          <!--声明-->
          <div class="open-message" v-if="articleData.reprint">
            <p>著名：如侵犯您的版权，请
              <router-link to="/about#Guestbook">留言</router-link>
              回复原文章的地址，我们会给您删除此文章，给您带来不便请您谅解！
            </p>
            <p>转载：- <a :href="articleData.reprint">{{ articleData.article_title }}</a></p>
          </div>
          <!--评论-->
          <div class="comments">
            <div class="comments-head">
              <h2 class="comments-h-t">
                <i class="el-icon-edit-outline"></i>
                文章评论 ({{ commentsCount }})
              </h2>
              <comment-message-editor :key="comKey" style="font-size: 13px;line-height: 20px" :inline="false"
                                      buttonText="提交"
                                      @focus=""
                                      @submit="toSubmitComment"
              ></comment-message-editor>
            </div>
            <comment v-for="item in comments" style="font-size: 13px;line-height: 20px" :key="item.comment.id"
                     :comment="item.comment" :articleTitle="article_title" @reply="replyComment">
              <template v-if="item.reply.length">
                <comment v-for="reply in item.reply" @reply="replyComment" style="font-size: 13px;line-height: 20px"
                         :key="reply.comment.id"
                         :comment="reply.comment" :articleTitle="article_title"></comment>
              </template>
            </comment>
          </div>

        </article>
      </main>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/banner'
import sectionTitle from '@/components/section-title'
import comment from '@/components/comment'
import menuTree from '@/components/menu-tree'
import commentMessageEditor from 'comment-message-editor'
import {dirArticle, getArticleDetail, getCommentsCreate, getCommentsList} from "../api/article";
import {marked} from 'marked';
import hljs from "highlight.js"
// https://highlightjs.org/static/demo/
import 'highlight.js/styles/base16/atelier-forest-light.css'
import MkMdEditor from "../components/md-editor";

export default {
  name: 'articles',
  // 定义自定义指令 v-highlight 代码高亮
  directives: {
    highlight: {
      update(el) {
        let blocks = el.querySelectorAll("pre code");
        blocks.forEach((block) => {
          hljs.highlightBlock(block);
        });
      },
    },
  },
  data() {
    return {
      comKey: 1,
      curLink: '',
      article_id: '',
      article_title: '-',
      showDonate: false,
      commentsCount: 0,
      comments: [],
      menus: [],
      articleData: {},
      cateName: ''
    }
  },
  components: {
    MkMdEditor,
    Banner,
    sectionTitle,
    comment,
    menuTree,
    commentMessageEditor,
  },
  methods: {
    //提交回复
    replyComment(val) {
      this.getComment(val)
    },
    //提交评论
    toSubmitComment(val) {
      let p = {
        article_id: this.article_id,//文章id
        article_title: this.article_title,//文章id
        pid: 0,//父级id
        from_userId: '1',//用户ID
        from_username: '吴彦祖',//用户名称
        from_user_logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSYITOSgSQdTv0Z_Z0KkvwWsBMwadCA2PRA&usqp=CAU',//用户头像
        content: val,//评论内容
        to_userId: '',//回复对象ID
        to_username: '',//回复对象名称
        to_user_logo: '',//回复对象头像
      }
      getCommentsCreate(p).then(res => {
        this.$message({
          message: '评论成功！',
          type: 'success'
        });
        this.comKey += 1
        this.getComment(this.article_id)
      })
    },
    goCategory(val) {
      localStorage.removeItem("category");
      localStorage.setItem("category", JSON.stringify(val));
      this.$router.push({name: 'category', params: {cateId: val.cateId, cate: val.name}});
    },
    markdownToHtml(val) {
      return marked(val);
    },
    getDataDetail(id) {
      getArticleDetail(id).then(article => {
        this.articleData = article || {}
        this.article_title = article.article_title
        this.cateName = this.articleData.cate.name
      })
    },
    //加载文章评论
    getComment(id) {
      let p = {
        params: {
          article_id: id,
        }
      }
      getCommentsList(p).then(res => {
        this.commentsCount = res.count
        let params = res.data || []
        const initTree = (parentId) => {
          const child = params.filter(item => item.pid == parentId)
          return child.map(item => ({
            comment: {...item},
            reply: initTree(item.id)
          }))
        }
        this.comments = initTree(0)
      }).catch(err => {
        console.log(err)
      })
    },
    fetchH(arr, left, right) {
      if (right) {
        return arr.filter(item => item.offsetTop > left && item.offsetTop < right)
      } else {
        return arr.filter(item => item.offsetTop > left)
      }
    },

    // 生成目录
    createMenus() {
      let arr = []
      for (let i = 6; i > 0; i--) {
        let temp = []
        let e = document.querySelector(".md-edit").querySelectorAll(`h${i}`)
        for (let j = 0; j < e.length; j++) {
          let child = this.fetchH(arr, e[j].offsetTop, (j + 1 === e.length) ? undefined : e[j + 1].offsetTop)
          temp.push({
            h: i,
            title: e[j].innerText,
            id: e[j].id,
            offsetTop: e[j].offsetTop,
            child
          })
        }
        if (temp.length) {
          arr = temp
        }
      }
      this.menus = arr
    }
  },
  mounted() {
    // this.createMenus()
    this.curLink = window.location.href
    window.scroll(0, 0)
  },
  created() {
    let arId = this.$route.params.id
    this.article_id = this.$route.params.id
    this.getDataDetail(arId)
    this.getComment(arId)
  }
}
</script>
<style scoped lang="less">
.site-content {
  position: relative;

  .site-main {
    padding: 80px 0 0 0;
  }
}

#article-menus {
  position: sticky;
  top: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .1);
  border-radius: 3px;
  padding: 15px;
  width: 300px;
  transform: translateX(-120%) translateY(150px);
  font-size: 14px;
}

article.hentry {

  .entry-header {
    .entry-title {
      font-size: 23px;
      font-weight: 600;
      color: #737373;
      margin: 0.67em 0;

      &:before {
        content: "#";
        margin-right: 6px;
        color: #d82e16;
        font-size: 20px;
        font-weight: 600;
      }
    }

    hr {
      height: 1px;
      border: 0;
      background: #EFEFEF;
      margin: 15px 0;
    }

    .breadcrumbs {
      font-size: 14px;
      color: #D2D2D2;
      text-decoration: none;
      margin-bottom: 30px;


    }
  }

  .tags-box {
    display: flex;
    margin-top: 8px;
    font-size: 13px;
    flex-wrap: wrap;
    margin-bottom: 15px;
  }

  .tag-item {
    border: 1px solid #eee;
    padding: 5px;
    border-radius: 5px;
    margin: 0 5px;
  }

  .entry-content {

  }

  footer.post-footer {
    width: 100%;
    padding: 20px 10px;
    margin-top: 30px;
    height: 65px;
    position: relative;

    i {
      font-size: 18px;
      margin-right: 5px;
    }

    .post-like {
      float: right;
      margin: 7px 0 0 20px;
    }

    .post-share {
      float: right;
      list-style: none;
      margin-right: 20px;
    }

    .donate {
      float: left;
      line-height: 36px;
      border-radius: 100%;
      -webkit-border-radius: 100%;
      -moz-border-radius: 100%;
      border: 1px solid #2B2B2B;

      &:hover {
        border: 1px solid goldenrod;

        span {
          color: goldenrod;
        }
      }

      span {
        color: #2B2B2B;
        padding: 10px;
        position: relative;
        cursor: pointer;
      }

      .donate_inner {
        display: none;
        margin: 0;
        list-style: none;
        position: absolute;
        left: 80px;
        top: -40px;
        background: #FFF;
        padding: 10px;
        border: 1px solid #ddd;
        box-shadow: 0 2px 6px rgba(0, 0, 0, .08);
        border-radius: 3px;

        &.show {
          display: block;
        }

        li {
          float: left;
        }

        img {
          width: 100px;
        }

        p {
          text-align: center;
          font-size: 15px;
          color: #D2D2D2;
          line-height: 1rem;
        }
      }

      .donate_inner:after, .donate_inner:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 45%;
        margin-left: -8px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid #fff;
      }

      .donate_inner:before {
        left: -1px;
        border-right: 8px solid #ddd;
      }

    }

    .post-tags {
      margin: 7px 0 0 20px;
      float: left;
      text-transform: uppercase;

      a:hover {
        color: #ff6d6d;
      }
    }
  }

  .open-message {
    margin: 50px 0;
    position: relative;
    background: #2B2B2B;
    padding: 10px 30px;
    border-radius: 3px;
    font-size: 14px;
    color: #fff;

    &:after {
      content: "";
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #2B2B2B;
      position: absolute;
      top: -8px;
      left: 48%;
    }

    p {
      margin: 10px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    a {
      color: #A0DAD0;
      padding: 0 5px;
    }
  }
}

.comments-head {
  border-top: 1px dashed #ECECEC;
  padding: 15px 0;
  padding-left: 10px;
  margin-bottom: 25px;

  .comments-h-t {
    line-height: 40px;
    padding-bottom: 10px;
    font-size: 15px;

  }
}

/******/
@media (max-width: 800px) {
  .site-content .site-main {
    padding: 30px 0 0 0;
  }

}
</style>
