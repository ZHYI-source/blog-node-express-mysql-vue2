<template>
    <el-form inline :model="model" ref="searchForm" :rules="rules" :label-width="labelWidth" autocomplete="on">
        <div class="screening-rows">
            <div style="overflow: hidden;transition: all 0.2s cubic-bezier(0.21, 0.14, 0.15, 0.29) 0s;"
                 :style="moreScreening.showScreening?`height:${moreScreening.customHeight}px`:'height:48px'">
                <div style="display: flex;flex-wrap: wrap" ref="screeningDom">
                    <slot></slot>
                </div>
            </div>
            <div class="screening-rows_operate">
                <div class="more-screening" :class="{open:moreScreening.showScreening}"
                     v-if="moreScreening.isMoreScreening" @click="moerScreeningHandle">
                    <i class="iconfont iconcaidan"></i>
                    <span>{{ moreScreening.showScreening ? '收起筛选' : '更多筛选' }}</span>
                </div>
                <div class="search-btn-box">
                  <slot name="btn"></slot>
                  <el-button type="primary" size="mini" v-if="!disQuery"  @click="search()">查询
                  </el-button>
<!--                    <el-button type="info" size="mini" @click="resetQuery('searchForm')">重置-->
<!--                    </el-button>-->
                </div>
            </div>
        </div>
    </el-form>
</template>

<script>

    export default {
        name: "mk-search-form",
        props: {
          disQuery: {
            type: Boolean,
            default() {
              return false;
            }
          },
            model: {
                type: Object,
                required: true,
                default() {
                    return {}
                }
            },
            labelWidth: {
                type: String,
                default() {
                    return '80px'
                }
            },
            rules: {
                type: Object,
                default() {
                    return null
                }
            }
        },
        mounted() {
            window.onresize = () => {
                this.$nextTick(() => {
                    this.comScreeningHeight();
                });
            };
            this.$nextTick(() => {
                this.comScreeningHeight();
            });
            setTimeout(() => {
                this.comScreeningHeight();
            }, 500)
        },
        methods: {
            resetQuery(val) {
                this.$refs.searchForm.resetFields();
                // this.$emit('reset',val);
            },
            moerScreeningHandle() {
                this.moreScreening.showScreening = !this.moreScreening.showScreening;
            },
            comScreeningHeight() {
                //获取高度
                let screeningDom = this.$refs.screeningDom;

                if (screeningDom) {
                    this.moreScreening.customHeight = screeningDom.offsetHeight;
                    this.moreScreening.isMoreScreening = screeningDom.offsetHeight > 70;
                }
            },
            search() {
                //this.$refs.searchForm.submit();
                if (this.rules) {
                    this.$refs.searchForm.validate((v, fields) => {
                        if (!v) {
                            this.toast.errorFormRule(fields);
                            return;
                        }
                        this.$emit('search');
                    });
                } else {
                    this.$emit('search');
                }
            },
            validate() {
                return new Promise((resolve, reject) => {
                    this.$refs.searchForm.validate((v, fields) => {
                        if (!v) {
                            this.toast.errorFormRule(fields);
                            reject();
                            return;
                        }
                        resolve();
                    });
                })
            }
        },
        data() {
            return {
                moreScreening: {
                    isMoreScreening: false,
                    showScreening: false,
                    customHeight: '',
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .screening-rows {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        //padding-top: 14px;
        border-bottom: 1px solid rgba(232, 232, 232, 1);
        padding-bottom: 5px;
        &_operate {
            display: flex;
            align-items: center;
            flex-shrink: 0;
            justify-content: flex-end;
            padding-top: 8px;
            .more-screening {
                font-size: 13px;
                font-family: Microsoft YaHei,serif;
                font-weight: 400;
                color: #505559;
                padding: 6px 0;
                cursor: pointer;
                user-select: none;
                .iconfont {
                    font-size: 16px;
                    margin-right: 5px;
                }
                &:hover {
                    color:$color-primary ;
                }
            }

            .open {
                color: $color-primary;
            }
            .search-btn-box {
              height: 100%;

            }
            /*elementy元素*/
            .el-button {
                margin-left: 10px;
            }
        }

    }

</style>
<style lang="scss">
    .screening-rows {
        .el-checkbox {
            line-height: 28px;
        }
    }
    .mk-reset-btn {
      background-color: $color-primary;
      border: none;
      border-radius: 2px;
    }
</style>
