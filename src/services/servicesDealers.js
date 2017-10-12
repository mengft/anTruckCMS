import request from '../utils/request';
import newHeaers from '../utils/headers'
import { pageSize } from '../constants';


/*获取列表*/
export function fetchList({current}) {
  current = current || 1;
  return request(`/api/admin/truck/dealer/list?page=${current}&rows=${pageSize}&sidx=id&sord=desc`, {headers: newHeaers()});
}

/*删除一个条目*/
export function deleteDealer({id}) {
  return request(`/api/admin/truck/dealer/del?id=${id}`, {method:'POST' ,headers: newHeaers()});
}

/*增加一个条目*/
export function addDealer({}) {

  return request(`/api/admin/truck/dealer/del?id=${id}`, {method:'POST' ,headers: newHeaers()});
}

/*修改一个条目*/
export function editDealer({id,name,address,phone,brand_id,pro_id,city_id}) {
  //http://121.43.96.234:9105/admin/truck/dealer/mod?id=7&name=%E9%99%86%E5%BE%B7%E9%9D%96%E5%85%AC%E5%8F%B8&address=%E9%99%86%E5%BE%B7%E9%9D%96%E5%AE%B6&phone=1895134123412&brandInfo=5&pro_id=1&city_id=1
  return request(`/api/admin/truck/dealer/mod?id=${id}&name=${name}&address=${address}&phone=${phone}&brandInfo=${brand_id}&pro_id=${pro_id}&city_id=${city_id}`, {method:'POST' ,headers: newHeaers()});
}
