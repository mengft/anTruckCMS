import * as servicesBrands from '../../services/servicesBrands'
import { success, error } from '../../utils/noticeTips'
let pageSize = 4;

export default {

  namespace: 'brands',

  state: {
    data: [],
    pagination: {
      current: 1,
      pageSize,
    },
    loading: false,
  },

  reducers: {
    updateData(state, { payload: {data} }) {
      return {...state, data: data};
    },
    updatePagination(state, { payload: {total} }) {
      let tmp = Object.assign(state.pagination, {total});
      return {...state, pagination: tmp};
    },
    updatePaginationCurrent(state, { payload: {current} }) {
      let tmp = Object.assign(state.pagination, {current});
      return {...state, pagination: tmp};
    },
    loading(state, { payload: {} }){
      return {...state, loading: !state.loading}
    },
  },

  effects: {
    *fetchList( { payload: {current}}, { call, put }) {
      yield put({type: 'loading', payload: {}});
      const data = yield call(servicesBrands.fetchList, {current});
      if (data.code == 'SUCCESS') {
        let userList = data.message.rows;
        let total = data.message.records;
        yield put({type: 'updatePagination', payload: {total: total}});
        yield put({type: 'updatePaginationCurrent', payload: {current: current}});
        yield put({type: 'updateData', payload: {data: userList}});
        yield put({type: 'loading', payload: {}});
      }
    },
    *deleteBrand({payload:{id}}, {call, put}) {
      const data = yield call(servicesBrands.deleteBrand, {id});
      if (data.code == 'SUCCESS') {
        success(data.message);
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({pathname}) => {
        if (pathname == '/brands') {
          dispatch({
            type: 'fetchList',
            payload: {}
          })
        }
      })
    },
  },

};
