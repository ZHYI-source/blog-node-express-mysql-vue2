<style lang="scss" src="@css/app.scss"></style>
<template>
    <div>
        <div class="app-form-class">
            <el-form ref="form" :model="formVal" :rules="rules" label-width="80px" size="mini" @submit.native.prevent
                     :hide-required-asterisk="ctl.view">
                <el-row :gutter="20" type="flex" justify="space-between">
                    <el-col :span="11">
                        <el-form-item label="姓名">
                            <el-input v-model="formVal.userRealName" :disabled="true" placeholder="姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="手机号">
                            <el-input v-model="formVal.userTel" :disabled="true" placeholder="手机号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20" type="flex" justify="space-between">
                    <el-col :span="11">
                        <el-form-item label="身份证号">
                            <el-input v-model="formVal.idCard" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="注册渠道">
                            <el-select v-model="formVal.payChanel" :disabled="true" placeholder="请选择">
                                <el-option v-for="item in dic.payChanel"
                                           :key="item.key"
                                           :label="item.val"
                                           :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" justify="space-between">
                    <el-col :span="11">
                        <el-form-item label="商户号">
                            <el-input v-model="formVal.shopno" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="银行卡号">
                            <el-input v-model="formVal.account" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" justify="space-between">
                    <el-col :span="11">
                        <el-form-item label="从业编号" :required="true" prop="cmpsnid">
                            <el-input v-model="formVal.cmpsnid" :disabled="ctl.view"></el-input>
                            <!--                    <el-input v-model="formVal.companyId" :disabled="ctl.view"></el-input>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="从业资格证号" label-width="120px" :required="true" prop="enbeworRecordId">
                            <el-input v-model="formVal.enbeworRecordId" :disabled="ctl.view"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20" type="flex" justify="space-between">

                    <el-col :span="11">
                        <el-form-item label="所属车辆">
                            <el-input v-model="formVal.branum" :disabled="ctl.view"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <el-row type="flex" justify="center" style="padding: 16px">
            <el-col :span="12" style="display:flex;justify-content: center">
                <el-button type="primary" @click="addOrUdt()" v-if="!ctl.view" :loading="ctl.loading">保存</el-button>
                <el-button @click="appClose()">关闭</el-button>
            </el-col>
        </el-row>

    </div>

</template>

<script>
    import tool from '@libs/tool';

    export default {
        components: {},
        props: {},
        data() {
            return {
                ctl: {
                    view: false,
                    loading: false
                },
                formVal: {},
                dateTime: [],
                company: [],
                rules: {
                    cmpsnid: [
                        {required: true, message: '请输入从业编号'}
                        // {pattern: /^[a-zA-Z0-9]+$/, message: '车牌格式错误'}
                    ],
                    enbeworRecordId: [
                        {required: true, message: '请输入从业资格证号'}
                    ]
                    // vehicleCarPubTime: [
                    //     {required: true, message: '请选择发证时间'},
                    //     {required: true, message: '请选择发证时间'},
                    // ],
                    // companyId: [
                    //     {required: true, message: '请选择所属公司'},
                    //     {required: true, message: '请选择所属公司'},
                    // ],
                    // vehicleCarType: [
                    //     {required: true, message: '请填写车型'},
                    // ]
                }
            };
        },
        computed: {},
        methods: {
            appClose() {
                this.$emit('appClose');
            },
            addOrUdt() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    let p = tool.cloneObj(this.formVal);
                    this.ctl.loading = true;
                    this.request('api_admin_addOrUptDriver', p).then((res) => {
                        this.ctl.loading = false;
                        this.$emit('reload');
                        this.$emit('appClose');
                    }).catch((error) => {
                        this.ctl.loading = false;
                        window.Bus.$emit('yolo_pop_message_emit', error);
                    });


                });
            },
            open(val, read) {
                this.formVal = tool.cloneObj(val);


                this.ctl.view = read;
            }
        },
        mounted() {

        }

    }
</script>

<style scoped>

</style>
