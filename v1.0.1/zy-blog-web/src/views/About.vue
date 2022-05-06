<template>
  <div class="about">
    <div class="site-content">
      <div class="content-warp">
        <div class="about-site about-info" v-for="item in list" :key="item.id">
          <section-title><span>❤</span>{{item.aboutTitle || '关于'}}</section-title>
          <div class="info-card entry-content"  v-html="item.aboutContent || '没有人真正关注你。每个人都忙关注他们自己'">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sectionTitle from '@/components/section-title'
import {getTime, getTimeInterval} from '@/utils'
import {getSiteAbout} from "../api/web-blog";
// import Quote from "@/components/quote";
// import {fetchFriend} from '../api'
export default {
  name: "About",
  data() {
    return {
      form:{},
      list: []
    }
  },
  components: {
    // Quote,
    sectionTitle
  },
  methods: {
    getTop() {
      let timer = setInterval(() => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let speed = Math.ceil(scrollTop / 5)
        document.documentElement.scrollTop = scrollTop - speed
        if (scrollTop === 0) {
          clearInterval(timer)
        }
      }, 20)
    },
    getDataList(){
      getSiteAbout().then(res=>{
        this.list = res.records || []
        // console.log(res)
      })
    }
  },
  mounted() {
    this.getTop()
    this.getDataList()
  }
}
</script>
<style scoped lang="less">
.about {
  padding-top: 40px;
}

.content-warp {
  margin-top: 80px;

  .about-info {
    margin: 30px 0;

    span {
      color: red;
      margin-right: 10px;
    }

    .info-card {
      min-height: 100px;
      padding: 5px;
      border-radius: 3px;
      margin: 10px 0 30px 0;
      /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
      p {
        line-height: 1.7rem;
      }
    }
  }

  .contactForm {
    width: 100%;
    padding: 20px;

    .form-item {
      align-items: center;
      display: flex;

      &:not(:last-child) {
        margin-bottom: 20px;
      }

      label {
        width: 80px;
      }

      .v {
        min-height: 40px;
        line-height: 20px;
        border-radius: 3px;
        padding: 2px 10px;
        outline: none;
        border: 1px solid #8fd0cc;
        width: 100%;
        resize: vertical;
      }

      button {
        width: 100px;
        height: 40px;
        border-radius: 3px;
        outline: 0;
        border-style: none;
        cursor: pointer;
        background-color: #409eff;
        color: white;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}

/*******/
@media (max-width: 800px) {
  .content-warp {
    margin-top: 0;
  }
}
</style>
