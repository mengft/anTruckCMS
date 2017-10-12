import * as services from '../../services/servicesBindVehicle'
import {PAGE_SIZE} from '../../constants';
import {success, error} from '../../utils/noticeTips';

export default {
  namespace: 'bindVehicle',
  state: {
    data: [],
    pagination: {
      pageSize: PAGE_SIZE,
      current: 1,
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
    *fetchList({ payload: {current, sord} }, { call, put }) {
      yield put({type: 'loading', payload: {}});
      const data = yield call(services.fetchList, {current, sord});
      if (data.code == 'SUCCESS') {
        let userList = data.message.rows;
        let total = data.message.records;
        yield put({type: 'updatePagination', payload: {total: total}});
        yield put({type: 'updatePaginationCurrent', payload: {current: current}});
        yield put({type: 'updateData', payload: {data: userList}});
        yield put({type: 'loading', payload: {}});
      }
    },
    *deleteItem({payload:{id, current}}, {call, put}) {
      const data = yield call(services.deleteItem, {id});
      if (data.code == 'SUCCESS') {
        success(data.message);
        yield put({
          type: 'fetchList',
          payload: {
            current: current,
          }
        });
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({pathname}) => {
        if (pathname == '/bindVehicle') {
          dispatch({
            type: 'fetchList',
            payload: {
              current: 1
            }
          })
        }
      })
    },
  },

};
