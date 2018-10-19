import { connect } from 'react-redux'
import { fetchTrades, clearTrades, checkTrade, keepTrade, exportTrade } from '../modules/Module'
import { fetchTradeGoods } from '../modules/GoodsModule'
import Index from '../components/Index'

import { fetchGoodsMap } from '../../../../../modules/goods'
import { fetchProductsMap } from '../../../../../modules/products'

const mapDispatchtoProps = {
  fetchTrades,
  clearTrades,
  checkTrade,
  keepTrade,
  exportTrade,
  fetchGoodsMap,
  fetchTradeGoods,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  trade: state.trade,
  goods: state.goods,
  tradeGoods: state.tradeGoods,
  products: state.products,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
