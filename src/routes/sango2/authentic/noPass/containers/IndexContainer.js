import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import {
  fetchAuthentics,
  addAuthentic,
  delAuthentic
} from '../modules/Module'
import { fetchProductsMap } from '../../../../../modules/products'
import Index from '../components/Index'

const mapDispatchtoProps = {
  fetchAuthentics,
  addAuthentic,
  delAuthentic,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  noPass: state.noPass,
  login: state.islogin,
  products: state.products
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Index))
