
<template>
    <el-table
        :data="datas"
        style="width: 100%;"
        ref="ztable"
        border
        :stripe="stripe"
        :height="height"
        @sort-change="sortChange"
        :show-summary="showSum"
        :default-sort="{prop: queryList.orderBy, order: 'descending'}"
        v-loading="tloading"
        @select="$emit('select',$event)"
        @select-all="$emit('select-all',$event)"
        @selection-change="$emit('selection-change',$event)"
        :max-height="maxHeight"
        :span-method="spanMethod"
        :element-loading-text="loadingText"
        element-loading-spinner="el-icon-loading"
        :header-cell-style="headerStyle"
    >
        <slot></slot>
    </el-table>
</template>

<script>
    export default {
        name: "lk-el-table",
        props: {
            datas: {
                type: Array,
                required: true,
                default() {
                    return [];
                }
            },
          loadingText: {
                type: String,
                default() {
                    return '数据加载中...';
                }
            },
          //表头样式
          headerStyle: {
                type: Object,
                default() {
                    return {
                      'text-align': 'center',
                      'background-color': '#f0f4fb',
                      'color': '#23262b',
                      'font-size': '14px'};
                }
            },
          queryList: {
                type: Object,
                default() {
                    return {};
                }
            },
            loading: {
                type: Boolean,
                default() {
                    return true;
                }
            },

            maxHeight: {
                type: [String, Number],
                default() {
                    return 'auto'
                }
            },
            height: {
                type: [String, Number],
                default() {
                    return '580'
                }
            },
            //显示汇总数据？
            showSum: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            //开启条纹？
            stripe: {
                type: Boolean,
                default() {
                    return true;
                }
            },

            /**
             * 合并单元格
             * @see https://element.eleme.cn/#/zh-CN/component/table
             * */
            spanMethod: {
                type: Function,
                default() {
                    return function () {

                    };
                }
            }
        },
        methods: {
            sortChange(res) {
                this.$emit('sort', res);
            },
            goToBottom() {
                this.$refs.ztable.bodyWrapper.scrollTop = this.$refs.ztable.bodyWrapper.scrollHeight;
            },
            clearSelection(){
                this.$refs.ztable.clearSelection();
            },
            toggleRowSelection(row){
                this.$refs.ztable.toggleRowSelection(row);
            }
        },
        computed: {
            selection() {
                return this.$refs.ztable.selection;
            }
        },
        watch: {
            loading(v) {
                if (this.tloading && !v) {
                    setTimeout(() => {
                        this.tloading = v;
                    }, 300)
                } else {
                    this.tloading = v;
                }
            }
        },
        data() {
            return {
                tloading: false,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
