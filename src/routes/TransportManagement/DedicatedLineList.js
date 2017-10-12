import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import DedicatedLineListUI from  '../../components/TransportManagement/DedicatedLineList'

function dedicatedLineState( obj ){
  return(
    <DedicatedLineListUI  {...obj} />
  )
}

function mapStateToProps(state) {
  return state.dedicatedLineState;
}


export default connect(mapStateToProps)(dedicatedLineState);
