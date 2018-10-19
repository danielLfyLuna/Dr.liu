import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import { addAllianceMail } from '../modules/Module'
import Add from '../components/Add'


const mapDispatchtoProps = {
  addAllianceMail
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  allianceMail: state.allianceMail
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Add))
