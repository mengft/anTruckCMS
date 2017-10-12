import * as services from '../../services/servicesCarSources'
import { success, error } from '../../utils/noticeTips'
let pageSize = 4;

export default {

  namespace: 'carSources',

  state: {
    data: [
     /* {
        "id": 2867,
        "name": "解放 麟V 154马力 6.2米排半栏板载货车底盘",
        "logo": "http://static.xctruck.com/truckinfoimgs/592ab22ecee0244f01a492e6.jpg",
        "low_price": null,
        "high_price": null,
        "brand_id": 1182,
        "series_id": 0,
        "tags": "福田康明斯 国五 6.2米 核载:7.995吨",
        "entry_date": 1495970350000,
        "source_url": "https://product.m.360che.com/m146/36641_index.html",
        "s_name": "载货车",
        "status": 0
      },
      {
        "id": 2866,
        "name": "解放 麟V中卡 130马力 4X2 6.2米排半厢式载货车",
        "logo": "http://static.xctruck.com/truckinfoimgs/592ab22ecee0244f01a492e5.jpg",
        "low_price": null,
        "high_price": null,
        "brand_id": 1182,
        "series_id": 0,
        "tags": "锡柴 国四 6.2米 核载:7.995吨",
        "entry_date": 1495970350000,
        "source_url": "https://product.m.360che.com/m74/18500_index.html",
        "s_name": "载货车",
        "status": 0
      },
      {
        "id": 2865,
        "name": "解放 麟V中卡 160马力 4X2 6.2米仓栅式载货车",
        "logo": "http://static.xctruck.com/truckinfoimgs/592ab22dcee0244f01a492e4.jpg",
        "low_price": null,
        "high_price": null,
        "brand_id": 1182,
        "series_id": 0,
        "tags": "",
        "entry_date": 1495970349000,
        "source_url": "https://product.m.360che.com/m150/37666_index.html",
        "s_name": "载货车",
        "status": 0
      }*/
    ],
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
    *fetchList({ payload: {current}}, { call, put }) {
      yield put({type: 'loading', payload: {}});
      const data = yield call(services.fetchList, {current});
      if (data.code == 'SUCCESS') {
        let userList = data.message.rows;
        console.log(userList);
        userList.map(val => {
          let nameArray = val.name.split(' ');
          console.log(nameArray);
          let tmp = val;
          tmp.brandName = nameArray[0];
          tmp.engine = nameArray[1];
          tmp.horsepower = nameArray[2];
          tmp.brandName = nameArray[0];
          tmp.brandName = nameArray[0];
        });
        let total = data.message.records;
        yield put({type: 'updatePagination', payload: {total: total}});
        yield put({type: 'updatePaginationCurrent', payload: {current: current}});
        yield put({type: 'updateData', payload: {data: userList}});
        yield put({type: 'loading', payload: {}});
      }
    },
    *deleteBrand({payload:{id}}, {call, put}) {
      const data = yield call(services.deleteBrand, {id});
      if (data.code == 'SUCCESS') {
        success(data.message);
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({pathname}) => {
        if (pathname == '/carSource') {
          dispatch({
            type: 'fetchList',
            payload: {}
          })
        }
      })
    },
  },

};
