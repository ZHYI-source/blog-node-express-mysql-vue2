<template>
  <div class="lk-form-row" :class="`lk-form-row_${inline?'inline':formType}`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "mk-get-row",
  props: {
    formType: {
      type: String,
      default () {
        return 'default'
      }
    },
    inline: {
      type: Boolean,
      default () {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.lk-form-row {
  display: flex;
 .input-one {
   width: 255px;
   justify-content: center;
   align-content: center;

 }


}

</style>
