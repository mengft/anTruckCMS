import request from '../utils/request';
import newHeaers from '../utils/headers'
import { PAGE_SIZE } from '../constants';


/*获取列表*/
export function fetchList({current, sord}) {
  current = current || 1;
  sord = sord || 'desc';
  if (sord == 'ascend') {
    sord = 'asc';
  } else if (sord == 'descend') {
    sord = 'desc'
  }
  return request(`/api/admin/bindtruck/list?page=${current}&rows=${PAGE_SIZE}&sidx=id&sord=${sord}`, {headers: newHeaers()});
}


export function deleteItem({id}) {
  return request(`/api/admin/bindtruck/del?id=${id}`, {method:'POST' ,headers: newHeaers()});
}


