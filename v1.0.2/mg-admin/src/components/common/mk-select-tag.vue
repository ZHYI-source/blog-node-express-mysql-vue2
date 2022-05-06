<template>
  <section style="height: 28px;display:flex;padding-top: 6px">
    <v-selectpage
      v-model="tag_ids"
      :width="width"
      :placeholder="placeholder"
      :multiple="multiple"
      :max-select-limit="3"
      :pagination="pagination"
      :disabled="disabled"
      :data="list"
      @values="getValue"
      key-field="id"
      show-field="tag_name"
      :title="title">
    </v-selectpage>
  </section>
</template>

<script>

import { SelectPage } from 'v-selectpage'
import {dirTagsList} from "@/api/modules/sys.tags.api";
export default {
  name: "mk-select-tags",
  components: {'v-selectpage':SelectPage },
  props:{
    tags:{
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
        return true
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
        return 255
      }
    }
  },
  data(){
    return {
      tag_ids:'',
      tempTags:[],
      list: [],
    }
  },
  watch:{
    'tags':{
      immediate:true,
      handler:function(val){
        // //回填
        this.tag_ids = val
      }
    }

  },
  model: {
    prop: 'tags',
    event: 'getValue1'
  },
  created(){
    this.getData()
  },
  mounted(){
    // this.getData()
  },
  methods:{
    getData(){
      let that = this
      dirTagsList().then(res=>{
        let datas = res.data || []
        that.list = datas
      })
    },
    getValue(val){

      let tempTags = []
      for (const valElement of val) {
        tempTags.push(valElement.id)
      }
      this.$emit('getValue1',tempTags)
    }
  }
}
</script>

<style lang="scss">

</style>
