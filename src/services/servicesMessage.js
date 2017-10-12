import request from '../utils/request';
import newHeaers from '../utils/headers'
import { pageSize } from '../constants';


/*获取列表*/
export function fetchList({current, sord}) {
  //GET /admin/apppush/list
  current = current || 1;
  sord = sord || 'desc';
  if (sord == 'ascend') {
    sord = 'asc';
  } else if (sord == 'descend') {
    sord = 'desc'
  }
  return request(`/api/admin/apppush/list?page=${current}&rows=${pageSize}&sidx=id&sord=${sord}`, {headers: newHeaers()});
}

/* 增 删 改 在一个api里面 */
//http://121.43.96.234:9105/admin/apppush/editData?cid=xc_admin&oper=add&msg=1.%20%E6%B5%8B%E8%AF%95%E6%B6%88%E6%81%AF%E9%99%86%E5%BE%B7%E9%9D%96&device_type=3&title=%E9%99%86%E5%BE%B7%E9%9D%96%E5%8F%91%E9%80%81%E7%9A%84%E6%B5%8B%E8%AF%95

export function operationData({id, oper, msg, title, device_type, channelid}) {
  id = id || '';
  size = size + 'MB';
  return request(`/api/admin/admin/apppush/editData?cid=xc_admin&oper=${oper}&msg=${msg}&device_type=${device_type}&title=${title}&userid=${userid}&channelid=${channelid}`, {method:'POST',headers: newHeaers()});
}


