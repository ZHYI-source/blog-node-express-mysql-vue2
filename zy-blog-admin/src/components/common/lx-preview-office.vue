<template>
    <section>
      <lk-view-header @back="$emit('close')" content="协议详情"/>
      <iframe v-if="tempUrl" :src="tempUrl" ref="iframe"
              style="width: 100%;height: calc(100vh - 230px)"></iframe>
    </section>

</template>

<script>


    import LkBackList from "@/components/common/lk-back-list";
    export default {
        name: "lk-preview-office",
      components: {LkBackList},
      props: {
            url: {
                type: String,
                default() {
                    return null;
                }
            }
        },
        created() {
            if (this.url) this.tempUrl = this.url
        },
        watch: {
            url(v) {
                this.tempUrl = v ?this.url: null;
            }
        },
        methods: {
            //获取officehtml地址
            getOfficeHtmlUrl(fileUrl) {
                if (!fileUrl){
                    return  ''
                }
                if (!fileUrl.startsWith("http")) {
                    fileUrl = getFileUrl() + fileUrl + "?imgOp=1";
                }
                 return this.getViewUrl() + `onlinePreview?url=${encodeURIComponent(base64.en(fileUrl))}`
            },
            getViewUrl(){
                let baseUrl = process.env.VUE_APP_VIEW_URL;
                let port = process.env.VUE_APP_VIEW_PORT;
                if (!baseUrl || !baseUrl.length) {
                    baseUrl = window.location.protocol + '//' + window.location.hostname;
                }
                if (port) {
                    return baseUrl + ":" + port + "/"
                }
                return baseUrl + "/";
            }
        },
        data() {
            return {
                tempUrl: null
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
