<template>
  <div class="home">
    <banner isHome="true"></banner>
    <div class="site-content animate">
      <!--通知栏-->
      <div class="notify">
        <div class="search-result" v-if="hideSlogan">
          <span v-if="searchWords">搜索结果："{{ searchWords }}" 相关文章</span>
          <span v-else-if="category">分类 "{{ category }}" 相关文章</span>
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
            <Feature :data="item" @click="getFocs(item)"></Feature>
          </div>
        </div>
      </div>
      <!--文章列表-->
      <main class="site-main  grid-line" :class="{'search':hideSlogan}" v-loading="loading">
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
      features: [
        {
          id: 1,
          title: '全部文章',
          img: 'https://storytale-public2.b-cdn.net/2021/08/16/e5ea0d8e-f897-4975-b82b-f90549c6b10d-Explore.png?height=410%201x,%20https://storytale-public2.b-cdn.net/2021/08/16/e5ea0d8e-f897-4975-b82b-f90549c6b10d-Explore.png?height=820%202x'
        },
        {
          id: 2,
          title: '关于博主',
          img: 'https://storytale-public2.b-cdn.net/2021/08/16/0c9abba2-a80f-4a4b-866f-fc1225165fde-Education.png?height=410 1x, https://storytale-public2.b-cdn.net/2021/08/16/0c9abba2-a80f-4a4b-866f-fc1225165fde-Education.png?height=820 2x'
        },
        {
          id: 3,
          title: '文章归档',
          img: 'https://storytale-public2.b-cdn.net/2021/09/28/2fed0193-b9de-4e77-9ed5-7eb887b16f1a-ommunicationbetweenrepositories.png?height=410 1x, https://storytale-public2.b-cdn.net/2021/09/28/2fed0193-b9de-4e77-9ed5-7eb887b16f1a-ommunicationbetweenrepositories.png?height=820 2x'
        }
      ],
      postList: [],
      currPage: 1,
      loading: false,
      sectionTitle: '推荐',
      hasNextPage: false,
      query: {
        //查询推荐并且按是否顶置查询
        params: {
          isRecommend: true
        },
        limit: 10,//每页条数
        offset: 1,//当前页
        sort: {
          prop: 'isTop',
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
  watch: {
    '$route': function (val) {
      if (val.params.cateId) {
        this.query.params.sort_id = val.params.cateId
        this.query.params.isRecommend = ''
      } else {
        this.query.params.sort_id = ''
        this.query.params.isRecommend = true
      }
      if (val.params.words) {
        this.query.params.article_title = val.params.words
        this.query.params.isRecommend = ''
      } else {
        this.query.params.article_title = ''
        this.query.params.isRecommend = true
      }
      this.query.offset = 1
      this.postList = []
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
      return this.$store.getters.notice
    }
  },
  methods: {
    changeType() {
      this.sectionTitle = !this.sectionTitle
      //清除推荐和全部
      if (!this.sectionTitle) {
        this.query.params = {}
        this.query.offset = 1
        this.postList = []
      } else {
        this.query.params = {
          isRecommend: true
        }
        this.query.offset = 1
        this.postList = []
      }
      this.getDataList()
    },
    getDataList() {
      this.loading = true
      dirArticle(this.query).then(res => {
        let datas = res.data || []
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
    getFocs(val){
      switch (val.id){
        case 1 :
          this.$router.push({name:'allArticle'});
          break;
        case 2 :
          this.$router.push({name:'about'});
          break;
        case 3 :
          this.$router.push({name:'archive'});
          break;
        default:
          console.log(null);
      }
    }
  },
  mounted() {
    if (this.$route.params.allArticle){

      this.sectionTitle='全部文章'
      this.query.params.isRecommend = ''
    }
    if (this.hideSlogan) {
      let cate = localStorage.getItem("category");
      let cateId = cate || JSON.parse(cate).id || JSON.parse(cate).cateId ? JSON.parse(cate).id || JSON.parse(cate).cateId : this.$route.params.cateId?this.$route.params.cateId:''
      let words = this.$route.params.words
      if (cateId) {
        this.query.params.sort_id = cateId
        this.query.params.isRecommend = ''
      } else {
        this.query.params.sort_id = ''
        this.query.params.isRecommend = true
      }
      if (words) {
        this.query.params.article_title = words
        this.query.params.isRecommend = ''
      } else {
        this.query.params.article_title = ''
        this.query.params.isRecommend = true
      }
    }
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
