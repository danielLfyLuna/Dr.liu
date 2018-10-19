import { connect } from 'react-redux'
import { keepInitial, fetchLogProduces, exportLogProduces, clearLogProduces, produceSources } from './../modules/Module'

import { itemsActionCreator } from '../../../../../modules/items'
import { fetchGoodsMap } from '../../../../../modules/goods'
import Index from './../components/Index'
import { fetchProductsMap } from '../../../../../modules/products'


const mapDispatchtoProps = {
  fetchLogProduces,
  itemsActionCreator,
  exportLogProduces,
  clearLogProduces,
  produceSources,
  fetchGoodsMap,
  keepInitial,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  produce: state.produce,
  item: state.goods,
  products: state.products
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
