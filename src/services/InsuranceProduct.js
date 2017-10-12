import request from '../utils/request';
import newHeaers from '../utils/headers'
import { PAGE_SIZE } from '../constants'

/*查询保险产品列表信息 */
export function fetchInsuranceInformation({current,car_type,province_id,city_id,insurance_company,userInfo}) {
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
  if(insurance_company != undefined && insurance_company != ''){
  	search += `&insurance_company=${insurance_company}`;
  }
  if(userInfo != undefined && userInfo != ''){
    search += `&userInfo=${userInfo}`;
  }
  return request(`/api/admin/insurance/product/list?`+search, {headers: newHeaers()});
}

/*删除保险产品信息
 *
 * */

export function delInsuranceProduct({ id,insurance_company, agent, contact_tel, car_type, onnage, rebate, remark, province_id, city_id}) {
	return request(`/api/admin/insurance/product/delete?productId=${id}`, {headers: newHeaers()});
	
}

/*发布保险产品信息
 *
 * */

export function offSaleInsuranceProduct({ id,insurance_company, agent, contact_tel, car_type, onnage, rebate, remark, province_id, city_id}) {
	return request(`/api/admin/insurance/product/offsale?productId=${id}`, {headers: newHeaers()});
	
}

