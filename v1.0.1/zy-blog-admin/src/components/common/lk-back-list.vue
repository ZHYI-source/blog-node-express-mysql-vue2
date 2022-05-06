<template>
    <div class="view-header">
        <div class="head-back-box">
            <div class="bsc-icon" @click="goBack">
                <i class="iconfont iconfanhui"></i>
            </div>
            <span class="divider">|</span>
            <div class="bsc-title">{{title}}</div>
        </div>
        <el-divider></el-divider>
    </div>
</template>

<script>
    //返回
    export default {
        name: "lk-back-list",
        props:{
            title:{
                type:String,
                default(){
                    return ''
                }
            },
            url:{
                type:String,
                default(){
                    return ''
                }
            }
        },
        data(){
            return {

            }
        },
        methods: {
            goBack() {
               this.$emit('goBack')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .view-header {
        line-height: 25px;
        .head-back-box {
            display: flex;
            justify-content: flex-start;
            .divider {
                padding: 0px 10px;
            }
            .bsc-icon {
                cursor: pointer;
                &:hover{
                    color: #1890FF;
                }
            }
            .bsc-title {
                font-weight: bold;

            }
        }
    }
</style>
