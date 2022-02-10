<template>
  <div class="app-login">

    <div class="login-contain">
      <img class="background-img" src="../../icons/loginBackground.png" />
      <div>
        <div class="app-title">
          <div class="logo"></div>
          <div style="padding-left: 100px">ZY博客管理系统</div>
        </div>
        <div class="app-input" style="">
          <div class="right-bg">
            <div class="input-contain">
              <div style="text-align: center;margin-top: 100px;margin-bottom: 15px; font-weight: bold; color: #024A86;">登录平台</div>
              <el-form ref="loginForm" :model="loginForm" :rules="loginRules" v-loading="loading" fullscreen="true">
                <el-form-item prop="userName">
                  <el-input v-model="loginForm.loginAccount" placeholder="请输入帐号"></el-input>
                </el-form-item>
                <el-form-item prop="psw">
                  <el-input v-model="loginForm.userPassword" placeholder="请输入密码" show-password></el-input>
                </el-form-item>
                <el-form-item prop="verifycode">
                  <!-- 注意：prop与input绑定的值一定要一致，否则验证规则中的value会报undefined，因为value即为绑定的input输入值 -->
                  <el-input v-model="loginForm.verifycode"
                            placeholder="请输入验证码"
                            @keyup.enter.native="handleLogin"
                            class="identifyinput">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <div class="identifybox">
                    <div @click="refreshCode">
                      <img class="captcha-img" v-if="codeImg" :src="codeImg" />
                    </div>
                    <el-button @click="refreshCode" type='text' class="textbtn">看不清，换一张</el-button>
                  </div>
                </el-form-item>
                <el-form-item>
                  <!--<el-button type="primary" round style="width: 100%" size="mini" @click="handleLogin">-->
                    <!--登录-->
                  <!--</el-button>-->
                  <div class="login-button" @click="handleLogin">登录</div>
                </el-form-item>
              </el-form>

            </div>
          </div>
          <div class="left-bg"></div>
        </div>
      </div>
    </div>
    <div class="login-foot">
      <div>© 2020-2021 贵州林客科技有限公司  黔ICP备18005268号</div>
    </div>

  </div>
</template>

<script>
  import {validUsername} from '@/utils/validate'
  import {MessageBox} from "element-ui";
  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('Please enter the correct user name'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          loginAccount: 'admin',
          userPassword: 'gzlk@tomcat123',
          verifycode:'',
          key: '',
        },
        codeImg:'',
        loginRules: {
          loginAccount: [{required: true, trigger: 'blur', validator: validateUsername}],
          userPassword: [{required: true, trigger: 'blur', validator: validatePassword}]
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        showDialog: false,
        redirect: undefined,
        otherQuery: {},
        identifyCodes: '1234567890ABCDEFGHIGKLMNoPQRSTUVWXYZ',
        identifyCode: ''
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },
    created() {
      // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
      if (this.loginForm.userPassword === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.userPassword === '') {
        this.$refs.password.focus()
      }
      this.verifycodeData()
    },
    destroyed() {
      // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
      verifycodeData() {
        this.request('api_sms_captcha', {}).then((res) => {
          console.log(res)
          this.loginForm.key = res.key
          this.codeImg = 'data:image/jpeg;base64,' + res.image
        }).catch((error) => {
        });
      },
      checkCapslock({shiftKey, key} = {}) {
        if (key && key.length === 1) {
          if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
            this.capsTooltip = true
          } else {
            this.capsTooltip = false
          }
        }
        if (key === 'CapsLock' && this.capsTooltip === true) {
          this.capsTooltip = false
        }
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        if(!this.loginForm.verifycode){
          MessageBox.alert('请输入验证码', '警告', {
            confirmButtonText: '确定',
            type: 'error'
          });
          this.refreshCode ();
          return;
        }

        let sha256 = require("js-sha256").sha256
        let password = sha256(this.loginForm.userPassword)

        let loginData = {
          loginAccount: this.loginForm.loginAccount,
          userPassword: password,
          key: this.loginForm.key,
          verifyCode: this.loginForm.verifycode
        }
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            console.log('init login')
            this.$store.dispatch('user/login', loginData)
              .then((res) => {
                console.log('login',res)
                console.log(this.redirect || '/')
                this.$router.push({path: this.redirect || '/', query: this.otherQuery})
                this.loading = false
              })
              .catch((err) => {
                console.log('login',err)
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      }
      ,
      // 生成随机数
      randomNum (min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      // 切换验证码
      refreshCode () {
        this.verifycodeData()
      },
      // 生成四位随机验证码
      makeCode (o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
        }
        console.log(this.identifyCode)
      }
      // afterQRScan() {
      //   if (e.key === 'x-admin-oauth-code') {
      //     const code = getQueryObject(e.newValue)
      //     const codeMap = {
      //       wechat: 'code',
      //       tencent: 'code'
      //     }
      //     const type = codeMap[this.auth_type]
      //     const codeName = code[type]
      //     if (codeName) {
      //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //         this.$router.push({ path: this.redirect || '/' })
      //       })
      //     } else {
      //       alert('第三方登录失败')
      //     }
      //   }
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .app-login {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    height: 100%;
    //width: 1280px;
    margin-left: 100px;

    .login-contain {
      width: 100%;
      height: 100%;
      background-size: cover;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      align-items: center;
    }

    .background-img{
      position: absolute;
      right: 0;

      height: 100%;
      width: 70%;
    }

    .login-foot {
      background-color: #FFFFFF;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 51px;
    }

    .app-title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      justify-content: left;
      font-size: 36px;
      letter-spacing: 5px;
      color: #ffffff;
      position: relative;
      .logo {
        background: url("../../icons/logozv.jpg") no-repeat center center;
        background-size: contain;
        background-position: 20px;
        width: 220px;
        height: 200px;
        margin-right: 250px;
      }
    }

    .app-input {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      top: -60px;
      left: -80px;
      width: 120%;

      .left-bg {
        background: url("../../icons/ch.png") no-repeat center center;
        background-size: contain;
        width: 320px;
        height: 320px;
        margin-left: 230px;
        margin-bottom: 60px;
      }

      .right-bg {
        width: 400px;
        height: 417px;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        align-content: center;

        .input-contain {
          font-size: 18px;
        }
        .login-button{
          color: #FFFFFF;
          text-align: center;
          letter-spacing: 3px;
          font-size: 15px;
          background-image: url("../../icons/login_button.png");
          background-size: cover;
          border-radius: 2px;
          cursor: pointer;
        }
      }
    }
  }

</style>

<style scoped>
  .identifybox{
    display: flex;
    justify-content: space-between;
    margin:0px 5px;
  }
</style>
