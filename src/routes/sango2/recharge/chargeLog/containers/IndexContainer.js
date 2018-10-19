import { connect } from 'react-redux'
import { getChargeLog, exportChargeLog } from '../modules/Module'
import Index from '../components/Index'

const mapDispatchtoProps = {
  getChargeLog,
  exportChargeLog
}

const mapStateToProps = (state) => ({
  chargeLog: state.chargeLog,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
