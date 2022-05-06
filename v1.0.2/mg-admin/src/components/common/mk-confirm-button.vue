<template>
    <div class="gx-confirm-button">
        <div class="title iconfont gxwenhao">{{title || '确定'}}</div>
        <div class="content">{{content || '确定？'}}</div>
        <div class="buttons">
            <el-button v-for="(b,idx) in buttons" :type="b.type" :key="'cb'+idx" class="confirm-button" size="medium" @click="clickBtn(b,idx)">
                {{b.text}}
            </el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mk-confirm-button",
        props: {
            title: null,
            content: null,
            buttons: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods: {
            clickBtn(button, index) {
                this.$emit('close', {index, button});
            }
        },
        mounted() {
            let cls = document.getElementsByClassName('v-dialog-body');
            if (cls && cls.length){
                cls[cls.length-1].style.padding = '0';
            }
        },
        data() {
            return {}
        }
    }
</script>

<style lang="scss">
    .gx-confirm-button {
        display: flex;
        flex-direction: column;
        position: relative;

        .title {
            border-bottom: 1px solid #ddd;
            background: $color-primary;
            color: white;
            padding: 0 20px;
            line-height: 47px;
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            &:before {
                margin-right: 10px;
            }
        }

        .content {
            padding: 20px;
            //padding-top: 40px;
            color: #5D6469;
            font-weight: bold;
            font-size: 16px;
            font-family: Source Han Sans CN;
        }

        .buttons {
            right: 10px;
            top: 120px;
            position: absolute;
            display: flex;
            width: 100%;
            justify-content: center;
            /*left: 20px;*/
            padding-right: 10px;
            .confirm-button {
                min-width: 84px;
                border-radius: 6px;
            }
        }

    }
</style>
