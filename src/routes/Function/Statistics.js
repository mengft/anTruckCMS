import { connect } from 'dva'

import UserCountComponent from '../../components/Function/UserCountComponent'

function Statistic(obj) {
	
	return (
		<UserCountComponent {...obj}/>
	)
}

function mapStateToProps(state) {
  return state.statistics
}

export default connect(mapStateToProps)(Statistic);
