import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { fetchMaintenanceTip, updateMaintenanceTip } from '../modules/Module'
import { fetchProductsMap } from '../../../../../modules/products'

import Index from '../components/Index'

const mapDispatchtoProps = {
  fetchProductsMap,
  fetchMaintenanceTip,
  updateMaintenanceTip
}

const mapStateToProps = (state) => ({
  products: state.products,
  maintenanceTip: state.maintenanceTip,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Index))
