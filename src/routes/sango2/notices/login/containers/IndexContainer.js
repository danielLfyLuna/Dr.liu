import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { fetchProductsMap } from '../../../../../modules/products'
import { fetchChannels, keepChannels } from './../../../../../modules/channels'
import {
  fetchNoticesLogin,
  deleteLoginNotice,
  addLoginNotice,
  updateLoginNotice,
  openLoginNotice
} from './../modules/Module'
import Index from './../components/Index'

const mapDispatchtoProps = {
  fetchNoticesLogin,
  deleteLoginNotice,
  openLoginNotice,
  addLoginNotice,
  updateLoginNotice,
  fetchChannels,
  fetchProductsMap,
  keepChannels
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  notice: state.notice,
  products: state.products,
  channel: state.channels
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Index))
