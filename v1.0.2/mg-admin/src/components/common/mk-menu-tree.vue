<template>
  <div class="menu-tree">
    <div class="block">
      <el-tree
        :data="menuList"
        ref="tree"
        node-key="id"
        show-checkbox
        highlight-current
        check-strictly
        @check="selectTree"
        :default-expanded-keys="assignedPermissions"
        :default-checked-keys="assignedPermissions"
        :default-expand-all="expandAllVale"
      >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.data.title }}</span>
            <el-tag style="margin-left: 8px" size="mini" v-show="node.data.authority">{{
                node.data.authority
              }}</el-tag>
          </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import {dirMenusList} from "@/api/modules/sys.menus.api";
import {dirRolesOne} from "@/api/modules/sys.roles.api";

export default {
  name: 'mk-menu-tree',
  props: {
    expandAll: {
      type: Boolean,
      default() {
        return false
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    roleId: {
      type: String,
      default() {
        return ''
      }
    }
  },
  model: {
    prop: 'perms',
    event: 'getValue'
  },
  watch: {
    'expandAll': {
      immediate: true,
      handler: function (val) {
        //回填
        this.expandAllVale = val
      }
    },
    'roleId': {
      immediate: true,
      handler: function (val) {
        // console.log(val)
        //回填
        // this.assignedPermissions = val
      }
    }
  },
  data() {
    return {
      assignedPermissions: [],
      expandAllVale: false,
      menuList: [],
      roleMenus: [],
      menuKey: [],
      query: {
        params: {
          id: ''
        },
        limit: 300
      }
    }
  },
  created() {
    this.getDataList(this.roleId)
  },
  mounted() {
  },
  methods: {
    getDataList() {
      dirMenusList(this.query).then(res => {
        this.menuList = this.listToTree(res.data)
      })
      dirRolesOne({params: {id: this.roleId}}).then(role => {
        let arr = []
        this.roleMenus = role.menus
        for (const roleElement of role.menus) {
          if (roleElement.lever === 3) {

          }
          arr.push(roleElement.id)
        }
        this.assignedPermissions = arr
      })
    },
    listToTree(list) {
      let map = {}, node, tree = [], i;
      for (i = 0; i < list.length; i++) {
        map[list[i].id] = list[i];
        list[i].children = [];
      }
      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.pid !== 1) {
          map[node.pid].children.push(node);
        } else {
          // delete
          tree.push(node);
        }
      }
      return tree;
    },
    selectTree(data, node) {
      let menuKeyArr = []
      menuKeyArr = [...node.checkedKeys, ...node.halfCheckedKeys]
      this.menuKey = menuKeyArr
      this.$emit('getValue', this.menuKey)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-tree {
  min-width: 200px;
  width: 400px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;

  .block {
    font-size: 14px;
  }

}
</style>
