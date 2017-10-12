import request from '../utils/request';
import newHeaers from '../utils/headers'
import { pageSize } from '../constants';

const expandedPageSize = 3;

/*获取用户列表*/
//http://121.43.96.234:9105/admin/truckers/info/list?page=1&rows=20&sidx=id&sord=desc
export function fetchUsersList({current}) {
  current = current || 1;
  return request(`/api/admin/truckers/info/list?page=${current}&rows=${pageSize}&sidx=id&sord=desc`, {headers: newHeaers()});
}

/*获取某一个用户 所绑定的车辆*/
export function fetchBindTrucks({}) {
  return request(`/api/admin/truckers/info/list?page=${current}&rows=${pageSize}&sidx=id&sord=desc`, {headers: newHeaers()});
}

// 获取 用户对应的绑定的车辆数据
export function fetchExpandedData({current, userid}) {
  current = current || 1;
  //http://121.43.96.234:9105/admin/truckers/bind/list?page=1&rows=20&sidx=id&sord=desc&userid=5925564ec6985e3af75de138
  return request(`/api/admin/truckers/bind/list?page=${current}&rows=200&sidx=id&sord=desc&userid=${userid}`, {headers: newHeaers()});
}

