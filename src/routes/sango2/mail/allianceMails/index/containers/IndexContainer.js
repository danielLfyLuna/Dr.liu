import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import { fetchAllianceMail, clearPass, passAllianceEmail, sendAllianceMail, addAllianceMail } from './../modules/Module'
import { fetchProductsMap } from '../../../../../../modules/products'
import { fetchGoodsMap } from '../../../../../../modules/goods'
import { fetchChannels } from '../../../../../../modules/channels'
import { fetchItemPrice } from '../../../../../../modules/itemPrice'
import { fetchPriceMax } from '../../../../../../modules/mailMax'
import Index from './../components/Index'

const mapDispatchtoProps = {
  fetchItemPrice,
  fetchPriceMax,
  fetchChannels,
  fetchProductsMap,
  fetchGoodsMap,
  fetchAllianceMail,
  clearPass,
  passAllianceEmail,
  sendAllianceMail,
  addAllianceMail
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  allianceMail: state.allianceMail,
  itemPrice: state.itemPrice,
  mailMax: state.mailMax,
  products: state.products,
  goods: state.goods,
  channel: state.channels.map
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Index))
