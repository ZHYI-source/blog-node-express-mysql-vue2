<template>
    <div class="date-wrap" v-if="date && date.length">
        <i class="iconfont icon-date" :style="{color:iconColor}"></i>{{ date }}
    </div>
</template>

<script>
    export default {
        //时间显示
        name: 'lk-view-date',
        props: {
            date: {
                type: String,
                default() {
                    return '';
                }
            },
            //控制图标颜色
            iconColor: {
                type: String,
                default() {
                    return '#1989FA';
                }
            }
        },
        created() {
        },
        methods: {},
        data() {
            return {}
        }
    }
</script>

<style scoped lang="scss">
    .date-wrap {
        width: 100%;
        display: flex;
        align-items: flex-start;
        color: #565c6c;

        .iconfont {
            font-size: 14px;
            margin-right: 5px;
        }
    }
</style>
