import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { fetchProductsMap } from '../../../../../modules/products'
import {
  fetchSEN,
  clearSEN,
  addSEN,
  syncSEN
} from './../modules/Module'
import Index from './../components/Index'


const mapDispatchtoProps = {
  fetchSEN,
  clearSEN,
  addSEN,
  syncSEN,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  sensitive: state.sensitive,
  products: state.products
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Index))
