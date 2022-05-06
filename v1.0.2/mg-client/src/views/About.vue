<template>
  <div class="about">
    <div class="site-content grid-line">
      <div class="content-warp">
        <div class="about-site about-info">
          <section-title><span class="iconfont icon-wodeshuiguoicon-"></span>关于博主</section-title>
          <div class="info-card" v-for="item in aboutUser" :key="item.id">
            <div v-if="item.about_content"></div>
            <mk-md-editor v-else class="md-edit" mode="preview" v-model="item.about_content" />
          </div>
        </div>
        <div class="about-me about-info">
          <section-title id="Guestbook"><span class="iconfont icon-wodeshuiguoicon-"></span>给我留言</section-title>
          <div class="info-card">
            <el-form :model="ruleForm" v-loading="loading" :rules="rules" ref="ruleForm" label-width="80px"
                     class="demo-ruleForm">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"
                          maxlength="32"
                          show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="内容" prop="content">
                <el-input type="textarea" v-model="ruleForm.content"
                          maxlength="255"
                          show-word-limit></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="dialog" v-if="show">
          <div><i class="el-icon-info"></i>{{ msg }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sectionTitle from '@/components/section-title'
import {getTime, getTimeInterval} from '@/utils'
import {getMessageCreate} from "../api/friends";
import {dirAboutList} from "../api/website";
import MkMdEditor from "../components/md-editor";

export default {
  name: "About",
  data() {
    return {
      aboutUser: [],
      list: [],
      loading: false,
      show: false,
      msg: '提示信息',
      ruleForm: {
        email: '',
        content: ''
      },
      rules: {
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        content: [
          {required: true, message: '请输入您的留言内容', trigger: 'blur'}
        ]
      }
    }
  },
  components: {
    MkMdEditor,
    // Quote,
    sectionTitle
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          getMessageCreate(this.ruleForm).then(res => {
            this.loading = false
            this.show = true
            this.msg = '留言成功！'
            setTimeout(() => {
              this.show = false
            }, 1300)
            this.$refs['ruleForm'].resetFields();
          }).catch(err => {
            this.show = true
            this.msg = '网络错误！'
            setTimeout(() => {
              this.show = false
            }, 1300)
            this.loading = false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getAboutUser(){
      dirAboutList().then(res=>{
        console.log(res.data)
        this.aboutUser = res.data
      })
    }
  },
  mounted() {
    this.getAboutUser()
  }
}
</script>
<style scoped lang="less">
.about {
  padding-top: 40px;
}

.content-warp {
  margin-top: 80px;

  .about-info {
    margin: 30px 0;

    span {
      color: red;
      margin-right: 10px;
    }

    .info-card {
      min-height: 100px;
      padding: 20px;
      border-radius: 3px;
      margin: 30px 0 50px 0;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

      p {
        line-height: 1.7rem;
      }
    }
  }

  .contactForm {
    width: 100%;
    padding: 20px;

    .form-item {
      align-items: center;
      display: flex;

      &:not(:last-child) {
        margin-bottom: 20px;
      }

      label {
        width: 80px;
      }

      .v {
        min-height: 40px;
        line-height: 20px;
        border-radius: 3px;
        padding: 2px 10px;
        outline: none;
        border: 1px solid #8fd0cc;
        width: 100%;
        resize: vertical;
      }

      button {
        width: 100px;
        height: 40px;
        border-radius: 3px;
        outline: 0;
        border-style: none;
        cursor: pointer;
        background-color: #409eff;
        color: white;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}

/*******/
@media (max-width: 800px) {
  .content-warp {
    margin-top: 0;
  }
}
</style>
<style lang="less">
.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  font-size: 13px;
  transition: all .5s ease-in-out;
  background: #bdc3c7;
  background: -webkit-linear-gradient(to right, #b5babf, #bdc3c7);
  background: linear-gradient(to right, #b5babf, #bdc3c7);

  .el-icon-info {
    margin-right: 5px;
  }

}
</style>
