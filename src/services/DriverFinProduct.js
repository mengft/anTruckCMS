import request from '../utils/request';
import newHeaers from '../utils/headers'
import { PAGE_SIZE } from '../constants'

/*查询金融产品列表信息 */
export function fetchInformation({current,car_type,province_id,city_id,service_company,userInfo}) {
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
  if(service_company != undefined && service_company != ''){
  	search += `&title=${service_company}`;
  }
  if(userInfo != undefined && userInfo != ''){
    search += `&userInfo=${userInfo}`;
  }

  return request(`/api/admin/finance/business/list?`+search, {headers: newHeaers()});
}


/*删除保险产品信息
 *
 * */

export function delProduct({ id}) {
	return request(`/api/admin/finance/business/delete?productId=${id}`, {headers: newHeaers()});
	
}

/*发布保险产品信息
 *
 * */

export function publishProduct({ id}) {
	return request(`/api/admin/finance/business/offsale?productId=${id}`, {headers: newHeaers()});
	
}

