<template>
    <el-form-item class="form-btns">
        <el-button class="form-btn" size="small" v-if="!disSave" :disabled="disableSave" type="primary"
                   @click="$emit('save')">{{ saveText }}
        </el-button>
        <el-button class="form-btn quxaio" size="small" v-if="!disClose" @click="$emit('close',true)">{{ closeText }}
        </el-button>
        <slot></slot>
    </el-form-item>
</template>

<script>
    export default {
        name: "mk-get-button",
        props: {
            saveText: {
                type: String,
                default() {
                    return '保存';
                }
            },
            closeText: {
                type: String,
                default() {
                    return '取消';
                }
            },
            disSave: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            disClose: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            disableSave: {
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

<style lang="scss">

</style>
