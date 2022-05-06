<template>
  <div class="home" style=" padding-top: 80px;">
    <hr style="margin-bottom: 0px">
    <div class="site-content animate">

      <div class="chart-box" style="width: 100%;overflow: auto">
        <common-chart :charData="charData" :key="count" :Max="Max"/>
      </div>
      <div class="month-box">
        <div class="month-item" v-for="item in monthData">
          <div class="month-left">{{ item.mouth }}月</div>
          <div class="month-right">{{ item.count }}</div>
        </div>
      </div>
      <!--文章列表-->
      <main class="site-main grid-line" style="margin-top: -50px" :class="{'search':hideSlogan}" v-loading="loading">
        <section-title style="margin-bottom: 40px" v-if="!hideSlogan">文章归档</section-title>
        <el-timeline >
          <template v-for="(item,index) in postList">
            <el-timeline-item
                color="#ff8b89"
                type="success "
                :timestamp="item.updatedAt | parseTimeFull" placement="top">
              <div style="padding-top: 15px;">
                <post :showLine="false" class="post-i" :style="{'animation-delay':0.2+'s'}" :post="item"
                      :key="item.id"></post>
                <hr style="margin: 0px;margin-top: -25px">
              </div>
            </el-timeline-item>
          </template>
        </el-timeline>
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
import {dirArticle, getArticleGroup} from "../api/article";
import CommonChart from "../components/mg-chart";

export default {
  name: 'Home',
  props: ['cate', 'words'],
  data() {
    return {
      count: 0,
      fresh: 0,
      monthData: [],
      charData: [],
      Max: 0,
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
          prop: 'isTop',
          order: 'desc',
        },
        // group: 'id',
      },
    }
  },
  components: {
    CommonChart,
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
      getArticleGroup(this.query).then(res => {
        let datas = res.data || []
        this.count = res.count
        this.monthData = res.monthData
        this.charData = res.dayData
        let max = 0
        for (const charData of this.charData) {
          if (charData[1] > max) {
            max = charData[1]
          }
        }
        this.Max = max
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
  .top-feature, .chart-box,.month-box {
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
<style lang="less">
hr {
  margin: 40px 0;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 109, 109, 0.75), rgba(0, 0, 0, 0));
}

.month-box {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: wrap;
  border-radius: 5px;
  border: 1px dotted #bdbbbb;

  .month-item {
    width: 80px;
    height: 30px;
    background-color: #efefef;
    border-radius: 3px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    line-height: 30px;
    text-align: center;
    box-sizing: border-box;
    margin: 8px;

    .month-left {
      width: 45px;
      border-right: 1px solid #fff;

    }
    .month-right {
      width: 35px;
      background-color: #f3f2f2;
    }

  }
}
</style>