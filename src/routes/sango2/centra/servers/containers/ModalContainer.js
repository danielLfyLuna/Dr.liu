import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { fetchCellsMap } from '../modules/Module'
import Modal from '../components/Modal'
import { fetchProductsMap } from '../../../../../modules/products'

const mapDispatchtoProps = {
  fetchCellsMap,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  server: state.server,
  products: state.products,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Modal))
