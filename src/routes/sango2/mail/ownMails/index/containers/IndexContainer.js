import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import { fetchOwnMail, clearPass, passOwnMail, addOwnMail, sendOwnMail } from './../modules/Module'
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
  fetchOwnMail,
  clearPass,
  passOwnMail,
  addOwnMail,
  sendOwnMail
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  ownMail: state.ownMail,
  products: state.products,
  goods: state.goods,
  itemPrice: state.itemPrice,
  mailMax: state.mailMax,
  channel: state.channels.map
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Index))
