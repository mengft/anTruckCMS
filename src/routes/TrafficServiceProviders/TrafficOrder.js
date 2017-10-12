import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import InsuranceComponent from  '../../components/TrafficServiceProviders/TrafficOrder'

function trafficOrderInformation( obj ){
  return(
    <InsuranceComponent  {...obj} />
  )
}

function mapStateToProps(state) {
  return state.trafficOrderInformation;
}


export default connect(mapStateToProps)(trafficOrderInformation);
