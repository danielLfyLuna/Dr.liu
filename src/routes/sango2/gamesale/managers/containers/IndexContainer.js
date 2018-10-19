import { connect } from 'react-redux'
import {
  fetchGameSaleManagers,
  createGameSaleManager,
  updateGameSaleManager,
  deleteGameSaleManager,
  // fetchManagerPlayer,
  keepGameSale,
  fetchUsers
} from '../../index/modules/Module'
import Page from '../components/Page'

import { fetchProductsMap } from '../../../../../modules/products'

const mapDispatchtoProps = {
  fetchGameSaleManagers,
  createGameSaleManager,
  updateGameSaleManager,
  deleteGameSaleManager,
  // fetchManagerPlayer,
  keepGameSale,
  fetchUsers,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  gamesale: state.gamesale,
  products: state.products,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Page)
