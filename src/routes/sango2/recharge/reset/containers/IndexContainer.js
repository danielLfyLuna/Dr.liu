import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { fetchProductsMap } from '../../../../../modules/products'
import {
  fetchRechargeReset,
  clearReset
} from './../modules/Module'
import Index from './../components/Index'


const mapDispatchtoProps = {
  fetchRechargeReset,
  clearReset,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  rechargeReset: state.rechargeReset,
  products: state.products
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Index))
