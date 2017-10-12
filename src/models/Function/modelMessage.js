import * as servicesMessage from '../../services/servicesMessage'
import {pageSize} from '../../constants';

export default {

  namespace: 'message',

  state: {
    data: [
      /*{
        "id": 13,
        "title": "测试",
        "msg": "测试消息7",
        "userid": "all",
        "channelid": "all",
        "device_type": 3,
        "msg_type": 1,
        "entry_date": "2017-06-06 14:34:43"
      },
      {
        "id": 12,
        "title": "测试",
        "msg": "测试消息6",
        "userid": "all",
        "channelid": "all",
        "device_type": 3,
        "msg_type": 1,
        "entry_date": "2017-06-06 14:34:39"
      },
      {
        "id": 11,
        "title": "测试",
        "msg": "测试消息5",
        "userid": "all",
        "channelid": "all",
        "device_type": 3,
        "msg_type": 1,
        "entry_date": "2017-06-06 14:34:36"
      },
      {
        "id": 10,
        "title": "测试",
        "msg": "测试消息4",
        "userid": "all",
        "channelid": "all",
        "device_type": 3,
        "msg_type": 1,
        "entry_date": "2017-06-06 14:34:33"
      },
      {
        "id": 9,
        "title": "测试",
        "msg": "测试消息3",
        "userid": "all",
        "channelid": "all",
        "device_type": 3,
        "msg_type": 1,
        "entry_date": "2017-06-06 14:34:30"
      },
      {
        "id": 8,
        "title": "测试",
        "msg": "测试消息2",
        "userid": "all",
        "channelid": "all",
        "device_type": 3,
        "msg_type": 1,
        "entry_date": "2017-06-06 14:34:27"
      },
      {
        "id": 7,
        "title": "测试",
        "msg": "测试消息1",
        "userid": "all",
        "channelid": "all",
        "device_type": 3,
        "msg_type": 1,
        "entry_date": "2017-06-06 14:34:23"
      },
      {
        "id": 6,
        "title": "测试",
        "msg": "收到了a?",
        "userid": "all",
        "channelid": "all",
        "device_type": 3,
        "msg_type": 1,
        "entry_date": "2017-06-06 14:28:20"
      }*/
    ],
    pagination: {
      pageSize,
      current: 1,
    },
    loading: false,
    showAddModal: false,
    showEditModal: false,
    currentMessage: {},
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
      return {...state, currentMessage: obj}
    },
  },

  effects: {
    *fetchList({ payload: {current, sord} }, { call, put }) {
      yield put({type: 'loading', payload: {}});
      const data = yield call(servicesMessage.fetchList, {current, sord});
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
      const data = yield call(servicesMessage.operationData, payload);
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
        if (pathname == '/message') {
          dispatch({
            type: 'fetchList',
            payload: {}
          })
        }
      })
    },
  },

};
