import request from '../utils/request';
import newHeaers from '../utils/headers'
import { pageSize } from '../constants';

/*获取 运输公司 列表*/
export function fetchList({current}) {
  current = current || 1;
  return request(`/api/admin/shipper/info/list?page=${current}&rows=${pageSize}&sidx=id&sord=desc`, {headers: newHeaers()});
}

