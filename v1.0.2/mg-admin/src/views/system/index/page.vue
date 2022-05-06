<template>
  <d2-container class="page" >
    <el-button @click="getDataList" type="primary" icon="el-icon-refresh" size="mini">刷新</el-button>
    <mk-chart v-loading="loading" :charData="charData" width="75%" style="margin: 0 auto" :key="Max" :Max="Max"/>
    <section class="welcome">
      <div class="bubbling">Be encouraged in time, time waits for no one.</div>
    </section>
    <section class="welcome" v-if="show.btn">
      <el-button-group>
        <el-button type="primary" icon="el-icon-edit" @click="goMenu('a')">博文编写</el-button>
        <el-button type="primary" icon="el-icon-s-tools" @click="goMenu('b')">站点管理</el-button>
        <el-button type="primary" icon="el-icon-s-custom" @click="goMenu('c')">友链管理</el-button>
      </el-button-group>
    </section>
  </d2-container>
</template>
<script>
import D2Badge from './components/d2-badge'
import D2Help from './components/d2-help'
import D2PageCover from './components/d2-page-cover'
import MkMdEditor from "@/components/md-editor";
import MkIpCard from "@/components/common/mk-ip-card";
import MkChart from "@/components/common/mk-chart";
import {getArticleGroup} from "@/api/modules/sys.index.api";
import util from "@/libs/util";

export default {
  components: {
    MkChart,
    MkIpCard,
    MkMdEditor,
    D2Badge,
    D2Help,
    D2PageCover
  },
  updated() {
    if (this.$store.state.d2admin.perms.permsArr.includes('*')){
      this.show.btn = true
    }
  },
  mounted() {
    this.getDataList()
    if (this.$store.state.d2admin.perms.permsArr.includes('*')){
      this.show.btn = true
    }
  },
  methods: {
    getDataList() {
      this.loading=true

      getArticleGroup(this.query).then(res => {
        this.monthData = res.monthData
        this.charData = res.dayData
        let max = 0
        for (const charData of this.charData) {
          if (charData[1] > max) {
            max = charData[1]
          }
        }
        this.Max = max
        this.loading=false
      }).catch(err => {
        this.loading=false
      })
    },
    goMenu(type){
      switch (type){
        case 'a':
          this.$router.push({path:'/dir-article-info'})
          break;
        case 'b':
          this.$router.push({path:'/dir-website-info'})
          break
        case 'c':
          this.$router.push({path:'/dir-friends-info'})
          break
      }
    }
  },

  data() {
    return {
      show:{
        btn:false
      },
      loading:false,
      monthData: [],
      charData: [],
      Max: 0,
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
  }
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Bubblegum+Sans&display=swap');

.page {
  .logo {
    width: 120px;
  }

  .btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    line-height: 12px;
    margin-top: 0px;
    margin-bottom: 20px;

    .btn-group__btn {
      color: $color-text-sub;

      &:hover {
        color: $color-text-main;
      }

      &.btn-group__btn--link {
        color: $color-primary;
      }
    }
  }

}

.welcome {
  height: 100px;
  padding-top: 35px;
  text-align: center;
  //background: #3498db;
  border-radius: 5px;
  text-shadow: 0 0 5px #525252;

  .bubbling {
    position: relative;
    z-index: 2;
    display: inline-block;
    color: #ffffff;
    font-size: 2.5rem;
    font-family: 'Bubblegum Sans', cursive;
    font-weight: bold;
    text-transform: uppercase;
  }

  .bubble {
    position: absolute;
    background: #f80000;
    border-radius: 100%;
    z-index: 9999;
  }
}
</style>
