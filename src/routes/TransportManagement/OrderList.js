import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import OrderListUI from  '../../components/TransportManagement/OrderList'

function orderState( obj ){
  return(
    <OrderListUI  {...obj} />
  )
}

function mapStateToProps(state) {
  return state.orderState;
}


export default connect(mapStateToProps)(orderState);
