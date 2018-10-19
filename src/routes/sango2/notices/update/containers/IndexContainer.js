import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { fetchProductsMap } from '../../../../../modules/products'
import { fetchNoticesUpdate, keepUpdate } from './../modules/Module'
import Index from './../components/Index'

const mapDispatchtoProps = {
  fetchNoticesUpdate,
  fetchProductsMap,
  keepUpdate
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  notice: state.updateNotice,
  products: state.products
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Index))
