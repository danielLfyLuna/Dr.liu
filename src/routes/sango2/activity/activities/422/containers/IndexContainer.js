import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import {
  updateGroupBuy,
  fetchConfigure
} from '../../index/modules/Module'
import { fetchProductsMap } from '../../../../../../modules/products'
import { itemsActionCreator } from '../../../../../../modules/items'
import Update from '../components/Update'

const mapDispatchtoProps = {
  updateGroupBuy,
  fetchConfigure,
  fetchProductsMap,
  itemsActionCreator
}

const mapStateToProps = (state) => ({
  activities: state.activities,
  products: state.products,
  items: state.items.data,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Update))
