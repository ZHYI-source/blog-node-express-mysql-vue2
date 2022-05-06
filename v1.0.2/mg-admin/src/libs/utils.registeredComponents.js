/**
 *@author ZY
 *@date 2021/12/22
 *@Description:全局注册公共组件
*/

import MkToolButton from "@/components/common/mk-tool-button";
import MkPagination from "@/components/common/mk-pagination";
import MkElTable from "@/components/common/mk-el-table";
import MkTableButton from "@/components/common/mk-table-button";
import TableFieldFilter from "@/components/common/table-field-filter";
import MkSearchForm from "@/components/common/mk-search-form";
import MkViewDate from "@/components/common/mk-view-date";
import MkViewItem from "@/components/common/mk-view-item";
import MkViewRow from "@/components/common/mk-view-row";
import MkGetButton from "@/components/common/mk-get-button";
import MkGetRow from "@/components/common/mk-get-row";

const components={
  MkToolButton,
  MkPagination,
  MkElTable,
  MkTableButton,
  TableFieldFilter,
  MkSearchForm,
  MkViewDate,
  MkViewItem,
  MkViewRow,
  MkGetButton,
  MkGetRow
}
// 导出组件
export default  {
    install(Vue){
        Object.keys(components).forEach((key) => {
            Vue.component(key,components[key])
        })

    }
}


