import { connect } from 'react-redux'
import {
  fetchBlacklist,
  clearBlacklist,
  removeBlacklist,
  keepBlacklist
} from '../modules/Module'
import Index from '../components/Index'

import { fetchProductsMap } from '../../../../../modules/products'

const mapDispatchtoProps = {
  fetchBlacklist,
  clearBlacklist,
  removeBlacklist,
  keepBlacklist,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  blacklist: state.blacklist,
  products: state.products,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
