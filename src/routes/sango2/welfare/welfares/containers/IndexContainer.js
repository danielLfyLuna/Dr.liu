import { connect } from 'react-redux'

import {
  fetchPurchases,
  fetchPurchaseSync,
  fetchProducts
} from '../../../../../modules/globals'

import {
  fetchPlayers,
  importPlayers,
  createPlayer,
  deletePlayer,
  batchPlayers,
  keepWelfare
} from '../modules/Module'
import Index from '../components/Index'

const mapDispatchtoProps = {
  fetchPlayers,
  importPlayers,
  createPlayer,
  deletePlayer,
  batchPlayers,
  keepWelfare,
  fetchPurchases,
  fetchPurchaseSync,
  fetchProducts
}

const mapStateToProps = (state) => ({
  welfare: state.welfare,
  globals: state.globals,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
