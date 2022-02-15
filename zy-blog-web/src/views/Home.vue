<template>
  <div class="home">
    <banner isHome="true"></banner>
    <div class="site-content animate">
      <!--通知栏-->
      <div class="notify">
        <div class="search-result" v-if="hideSlogan">
          <span v-if="searchWords">搜索结果："{{ searchWords }}" 相关文章 ({{ postList.length }})</span>
          <span v-else-if="category">分类 "{{ category }}" 相关文章 ({{ postList.length }})</span>
        </div>
        <quote v-else>{{ notice }}</quote>
      </div>
      <!--焦点图-->
      <div class="top-feature" v-if="!hideSlogan">
        <section-title>
          <div style="display: flex;align-items: flex-end;">聚焦
            <small-ico></small-ico>
          </div>
        </section-title>
        <div class="feature-content">
          <div class="feature-item" v-for="item in features" :key="item.title">
            <Feature :data="item"></Feature>
          </div>
        </div>
      </div>
      <!--文章列表-->
      <main class="site-main" :class="{'search':hideSlogan}" v-loading="loading">
        <section-title v-if="!hideSlogan">推荐</section-title>
        <template v-for="item in postList">
          <post :post="item" :key="item.id"></post>
        </template>
      </main>

      <!--加载更多-->
      <div class="more" v-show="hasNextPage">
        <div class="more-btn" @click="loadMore">More</div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/banner'
import Feature from '@/components/feature'
import sectionTitle from '@/components/section-title'
import Post from '@/components/post'
import SmallIco from '@/components/small-ico'
import Quote from '@/components/quote'
import {fetchFocus, fetchList} from '../api'
import {dirArticle} from "../api/web-blog";

export default {
  name: 'Home',
  props: ['cate', 'words'],
  data() {
    return {
      //查询条件
      query: {
        size: 20,
        current: 1,
        //排序字段
        orderBy: 'isTop',
        //排序类型
        orderType: 'DESC',
        params: {
          id: '',
          title: '',
          classId: '',
          className: '',
          keyword: ''
        }
      },
      features: [
        {
          id: 1,
          title: 'Akina',
          img: 'https://s1.ax1x.com/2020/05/14/YDfRnU.jpg'
        },
        {
          id: 2,
          title: '使用说明',
          img: 'https://s1.ax1x.com/2020/05/14/YDf4AJ.jpg'
        },
        {
          id: 3,
          title: '文章归档',
          img: 'https://s1.ax1x.com/2020/05/14/YDfT91.jpg'
        }
      ],
      loading:false,
      postList: [],
      currPage: 1,
      hasNextPage: false
    }
  },
  components: {
    Banner,
    Feature,
    sectionTitle,
    Post,
    SmallIco,
    Quote
  },
  watch: {
    '$route': function (val) {
      // console.log(val)
      if (val.params.cate) {
        this.getDataList(val.params.cate)
        return
      }
      if (val.params.words) {
        this.getDataList('', val.params.words)
        return
      }

      this.query.params.className = ''
      this.query.params.keyword = ''
      this.getDataList()
    }
  },
  computed: {
    searchWords() {
      return this.$route.params.words
    },
    category() {
      return this.$route.params.cate
    },
    hideSlogan() {
      return this.category || this.searchWords
    },
    notice() {
      return this.$store.getters.notice || '人生天地间，忽如远行客.'
      // return '人生天地间，忽如远行客.'
    }
  },
  methods: {
    getDataList(val, keyword) {
      let that = this
      this.loading=true
      if (val) {
        this.query.params.className = val
      }
      if (keyword) {
        this.query.params.keyword = keyword
      }
      dirArticle(this.query).then(res => {
        that.postList = res.records || []
        this.loading=false
      }).catch(err => {
        this.loading=false
        console.log(err)
      })
    },
    fetchFocus() {
      // fetchFocus().then(res => {
      //     this.features = res.data || []
      // }).catch(err => {
      //     console.log(err)
      // })
    },
    fetchList() {
      // fetchList().then(res => {
      //     // this.postList = res.data.items || []
      //     // this.currPage = res.data.page
      //     // this.hasNextPage = res.data.hasNextPage
      // }).catch(err => {
      //     console.log(err)
      // })
    },
    loadMore() {
      fetchList({page: this.currPage + 1}).then(res => {
        this.postList = this.postList.concat(res.data.items || [])
        this.currPage = res.data.page
        this.hasNextPage = res.data.hasNextPage
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
    let cate = this.$route.params.cate
    let words = this.$route.params.words
    if (cate) {
      this.getDataList(cate);
      return
    }
    if (words) {
      this.getDataList('', words);
      return
    }
    this.getDataList();
  },
}
</script>
<style scoped lang="less">

.site-content {
  .notify {
    margin: 60px 0;
    border-radius: 3px;

    & > div {
      padding: 20px;
    }
  }


  .search-result {
    padding: 15px 20px;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    border: 1px dashed #ddd;
    color: #828282;
  }
}

.top-feature {
  width: 100%;
  height: auto;
  margin-top: 30px;

  .feature-content {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;

    .feature-item {
      width: 32.9%;
    }
  }
}

.site-main {
  padding-top: 80px;

  &.search {
    padding-top: 0;
  }
}

.more {
  margin: 50px 0;

  .more-btn {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #ADADAD;
    border: 1px solid #ADADAD;
    border-radius: 20px;
    margin: 0 auto;
    cursor: pointer;

    &:hover {
      color: #8fd0cc;
      border: 1px dashed #8fd0cc;
    }
  }
}

/******/
@media (max-width: 800px) {
  .top-feature {
    display: none;
  }

  .site-main {
    padding-top: 40px;
  }

  .site-content {
    .notify {
      margin: 30px 0 0 0;
    }

    .search-result {
      margin-bottom: 20px;
      font-size: 16px;
    }
  }
}

/******/
</style>
