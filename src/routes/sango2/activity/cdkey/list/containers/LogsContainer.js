import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import {
  fetchGenerateLog
} from '../modules/Module'
import Logs from '../components/Logs'

const mapDispatchtoProps = {
  fetchGenerateLog
}

const mapStateToProps = (state) => ({
  cdkey: state.cdkey,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Logs))
