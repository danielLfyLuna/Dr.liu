import { connect } from 'react-redux'
import { keepSoldiers, fetchSoldiers } from './../modules/SoldiersModules'
import { fetchProductsMap } from '../../../../../modules/products'
import SoldiersPage from './../components/SoldiersPage'

const mapDispatchtoProps = {
  fetchProductsMap,
  fetchSoldiers,
  keepSoldiers
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  products: state.products,
  soldier: state.soldiers
})

export default connect(mapStateToProps, mapDispatchtoProps)(SoldiersPage)
