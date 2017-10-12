import * as servicesDealers from '../../services/servicesDealers'
import {pageSize} from '../../constants'
import { success, error } from '../../utils/noticeTips'
import {options} from '../../utils/region'


export default {

  namespace: 'dealers',

  state: {
    data: [],
    pagination: {
      pageSize,
      current: 1,
    },
    loading: false,
    showAddModal: false,
    showEditModal: false,
    cascaderOptions: JSON.parse(options),
    currentDealer: {},
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
      return {...state, currentDealer: obj}
    },

  },

  effects: {
    *fetchList({ payload: {current, needOpenEdit} }, { call, put }) {
      yield put({type: 'loading', payload: {}});
      const data = yield call(servicesDealers.fetchList, {current});
      if (data.code == 'SUCCESS') {
        let userList = data.message.rows;
        let total = data.message.records;
        yield put({type: 'updatePagination', payload: {total: total}});
        yield put({type: 'updatePaginationCurrent', payload: {current: current}});
        yield put({type: 'updateData', payload: {data: userList}});
        yield put({type: 'loading', payload: {}});
      }
      if (needOpenEdit == true) {
        yield put({type: 'triggerEditModal', payload: {}});
      }
    },
    *deleteDealer({payload:{id}}, {call, put}) {
      const data = yield call(servicesDealers.deleteDealer, {id});
      if (data.code == 'SUCCESS') {
        success(data.message);
      }
    },
    *addDealers({payload}, {call, put}) {
      const data = yield call(servicesDealers.addDealer, payload );
    },
    *editDealer({payload}, {call, put}) {
      console.log('进来了');
      const data = yield call(servicesDealers.editDealer, payload );
      if (data.code == 'SUCCESS') {
        yield put({type:'fetchList', payload: {needOpenEdit: true,}});
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({pathname}) => {
        if (pathname == '/dealers') {
          dispatch({
            type: 'fetchList',
            payload: {}
          })
        }
      })
    },
  },

};
