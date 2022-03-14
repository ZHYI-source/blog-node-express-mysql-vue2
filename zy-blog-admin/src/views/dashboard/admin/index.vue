<template>
  <div class="dashboard-editor-container">
  <Tinymce v-model="content"/>
    <div style="padding: 30px;height: 300px;background-color:#fff;margin-top: 20px;font-size: 18px;font-family: 楷体;color: #e27806" v-html="content"></div>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
export default {
  name: 'DashboardAdmin',
  components: {
    Tinymce,
  },
  data() {
    return {
      content:'',
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

  .title_font{
    color: white;
    font-weight: bold;
    font-size: 20px;
    margin:10px ;
    padding: 10px;
    text-align: center;
  }
  .div_red{
    background-color: #ce3b3b;
  }
  .div_blue{
    background-color: #6888ff;
  }
  .div_yellow{
    background-color: orange;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
