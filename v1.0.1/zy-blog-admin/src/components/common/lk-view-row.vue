<template>
  <el-row>
    <el-col :span="24">
      <div class="view-row-box">
        <slot/>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "lk-view-row"
}
</script>

<style lang="scss" scoped>
.view-row-box {
  display: flex;
  justify-content: flex-start;
  margin: 10px;
  margin-bottom: 15px;
  .view-row {
    margin-right: 15px;
  }
}

</style>
