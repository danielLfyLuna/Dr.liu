import { connect } from 'react-redux'
import { fetchProducts, clearProducts, createProduct, reloadProduct, updateProduct } from '../modules/Module'
import Index from '../components/Index'

const mapDispatchtoProps = {
  fetchProducts,
  clearProducts,
  createProduct,
  reloadProduct,
  updateProduct
}

const mapStateToProps = (state) => ({
  product: state.product,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
