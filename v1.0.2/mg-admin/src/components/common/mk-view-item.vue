<template>
    <div class="view-column">
        <div class="view-column_label" :style="{width:nameWidth||labWidth,...titleStyle}">{{ title }}</div>
        <span class="view-column_symbol" :style="titleStyle">{{ split }}</span>
        <div class="view-column_value" :style="{color:textColor}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mk-view-item",
        props: {
            title: {
                type: String,
                default() {
                    return '';
                }
            },
            textColor: {
                type: String,
                default() {
                    return '#565c6c';
                }
            },
            titleStyle: {
                type: Object,
                default() {
                    return {}
                }
            },
            //自定义宽度,有值的时候会自动屏蔽labWidth
            nameWidth: {
                type: String,
                default() {
                    return '70';
                }
            },
            split: {
                type: String,
                default() {
                    return "："
                }
            }
        },
        created() {
        },
        computed: {
            labWidth() {
                let size = this.title.length;
                let fontWidth = 12;
                if (size <= 4) {
                    size = 4
                }
                return fontWidth * size + "px"
            }
        },
        methods: {},
        data() {
            return {}
        }
    }
</script>

<style lang="scss">
  .view-column {
    display: flex;
    padding: 10px 0px;
    margin-right: 35px;
    .view-column_label {
      min-width: 70px;
      font-size: 14px;
      font-weight: bold;
      text-align-last: justify;
      line-height: 26px;
    }
    .view-column_symbol {
      line-height: 26px;
      margin-right: 8px;
    }
    .view-column_value {
      min-width: calc(100% - 120px);
      line-height: 26px;
      font-size: 14px;
    }
  }
</style>
