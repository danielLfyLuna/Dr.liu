import { connect } from 'react-redux'
import {
  fetchTemplates,
  sendBatch
} from '../modules/Module'
import { fetchProductsMap } from '../../../../../../../modules/products'
// import { fetchGoodsMap } from '../../../../../../../modules/goods'
import Page from '../components/Page'

const mapDispatchtoProps = {
  fetchTemplates,
  fetchProductsMap,
  sendBatch
}

const mapStateToProps = (state) => ({
  allTemplates: state.allTemplates,
  products: state.products,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Page)
