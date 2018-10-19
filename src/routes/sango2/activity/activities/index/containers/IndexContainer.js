import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import {
  fetchActivities,
  clearActivities,
  switchActivity,
  updateActivity,
  fetchConfigure,
  updateGroupBuy,
  keepActivities
} from '../modules/Module'
import Index from '../components/Index'
import { fetchProductsMap } from '../../../../../../modules/products'

const mapDispatchtoProps = {
  fetchActivities,
  clearActivities,
  switchActivity,
  updateActivity,
  fetchConfigure,
  updateGroupBuy,
  fetchProductsMap,
  keepActivities
}

const mapStateToProps = (state) => ({
  activities: state.activities,
  products: state.products,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Index))
