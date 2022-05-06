<template>
  <el-table
    :data="datas"
    style="width: 100%;"
    ref="datatable"
    :row-key="rowKey"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    border
    :stripe="stripe"
    :height="height"
    @sort-change="sortChange"
    :show-summary="showSum"
    :default-sort="{prop: query.orderBy, order: 'descending'}"
    v-loading="tloading"
    @select="$emit('select',$event)"
    @select-all="$emit('select-all',$event)"
    :max-height="maxHeight"
    :span-method="spanMethod"
    element-loading-text="数据加载中..."
    element-loading-spinner="el-icon-loading"
  >

    <slot></slot>
  </el-table>
</template>

<script>
export default {
  name: "mk-el-table",
  props: {
    datas: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    query: {
      type: Object,
      default() {
        return {};
      }
    },
    loading: {
      type: Boolean,
      default() {
        return true;
      }
    },
    rowKey: {
      type: String,
      default() {
        return 'id';
      }
    },


    maxHeight: {
      type: [String, Number],
      default() {
        return 'auto'
      }
    },
    height: {
      type: [String, Number],
      default() {
        return '580'
      }
    },
    //显示汇总数据？
    showSum: {
      type: Boolean,
      default() {
        return false;
      }
    },
    //开启条纹？
    stripe: {
      type: Boolean,
      default() {
        return true;
      }
    },

    /**
     * 合并单元格
     * @see https://element.eleme.cn/#/zh-CN/component/table
     * */
    spanMethod: {
      type: Function,
      default() {
        return function () {

        };
      }
    }
  },
  methods: {
    sortChange(res) {
      this.$emit('sort', res);
    },
    goToBottom() {
      this.$refs.datatable.bodyWrapper.scrollTop = this.$refs.datatable.bodyWrapper.scrollHeight;
    },
    clearSelection() {
      this.$refs.datatable.clearSelection();
    },
    toggleRowSelection(row) {
      this.$refs.datatable.toggleRowSelection(row);
    }
  },
  computed: {
    selection() {
      return this.$refs.datatable.selection;
    }
  },
  watch: {
    loading(v) {
      if (this.tloading && !v) {
        setTimeout(() => {
          this.tloading = v;
        }, 300)
      } else {
        this.tloading = v;
      }
    }
  },
  data() {
    return {
      tloading: false,
    }
  }
}
</script>

<style scoped>

</style>
