import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import {
  fetchAuthentics,
  addAuthentic,
  delAuthentic
} from '../modules/Module'
import Index from '../components/Index'

const mapDispatchtoProps = {
  fetchAuthentics,
  addAuthentic,
  delAuthentic
}

const mapStateToProps = (state) => ({
  authentic: state.authentic,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Index))
