<template>
    <div class="gx-form-row" :class="`gx-form-row_${inline?'inline':formType}`">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    //用作修改页的表单布局,控制一行的内容显示
    name: 'mk-form-row',
    props: {
      formType: {
        type: String,
        default () {
          return 'default'
        }
      },
      inline: {
        type: Boolean,
        default () {
          return false
        }
      }
    }
  }
</script>

<style lang="scss">
    .gx-form-row {
        display: flex;
        //此类型放置一行两列的内容
        &_default {
            margin-right: 45px;

            .input-read{
                width: 400px;
                margin-right: 6px;
                .el-input{
                    width: 400px;
                }
            }
            .input-one {
                width: 200px!important;
                .el-input{
                    width: 200px;
                }
                input::-webkit-input-placeholder,.sp-placeholder {
                    color: #BBC5CB!important;
                }
            }
            .input-one-unit {
                width: 350px;
                .el-input{
                    width: 350px;
                }
            }
            //时间选择器的宽度比如：xxx 至 xxx
            .input-time {
                width: 189px;

                .el-input__inner {
                    padding-right: 0;
                }
            }
            .input-height {
                height: 34px;

                .el-input__inner {
                    height: 34px;
                }
            }
            //富文本或textarea的宽度(class放在el-form-item元素上)
            .input-edit {
                width: 1068px;
            }

            //textarea的宽度(class放在el-input元素上)
            .input-text {
                width: 972px;
                .el-textarea__inner {
                    height: 78px;
                }
            }

            .input-four {
                width: 200px;
                .el-input {
                    width: 200px;
                }
            }

            .input-textarea {

            }
        }

        //此类型专门放置宽度为200px的内容
        &_inline {
            .el-form-item + .el-form-item {
                margin-left: 30px;
            }

            section {
                width: auto;
            }

            /* 如果父级type为inline，会适配input宽度为200*/

            .el-input, .v-dropdown-caller {
                width: 200px;
            }

            .input-four {
                .el-input {
                    width: 200px;
                }
            }

        }


        //弹窗类型
        &_poup {
            .el-form-item + .el-form-item {
                margin-left: 30px;
            }

            .el-input {
                width: 250px;

            }
            .el-textarea,.input-text  {
                width: 630px;
            }
            //彈窗輸入框，寬度600，高度520
            .input-time{
                width: 194px;
            }

            .input-one {
                width: 426px !important;
                .el-input {
                    width: 426px !important;
                }
                .el-date-editor{
                    width: 426px !important;
                }
            }
            .input-two {
                width: 603px;
                .el-input {
                    width: 603px;
                }
            }
            .input-three {
                width: 842px;
                margin-right: 10px;
            }
            .input-four {
                width: 236px !important;
                .el-input {
                    width: 236px !important;
                }
            }
            .input-six {
                width: 140px;
                margin-right: 6px;
                .el-input {
                    width: 140px;
                    margin-right: 6px;
                }
            }
            .input-five {
                width: 196px;
                margin-right: 8px;
                .el-input, .el-date-picker {
                    width: 129.4px;
                    margin-right: 6px;
                }
            }
            .input-textarea {
                width: 602px;
            }
            .input-textarea-one {
                width: 390px;
                .el-textarea__inner {
                    height: 78px;
                }
            }
        }


    }

</style>
