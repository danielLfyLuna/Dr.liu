import { connect } from 'react-redux'
import { fetchLogConsumes, exportLogConsumes, clearLogConsumes, consumeSources, keepInitial } from './../modules/Module'

import { itemsActionCreator } from '../../../../../modules/items'
import { fetchGoodsMap } from '../../../../../modules/goods'
import { fetchProductsMap } from '../../../../../modules/products'
import Index from './../components/Index'


const mapDispatchtoProps = {
  fetchLogConsumes,
  itemsActionCreator,
  fetchGoodsMap,
  clearLogConsumes,
  exportLogConsumes,
  consumeSources,
  keepInitial,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  consume: state.consume,
  item: state.goods,
  products: state.products
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
