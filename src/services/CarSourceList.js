import request from '../utils/request';
import newHeaers from '../utils/headers'
import { PAGE_SIZE } from '../constants'

/*查询车源列表信息 */
export function fetchCarSourceList({current,userInfo}) {
  current = current || 1;
  let search=`page=${ current }&rows=${ PAGE_SIZE }&sidx=id&sord=desc`;
  if(userInfo != undefined && userInfo != ''){
    search += `&userInfo=${userInfo}`;
  }
  return request(`/api/admin/trucker/info/list?`+search, {headers: newHeaers()});
}

