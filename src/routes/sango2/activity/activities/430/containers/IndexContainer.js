import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import {
  updateActivity,
  fetchConfigure
} from '../../index/modules/Module'
import { fetchProductsMap } from '../../../../../../modules/products'
import { itemsActionCreator } from '../../../../../../modules/items'
import { fetchGoodsMap } from '../../../../../../modules/goods'
import Update from '../components/Update'

const mapDispatchtoProps = {
  updateActivity,
  fetchConfigure,
  fetchProductsMap,
  itemsActionCreator,
  fetchGoodsMap
}

const mapStateToProps = (state) => ({
  activities: state.activities,
  products: state.products,
  items: state.items.data,
  goods: state.goods,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Update))
