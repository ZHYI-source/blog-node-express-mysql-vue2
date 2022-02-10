<template>
  <section>
    <section class="view-box">
      <el-table
        :data="recodeData"
        stripe
        style="width: 100%;"
        :header-cell-style="{
                        'text-align': 'center',
                        'color': '#23262b',
                        'background-color': '#fcfafa',
                        'font-size': '14px'}"
        height="450"
      >
        <el-table-column prop="insertTimestamp" label="时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.insertTimestamp | fmtTime }}
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="记录" align="center">
        </el-table-column>
      </el-table>
    </section>
  </section>
</template>

<script>
import Tools from "@/libs/tool";


export default {
  name: "view-tax-history",
  components: {},
  data() {
    return {
      recodeData: []
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
      let id = data.id || ''
      this.request('api_admin_invoice_orgHistory', {id}).then(res => {
        this.recodeData = res || []
      }).catch(err => {
        console.log(err)
      })
    }
  },
}
</script>

<style lang="scss" scoped>

.history-info {
  padding-top: 20px;

  .line-card {
    width: 500px;
  }
}
</style>
