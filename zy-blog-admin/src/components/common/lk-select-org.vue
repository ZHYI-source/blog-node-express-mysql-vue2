<template>
  <section class="dio-box">
    <el-input v-model="query.params.orgName" placeholder="组织机构" size="mini" clearable @focus="showTree"></el-input>
    <el-dialog title="机构筛选" :visible.sync="treeForm">
      <el-input v-model="filterText" class="filter-item" placeholder="输入关键字进行过滤" clearable style="width: 200px; margin-left: 25px; margin-top: 15px" />
      <el-tree
        class="filter-tree"
        :data="orgTree"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
        :highlight-current="true"
        ref="tree"
        style="margin-left: 25px; margin-top: 10px">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="selectOrg">
          确定
        </el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: "lk-select-org",
  props:{
    //v-model绑定值
    value: {
      type: [String, Number],
      default() {
        return ''
      }
    },
  },
  data(){
    return {
      query: {
        current: 1,
        params: {
          stet: [],
          orgId: '',
          orgName: ''
        }
      },
      filterText: '',
      orgTree: [],
      treeForm: false,
      defaultProps: {
        children: 'children',
        label: 'orgName'
      },
    }
  },
  model: {
    prop: 'value',
    event: 'getValue'
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created(){
    this.getTree()
  },
  methods:{
    showTree() {
      this.treeForm = true
    },
    selectOrg() {
      this.treeForm = false
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.orgName.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      this.query.params.orgId = data.orgId
      this.query.params.orgName = data.orgName
      this.$emit('getValue', data.orgId)
    },
    getTree() {
      const that = this
      this.request('orgTree', this.queryTree).then(response => {
        console.log(response)
        that.orgTree = response
      })
    },
  }
}
</script>

<style lang="scss">
.dio-box .el-dialog__wrapper .el-dialog .el-dialog__header {
  border-bottom: 1px solid #eee!important;
}
</style>
