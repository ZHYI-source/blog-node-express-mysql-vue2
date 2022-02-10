<template>
    <el-button-group>
        <slot name="first"></slot>
        <button @click="$emit('view')" class="lk-btn lk-btn-view" :type="viewType"
                v-if="!disView ">
            {{ viewText }}
        </button>
        <button @click="$emit('edit')" class="lk-btn lk-btn-edit" type="button"
                v-if="!disEdit">
            {{ editText }}
        </button>
        <button @click="$emit('delete')" class="lk-btn lk-btn-delete" type="button"
                v-if="!disDelete ">
            {{ deleteText }}
        </button>
       <button @click="$emit('back')" class="lk-btn lk-btn-back" type="button"
              v-if="showBack ">
        {{ backText }}
       </button>
        <slot></slot>
    </el-button-group>
</template>

<script>
    import router from '@/router/index'

    export default {
        name: "lk-tool-button",
        props: {
            disView: {
                type: Boolean,
                default() {
                    return false;
                }
            },
          showBack: {
                type: Boolean,
                default() {
                    return false;
                }
            },
           viewType: {
                type: String,
                default() {
                    return 'button';
                }
            },
            disEdit: {
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
            },
            viewText: {
                type: String,
                default() {
                    return '查看'
                }
            },
          backText: {
                type: String,
                default() {
                    return '回退'
                }
            },
            editText: {
                type: String,
                default() {
                    return '修改'
                }
            },
            deleteText: {
                type: String,
                default() {
                    return '删除'
                }
            },

        },
        created() {
            this.menuCode = router != null ? router.currentRoute.meta.menuCode : null;
        },
        data() {
            return {
                menuCode: ''
            }
        }
    }
</script>

<style scoped lang="scss">
$view:#1989FA;
$back:#9857ea;
$edit:#E6A23C;
$del:#F56C6C;
.lk-btn {
  padding: 3px 10px;
  line-height: 16px;
  margin: 0px 2px;
  cursor: pointer;
  border-radius: 3px;
  &-view {
    background-color: $view;
    border: 1px solid $view;
    color: #FFFFFF;
    &:hover {
      background-color: rgba($view,.7);
    }
  }
  &-edit {
    background-color: $edit;
    border: 1px solid $edit;
    color: #FFFFFF;
    &:hover {
      background-color: rgba($edit,.7);
    }
  }
  &-delete {
    background-color: $del;
    border: 1px solid $del;
    color: #FFFFFF;
    &:hover {
      background-color: rgba($del,.7);
    }
  }
  &-back {
    background-color: $back;
    border: 1px solid $back;
    color: #FFFFFF;
    &:hover {
      background-color: rgba($back, .7);
    }
  }

}
</style>
