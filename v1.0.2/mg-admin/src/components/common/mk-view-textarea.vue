<template>
    <div class="textarea-wrap" v-if="show || (content&&content.length)">
        {{ content }}
        <slot></slot>
    </div>
</template>

<script>
    export default {
        //文本框显示
        name: 'mk-view-textarea',
        components: {},
        props: {
            content: {
                type: String,
                default() {
                    return '';
                }
            },
            show: {
                type: Boolean,
                default() {
                    return false;
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
    .textarea-wrap {
        width: 550px;
        max-width: 550px;
        background: #f3f3f3;
        border: 1px solid #dde5e5;
        min-height: 50px;
        line-height: 22px;
        border-radius: 4px;
        padding: 8px 10px 14px;
        font-size: 12px;
        overflow-y: auto;
        font-weight: 400;
        color: #626c88;
        white-space: pre-line;
        word-break: break-all;
        word-wrap: break-word;
        margin-top: -5px;

    }
</style>
