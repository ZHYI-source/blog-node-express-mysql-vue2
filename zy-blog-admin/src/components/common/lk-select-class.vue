<template>
  <div>
    <el-select
      v-model="tValue"
      :filterable="filterable"
      :clearable="clearable"
      :multiple="multiple"
      @clear="$emit('clear')"
      @change="$emit('change')"
      size="mini"
      class="input-one"
      :placeholder="placeholder">
      <el-option
        v-for="item in datas"
        :key="item.id"
        :label="item.className"
        :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  /*选择文章分类组件*/
  export default {
    name: "lk-select-class",
    props: {
      filterable: {
        type: Boolean, default() {
          return false;
        }
      },
      clearable: {
        type: Boolean, default() {
          return true;
        }
      },
      multiple: {
        type: Boolean, default() {
          return false;
        }
      },
      value: {
        type: undefined, default() {
          return ''
        }
      },
      placeholder: {
        type: String,
        default() {
          return '请选择文章类型'
        }
      }
    },
    data() {
      return {
        //查询条件
        query: {
          size: 20,
          current: 1,
          //排序字段
          orderBy: 'insertTime',
          //排序类型
          orderType: 'DESC',
          params: {
            id: '',
            className:''
          }
        },
        datas:[],
        tValue: ''
      }
    },
    watch:{
      tValue(n) {
        this.send(n);
      },
      value(val){
        this.tValue=val
      }
    },
    created() {
      this.tValue = this.value;
      this.getDataList()
    },
    model: {
      prop: 'value',
      event: 'getValue'
    },
    methods: {
      send(v) {
        this.$emit('getValue', v);
      },
      getDataList() {
        this.request('api_blog_article_class_list', this.query).then(res => {
          this.datas = res.records || [];
          // console.log(res.records)
        })

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
