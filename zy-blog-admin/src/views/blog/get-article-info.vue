<template>
  <section>
    <lk-view-header @back="$emit('close')" :content="isAdd?'添加文章':'修改文章'"/>
    <section class="lk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">
        <lk-get-row>
          <el-form-item label="文章标题" prop="title">
            <el-input type="textarea"
                      placeholder="请输入文章标题"
                      :autosize="{ minRows: 3}"
                      v-model="form.title" style="width: 610px;"
            ></el-input>

          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="文章简介" prop="summary">
            <el-input type="textarea"
                      placeholder="请输入文章简介"
                      :autosize="{ minRows: 3}"
                      v-model="form.summary" style="width: 610px;"
            ></el-input>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="文章图片" prop="img">
            <el-input placeholder="请输入文章图片地址"
                      clearable
                      v-model="form.img" size="mini"  style="width: 610px;"  ></el-input>
            <el-upload
              class="avatar-uploader"
              action="/zy-server/upload/v1"
              :show-file-list="false"
              :on-success="handleAvatarSuccessLicenseUrl"
              :before-upload="beforeAvatarUpload">
              <el-button  size="mini" icon="el-icon-upload2" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </lk-get-row>
        <lk-get-row   v-if="form.img" >
          <el-form-item>
            <el-image
              style="width: 100px; height: 100px;border-radius: 5px"
              :src="form.img"
              :key="commonKey"
              :preview-src-list="[form.img]">
            </el-image>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="文章类型" prop="classId">
            <lk-select-class v-model="form.classId"/>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="是否火热" prop="isHot">
            <el-select
              clearable
              style="padding-top: 3px"
              v-model.trim="form.isHot"
              class="input-one" size="mini" placeholder="请选择是否火热"
            >
              <el-option
                label="否"
                :value="0"
              >
              </el-option>
              <el-option
                label="是"
                :value="1"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否置顶" prop="isTop">
            <el-select
                clearable
                style="padding-top: 3px"
                v-model.trim="form.isTop"
                class="input-one" size="mini" placeholder="请选择任务类型"
            >
              <el-option
                  label="否"
                  :value="0"
              >
              </el-option>
              <el-option
                  label="是"
                  :value="1"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="文章内容" prop="content">
           <tinymce width="900" height="150" v-model="form.content"/>
          </el-form-item>
        </lk-get-row>
        <el-divider/>
        <lk-get-button @save="save" @close="close(true)"/>
      </el-form>
    </section>
  </section>

</template>

<script>
import LkGetRow from "@/components/common/lk-get-row";
import LkGetButton from "@/components/common/lk-get-button";
import LkBackList from "@/components/common/lk-back-list";
import LkEdit from "@/components/common/lk-edit";
import Tinymce from "@/components/Tinymce";
import LkImgList from "@/components/common/lk-img-list";
import LkSelectClass from "@/components/common/lk-select-class";

export default {
  name: "get-article-info",
  components: {LkSelectClass, LkImgList, Tinymce, LkEdit, LkBackList, LkGetButton, LkGetRow},
  props: {
    updateData: {
      type: Object,
      default() {
        return {};
      }
    },
    routerId: {
      type: [String, Number],
      default() {
        return undefined;
      }
    }
  },
  created() {

    if (this.updateData && this.updateData.id) {
      this.form = this.updateData
      this.isAdd = false
    }
  },
  data() {
    return {
      commonKey:0,
      imgs:[
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.ZeQ5h5qmFJdYmGKtrR-I9gAAAA?w=199&h=198&c=7&r=0&o=5&pid=1.7',
        'https://tse1-mm.cn.bing.net/th/id/R-C.1a163f1fe343d8b6f8a9d9752ee6a387?rik=AZ8xXN6nZS5LRQ&riu=http%3a%2f%2fwww.aqniu.com%2fwp-content%2fuploads%2f2017%2f06%2f20013034943_3034707e74_b-1.jpg&ehk=cHbnpW1foxr%2b1BXncnM3HrK2vs76w5TgBBytOYgpsRY%3d&risl=&pid=ImgRaw&r=0',
        'https://tse1-mm.cn.bing.net/th/id/R-C.22abcd219fa0ea8f4b1e236f2151c9dd?rik=eZI%2fw5SugjmjCQ&riu=http%3a%2f%2fimg.keaitupian.cn%2fuploads%2f2020%2f12%2f21%2f1573962576495941.jpg&ehk=vT6K7n8ennS%2bxI7dtOTbrH5m%2bBxQBYngjWe9N6bRrgs%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
        'https://tse1-mm.cn.bing.net/th/id/R-C.2200f336cb7cc8f21798e7d9fe9b24f5?rik=6HjanVulzGkvpA&riu=http%3a%2f%2fwww.desktx.com%2fd%2ffile%2fwallpaper%2fscenery%2f20170107%2f080145c3a7460e7fa0369052a11467db.jpg&ehk=ffhPqQk04pZ18gOXu3OrPfkEIoQW046d4EfbUzji9yI%3d&risl=&pid=ImgRaw&r=0',
      ],
      form: {
        img:'http://www.zhouyi.run:5220/zy-server/public/images?id=164508420659086c5f4f9a6ceb.jpg',
        isHot:0,
        isTop:0,
      },
      isAdd: true,
      rules: {
        title: [{required: true, message: '请输入文章标题', trigger: 'blur'},],
        summary: [{required: true, message: '请输入文章简介', trigger: 'blur'},],
        content: [{required: true, message: '请输入文章内容', trigger: 'blur'},],
        classId: [{required: true, message: '请选择文章类型', trigger: 'blur'},],
      }
    }
  },
  methods: {
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          let api = this.isAdd ? 'api_blog_article_create' : 'api_blog_article_update'
          this.request(api, this.form).then(res => {
            this.toast.success(this.isAdd ? '创建成功！' : '修改成功！')
            this.$emit('close');
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleAvatarSuccessLicenseUrl(res, file) {
      this.form.img = res.url;
      this.commonKey+=1
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
        this.$message.error('请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片');
        return
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return isLt2M;
    },
    close(show) {
      if (show) {
        this.toast.confirmSave().then(() => {
          this.$emit('close');
        });
      } else {
        this.$emit('close');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 .avatar {
   border-radius: 8px;
 }
</style>
