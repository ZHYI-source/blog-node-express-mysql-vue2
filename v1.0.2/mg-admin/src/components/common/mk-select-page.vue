<template>
  <section>
    <v-selectpage v-model="value"
                  placeholder="请选择角色"
                  title="选择角色"
                  language="cn"
                  class="input-one"
                  :data="list"
                  key-field="id"
                  show-field="roleName" >
    </v-selectpage>
  </section>
</template>

<script>

// import {admin_roles} from "@/api/modules/role";

export default {
  //https://terryz.github.io/vue/#/selectpage/demo
  name: "mk-select-page",
  components: {
  },
  created(){
    // admin_roles().then(res=>{
    //   console.log(res)
    //   this.list = res.data
    // })
  },
  model: {
    prop: 'role',
    event: 'getValue1'
  },
  data(){
    return {
      value:'',
      list: []
    }
  },
  methods:{
    getValue(val){
      this.$emit('getValue1',val)
    }
  }
}
</script>

<style scoped>

</style>
