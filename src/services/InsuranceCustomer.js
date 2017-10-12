import request from '../utils/request';
import newHeaers from '../utils/headers'
import { PAGE_SIZE } from '../constants'

/*查询保险客户列表信息 */
export function fetchInsuranceInformation({current,userInfo}) {
  current = current || 1;
  let search=`page=${ current }&rows=${ PAGE_SIZE }&sidx=id&sord=desc`;
  if(userInfo != undefined && userInfo != ''){
    search += `&userInfo=${userInfo}`;
  }
  return request(`/api/admin/insurance/customer/list?`+search, {headers: newHeaers()});
}


/*删除保险产品信息
 *
 * */

export function delInsuranceCustomer({ id,company, contact_name, contact_tel, car_num, remark}) {
	return request(`/api/admin/insurance/customer/delete?customerId=${id}`, {headers: newHeaers()});
	
}


