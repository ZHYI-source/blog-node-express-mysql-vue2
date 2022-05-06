<template>
  <section>
    <section class="mk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">
        <mk-get-row>
          <el-form-item label="音乐名称" prop="name">
            <el-input v-model="form.name" size="mini" class="input-one" clearable placeholder="请输入音乐名称"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="作者" prop="author">
            <el-input v-model="form.author" size="mini" class="input-one" clearable placeholder="请输入作者"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="地址" prop="url">
            <el-input clearable v-model.trim="form.url" size="mini" style="width: 600px" type="textarea"
                      :rows="3"
                      placeholder="请输入地址"
            />
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="封面" prop="cover">
            <el-input clearable v-model.trim="form.cover" size="mini" style="width: 600px" type="textarea"
                      :rows="3"
                      placeholder="请输入在线图片地址"
            />
            <mk-upload v-model="form.article_cover"/>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="歌词" prop="lrc">
            <el-input clearable v-model.trim="form.lrc" size="mini" style="width: 600px" type="textarea"
                      :rows="3"
                      placeholder="请输入歌词"
            />
          </el-form-item>
        </mk-get-row>
        <el-divider/>
        <mk-get-button @save="save" @close="close(true)"/>
      </el-form>
    </section>
  </section>

</template>

<script>
import MkGetRow from "@/components/common/mk-get-row";
import MkGetButton from "@/components/common/mk-get-button";
import MkBackList from "@/components/common/mk-back-list";

import {dirMusicsCreate, dirMusicsUpdate} from "@/api/modules/sys.musics.api";
import MkUpload from "@/components/common/mk-upload";


export default {
  name: 'get-musics-info',
  components: {MkUpload, MkBackList, MkGetButton, MkGetRow},
  props: {
    updateData: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  created() {

    if (this.updateData && this.updateData.id) {
      this.form = this.updateData
      this.isAdd = false
    }
  },
  data() {
    return {
      commonKey: 0,
      form: {},
      isAdd: true,
      rules: {
        name: [{required: true, message: '请输入音乐名称', trigger: 'blur'},],

        author: [{required: true, message: '请输入作者', trigger: 'blur'},],

        url: [{required: true, message: '请输入地址', trigger: 'blur'},],
        //
        // cover: [{required: true, message: '请输入封面', trigger: 'blur'},],
        //
        // lrc: [{required: true, message: '请输入歌词', trigger: 'blur'},],
      }
    }
  },
  methods: {
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          let _FUC = ''
          _FUC = this.isAdd ? dirMusicsCreate : dirMusicsUpdate
          _FUC(this.form).then(res => {
            this.$toast.success(this.isAdd ?'添加成功！':'修改成功！')
            this.$emit('close',true);
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
        this.$toast.confirmSave().then(() => {
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

</style>
