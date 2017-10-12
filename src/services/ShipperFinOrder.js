import request from '../utils/request';
import newHeaers from '../utils/headers'
import { PAGE_SIZE } from '../constants'

/*查询订单列表信息 */
export function fetchInformation({current,car_type,province_id,city_id,status,userInfo}) {
  current = current || 1;
  let search=`page=${ current }&rows=${ PAGE_SIZE }&sidx=id&sord=desc`;
  if(car_type != undefined && car_type != ''){
    search += `&car_type=${car_type}`;
  }
  if(province_id != undefined && province_id != ''){
    search +=`&province_id=${province_id}`;
  }
  if(city_id != undefined && city_id != ''){
    search += `&city_id=${city_id}`;
  }
  if(status != undefined && status != ''){
    search += `&status=${status}`;
  }
  if(userInfo != undefined && userInfo != ''){
    search += `&userInfo=${userInfo}`;
  }
  return request(`/api/admin/finance_shipper/loan/list?`+search, {headers: newHeaers()});
}

/*删除订单信息
 *
 * */

export function delOrder({ id}) {
  return request(`/api/admin/finance_shipper/loan/delete?productId=${id}`, {headers: newHeaers()});
  
}


