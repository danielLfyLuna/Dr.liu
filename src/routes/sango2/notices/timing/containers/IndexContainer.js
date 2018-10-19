import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { fetchProductsMap } from '../../../../../modules/products'
import {
  fetchNoticesTiming,
  addTimingNotice,
  stopTimingNotice,
  deleteTimingNotice,
  keepNoticesTiming
} from './../modules/Module'
import Index from './../components/Index'

const mapDispatchtoProps = {
  fetchNoticesTiming,
  addTimingNotice,
  stopTimingNotice,
  deleteTimingNotice,
  fetchProductsMap,
  keepNoticesTiming
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  notice: state.timingNotice,
  products: state.products
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Index))
