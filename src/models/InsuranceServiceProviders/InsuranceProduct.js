import * as InsuranceProvidersInformationServices from '../../services/InsuranceProduct'
import { PAGE_SIZE } from '../../constants'
import { routerRedux } from 'dva/router';
import { warning, success, error } from '../../utils/noticeTips';
import {cities as citys} from '../../utils/region'

export default {
  namespace: 'insuranceProductInformation',

  state: { 
    showModal: false,
    showEditModal: false,
    data: [],
    pagination: {
      pageSize: PAGE_SIZE,
    },
    cascaderOptions: [],
    currentCity: '',
    currentCarType: '',
    currentProvince: '',
    currentPage:'',
    currentCompany:'',
    provinces:[],
    cities:[],
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
    handleEdit(state, {payload: { insuranceProduct, cityOptions }}){
      return {...state, showEditModal: !state.showEditModal, changeObject: insuranceProduct,cities:cityOptions};
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
    isAllFun(state){
      let result = false;
      if (state.addItemObject.name !== null && state.addItemObject.name !== null) {
        result = true;
      }
      return {...state, isAll: result};
    },
 

    //更新城市
    updateCities(state, {payload: {  value }}){
      let cityes = new Array();
      citys.map(function(v){

          if(v.pro_id == value){
              cityes.push(v);
          }
        })
        
      return {...state, cities: cityes}
    },

    //更新当前城市
    updateCurrentCity(state, { payload: { currentCity } }){
      return {...state, currentCity: currentCity};
    },
    //更新当前省份
    updateCurrentProvince(state, { payload: { currentProvince } }){
      return {...state, currentProvince: currentProvince};
    },
    //更新当前车辆类型
    updateCurrentCarType(state, { payload: { currentCarType } }){
      return {...state, currentCarType: currentCarType};
    },
     //更新当前城市
    updateCurrentCompany(state, { payload: { currentCompany } }){
      return {...state, currentCompany: currentCompany};
    },
    //更新当前页码
    updateCurrentPage(state, { payload: { currentPage } }){
      return {...state, currentPage: currentPage};
    },
    //更新当前用户信息
    updateCurrentUserInfo(state, { payload: { currentUserInfo } }){
      return {...state, currentUserInfo: currentUserInfo};
    },
  },

  effects: {
    *fetch( { payload: { current,car_type,province_id,city_id,insurance_company,isInsurance,userInfo } }, {call, put}){
      if(isInsurance != 0 || isInsurance != "0" ){
        isInsurance=1;
      }
      const data = yield call(InsuranceProvidersInformationServices.fetchInsuranceInformation, { current:current,car_type:car_type,province_id:province_id,city_id:city_id,insurance_company:insurance_company,isInsurance:isInsurance,userInfo:userInfo });
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
    *handleInsuranceProductInformation( { payload: object }, {call, put}) {
      if(object.type === 'xj'){
        const data = yield call(InsuranceProvidersInformationServices.offSaleInsuranceProduct, object);
        if (data.code == 'SUCCESS') {
            success('下架成功!');
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
        const data = yield call(InsuranceProvidersInformationServices.delInsuranceProduct, object);
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
        if (pathname == '/insuranceProducts') {
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




