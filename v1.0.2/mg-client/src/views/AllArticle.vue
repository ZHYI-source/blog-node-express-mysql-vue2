<template>
  <div class="home">
    <banner isHome="true"></banner>
    <div class="site-content animate  grid-line">
      <!--通知栏-->
      <div class="notify">
        <div class="search-result" style="display: flex;justify-content: center;align-content: center;">
          <small-ico></small-ico> <span>{{`共有${count}条文章`}}</span>
        </div>
      </div>
      <!--文章列表-->
      <main class="site-main " :class="{'search':hideSlogan}" v-loading="loading">
        <section-title v-if="!hideSlogan">{{sectionTitle}}</section-title>
        <template v-for="(item,index) in postList">
          <post class="post-i" :style="{'animation-delay':0.2+'s'}" :post="item" :key="item.id"></post>
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
import {dirArticle} from "../api/article";

export default {
  name: 'Home',
  props: ['cate', 'words'],
  data() {
    return {
      count:0,
      postList: [],
      currPage: 1,
      loading: false,
      sectionTitle: '所有文章',
      hasNextPage: false,
      query: {
        //查询推荐并且按是否顶置查询
        params: {},
        limit: 20,//每页条数
        offset: 1,//当前页
        sort: {
          prop: 'createdAt',
          order: 'desc',
        }
      }
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
      return this.$store.getters.notice
    }
  },
  methods: {
    getDataList() {
      this.loading = true
      dirArticle(this.query).then(res => {
        let datas = res.data || []
        this.count = res.count
        for (const data of datas) {
          this.postList.push(data)
        }
        this.loading = false
        this.query.offset = res.current + 1
        this.hasNextPage = this.postList.length < res.count
      }).catch(err => {
        this.loading = false
      })
    },

    loadMore() {
      this.getDataList()
    },

  },
  mounted() {
    this.getDataList();
  }
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
  padding-top: 0px;

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
    padding-top: 0px;
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
.post-i {
  animation: one-in 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

}

@keyframes one-in {
  from {
    padding-top: 100px;
    height: 0%;
  }
  to {
    padding-top: 0px;
    height: 100%;
  }
}
</style>
