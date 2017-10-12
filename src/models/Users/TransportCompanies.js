import * as services from '../../services/servicesTransportCompanies'
import { pageSize }  from '../../constants'

export default {

  namespace: 'transportCompanies',

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
      const data = yield call(services.fetchList, {current});
      if (data.code == 'SUCCESS') {
        let userList = data.message.rows;
        let total = data.message.records;
        yield put({type: 'updatePagination', payload: {total: total}});
        yield put({type: 'updatePaginationCurrent', payload: {current: current}});
        yield put({type: 'updateData', payload: {data: userList}});
        yield put({type: 'loading', payload: {}});
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({pathname}) => {
        if (pathname == '/transportCompanies') {
          dispatch({
            type: 'fetchList',
            payload: {}
          })
        }
      })
    },
  },

};
