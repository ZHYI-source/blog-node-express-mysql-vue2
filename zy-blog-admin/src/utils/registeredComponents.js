/**
 *@author ZY
 *@date 2021/12/22
 *@Description:全局注册公共组件
*/

import LkSearchForm from "@/components/common/lk-search-form";
import LkPagination from "@/components/common/lk-pagination";
import LkElTable from "@/components/common/lk-el-table";
import LkToolButton from "@/components/common/lk-tool-button";
import LkViewHeader from "@/components/common/lk-view-header";
import LkViewDate from "@/components/common/lk-view-date";
import LkViewTextarea from "@/components/common/lk-view-textarea";
import LkViewItem from "@/components/common/lk-view-item";
import LkViewRow from "@/components/common/lk-view-row";
import LkTableButton from "@/components/common/lk-table-button";
import LkTableFieldFilter from "@/components/common/lk-table-field-filter";

const components={
  LkSearchForm,
  LkPagination,
  LkToolButton,
  LkElTable,
  LkViewHeader,
  LkViewDate,
  LkViewTextarea,
  LkViewItem,
  LkViewRow,
  LkTableButton,
  LkTableFieldFilter,
}
// 导出组件
export default  {
    install(Vue){
        Object.keys(components).forEach((key) => {
            Vue.component(key,components[key])
        })

    }
}


