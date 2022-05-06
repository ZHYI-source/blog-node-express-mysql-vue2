<template>
    <div class="form-header">
        <div class="head-txt" v-if="!diyTitle">{{ dataId ? '修改' : view ? '查看' : '添加' }}{{ title }}</div>
        <div class="head-txt" v-else>{{ title }}</div>
        <!--  使用組件-->
        <mk-back-list :title="listTitle" v-if="!disBackList" @back="$emit('back',true)"/>
    </div>
</template>

<script>

    export default {
        name: "mk-form-header",
        components: { },
        /*注冊組件*/
        props: {
            dataId: null,
            title: {
                type: String,

                default() {
                    return ''
                }
            },
            disBackList: {
                type: [Boolean, String],
                default() {
                    return false;
                }
            },
            showHelp: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            menuId: {
                type: String,
                default() {
                    return "";
                }
            },
            view: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            diyTitle: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            listTitle: {
                type: String,
                default() {
                    return null
                }
            }
        },
        data() {
            return {}
        }
    }
</script>

<style scoped lang="scss">
    .form-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding-bottom: 15px;
        .head-txt {
            font-size: 16px;
        }
    }

</style>
