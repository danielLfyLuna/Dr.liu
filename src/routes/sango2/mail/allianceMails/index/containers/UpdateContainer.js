import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import { clearUpdate, updateAllianceEmail } from './../modules/Module'

import Update from './../components/Update'

const mapDispatchtoProps = {
  clearUpdate,
  updateAllianceEmail
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  allianceMail: state.allianceMail
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Update))
