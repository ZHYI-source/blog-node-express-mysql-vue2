<template>
  <section>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>
  </section>
</template>
<script>
const cityOptions = ['添加', '删除', '修改',];
export default {
  name:'mk-checkbox-dict',
  props: {
    code: {
      type: [String, Number],
      required: true,
      default() {
        return ''
      }
    },
    value: {
      type: [String, Number, Array],
      default() {
        return "";
      }
    },
  },
  data() {
    return {
      checkAll: false,
      checkedCities: ['添加'],
      cities: cityOptions,
      isIndeterminate: true
    };
  },
  model: {
    prop: 'value',
    event: 'getValue'
  },
  watch: {
    value(val) {
      console.log("变化",val)
      this.checkedCities = val ? val + '' : '';
    }
  },
  created(){
    let  query = {
      //当前页
      currentPage: 1,
      //每页数据大小
      pageSize: 10,
      //排序字段
      orderBy: 'create_time',
      //排序类型
      orderType: 'desc',
      //名称搜索
      dict_type: this.code,
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
      console.log(this.isIndeterminate)
    },
    handleCheckedCitiesChange(val) {
      let checkedCount = val.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      this.$emit('getValue', value)
    }
  }
};
</script>
