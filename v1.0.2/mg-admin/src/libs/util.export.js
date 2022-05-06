/**
 *@author ZY
 *@date 2022/3/23
 *@Description:导出excel
 */
//https://d2.pub/zh/doc/d2-admin/plugin/data-export.html#%E5%AF%BC%E5%87%BA-xlsx
export const exportExecl = (_this, columnsData = [], data, title = `${new Date().toLocaleDateString()}`, header = '表格数据') => {
  let columns = []
  for (const column of columnsData) {
    let obj = {
      label: column.name,
      prop: column.key
    }
    columns.push(obj)
  }
  _this.$export.excel({
    columns,
    data,
    header,
    title: new Date().toLocaleDateString() + '*' + title
  }).then((res) => {
    // ...可选回调
  })
}
