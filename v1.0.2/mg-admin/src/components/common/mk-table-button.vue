<template>
  <div>
    <slot></slot>
    <el-button v-if="!disAdd" @click="$emit('add')" size="mini" type="primary" icon="el-icon-edit">
      <span>{{ addText }}</span>
    </el-button>
    <el-button v-if="!disDelete" @click="$emit('delete')" size="mini" type="danger" icon="el-icon-delete">
      <span>{{ deleteText }}</span>
    </el-button>

  </div>
</template>

<script>

import router from "@/router";

export default {
  name: "mk-table-button",
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
    this.menuCode = router != null ? router.currentRoute.meta.menuCode : null;
  },
  data() {
    return {menuCode: ''}
  }
}
</script>

<style scoped>
/*    i {*/
/*    opacity: 0;*/
/*    margin-right: -20px;*/
/*    transition: 0.5s;*/
/*}*/
/*    .gy-btn:hover{*/
/*        box-shadow: 0 8px 10px 0 rgba(36,124,183,0.14), 0 17px 30px 0 rgba(36,124,183,0.19);*/
/*    }*/
/*    .gy-btn:hover i{*/
/*        opacity: 1;*/
/*        margin-right: 0px;*/
/*    }*/
</style>
