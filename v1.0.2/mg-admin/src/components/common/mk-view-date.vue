<template>
    <div class="date-wrap" v-if="date && date.length">
        <i class="iconfont el-icon-date" :style="{color:iconColor}"></i>{{ date }}
    </div>
</template>

<script>
    export default {
        //时间显示
        name: 'mk-view-date',
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
            font-size: 12px;
            margin-right: 5px;
          line-height: 26px;
        }
    }
</style>
