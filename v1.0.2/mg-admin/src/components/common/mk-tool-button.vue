<template>
    <el-button-group>
        <slot name="first"></slot>
        <el-button @click="$emit('view')" type="primary" size="mini"
                v-if="!disView ">
            {{ viewText }}
        </el-button>
        <el-button @click="$emit('edit')" type="primary" size="mini"
                v-if="!disEdit ">
            {{ editText }}
        </el-button>
        <el-button @click="$emit('delete')" type="primary" size="mini"
                v-if="!disDelete">
            {{ deleteText }}
        </el-button>
        <slot></slot>
    </el-button-group>
</template>

<script>
    import router from '@/router/index'

    export default {
        name: "mk-tool-button",
        props: {
            disView: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            disEdit: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            disDelete: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            viewText: {
                type: String,
                default() {
                    return '查看'
                }
            },
            editText: {
                type: String,
                default() {
                    return '修改'
                }
            },
            deleteText: {
                type: String,
                default() {
                    return '删除'
                }
            },

        },
        created() {
            this.menuCode = router != null ? router.currentRoute.meta.menuCode : null;
        },
        data() {
            return {
                menuCode: ''
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
