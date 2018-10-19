import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { fetchChannels } from '../../../../../../modules/channels'
import { fetchProductsMap } from '../../../../../../modules/products'
import { fetchGoodsMap } from '../../../../../../modules/goods'
import { checkOwnMail, updateOwnEmailPlayer, sendOwnMail } from '../modules/DetailsModule'
import Details from '../components/Details'

const mapDispatchtoProps = {
  fetchChannels,
  fetchProductsMap,
  fetchGoodsMap,
  checkOwnMail,
  updateOwnEmailPlayer,
  sendOwnMail
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  channel: state.channels.map,
  products: state.products,
  goods: state.goods,
  ownMailDetail: state.ownMailDetail
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Details))
