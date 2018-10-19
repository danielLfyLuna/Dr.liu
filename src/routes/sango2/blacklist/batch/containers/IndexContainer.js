import { connect } from 'react-redux'
import batch from '../components/Batch'
import { injectIntl } from 'react-intl'
import { fetchProductsMap } from '../../../../../modules/products'

const mapDispatchtoProps = {
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  blacklist: state.blacklist,
  products: state.products,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(batch))
