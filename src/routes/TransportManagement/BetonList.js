import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import BetonListUI from  '../../components/TransportManagement/BetonList'

function betonState( obj ){
  return(
    <BetonListUI  {...obj} />
  )
}

function mapStateToProps(state) {
  return state.betonState;
}


export default connect(mapStateToProps)(betonState);
