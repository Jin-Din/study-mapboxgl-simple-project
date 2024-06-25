


/**
 * 计算分页数
 * @param totalItems 总数
 * @param itemsPerPage 每页
 */
 export function calculatePageCount(totalItems:number, itemsPerPage:number) {
    return Math.ceil(totalItems / itemsPerPage);
}