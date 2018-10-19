import { connect } from 'react-redux'
import { fetchFlashSales, keepFlash } from '../modules/FlashSaleModules'
import FlashSalePage from '../components/FlashSalePage'
import { fetchProductsMap } from '../../../../../../modules/products'
const mapDispatchToProps = {
  fetchFlashSales,
  fetchProductsMap,
  keepFlash
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  products: state.products,
  flashSales: state.flashSale
})

export default connect(mapStateToProps, mapDispatchToProps)(FlashSalePage)
