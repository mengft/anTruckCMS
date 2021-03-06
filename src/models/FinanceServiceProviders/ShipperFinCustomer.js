import * as FinanceCProvidersInformationServices from '../../services/ShipperFinCustomer'
import { PAGE_SIZE } from '../../constants'
import { routerRedux } from 'dva/router';
import { warning, success, error } from '../../utils/noticeTips'

export default {
  namespace: 'shipperFinCustomerInformation',

  state: {
    showModal: false,
    showEditModal: false,
    data: [],
    changeObject: {
      key:null,
      company:null,
      contact_name:null,
      contact_tel:null, 
      car_num:null, 
      remark:null
    },
    pagination: {
      pageSize: PAGE_SIZE,
    },
    currentUserInfo:''
  },

  reducers: {
    update(state, {payload: { data }}){
      return {...state, data: data};
    },
    updatePagination(state, {payload: { total }}){
      let paginationObj = {
        total: total,
        pageSize: PAGE_SIZE,
      };
      return {...state, pagination: paginationObj};
    },
    handleEdit(state, {payload: { insuranceCustomer, index }}){
      return {...state, showEditModal: !state.showEditModal, changeObject: insuranceCustomer};
    },
    handleEditCancel(state){
      return {...state, showEditModal: !state.showEditModal};
    },
    triggerModal(state){
      return {...state, showModal: !state.showModal}
    },
    handleOk(state){
      return state;
    },
    //更新当前用户信息
    updateCurrentUserInfo(state, { payload: { currentUserInfo } }){
      return {...state, currentUserInfo: currentUserInfo};
    },

  },

  effects: {
    *fetch( { payload: { current ,userInfo} }, {call, put}){
      const data = yield call(FinanceCProvidersInformationServices.fetchInformation, { current:current,userInfo:userInfo });
      if (data.code == 'SUCCESS') {
        data.message.rows.map((val, index) => {
          return val.key = val.id;
        });
        yield put({type: 'update', payload:{ data: data.message.rows, }});
        //更新 组件中的 pagination对象的 total参数.
        yield put({type: 'updatePagination', payload: {total: data.message.records}});

      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }
    },
    *handleCustomerInformation( { payload: object }, {call, put}) {
      if(object.type == 'add' || object.type === 'edit'){
         const data = yield call(FinanceCProvidersInformationServices.addCustomer, object);
         if (data.code == 'SUCCESS') {
            if (object.type == 'add') {
              success('数据添加成功!');
              yield put({type: 'triggerModal'});
            } else if (object.type === 'edit') {
              success('修改数据!');
              yield put({type: 'handleEditCancel'});
            }
            yield put({
              type: 'fetch',
              payload: {
                current: 1
              }
            });
          } else {
            if (data.error == 'invalid_token') {
              error('权限过期,请重新登录!');
              yield put(routerRedux.push('/login'));
            }
          }
      }else{
        const data = yield call(FinanceCProvidersInformationServices.delCustomer, object);
        if (data.code == 'SUCCESS') {
            success('数据删除成功!');
            yield put({
              type: 'fetch',
              payload: {
                current: 1
              }
            });
          } else {
            if (data.error == 'invalid_token') {
              error('权限过期,请重新登录!');
              yield put(routerRedux.push('/login'));
            }
          }
      }
     
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({ pathname }) => {
        if (pathname == '/shipperFinCustomer') {
          dispatch({
            type: 'fetch',
            payload: {
              current: 1
            }
          });
        }
      });
    },
  },

};




