import * as servicesVersion from '../../services/servicesVersion'
import {pageSize} from '../../constants';

export default {

  namespace: 'version',

  state: {
    data: [],
    pagination: {
      pageSize,
      current: 1,
    },
    loading: false,
    showAddModal: false,
    showEditModal: false,
    currentVersion: {},
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
    triggerModal(state){
      return {...state, showAddModal: !state.showAddModal}
    },
    triggerEditModal(state){
      return {...state, showEditModal: !state.showEditModal}
    },
    updateCurrent(state, {payload: obj}){
      return {...state, currentVersion: obj}
    },
  },

  effects: {
    *fetchList({ payload: {current, sord} }, { call, put }) {
      yield put({type: 'loading', payload: {}});
      const data = yield call(servicesVersion.fetchList, {current, sord});
      if (data.code == 'SUCCESS') {
        let userList = data.message.rows;
        let total = data.message.records;
        yield put({type: 'updatePagination', payload: {total: total}});
        yield put({type: 'updatePaginationCurrent', payload: {current: current}});
        yield put({type: 'updateData', payload: {data: userList}});
        yield put({type: 'loading', payload: {}});
      }
    },
    *operationData({payload}, {call, put}){
      console.log(payload);
      const data = yield call(servicesVersion.operationData, payload);
      if (data.code == 'SUCCESS') {
        yield put({
          type: 'fetchList',
          payload: {
            current: payload.current,
          }
        });
      }
    },

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({pathname}) => {
        if (pathname == '/version') {
          dispatch({
            type: 'fetchList',
            payload: {}
          })
        }
      })
    },
  },

};
