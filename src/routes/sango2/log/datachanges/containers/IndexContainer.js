import { connect } from 'react-redux'
import { keepInitial, fetchDatachange, exportDatachange, datachangeSources, clearDatachange } from './../modules/Module'

import { itemsActionCreator } from '../../../../../modules/items'
import { fetchGoodsMap } from '../../../../../modules/goods'
import Index from './../components/Index'
import { fetchProductsMap } from '../../../../../modules/products'


const mapDispatchtoProps = {
  clearDatachange,
  fetchDatachange,
  exportDatachange,
  datachangeSources,
  itemsActionCreator,
  fetchGoodsMap,
  keepInitial,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  datachange: state.datachange,
  item: state.goods,
  products: state.products
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
