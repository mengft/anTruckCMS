import request from '../utils/request';
import newHeaers from '../utils/headers'


/*登录*/
export function login({username, password}) {
  return request(`/api/login?username=${username}&password=${password}`,{method: 'post'});
}

/*获取获取 用户信息*/
export function fetchInfo({}) {
  return request(`/api/me`,{headers:  newHeaers()});
}


/*退出方法*/
export function logout({access_token_str}) {
  return request(`/api/quit?`,{headers:  newHeaers()});
}

