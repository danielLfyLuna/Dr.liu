import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import {
  fetchDiscount, clearDiscount
} from '../modules/Module'
import { fetchProductsMap } from '../../../../../../modules/products'
import { fetchGoodsMap } from '../../../../../../modules/goods'
import Create from '../components/Create'

const mapDispatchtoProps = {
  fetchDiscount,
  clearDiscount,
  fetchProductsMap,
  fetchGoodsMap
}

const mapStateToProps = (state) => ({
  discount: state.discount,
  products: state.products,
  goods: state.goods,
  login: {
    manager: state.islogin.admin.data,
    resolved: state.islogin.resolved
  }
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Create))
