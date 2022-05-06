<template>
  <section style="height: 28px;display:flex;padding-top: 6px">
    <v-selectpage
      v-model="role_id"
      :width="width"
      :placeholder="placeholder"
      :pagination="pagination"
      :disabled="disabled"
      :data="list"
      @values="getValue"
      key-field="id"
      show-field="role_name"
      :title="title">
    </v-selectpage>
  </section>
</template>

<script>

import { SelectPage } from 'v-selectpage'
import {dirRolesList} from "@/api/modules/sys.roles.api";
export default {
  name: "mk-select-role",
  components: {'v-selectpage':SelectPage },
  props:{
    role:{
      type:String,
      default(){
        return ''
      }
    },
    placeholder:{
      type:String,
      default(){
        return '请选择'
      }
    },
    title:{
      type:String,
      default(){
        return '选择角色'
      }
    },
    //多选
    multiple:{
      type:Boolean,
      default(){
        return false
      }
    },
    //关闭分页栏？
    pagination:{
      type:Boolean,
      default(){
        return true
      }
    },
    disabled:{
      type:Boolean,
      default(){
        return false
      }
    },
    width:{
      type:Number,
      default(){
        return 0
      }
    }
  },
  data(){
    return {
      role_id:'',
      list: [],
    }
  },
  watch:{
    'role':{
      immediate:true,
      handler:function(val){
        //回填
        this.role_id = val
      }
    }
  },
  model: {
    prop: 'role',
    event: 'getValue1'
  },
  created(){
    this.getData()
  },
  mounted(){
  },
  methods:{
    getData(){
      let that = this
      dirRolesList().then(res=>{
        console.log(res.data)
        let datas = res.data|| []
        that.list = datas
      })
    },
    getValue(val){
      this.$emit('getValue1',val[0].id)
    }
  }
}
</script>

<style lang="scss">

</style>
