export const getTemplate = function (getObj) {
  return `
<pre class="language-markup"><code>&lt;template&gt;
  &lt;section&gt;
    &lt;section class="mk-add-pop"&gt;
      &lt;el-form ref="formAdd" :model="form" :rules="rules" label-width="100px"&gt;
            ${getObj.inputFields}
        &lt;el-divider/&gt;
        &lt;mk-get-button @save="save" @close="close(true)"/&gt;
      &lt;/el-form&gt;
    &lt;/section&gt;
  &lt;/section&gt;

&lt;/template&gt;

&lt;script&gt;
import MkGetRow from "@/components/common/mk-get-row";
import MkGetButton from "@/components/common/mk-get-button";
import MkBackList from "@/components/common/mk-back-list";
${getObj.importField}

export default {
  ${getObj.getPageName},
  components: { MkBackList, MkGetButton, MkGetRow},
  props: {
    updateData: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  created() {

    if (this.updateData &amp;&amp; this.updateData.id) {
      this.form = this.updateData
      this.isAdd = false
    }
  },
  data() {
    return {
      commonKey: 0,
      form: {},
      isAdd: true,
      rules: {
        ${getObj.rulesFields}
      }
    }
  },
  methods: {
    save() {
      this.$refs['formAdd'].validate((valid) =&gt; {
        if (valid) {
          let _FUC = ''
          _FUC = this.isAdd ? ${getObj.createApiFun} : ${getObj.updateApiFun}
          _FUC(this.form).then(res =&gt; {
            this.$toast.success(this.isAdd ?'添加成功！':'修改成功！')
            this.$emit('close',true);
          }).catch(err =&gt; {
            console.log(err)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    close(show) {
      if (show) {
        this.$toast.confirmSave().then(() =&gt; {
          this.$emit('close');
        });
      } else {
        this.$emit('close');
      }
    }
  }
}
&lt;/script&gt;

&lt;style lang="scss" scoped&gt;

&lt;/style&gt;
</code></pre>
    `
}
