import { connect } from 'react-redux'
import { addBlacklist, keepBlacklist } from '../../index/modules/Module'
import { injectIntl } from 'react-intl'
import Page from '../components/Page'

import { fetchPlayers, clearPlayers } from '../../../../../modules/players'
import { fetchProductsMap } from '../../../../../modules/products'

const mapDispatchtoProps = {
  addBlacklist,
  keepBlacklist,
  fetchPlayers,
  clearPlayers,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  blacklist: state.blacklist,
  players: state.players,
  products: state.products,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Page))
