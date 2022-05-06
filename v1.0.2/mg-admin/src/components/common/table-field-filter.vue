<template>
  <div>
    <el-popover placement="right-start" trigger="hover">
      <el-scrollbar class="float-filter">
        <div class="float-filter_flex">
          <el-checkbox @change="$emit('showChange',$event)" v-for="field in fields" v-model="field.show"
                       :key="field.key" :label="field.name"
          />
        </div>
      </el-scrollbar>
      <div slot="reference" class="filler-table-td">
        <i class="fa fa-navicon"></i>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "table-field-filter",
  props: {
    fields: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped lang="scss">

.filler-table-td {
  width: 30px;
  height: 28px;
  box-shadow: 0px 0px 3px 0px rgba(80, 85, 89, 0.59);
  border-radius: 3px;
  cursor: pointer;
  color: #8A9299;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-left: 2px;

  &:hover {
    box-shadow: 0px 0px 3px 0px rgba(#409EFF, 0.8);
    color: #409EFF;
  }
}

</style>

<style lang="scss">
.float-filter {
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
    overflow-y: auto;
  }
}

//提示弹窗样式
.float-filter {
  width: 204px;
  height: 423px;
  background: #fff;
  box-shadow: 0px 2px 16px 0px rgba(153, 155, 168, 0.23);
  border-radius: 2px;

  &_flex {
    display: flex;
    flex-direction: column;

    > label {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid rgba(237, 237, 237, .5);
      margin: 0 13px;
    }

    > label:last-of-type {
      border: none;
    }
  }

}
</style>
