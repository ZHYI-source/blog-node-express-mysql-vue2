<template>
    <div class="view-rows">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "mk-view-row",
        created() {
        },
        methods: {},
        data() {
            return {}
        }
    }
</script>

<style lang="scss">
  .view-rows {
    display: flex;
  }
</style>
