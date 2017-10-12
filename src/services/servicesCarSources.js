import request from '../utils/request';
import newHeaers from '../utils/headers'
let pageSize = 3;


/*获取品牌列表*/
export function fetchList({current}) {
  current = current || 1;
  //http://121.43.96.234:9105/admin/truck/info/list?page=1&rows=3&sidx=id&sord=desc
  return request(`/api/admin/truck/info/list?page=${current}&rows=${pageSize}&sidx=id&sord=desc`, {headers: newHeaers()});
}

/* 删除品牌列表 */
export function deleteBrand({id}) {
  return request(`/api/admin/truck/brand/del?id=${id}`, {method:'POST' ,headers: newHeaers()});
}


