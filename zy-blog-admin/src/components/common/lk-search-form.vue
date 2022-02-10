<template>
  <el-form inline :model="model" ref="searchForm" :rules="rules" :label-width="labelWidth" autocomplete="on">
    <div class="screening-rows">
      <div style="overflow: hidden;transition: all 0.2s cubic-bezier(0.21, 0.14, 0.15, 0.29) 0s;"
           :style="moreScreening.showScreening?`height:${moreScreening.customHeight}px`:'height:48px'"
      >
        <div style="display: flex;flex-wrap: wrap" ref="screeningDom">
          <slot></slot>
        </div>
      </div>
      <div class="screening-rows_operate">
        <div class="more-screening" :class="{open:moreScreening.showScreening}"
             v-if="moreScreening.isMoreScreening" @click="moerScreeningHandle"
        >
          <i class="iconfont iconcaidan"></i>
          <span>{{ moreScreening.showScreening ? '收起筛选' : '更多筛选' }}</span>
        </div>
        <div class="search-btn-box">
          <el-button size="mini" class="lk-btn" icon="el-icon-search" v-if="showQuery" @click="search()">查询</el-button>
          <el-button size="mini" class="lk-btn" icon="el-icon-download" v-if="showExport" @click="handleExport()">导出
          </el-button>
          <el-button size="mini" class="lk-btn" icon="el-icon-plus" v-if="showAdd" @click="edit()">{{ editText }}
          </el-button>
          <slot name="btn"></slot>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>

export default {
  name: "lk-search-form",
  props: {
    model: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    showExport: {
      type: Boolean,
      default() {
        return false
      }
    },
    editText: {
      type: String,
      default() {
        return '新增'
      }
    },
    showAdd: {
      type: Boolean,
      default() {
        return false
      }
    },
    showQuery: {
      type: Boolean,
      default() {
        return true
      }
    },
    labelWidth: {
      type: String,
      default() {
        return '80px'
      }
    },
    rules: {
      type: Object,
      default() {
        return null
      }
    }
  },
  mounted() {
    this.scrollHeight = this.$refs.screeningDom.offsetHeight
    window.onresize = () => {
      this.$nextTick(() => {
        this.comScreeningHeight();
      });
    };

    this.comScreeningHeight();
    this.$nextTick(() => {
      this.comScreeningHeight();
    });
    setTimeout(() => {
      this.comScreeningHeight();
    }, 500)
  },
  computed: {
    getUserIcons() {
      // return this.$store.state.sidebar.opened;
    }
  },
  watch: {
    getUserIcons(val) {
      this.comScreeningHeight();
    },
  },
  methods: {
    edit() {
      this.$emit('edit');
    },
    moerScreeningHandle() {
      this.moreScreening.showScreening = !this.moreScreening.showScreening;
    },
    comScreeningHeight() {
      //获取高度
      let screeningDom = this.$refs.screeningDom;
      if (screeningDom) {
        this.moreScreening.customHeight = screeningDom.offsetHeight;
        this.moreScreening.isMoreScreening = screeningDom.offsetHeight > 70;
      }
    },
    search() {
      //this.$refs.searchForm.submit();
      if (this.rules) {
        this.$refs.searchForm.validate((v, fields) => {
          if (!v) {
            this.toast.errorFormRule(fields);
            return;
          }
          this.$emit('search');
        });
      } else {
        this.$emit('search');
      }
    },
    handleExport() {
      this.$emit('handleExport');
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.searchForm.validate((v, fields) => {
          if (!v) {
            this.toast.errorFormRule(fields);
            reject();
            return;
          }
          resolve();
        });
      })
    }
  },
  data() {
    return {
      scrollHeight: null,
      moreScreening: {
        isMoreScreening: false,
        showScreening: false,
        customHeight: '',
      }
    }
  }
}
</script>

<style scoped lang="scss">
.screening-rows {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  //padding-top: 14px;
  border-bottom: 1px solid rgba(232, 232, 232, 1);
  padding-bottom: 5px;
  //height: 48px;
  &_operate {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: flex-end;

    .more-screening {
      font-size: 13px;
      font-family: Microsoft YaHei, serif;
      font-weight: 400;
      color: #505559;
      padding: 6px 0;
      cursor: pointer;
      user-select: none;
      margin-right: 5px;

      .iconfont {
        font-size: 16px;
        margin-right: 5px;
      }

      &:hover {
        color: #0a76a4;
      }
    }

    .open {
      color: #0a76a4;
    }

    .search-btn-box {
      height: 100%;
      padding-top: 4px;
      display: flex;
    }

    /*elementy元素*/
    .el-button {
      margin-right: 10px;
      margin-left: 0px;
    }
  }

}

</style>
<style lang="scss">
.screening-rows {
  display: flex;
  justify-content: center;
  align-items: center;

  .el-checkbox {
    line-height: 28px;
  }
}

.mk-reset-btn {
  background-color: #0a76a4;;
  border: none;
  border-radius: 2px;
}
</style>
