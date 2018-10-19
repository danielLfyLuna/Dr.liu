import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { fetchOrders, orderExport, orderRepair, keepRecharge } from '../../index/modules/Module'
import Page from '../components/Page'

import { fetchProductsMap } from '../../../../../modules/products'

const mapDispatchtoProps = {
  fetchOrders,
  orderExport,
  orderRepair,
  keepRecharge,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  recharge: state.recharge,
  products: state.products,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Page))
