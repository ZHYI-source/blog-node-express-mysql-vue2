<style lang="scss" src="@css/app.scss"></style>
<template>
    <div>
        <div class="app-form-class">
            <el-form ref="form" :model="formVal" :rules="rules" label-width="90px" size="mini" @submit.native.prevent
                     :hide-required-asterisk="ctl.view">
                <el-row :gutter="20" type="flex" justify="space-between">
                    <el-col :span="11">
                        <el-form-item label="账号" :required="true" prop="loginAccount">
                            <el-input v-model="formVal.loginAccount" disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20" type="flex" justify="space-between">
                    <el-col :span="11">
                        <el-form-item label="角色" :required="true" prop="roleId">
                            <el-select v-model="formVal.roleId"  placeholder="请选择">
                                <el-option v-for="item in roleArrs"
                                           :key="item.roleId"
                                           :label="item.roleName"
                                           :value="item.roleId">
                                </el-option>
                            </el-select>
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
                roleArrs: [],
                rules: {
                    loginAccount: [
                        {required: true, message: '请输入账号'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空'}
                    ],
                    roleId: [
                        {required: true, message: '请选择角色'}
                    ]
                }
            };
        },
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
                    p.plateNo = '贵' + p.plateNo;
                    this.ctl.loading = true;
                    this.request('api_admin_addOrUptCar', p).then((res) => {
                        this.ctl.loading = false;
                        this.$success("操作成功");
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
                this.getRoleList();
            },
            getRoleList() {
                let p = {};
                this.request('api_admin_role_list', p).then((res) => {
                    this.roleArrs = res;
                    console.log(res);
                }).catch((error) => {
                    window.Bus.$emit('yolo_pop_message_emit', error);
                });
            }
        },
        mounted() {

        }

    }
</script>

<style scoped>

</style>
