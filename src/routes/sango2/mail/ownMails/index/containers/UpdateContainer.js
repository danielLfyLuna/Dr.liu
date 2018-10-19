import { connect } from 'react-redux'

import { clearUpdate, updateOwnMail } from './../modules/Module'

import Update from './../components/Update'

const mapDispatchtoProps = {
  clearUpdate,
  updateOwnMail
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  ownMail: state.ownMail
})

export default connect(mapStateToProps, mapDispatchtoProps)(Update)
