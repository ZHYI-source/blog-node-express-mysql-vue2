<template>
  <div class="articles">
    <banner></banner>
    <div class="site-content animate">
      <!-- 文章目录 -->
      <div id="article-menus" v-if="menus.length">
        <menu-tree :menus="menus" child-label="child"></menu-tree>
      </div>
      <main class="site-main">
        <article class="hentry">
          <!-- 文章头部 -->
          <header class="entry-header">
            <!-- 标题输出 -->
            <h1 class="entry-title">{{ form.title || '暂无数据' }}</h1>
            <hr>
            <div class="breadcrumbs">
              <div id="crumbs">{{ '最后更新时间：' + form.pubTime }}</div>
            </div>
          </header>
          <!-- 正文输出 -->
          <div class="entry-content" ref="entry-content" v-html="form.content"/>
          <!-- 文章底部 -->
          <section-title>
            <footer class="post-footer">
              <!-- 阅读次数 -->
              <div class="post-like">
                <i class="iconfont iconeyes" title="阅读次数"></i>
                <span class="count">{{ form.viewsCount || 0 }}</span>
              </div>
              <!-- 分享按钮 -->

              <!-- 赞助按钮 -->
              <div class="donate" @click="showDonate=!showDonate">
                <span>赏</span>
                <ul class="donate_inner" :class="{'show':showDonate}">
                  <li class="wedonate"><img src="../assets/images/vx.jpg">
                    <p>微信</p></li>
                  <li class="alidonate"><img src="../assets/images/zfb.jpg">
                    <p>支付宝</p></li>
                </ul>
              </div>
              <!-- 文章类型 -->
              <div class="post-tags">
                <i class="iconfont iconcategory"></i>
                <router-link title="分类" :to="`/category/${form.className}`">{{ form.className || '其他' }}
                </router-link>
              </div>
            </footer>
          </section-title>

          <!--声明-->
          <div class="open-message">
            <p>声明：ZYBlog博客|版权所有，违者必究|如未注明，均为原创</p>
            <p>转载：转载请注明原文链接 - <a href="#">{{ form.title || 'ZYBlog' }}</a></p>
          </div>

          <!--评论-->
          <div class="comments">
            <div class="comments-head">
              <h2 class="comments-h-t">
                <i class="el-icon-edit-outline"></i>
                文章评论
              </h2>
              <comment-message-editor :key="form.content" :inline="false" buttonText="提交" @focus=""
                                      @submit="toSubmitComment"></comment-message-editor>
            </div>
            <comment v-for="item in comments" :key="item.comment.id" :comment="item.comment"
                     @reply="getDataList">
              <template v-if="item.reply.length">
                <comment v-for="(reply,index) in item.reply" :key="reply.comment.id"
                         :comment="reply.comment" @reply="getDataList"></comment>
              </template>
            </comment>
          </div>
        </article>
      </main>
    </div>
  </div>
</template>

<script>
import commentMessageEditor from 'comment-message-editor'
import Banner from '@/components/banner'
import sectionTitle from '@/components/section-title'
import comment from '@/components/comment'
import menuTree from '@/components/menu-tree'
import {dirComment, getArticleDetail, getCreateComment} from "../api/web-blog";

export default {
  name: 'articles',

  data() {
    return {
      showDonate: false,
      //查询条件
      query: {
        size: 20,
        current: 1,
        //排序字段
        orderBy: 'createTime',
        //排序类型
        orderType: 'DESC',
        params: {
          id: '',
        }
      },
      postId: '',//文章ID
      //提交评论
      addCommentData: {},
      comments: [],
      menus: [],
      form: {}
    }
  },
  components: {
    commentMessageEditor,
    Banner,
    sectionTitle,
    comment,
    menuTree
  },

  methods: {
    // 提交评论
    toSubmitComment(val) {
      let p = {
        postId: this.postId,//文章id
        parentId: 0,//父级id
        fromUserId: '',//用户ID
        fromUserName: '匿名',//用户名称
        fromUserAvatar: 'http://localhost:5220/zy-server/public/images?id=164466183089025c842ff5fae3.jpg',//用户头像
        content: val,//评论内容
        toUserId: '',//回复对象ID
        toUserName: '',//回复对象名称
        toUserAvatar: '',//回复对象头像
      }
      getCreateComment(p).then(res => {
        this.$message({
          message: '评论成功！',
          type: 'success'
        });
        this.form.content = ''
        this.getDataList(this.postId)
      })
    },
    //  加载文章详情
    getDataList(idx) {
      getArticleDetail({id: idx}).then(res => {
        this.form = res.records[0] || {}
      })
      this.getCommentList(idx)
    },

    //  加载评论列表
    getCommentList(idx) {
      // 首先调用initTree方法查找所有parent_id为-1的（-1认为是第一级）
      this.query.params.id = idx || ''
      dirComment(this.query).then(res => {
        let params = res.records || []
        const initTree = (parentId) => {
          const child = params.filter(item => item.parentId == parentId)
          return child.map(item => ({
            comment: {...item},
            reply: initTree(item.id)
          }))
        }
        this.comments = initTree(0)
        console.log('评论列表', this.comments)
      }).catch(err => {
        console.log(err)
      })

    },
    //  加载文章标题
    fetchH(arr, left, right) {
      if (right) {
        return arr.filter(item => item.offsetTop > left && item.offsetTop < right)
      } else {
        return arr.filter(item => item.offsetTop > left)
      }
    },
    // 生成目录
    createMenus() {
      this.$nextTick(() => {
        let h = document.getElementsByClassName('entry-content')[0].children
        console.log(h)
        let arr = []
        for (let i = 6; i > 0; i--) {
          let temp = []
          let e = this.$refs['entry-content'].getElementsByTagName(`h${i}`)
          // console.log('Dom',document.getElementsByClassName('entry-content')[0])
          if (e.length) {
            for (let j = 0; j < e.length; j++) {
              // console.log(e[j])
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
        }
        this.menus = arr
      })

    },
    getTop() {
      let timer = setInterval(() => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let speed = Math.ceil(scrollTop / 5)
        document.documentElement.scrollTop = scrollTop - speed
        if (scrollTop === 0) {
          clearInterval(timer)
        }
      }, 20)
    }
  },
  mounted() {
    this.getTop()
    this.createMenus()
  },
  created() {
    let id = this.$route.params.id || ''
    this.postId = id || ''
    this.getDataList(id)
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
      cursor: default;

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

  }
}
</style>
