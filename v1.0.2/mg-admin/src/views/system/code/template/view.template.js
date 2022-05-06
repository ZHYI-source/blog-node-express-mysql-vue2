export const viewTemplate = function (viewObj) {
  return `
<pre class="language-markup"><code>&lt;template&gt;
  &lt;section&gt;
    &lt;section class="view-box"&gt;
      &lt;section class="task-info"&gt;
        ${viewObj.viewItemFields}
      &lt;/section&gt;
    &lt;/section&gt;
  &lt;/section&gt;
&lt;/template&gt;

&lt;script&gt;

export default {
  ${viewObj.viewPageName},
  components: {},
  data() {
    return {
      form: {}
    }
  },
  props: {
    viewData: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  created() {

    this.loadData(this.viewData);
  },
  methods: {
    loadData(data) {
      this.form = data || {};
    },
  },
}
&lt;/script&gt;

&lt;style lang="scss" scoped&gt;

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

    &amp;:hover {
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

  &amp;:hover {
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
&lt;/style&gt;
</code></pre>
    `
}
