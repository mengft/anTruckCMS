import request from '../utils/request';
import newHeaers from '../utils/headers'
let pageSize = 4;


/*获取品牌列表*/
export function fetchList({current}) {
  current = current || 1;
  return request(`/api/admin/truck/brand/list?page=${current}&rows=${pageSize}&sidx=id&sord=desc`, {headers: newHeaers()});
}

/* 删除品牌列表 */
export function deleteBrand({id}) {
  return request(`/api/admin/truck/brand/del?id=${id}`, {method:'POST' ,headers: newHeaers()});
}


