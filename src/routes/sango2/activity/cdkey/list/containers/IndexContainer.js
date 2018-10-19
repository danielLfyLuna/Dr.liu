import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import {
  fetchCDKeys,
  clearCDKeys,
  updateCDKey,
  generateCDKey,
  keepCDKey
} from '../modules/Module'
import Index from '../components/Index'
import { fetchProductsMap } from '../../../../../../modules/products'
import { fetchGoodsMap } from '../../../../../../modules/goods'
import { itemsActionCreator } from '../../../../../../modules/items'
import { fetchChannels } from '../../../../../../modules/channels'

const mapDispatchtoProps = {
  fetchCDKeys,
  clearCDKeys,
  updateCDKey,
  generateCDKey,
  keepCDKey,
  fetchProductsMap,
  fetchGoodsMap,
  itemsActionCreator,
  fetchChannels
}

const mapStateToProps = (state) => ({
  cdkey: state.cdkey,
  products: state.products,
  goods: state.goods,
  items: state.items.data,
  channels: state.channels.map,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Index))
