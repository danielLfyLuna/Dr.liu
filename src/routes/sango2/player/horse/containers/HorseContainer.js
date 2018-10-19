import { connect } from 'react-redux'
import { keepHorse, fetchHorse } from './../modules/HorseModules'
import { fetchProductsMap } from '../../../../../modules/products'
import HorsePage from './../components/HorsePage'

const mapDispatchtoProps = {
  fetchProductsMap,
  fetchHorse,
  keepHorse
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  products: state.products,
  horse: state.horse
})

export default connect(mapStateToProps, mapDispatchtoProps)(HorsePage)
