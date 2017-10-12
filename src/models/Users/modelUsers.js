import * as servicesUsers from '../../services/servicesUsers'
import {pageSize} from '../../constants'

export default {

  namespace: 'users',

  state: {
    data: [],
    expandedDataArray: {},
    pagination: {
      pageSize,
    },
   // expandedPaginationArray: {},
    loading: false,
  },

  reducers: {
    updateData(state, { payload: {data} }) {
      return {...state, data: data};
    },
    loading(state, {payload: {}}){
      return {...state, loading: !state.loading }
    },
    updatePagination(state, { payload: {total} }) {
      let tmp = Object.assign( state.pagination , {total});
      return {...state, pagination: tmp};
    },
    initExpandedDataArray(state, {payload:{userid, content}}){
      var tmp = Object.assign({}, state.expandedDataArray);
      tmp[userid] = content;
      return {...state, expandedDataArray: tmp};
    },
   /* updateExpandedPaginationArray(state, {payload: {userid, total}}){
      var tmp = Object.assign({}, state.expandedPaginationArray);
      tmp[userid] = {
        total: total,
        pageSize: 3,
      };
      return {...state};
    },*/

  },

  effects: {
    *fetchUsersList({ payload:{current} }, { call, put }) {
      yield put({type: 'loading',payload:{}});
      const data = yield call( servicesUsers.fetchUsersList ,{current});
      if (data.code == 'SUCCESS') {
        let userList = data.message.rows;
        let total = data.message.records;
        yield put({type: 'updatePagination', payload:{total: total}});
        yield put({type: 'updateData', payload:{data: userList}});
        yield put({type: 'loading',payload:{}});
      }
      yield put({type: 'initExpandedDataArray', payload:{}});
    },
    *fetchExpandedData({payload:{userid, current}}, {call, put}) {
      const data = yield call( servicesUsers.fetchExpandedData ,{userid, current});
      if (data.code == 'SUCCESS') {
        let content = data.message.rows;
        //let total = data.message.records;
        //yield put({type: 'initExpandedDataArray', payload:{userid, total}});
        yield put({type: 'initExpandedDataArray', payload:{userid, content}});
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({pathname}) => {
        if (pathname == '/anTruckUsers') {
          dispatch({
            type: 'fetchUsersList',
            payload:{},
          });
        }
      });
    },
  },

};
