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
  return request(`/api/admin/appversion/list?page=${current}&rows=${pageSize}&sidx=id&sord=${sord}`, {headers: newHeaers()});
}

/* 增 删 改 在一个api里面 */
export function operationData({id, oper, version_id, url, size, descr}) {
  id = id || '';
  size = size + 'MB';
  return request(`/api/admin/appversion/editData?cid=xc_admin&oper=${oper}&version_id=${version_id}&url=${url}&size=${size}&descr=${descr}&id=${id}`, {method:'POST',headers: newHeaers()});
}


