import * as accountService from '../services/servicesAccount';
import { hashHistory } from 'dva/router';
import { success, error } from '../utils/noticeTips'

export default {
  namespace: 'account',

  state: {
    loading: false,
    confirmDirty: false,
    current: 0,
    selectData: [],
  },

  reducers: {
    loading(state) {
      return {...state, loading: !state.loading};
    },
    setConfirmDirty(state,{ payload: {value,callback} }){
      if (isNaN(value) || value.length < 6 || value.length > 11 ) {
        callback('密码长度为6-10位');
      }
      callback();

      return {...state, confirmDirty: value };
    },
    checkPassword(state,{ payload: {value,callback} }){
      if (value && (value !== state.confirmDirty)) {
        callback('两次密码输入不相同');
      } else {
        callback();
      }
      return state;
    },
    changeSelectData(state, { payload: {selectDataSource}}){
      return {...state, selectData: selectDataSource };
    },
  }

  ,

  effects: {
    *login({ payload: { username, password} }, { call, put }) {
      yield put({type: 'loading'});
      const data = yield call(accountService.login, {username, password});
      if (data.code === 'SUCCESS') {
        success('登录成功!');
        yield put({type: 'loading'});
        localStorage.setItem('access_token', data.message.access_token);
        localStorage.setItem('login_status', true);
        localStorage.setItem('refresh_token', data.message.refresh_token);
        localStorage.setItem('username', username);
        hashHistory.push('/index');
      } else {
        error('登录失败!');
        yield put({type: 'loading'});
      }
      const data2 = yield call(accountService.fetchInfo, {});
      if (data2.code === 'SUCCESS') {
        let info = data2.message;
        delete info.authorities;
        localStorage.setItem('userInfo', JSON.stringify(info));
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }){
      /*history.listen(({ pathname }) => {
        if (pathname === '/register') {
          dispatch({ type: 'findAllRoles'});
        }
      })*/
    }
  },
};







