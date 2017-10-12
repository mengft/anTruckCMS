import * as servicesInquiry from '../../services/servicesInquiry'
import {pageSize} from '../../constants';

export default {

  namespace: 'inquiry',

  state: {
    data: [
      /* {
       "id": 17,
       "username": "李让辉",
       "phone": "18856086281",
       "truck_info_name": "一汽解放 J6P重卡 350马力 4X2牵引车",
       "truck_info_id": 1,
       "s_city_id": 0,
       "t_city_id": 0,
       "buy_nums": 1,
       "buy_time": 1,
       "status": 0,
       "entry_date": 1501994207000
       },
       {
       "id": 16,
       "username": "张小山",
       "phone": "18356086386",
       "truck_info_name": "一汽解放 J6P重卡 标载版 350马力 4X2 LNG牵引车",
       "truck_info_id": 5,
       "s_city_id": 1,
       "t_city_id": 1,
       "buy_nums": 1,
       "buy_time": 0,
       "status": 0,
       "entry_date": 1501655241000
       },
       {
       "id": 15,
       "username": "李四",
       "phone": "18356086389",
       "truck_info_name": "一汽解放 J6P重卡 标载版 350马力 4X2 LNG牵引车",
       "truck_info_id": 5,
       "s_city_id": 1,
       "t_city_id": 1,
       "buy_nums": 1,
       "buy_time": 2,
       "status": 1,
       "entry_date": 1501579641000
       },
       {
       "id": 14,
       "username": "姜玮",
       "phone": "13912345678",
       "truck_info_name": "一汽解放 J6P重卡 350马力 4X2牵引车",
       "truck_info_id": 1,
       "s_city_id": 0,
       "t_city_id": 0,
       "buy_nums": 1,
       "buy_time": 0,
       "status": 0,
       "entry_date": 1501611246000
       },
       {
       "id": 13,
       "username": "姜玮",
       "phone": "13912345678",
       "truck_info_name": "一汽解放 J6P重卡 350马力 4X2牵引车",
       "truck_info_id": 1,
       "s_city_id": 0,
       "t_city_id": 0,
       "buy_nums": 1,
       "buy_time": 0,
       "status": 0,
       "entry_date": 1501611246000
       },
       {
       "id": 12,
       "username": "姜玮",
       "phone": "13912345678",
       "truck_info_name": "一汽解放 J6P重卡 350马力 4X2牵引车",
       "truck_info_id": 1,
       "s_city_id": 0,
       "t_city_id": 0,
       "buy_nums": 1,
       "buy_time": 0,
       "status": 0,
       "entry_date": 1501611246000
       },
       {
       "id": 11,
       "username": "张三",
       "phone": "18356086382",
       "truck_info_name": "一汽解放 J6P重卡 标载版 350马力 4X2 LNG牵引车",
       "truck_info_id": 5,
       "s_city_id": 1,
       "t_city_id": 1,
       "buy_nums": 1,
       "buy_time": 1,
       "status": 0,
       "entry_date": 1501568841000
       },
       {
       "id": 10,
       "username": "张三",
       "phone": "18356086382",
       "truck_info_name": "一汽解放 J6P重卡 标载版 350马力 4X2 LNG牵引车",
       "truck_info_id": 5,
       "s_city_id": 1,
       "t_city_id": 1,
       "buy_nums": 1,
       "buy_time": 1,
       "status": 1,
       "entry_date": 1501568841000
       }*/
    ],
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
      const data = yield call(servicesInquiry.fetchList, {current, sord});
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
      const data = yield call(servicesInquiry.operationData, payload);
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
        if (pathname == '/inquiry') {
          dispatch({
            type: 'fetchList',
            payload: {}
          })
        }
      })
    },
  },

};
