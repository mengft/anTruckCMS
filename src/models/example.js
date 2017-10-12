
export default {

  namespace: 'example',

  state: {},

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

};
