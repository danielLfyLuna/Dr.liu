import { connect } from 'react-redux'
import { fetchSync, keepSync } from './../modules/SyncModules'
import { fetchProductsMap } from '../../../../../modules/products'
import SyncPage from './../components/SyncPage'

const mapDispatchtoProps = {
  fetchProductsMap,
  fetchSync,
  keepSync
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  products: state.products,
  sync: state.sync
})

export default connect(mapStateToProps, mapDispatchtoProps)(SyncPage)
