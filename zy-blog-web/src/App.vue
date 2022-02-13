<template>
    <div id="app" v-cloak>
        <!--canvas粒子-->
        <vue-canvas-nest :config="{color:'255,0,0', count: 88,zIndex:2}"  :el="'#app'"></vue-canvas-nest>
        <loading></loading>
        <layout-header></layout-header>
        <layout-body></layout-body>
        <layout-footer></layout-footer>
    </div>
</template>
<script>
    import layoutHeader from '@/components/layout/layout-header'
    import layoutBody from '@/components/layout/layout-body'
    import layoutFooter from '@/components/layout/layout-footer'
    import Loading from '@/components/loading'
    //https://www.npmjs.com/package/vue-canvas-nest
    import vueCanvasNest from 'vue-canvas-nest'
    export default {
        name: "app",
        components: {
            vueCanvasNest,
            layoutHeader,
            layoutBody,
            layoutFooter,
            Loading
        }
    }
</script>
<style lang="less">
    #app {
        font-size: 17px;
        color: #6f6f6f;

    }
</style>
