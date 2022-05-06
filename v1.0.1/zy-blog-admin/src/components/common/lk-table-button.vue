<template>
  <div class="table-btns">
    <slot></slot>
    <el-button v-if="!disAdd" type="primary" @click="$emit('add')" icon="el-icon-circle-plus-outline" size="mini">{{
        addText
      }}
    </el-button>
    <el-button v-if="!disDelete" type="primary" @click="$emit('delete')" icon="el-icon-delete" size="mini">{{
        deleteText
      }}
    </el-button>
  </div>
</template>

<script>

// import router from "@/router";

export default {
  name: "lk-table-button",
  props: {
    addText: {
      type: String,
      default() {
        return '添 加';
      }
    },
    deleteText: {
      type: String,
      default() {
        return '删除'
      }
    },
    disAdd: {
      type: Boolean,
      default() {
        return false;
      }
    },
    disDelete: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  created() {
    // this.menuCode = router != null ? router.currentRoute.meta.menuCode : null;
  },
  data() {
    return {menuCode: ''}
  }
}
</script>

<style lang="scss" scoped>
.table-btns {
  padding-right: 20px;
}
</style>
