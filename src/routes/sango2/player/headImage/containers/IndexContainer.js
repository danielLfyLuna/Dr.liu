import { connect } from 'react-redux'
import { clearHeadImage, fetchHeadImage, banHeadImage, passHeadImage } from '../modules/Module'
import { fetchProductsMap } from '../../../../../modules/products'
import Index from '../components/Index'

const mapDispatchtoProps = {
  clearHeadImage,
  fetchHeadImage,
  fetchProductsMap,
  banHeadImage,
  passHeadImage
}

const mapStateToProps = (state) => ({
  products: state.products,
  headImage: state.headImage,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
