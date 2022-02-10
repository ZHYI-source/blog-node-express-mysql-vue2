<style lang="scss" src="@css/app.scss"></style>
<template>
    <div>
        <div class="app-form-class">
            <el-form ref="form" :model="formVal" label-width="90px" size="mini">
                <el-row :gutter="20" type="flex" justify="space-between">
                    <el-col :span="22">
                        <el-form-item label="订单号">
                            <el-input v-model="formVal.outTradeNo" :disabled="ctl.view"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20" type="flex" justify="space-between">
                    <el-col :span="11">
                        <el-form-item label="商户身份证">
                            <el-input v-model="formVal.idCard" :disabled="ctl.view"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="司机姓名">
                            <el-input v-model="formVal.userRealName" :disabled="ctl.view"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20" type="flex" justify="space-between">
                    <el-col :span="11">
                        <el-form-item label="支付方式">
                            <el-select v-model="formVal.payType" :disabled="ctl.view" placeholder="请选择">
                                <el-option
                                        v-for="item in dic.payType"
                                        :key="item.key"
                                        :label="item.val"
                                        :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="支付渠道">
                            <el-select v-model="formVal.payChanel" :disabled="ctl.view" placeholder="请选择">
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
                        <el-form-item label="支付时间">
                            <el-date-picker sytle="width: 100%" :disabled="ctl.view"
                                            v-model="formVal.payCreateTime"
                                            type="datetime"
                                            placeholder="选择日期时间" size="mini">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                  <el-col :span="11">
                    <el-form-item label="车牌号">
                      <el-input v-model="formVal.plateNo" :disabled="ctl.view">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" justify="space-between">
                    <el-col :span="11">
                        <el-form-item label="支付金额">
                            <el-input v-model="formVal.tradeAmt" :disabled="ctl.view">
                                <span slot="suffix">元</span>
                            </el-input>
                        </el-form-item>
                    </el-col>
                  <el-col :span="11">
                    <el-form-item label="支付状态">
                      <el-input v-model="formVal.tradeStatusDesc" :disabled="ctl.view">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              <el-row :gutter="20" type="flex" justify="space-between">
                <el-col :span="11">
                  <el-form-item label="手续费">
                    <el-input v-model="formVal.chargeAmt" :disabled="ctl.view">
                      <span slot="suffix">元</span>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="发票状态">
                    <el-input v-model="formVal.invoiceStatusDesc" :disabled="ctl.view">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
        </div>
        <el-row type="flex" justify="center" style="padding: 16px">
            <el-col :span="12" style="display:flex;justify-content: center">
              <el-button @click="$emit('appClose')">关闭</el-button>
              <el-button type="primary" @click="$emit('orderUpdate',formVal.outTradeNo)">更新订单状态</el-button>
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
                    view: false
                },
                formVal: {}
            };
        },
        methods: {
            appClose() {
                this.$emit('appClose');
            },
            test() {
                console.log(this.form);
            },
            open(val, read) {
                this.formVal = tool.cloneObj(val);
                this.formVal.tradeAmt = this.formVal.tradeAmt / 100.0;
                if(this.formVal.chargeAmt){
                  this.formVal.chargeAmt = this.formVal.chargeAmt / 100.0;
                }
                this.ctl.view = read;
            },
        }
    }
</script>

<style scoped>

</style>
