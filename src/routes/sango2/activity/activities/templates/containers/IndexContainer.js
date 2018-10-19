import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import {
  fetchTemplates,
  newCreateActivity,
  clearTemplateCreate,
  keepActivities
} from '../../index/modules/Module'
import { fetchProductsMap } from '../../../../../../modules/products'
import { fetchGoodsMap } from '../../../../../../modules/goods'
import Page from '../components/Page'

const mapDispatchtoProps = {
  fetchTemplates,
  newCreateActivity,
  clearTemplateCreate,
  keepActivities,
  fetchProductsMap,
  fetchGoodsMap
}

const mapStateToProps = (state) => ({
  activities: state.activities,
  products: state.products,
  goods: state.goods,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Page))
