import * as servicesStatistics from '../../services/servicesStatistics'


export default {

  namespace: 'statistics',

  state: {
    data: [],
  },

  reducers: {
	updateData(state, {payload: { data}}){
      return {...state, data: data}
	},
	loading(state, { payload: {} }){
      return {...state, loading: !state.loading}
    },
  },

  effects: {
	*fetchUserCount({ payload}, { call, put }) {
      yield put({type: 'loading', payload: {}});
      const data = yield call(servicesStatistics.fetchUserCount, {});
	  const message = data.message;
      if (data.code == 'SUCCESS') {
        yield put({type: 'updateData', payload: {data: message}});
        yield put({type: 'loading', payload: {}});
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({pathname}) => {
        if (pathname == '/statistics') {
          dispatch({
            type: 'fetchUserCount',
            payload: {}
          })
        }
      })
    },
  },

};
