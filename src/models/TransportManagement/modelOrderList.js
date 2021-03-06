import * as OrderListServices from '../../services/OrderList'
import { PAGE_SIZE } from '../../constants'
import { routerRedux } from 'dva/router';
import { warning, success, error } from '../../utils/noticeTips'

export default {
  namespace: 'orderState',

  state: {
    showModal: false, 
    showEditModal: false,
    data: [],
    changeObject: { 
      key:null,
      company:null,
      contact_name:null,
      contact_tel:null, 
      car_num:null, 
      remark:null
    },
    loading: false,
    pagination: {
      pageSize: PAGE_SIZE,
    },
  },

  reducers: {
    update(state, {payload: { data }}){
      return {...state, data: data};
    },
    loading(state, { payload: {} }) {
      return {...state, loading: !state.loading}
    },
    updatePagination(state, {payload: { total }}){
      let paginationObj = {
        total: total,
        pageSize: PAGE_SIZE,
      };
      return {...state, pagination: paginationObj};
    },
  },

  effects: {
    *fetchOrder( { payload: { current } }, {call, put}){
      yield put({type: 'loading', payload: {}});
      const data = yield call(OrderListServices.fetchOrderList, { current });
      if (data.code == 'SUCCESS') {
        data.message.rows.map((val, index) => {
          return val.key = val.id;
        });
        yield put({type: 'update', payload:{ data: data.message.rows, }});
        //更新 组件中的 pagination对象的 total参数.
        yield put({type: 'updatePagination', payload: {total: data.message.records}});

        yield put({type: 'loading', payload: {}});

      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({ pathname }) => {
        if (pathname === '/orderList') {
          dispatch({
            type: 'fetchOrder',
            payload: {
              current: 1
            }
          });
        }
      });
    },
  },

};
