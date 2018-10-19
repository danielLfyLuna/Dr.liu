import { connect } from 'react-redux'
import { sendRecharge, fetchRechargeMap, keepRecharge, sendMonthCard } from '../modules/Module'
import { injectIntl } from 'react-intl'
import Index from '../components/Index'
import { fetchProductsMap } from '../../../../../modules/products'
import { fetchPlayers } from '../../../../../modules/players'

const mapDispatchtoProps = {
  fetchPlayers,
  fetchProductsMap,
  sendRecharge,
  sendMonthCard,
  fetchRechargeMap,
  keepRecharge
}

const mapStateToProps = (state) => ({
  recharge: state.recharge,
  products: state.products,
  players: state.players,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Index))
