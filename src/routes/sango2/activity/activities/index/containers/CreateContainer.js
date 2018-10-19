import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { fetchProductsMap } from '../../../../../../modules/products'

import Create from '../components/Create'

const mapDispatchtoProps = {
  fetchProductsMap
}

const mapStateToProps = (state, props) => ({
  activities: state.activities,
  products: state.products,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Create))
