import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { createCDKey } from '../modules/Module'
import { fetchGoodsMap } from '../../../../../../modules/goods'
import { itemsActionCreator } from '../../../../../../modules/items'

import Modal from '../components/Modal'

const mapDispatchtoProps = {
  createCDKey,
  fetchGoodsMap,
  itemsActionCreator
}

const mapStateToProps = (state, props) => ({
  goods: state.goods,
  items: state.items.data,
  cdkey: state.cdkey,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Modal))
