import request from '../utils/request';
import newHeaers from '../utils/headers'
import { pageSize } from '../constants';


/*获取列表*/
export function fetchList({current, sord}) {
  current = current || 1;
  sord = sord || 'desc';
  if (sord == 'ascend') {
    sord = 'asc';
  } else if (sord == 'descend') {
    sord = 'desc'
  }
  //http://121.43.96.234:9105/admin/truck/hq/list?page=1&rows=20&sidx=id&sord=desc

  return request(`/api/admin/truck/hq/list?page=${current}&rows=${pageSize}&sidx=id&sord=${sord}`, {headers: newHeaers()});
}

/* 增 删 改 在一个api里面 */
export function operationData({id, oper, status,}) {
  id = id || '';
  return request(`/api/admin/truck/hq/edit?oper=${oper}&id=${id}&status=${status}`, {method:'POST',headers: newHeaers()});
}


