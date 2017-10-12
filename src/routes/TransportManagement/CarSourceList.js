import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import CarSourceListUI from  '../../components/TransportManagement/CarSourceList'

function carSourceState( obj ){
  return(
    <CarSourceListUI  {...obj} />
  )
}

function mapStateToProps(state) {
  return state.carSourceListState;
}


export default connect(mapStateToProps)(carSourceState);
