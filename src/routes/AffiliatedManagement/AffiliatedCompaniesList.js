import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import AffiliatedCompaniesListUI from  '../../components/AffiliatedManagement/AffiliatedCompaniesList'

function affiliatedComponentListState( obj ){
  return(
    <AffiliatedCompaniesListUI  {...obj} />
  )
}

function mapStateToProps(state) {
  return state.affiliatedComponentListState;
}


export default connect(mapStateToProps)(affiliatedComponentListState);
