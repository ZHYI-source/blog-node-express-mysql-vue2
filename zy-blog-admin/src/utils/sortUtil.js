/**
 * 获取排序类型
 * @param sortType 排序类型 ascending,descending
 * @author zhouyi
 * @date 2022/2/11
 **/
export const getSortType = (sortType) => {

    if (!sortType || sortType === null || sortType.length <= 0) {
        return "DESC";
    }
    if (sortType === "ascending") {
        return "ASC";
    }
    return "DESC";
};

export const setSortType = (query, sort) => {
    if (!query) {
        return;
    }
    if (sort.prop && sort.prop !== null && sort.prop.length > 0) {
        query.orderBy = sort.prop;
        query.orderType = getSortType(sort.order);
    } else {
        query.orderBy = "";
    }
};
