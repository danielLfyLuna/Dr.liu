import { connect } from 'react-redux'
import {
  fetchGameSaleOrders,
  takeGameSaleOrders,
  keepGameSale,
  fetchUsers
} from '../../index/modules/Module'
import Page from '../components/Page'

import { fetchProductsMap } from '../../../../../modules/products'
import { fetchGoodsMap } from '../../../../../modules/goods'

const mapDispatchtoProps = {
  fetchGameSaleOrders,
  takeGameSaleOrders,
  keepGameSale,
  fetchUsers,
  fetchProductsMap,
  fetchGoodsMap
}

const mapStateToProps = (state) => ({
  gamesale: state.gamesale,
  products: state.products,
  goods: state.goods,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Page)
