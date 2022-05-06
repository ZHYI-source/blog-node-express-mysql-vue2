<template>
    <el-select v-model="checkeds" :size="size" :filterable="filterable" :clearable="clearable"
               :placeholder="placeholder" @visible-change="inputBlur" :filter-method="filterDict" @change="send(checkeds)" @blur="$emit('blur',$event)" @focus="$emit('focus',$event)"
               style="width: 100%;"
               :disabled="disabled">
<!--        <div slot="empty" v-if="showAdd">-->
<!--            <div style="padding: 10px;">-->
<!--                <el-button size="mini" type="primary" plain @click="addDict">添加到库</el-button>-->
<!--            </div>-->
<!--        </div>-->
        <el-option
            v-for="item in fDatas"
            :key="item.dict_label"
            :label="item.dict_label"
            :value="item.dict_value">
        </el-option>
    </el-select>
</template>
<script>

    import {dirDictData} from "@/api/admin/dictManageMent";

    export default {
        /**字典选择*/
        name: "MkSelectDict",
        props: {
            code: {
                type: [String, Number],
                required: true,
                default() {
                    return ''
                }
            },
            value: {
                type: [String, Number, Array],
                default() {
                    return "";
                }
            },
            returnMethod: {
                type: [String],
                default() {
                    return "getValue";
                }
            },
            placeholder: {
                type: String,
                default() {
                    return "请选择";
                }
            },
            disabled: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            clearable: {
                type: Boolean,
                default() {
                    return true;
                }
            },
            filterable: {
                type: Boolean,
                default() {
                    return true;
                }
            },
            size: {
                type: String,
                default() {
                    return 'mini';
                }
            },
            notContain: {
                type: [String, Number, Array],
                default() {
                    return "";
                }
            },
            showAdd: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            //仅显示dictCode为以下值得数据
            onlyValues: {
                type: Array,
                default() {
                    return null;
                }
            }
        },
        model: {
            prop: 'value',
            event: 'getValue'
        },
        data() {
            return {
                datas: [],
                checkeds: '',
                firstValue: '',
                keyword: ''
            };
        },
        watch: {
            value(val) {
              console.log("变化",val)
                this.checkeds = val ? val + '' : '';
            }
        },
        methods: {
            send(val) {
            let dValue =  this.fDatas.filter(ele=>{
              if (ele.dict_value === val){
                return ele
              }
              })
              this.$emit('getItem',dValue)
                if (this.datas.length) {
                    this.$emit(this.returnMethod, this.checkeds || "");
                    if (val) {
                        let d = this.datas.filter(a => a.dictCode == val)[0];
                        this.$emit('value', d);
                        this.$emit('change', d)
                        this.$parent.$emit('el.form.change');
                    } else {
                        this.$emit('value', undefined);
                        this.$emit('change', null);
                        this.$parent.$emit('el.form.change');
                    }
                }
            },
            //重置
            resetField() {
                this.checkeds = this.firstValue;
                this.$emit(this.returnMethod, this.firstValue);
            },
            inputBlur(e) {
                if (!e) {
                    this.keyword = '';
                }
            },
            filterDict(e) {
                this.keyword = e;
            },
            addDict() {
              dirDictData({code: this.code, dictName: this.keyword}).then(res => {
                    let datas = res.data.data || [];
                    if (this.onlyValues && this.onlyValues.length) {
                        datas = datas.filter(a => this.onlyValues.findIndex(b => b == a.dictCode) > -1);
                    }
                    if (datas && datas.length) {
                        this.datas.push(datas);
                    }
                });
            }
        },
        computed: {
            fDatas() {
                if (!this.keyword && !this.keyword.length) {
                    return this.datas;
                }
                return this.datas.filter(a => a.dictName.indexOf(this.keyword) > -1);
            }
        },
        created() {
            this.checkeds = this.value ? this.value + '' : '';
            this.firstValue = this.checkeds;
            let _this = this;
            let  query = {
                //当前页
                currentPage: 1,
                //每页数据大小
                pageSize: 10,
                //排序字段
                orderBy: 'create_time',
                //排序类型
                orderType: 'desc',
                //名称搜索
                dict_type: this.code,
              };
            dirDictData(query).then(res => {
                if (res.data.data && res.data.data.length > 0) {
                    _this.datas = res.data.data;
                  console.log(_this.datas,'ss')
                }
            }).catch(() => {
                    console.error(this.datas, '错误')
                }
            );
        }
    }
</script>

<style lang="scss" scoped>

</style>
