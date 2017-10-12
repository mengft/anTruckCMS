import request from '../utils/request';
import newHeaers from '../utils/headers'
/*获取列表*/
export function fetchUserCount({}) {

  return request(`/api/admin/statistics/registerUser/count`, {headers: newHeaers()});
}


