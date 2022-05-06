<template>
  <section>
    <el-dialog title="收货地址" append-to-body :visible.sync="visible" @close="close">

      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button @click="close" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <slot/>
  </section>
</template>

<script>
export default {
  name: 'mk-dialog',
  props:{
    visible:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods:{
    close(){
      this.$emit("close",this.form)
    }
  }
}
</script>

<style scoped>

</style>
