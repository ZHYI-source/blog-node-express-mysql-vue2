<template>
  <section>
    <section class="mk-add-pop">
      <el-form ref="formAdd" :model="form" :rules="rules" label-width="100px">
        <mk-get-row>
          <el-form-item label="父级ID" prop="pid">
            <el-input v-model="form.pid" size="mini" disabled class="input-one" clearable placeholder="请输入父级ID"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="菜单标题" prop="title">
            <el-input v-model="form.title" size="mini" class="input-one" clearable placeholder="请输入菜单标题"></el-input>
          </el-form-item>
          <el-form-item label="菜单路径" prop="path">
            <el-input v-model="form.path" size="mini" class="input-one" clearable placeholder="请输入菜单路径"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="菜单图标" prop="icon">
            <d2-icon-select v-model="form.icon"  userInput size="mini" class="input-one"/>
          </el-form-item>
          <el-form-item label="操作标识" prop="authority">
            <el-input v-model="form.authority" size="mini" class="input-one" clearable placeholder="POST /api/private/friends/list"></el-input>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item label="菜单层级" prop="lever">
            <el-input-number v-model="form.lever" size="mini" class="input-one" controls-position="right" :min="1"
                             :max="3"></el-input-number>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>
          <el-form-item>
            <el-tag>菜单层级：1 ： 顶级菜单；2 ：二级菜单；3：三级菜单（操作按钮）</el-tag>
          </el-form-item>
        </mk-get-row>
        <mk-get-row>

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

import {dirMenusCreate, dirMenusUpdate} from "@/api/modules/sys.menus.api";
import D2IconSelect from "@/components/d2-icon-select";


export default {
  name: 'get-sub-menus-info',
  components: {D2IconSelect, MkBackList, MkGetButton, MkGetRow},
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
      this.$set(this.form,'lever',this.updateData.lever===1?2:this.updateData.lever===2?3:2)
      this.$set(this.form,'pid',this.updateData.id)
      this.isAdd = false
    }
  },
  data() {
    return {
      commonKey: 0,
      form: {
        icon:'th-large'
      },
      isAdd: true,
      rules: {

        pid: [{required: true, message: '请输入父级ID', trigger: 'blur'},],

        path: [{required: true, message: '请输入菜单路径', trigger: 'blur'},],

        title: [{required: true, message: '请输入菜单标题', trigger: 'blur'},],

        icon: [{required: true, message: '请输入菜单图标', trigger: 'blur'},],
      }
    }
  },
  methods: {
    save() {
      this.$refs['formAdd'].validate((valid) => {
        if (valid) {
          dirMenusCreate(this.form).then(res => {
            this.$toast.success('添加成功')
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
