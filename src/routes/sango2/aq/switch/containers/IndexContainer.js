import { connect } from 'react-redux'
import { fetchProductsMap } from '../../../../../modules/products'
import {
  switchAQ
} from './../modules/Module'
import AQSwitch from './../components/Switch'


const mapDispatchtoProps = {
  switchAQ,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  aq: state.aq,
  products: state.products
})

export default connect(mapStateToProps, mapDispatchtoProps)(AQSwitch)
