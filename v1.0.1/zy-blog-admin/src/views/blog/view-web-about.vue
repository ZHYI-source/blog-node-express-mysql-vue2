<template>
  <section>
    <section class="task-view-box">
      <section class="task-info">
        <lk-view-row>
          <lk-view-item title="文章标题" label-width="70">
            <div class="art-head">{{ form.aboutTitle || '-' }}</div>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="插入时间" label-width="70">
            <lk-view-date :date="form.insertTime || '-'"/>
          </lk-view-item>
          <lk-view-item title="修改时间" label-width="70">
            <lk-view-date :date="form.updateTime || '-'"/>
          </lk-view-item>
        </lk-view-row>
        <lk-view-row>
          <lk-view-item title="文章内容" label-width="70">
            <lk-view-html :content="form.aboutContent || '无'" elWidth="600"/>
          </lk-view-item>
        </lk-view-row>
      </section>
    </section>
  </section>
</template>

<script>
  import LkViewHtml from "@/components/common/lk-view-html";

  /**
   *@author ZY
   *@date 2021/12/9
   *@Description:web站点关于我详情
   */
  export default {
    name: "view-web-about",
    components: {LkViewHtml},
    data() {
      return {
        form: {}
      }
    },
    props: {
      datas: {
        type: Object,
        default() {
          return null;
        }
      }
    },
    created() {
      this.loadData(this.datas);
    },
    methods: {
      loadData(data) {
        this.form = data || {};
      },
    },
  }
</script>

<style lang="scss" scoped>

  .task-view-box {
    width: 100%;
    font-size: 16px;
    padding-left: 10px;

    .art-head {
      width: 500px;
      font-weight: bold;

    }

    .box-head {
      padding: 15px 0px;
      color: #000000;
      font-weight: bold;
    }

    .task-info {
      padding-top: 10px;
      //background-color: rgba(191, 190, 190, 0.1);
      border-radius: 8px;

    }

    .task-chart {
      display: flex;
      flex-wrap: wrap;
      border-radius: 8px;
    }

    .show-section {
      width: calc(30% - 30px);
      min-width: 450px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin: 15px;
      border-radius: 8px;
    }

    .icon-bangzhu {
      font-size: 14px;
      cursor: pointer;

      &:hover {
        color: #1890FF;
      }
    }

    .icon-weibiaoti-_huabanfuben {
      color: #FCDC00;
      font-size: 14px;
    }

    .tagBox {
      display: flex;

      .tag {
        margin-right: 5px;
      }
    }

  }

  .tagBox {
    max-width: 550px;
    margin-top: -5px;
    display: flex;
    flex-wrap: wrap;
  }

  //强调字体颜色
  .blue {
    color: #1890FF;
  }

  .concat-link {
    color: rgba(24, 144, 255, 0.75);

    &:hover {
      color: #1890FF;
    }
  }

  .el-icon-circle-check {
    color: green;
  }

  .view-btns {
    margin-top: 10px;
    display: flex;
    width: 100%;
    border-top: 1px solid #eee;
    padding: 25px 0px;
    padding-left: 100px;

    .el-icon-s-opportunity {
      color: orange;
      margin-right: 5px;
    }
  }

  .inputError {
    border-color: red;
  }
</style>
