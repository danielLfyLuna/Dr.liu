import { connect } from 'react-redux'
import { fetchGameSalePlayers, clearPlayers, fetchManagerPlayer, updateGameSalePlayer, keepGameSale } from '../modules/Module'
import Index from '../components/Index'

import { fetchProductsMap } from '../../../../../modules/products'

const mapDispatchtoProps = {
  fetchGameSalePlayers,
  clearPlayers,
  fetchManagerPlayer,
  updateGameSalePlayer,
  keepGameSale,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  gamesale: state.gamesale,
  products: state.products,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
