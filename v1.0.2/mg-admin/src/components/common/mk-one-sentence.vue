<template>

</template>

<script>
import axios from 'axios'
import {getOneSentence} from "@/api/modules/sys.public.api";
export default {
  name: "mk-one-sentence",
  data(){
    return {
      content:''
    }
  },
  created() {

  },
  mounted() {
    // this.getDataList()
  },
  methods:{
    getDataList(){
      // getOneSentence().then(res=>{
      //   console.log(res)
      // })
    }
  }
}
</script>

<style scoped>

</style>
