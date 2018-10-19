import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import { fetchServerMail, clearPass, passServerEmail, sendServerMail, addServerMail } from './../modules/Module'
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
  fetchServerMail,
  clearPass,
  passServerEmail,
  sendServerMail,
  addServerMail
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  mailMax: state.mailMax,
  itemPrice: state.itemPrice,
  serverMail: state.serverMail,
  products: state.products,
  goods: state.goods,
  channel: state.channels.map
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Index))
