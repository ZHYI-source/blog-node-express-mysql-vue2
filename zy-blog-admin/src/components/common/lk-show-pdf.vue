
<template>
    <div>
        <!--pdf显示全部页面-->
        <!--若要显示单页则将for循环去掉即可-->
        <pdf
            v-for="i in numPages"
            :key="i"
            :src="src"
            :page="i"
            class="testpdf-outside"
            style="margin: 0 auto;display:block;width:210mm;"
        ></pdf>
    </div>
</template>

<script>

    export default {
        props: ["dochref"],
        watch: {
            dochref(val) {
                this.src = val;
            },
            src(val) {
                this.$emit('dochref', val)
            }
        },
        mounted() {
            // this.getUrl(this.dochref)
            this.src.promise.then(pdf => {
                //获取pdf所有的参数配值
                this.numPages = pdf.numPages;
                this.src = pdf.createLoadingTask(val)
            });
            console.log(this.dochref)
        },
        methods: {
            // getUrl(val){
            //     let loadingUrl=pdf.createLoadingTask(val)
            //     loadingUrl.then(
            //         pdf =>{
            //             this.src=loadingUrl
            //             this.numPages=pdf.numPages
            //         }
            //     ).catch((err)=>{
            //         console.log('pdf加载失败')
            //     })
            // }
        },
        components: {

        },
        data() {
            return {
                //处理跨域
                src: '',
                numPages: undefined,//pdf的总页数,
                pdfSrc: "",
                currentPage: 0, // pdf文件页码
                pageCount: 0, // pdf文件总页数
                activeIndex: 0
            }
        },

    }
</script>
<style scoped>
    .arrow2 {
        width: 300px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        margin: 0 auto;
    }

    .testpdf-outside {
        min-width: 800px;
    }
</style>
