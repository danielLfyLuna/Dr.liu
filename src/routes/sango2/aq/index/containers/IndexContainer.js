import { connect } from 'react-redux'
import { fetchProductsMap } from '../../../../../modules/products'
import {
  fetchAQ,
  addAQ,
  deleteAQ,
  updateAQ
} from './../modules/Module'
import Index from './../components/Index'


const mapDispatchtoProps = {
  fetchAQ,
  addAQ,
  deleteAQ,
  updateAQ,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  aq: state.aq,
  products: state.products
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
