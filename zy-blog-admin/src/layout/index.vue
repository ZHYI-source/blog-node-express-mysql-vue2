<template>
  <div>
<!--    <div class="user_up fixed-font">{{userName}}</div>
    <div class="user_mid fixed-font">{{userName}}</div>
    <div class="user_bottom fixed-font">{{userName}}</div>-->
    <div class="title-row">
      <!--<img class="logo" src="@/icons/logo.png"/>-->
      <div class="title-company" v-if="title">{{title}}</div>
      <!--<div class="title-name"> &#45;&#45;智能环卫监管一体化平台&#45;&#45;</div>-->
      <right-menu/>
    </div>
    <div class="title-row-background"></div>
    <div :class="classObj" class="app-wrapper">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
      <sidebar class="sidebar-container"/>
      <div :class="{hasTagsView:needTagsView}" class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <navbar/>
          <tags-view v-if="needTagsView"/>
        </div>
        <app-main/>
        <!--<right-panel v-if="showSettings">
          <settings />
        </right-panel>-->
      </div>
    </div>
  </div>
</template>

<script>
  import RightPanel from '@/components/RightPanel'
  import {AppMain, Navbar, Settings, Sidebar, TagsView, RightMenu} from './components'
  import ResizeMixin from './mixin/ResizeHandler'
  import {mapState} from 'vuex'
  import Watermark from '@/libs/watermark'

  export default {
    name: 'Layout',
    components: {
      AppMain,
      Navbar,
      RightPanel,
      Settings,
      Sidebar,
      TagsView,
      RightMenu
    },
    mixins: [ResizeMixin],
    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar,
        device: state => state.app.device,
        showSettings: state => state.settings.showSettings,
        needTagsView: state => state.settings.tagsView,
        fixedHeader: state => state.settings.fixedHeader
      }),
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    data(){
      return{
        title:'',
        orgList:[],
        userName:''
      }
    },
    methods: {
      handleClickOutside() {
        this.$store.dispatch('app/closeSideBar', {withoutAnimation: false})
      },
      getUserInfo() {
        this.title = this.$store.getters.orgName || 'ZY博客管理系统'
        this.userName = this.$store.getters.userNickName
        Watermark.set(this.userName);
      }
    },
    created(){
      this.getUserInfo()
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .logo{
    width: 40px;
    height: 40px;
    margin-left: 20px;
    margin-top: 10px;
    line-height: 60px;
  }
  .title-row-background{
    height: 50px;
    width: 100%;
  }

  .title-row{
    display: flex;
    flex-direction: row;
    height: 50px;
    position: fixed;
    background: #141E30;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #243B55, #141E30);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #243B55, #141E30); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    top: 0;
    right: 0;
    z-index: 300;
    width: 100%;
  }

  .title-company{
    font-size: 20px;
    letter-spacing: 3px;
    font-weight: bold;
    color: #ffffff;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif ;
    margin-left: 30px;
    line-height: 60px;
    height: 100%;
  }

  .title-name{
    color: #ffffff;
    font-size: 16px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif ;
    margin-left: 400px;
    line-height: 60px;
    height: 100%;
  }

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }


  .user_up{
    right: 2%;
    top: 10%;
  }
  .user_mid{
    left: 50%;
    top: 50%;
  }
  .user_bottom{
    left: 15%;
    bottom: 5%;
  }
  .fixed-font{
    position: fixed;
    width: auto;
    /*color: rgba(0, 0, 0, 0.1);*/
    color: #888;
    opacity: 0.5;
    font-size: 30px;
    font-weight: bolder;
    text-shadow: -1px 0 #ffffff, 0 1px #ffffff, 1px 0 #ffffff, 0 -1px #ffffff;
    letter-spacing: 3px;
    z-index: 9999;
  }

</style>
