import { connect } from 'react-redux'
import {
  fetchActivityLists,
  updateBatchActivity,
  deleteBatchActivity,
  syncBatchActivity
} from '../modules/Module'
import { fetchProductsMap } from '../../../../../../../modules/products'
// import { fetchGoodsMap } from '../../../../../../../modules/goods'
import Index from '../components/Index'

const mapDispatchtoProps = {
  fetchActivityLists,
  syncBatchActivity,
  updateBatchActivity,
  deleteBatchActivity,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  allTemplatesList: state.allTemplatesList,
  products: state.products,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
