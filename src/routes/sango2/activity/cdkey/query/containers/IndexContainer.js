import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { queryCDKey, keepCDKey } from '../../list/modules/Module'
import Page from '../components/Page'

import { fetchProductsMap } from '../../../../../../modules/products'
import { itemsActionCreator } from '../../../../../../modules/items'

const mapDispatchtoProps = {
  queryCDKey,
  keepCDKey,
  fetchProductsMap,
  itemsActionCreator
}

const mapStateToProps = (state) => ({
  cdkey: state.cdkey,
  products: state.products,
  items: state.items.data,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Page))
