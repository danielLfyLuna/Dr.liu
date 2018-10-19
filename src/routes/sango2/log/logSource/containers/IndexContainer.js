import { connect } from 'react-redux'

import { fetchLog } from '../modules/Module'
import Index from '../components/Index'
import { fetchProductsMap } from '../../../../../modules/products'


const mapDispatchtoProps = {
  fetchProductsMap,
  fetchLog
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  logSource: state.logSource,
  products: state.products
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
