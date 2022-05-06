<template>
  <section style="height: 28px;display:flex;padding-top: 6px">
    <v-selectpage
      v-model="sort_id"
      :width="width"
      :placeholder="placeholder"
      :pagination="pagination"
      :disabled="disabled"
      :data="list"
      @values="getValue"
      key-field="id"
      show-field="sort_name"
      :title="title">
    </v-selectpage>
  </section>
</template>

<script>

import { SelectPage } from 'v-selectpage'
import {dirSortList} from "@/api/modules/sys.sort.api";
export default {
  name: "mk-select-sort",
  components: {'v-selectpage':SelectPage },
  props:{
    sort:{
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
        return '选择标签'
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
      sort_id:'',
      list: [],
    }
  },
  watch:{
    'sort':{
      immediate:true,
      handler:function(val){
        //回填
        this.sort_id = val
      }
    }
  },
  model: {
    prop: 'sort',
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
      dirSortList().then(res=>{
        let datas = res.data || []
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
