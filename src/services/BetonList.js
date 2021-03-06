import request from '../utils/request';
import newHeaers from '../utils/headers'
import { PAGE_SIZE } from '../constants'

/*查询混凝土发货列表信息 */
export function fetchBetonList({current,userInfo}) {
  current = current || 1;
  let search=`page=${ current }&rows=${ PAGE_SIZE }&sidx=id&sord=desc`;
  if(userInfo != undefined && userInfo != ''){
    search += `&userInfo=${userInfo}`;
  }
  return request(`/api/admin/shipper/history/blist?`+search, {headers: newHeaers()});
}

