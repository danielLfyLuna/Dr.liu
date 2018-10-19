import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import {
  newCreateActivity,
  clearTemplateCreate
} from '../../index/modules/Module'
import Create from '../components/Create'

const mapDispatchtoProps = {
  newCreateActivity,
  clearTemplateCreate
}

const mapStateToProps = (state) => ({
  activities: state.activities,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Create))
