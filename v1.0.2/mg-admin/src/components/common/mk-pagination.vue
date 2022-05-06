<template>
  <div class="pagination-box">
    <el-pagination @size-change="changePageSize" :page-size="pageSize" :page-sizes="pageSizes" background layout="sizes"
                   :total="dataSize"/>
    <div class="pagination-box_right">
      <el-button class="page-start" icon="el-icon-d-arrow-left" size="mini" :class="{disable:currentPage==1}"
                 :disabled="currentPage==1"
                 @click="goPage(1)"/>
      <el-pagination
        @current-change="goPage"
        background
        :current-page="currentPage"
        :page-size="pageSize"
        layout=" prev, pager, next, slot, total"
        :total="dataSize">
        <el-button class="page-end" :class="{disable:currentPage==maxPage}" icon="el-icon-d-arrow-right"
                   size="mini" @click="goPage(maxPage)"
                   :disabled="maxPage==currentPage"/>
      </el-pagination>
      <div class="pagination-box_jumper">
        <span>跳到</span>
        <input type="number" v-model="jumperNum" min="1" @keyup.enter="goPage(jumperNum)">
        <span>页</span>
        <button class="gy-btn_go-btn" type="button" @click="goPage(jumperNum)">GO</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //分页组件
  name: "mk-pagination",
  props: {
    dataSize: {
      type: Number,
      default() {
        return 0;
      }
    },
    pageSizes: {
      type: Array,
      default() {
        return [5, 10, 15, 20, 30]
      }
    },
    currentPage: {
      type: Number,
      default() {
        return 1;
      }
    },
    pageSize: {
      type: Number,
      default() {
        return 10;
      }
    }
  },
  computed: {
    maxPage() {
      return Math.ceil(this.dataSize / this.pageSize);
    }
  },
  methods: {
    //跳轉頁面到自定義的頁數中
    goPage(page) {
      this.$emit('go', page);
    },
    changePageSize(page) {
      this.$emit('changePageSize', page);
    }
  },
  data() {
    return {
      jumperNum: '1'
    }
  }
}
</script>

<style scoped lang="scss">

.pagination-box {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-start, .page-end {
    min-width: 32px;
    max-width: 32px;
    min-height: 28px;
    line-height: 26px;
    background: #F7F8FA;
    border: 1px solid rgba(194, 210, 220, 0.7);
    border-radius: 4px;
    font-weight: bold;
    font-size: 12px;
    padding: 0;
    color: $color-info;

    i {
      font-weight: bold;
    }

  }

  .disable {
    color: #C0C4CC;
  }

  .page-end {
    margin-left: 5px;
    margin-right: 10px;
  }

  &_right {
    display: flex;
    align-items: center;
  }

  &_jumper {
    margin: 16px 0 14px;

    input {
      width: 36px;
      height: 28px;
      background-color: $color-bg;
      border: 1px solid rgba(232, 233, 235, 1);
      border-radius: 4px;
      box-sizing: border-box;
      text-align: center;
      margin: 0 10px;
      outline: none;
    }

    .gy-btn_go-btn {
      width: 36px;
      height: 28px;
      background-color: $color-primary;
      border: 1px solid rgba(232, 233, 235, 1);
      border-radius: 4px;
      font-size: 12px;
      color: rgb(255, 255, 255);
      margin-left: 14px;
      cursor: pointer;
    }
  }
}
</style>
