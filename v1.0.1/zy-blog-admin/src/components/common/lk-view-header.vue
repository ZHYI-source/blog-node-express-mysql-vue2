<template>
  <section>
    <el-row>
      <el-col :span="24">
        <div class="view-header">
          <el-button type="primary" class="back-btn" size="mini" plain icon="el-icon-arrow-left" @click="$emit('back')">{{title}}</el-button>
          <el-divider direction="vertical"></el-divider>
          <div>{{content}}</div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: "lk-view-header",
  props: {
    title: {
      type: String,
      default() {
        return '返回'
      }
    },
    content: {
      type: String,
      default() {
        return '详情'
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .view-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #EEEEEE;
    font-size: 14px;
    .back-btn {
      background-color: #1989FA;
      border: 1px solid #1989FA;
      color: #FFFFFF;
      padding: 3px 10px;
      line-height: 16px;
      margin: 0px 2px;
      cursor: pointer;
    }
  }
</style>
