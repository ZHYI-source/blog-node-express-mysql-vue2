<template>
  <section>
    <lk-view-header @back="$emit('close')" :content="isAdd?'添加关于信息':'修改关于信息'"/>
    <section class="lk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">
        <lk-get-row>
          <el-form-item label="音乐名称" prop="name">
            <el-input placeholder="请输入音乐名称"
                      clearable
                      size="mini"
                      class="input-one"
                      v-model="form.name"
            ></el-input>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="音乐作者" prop="artist">
            <el-input placeholder="请输入音乐作者"
                      clearable
                      size="mini"
                      class="input-one"
                      v-model="form.artist"
            ></el-input>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="音乐封面" prop="cover">
            <el-input placeholder="请输入音乐封面地址"
                      clearable
                      size="mini"
                      class="input-one"
                      v-model="form.cover"
            ></el-input>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="音乐地址" prop="url">
            <el-input type="textarea"
                      placeholder="请输入音乐地址"
                      size="mini"
                      :autosize="{ minRows: 3}"
                      v-model="form.url" style="width: 610px;"
            ></el-input>
          </el-form-item>
        </lk-get-row>
        <lk-get-row>
          <el-form-item label="音乐歌词" prop="lrc">
            <el-input type="textarea"
                      placeholder="请输入音乐歌词"
                      size="mini"
                      :autosize="{ minRows: 3}"
                      v-model="form.lrc" style="width: 610px;"
            ></el-input>
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
  name: "get-web-music",
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
      form: {
        lrc:'暂无歌词'
      },
      isAdd: true,
      rules: {
        name: [{required: true, message: '请输入音乐名称', trigger: 'blur'},],
        url: [{required: true, message: '请输入音乐地址', trigger: 'blur'},],
      }
    }
  },
  methods: {
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          let api = this.isAdd ? 'api_blog_web_music_create' : 'api_blog_web_music_update'
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
