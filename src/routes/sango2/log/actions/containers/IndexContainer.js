import { connect } from 'react-redux'

import { keepInitial, fetchLogActions, exportLogActions, clearLogActions, fetchOperationType, fetchConsumeSources, fetchProduceSources } from './../modules/Module'
import Index from './../components/Index'
import { fetchProductsMap } from '../../../../../modules/products'


const mapDispatchtoProps = {
  fetchLogActions,
  exportLogActions,
  clearLogActions,
  fetchOperationType,
  fetchConsumeSources,
  fetchProduceSources,
  keepInitial,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  action: state.action,
  products: state.products
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
