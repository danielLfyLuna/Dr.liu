import { connect } from 'react-redux'
import { keepWeapon, fetchWeapons } from './../modules/Module'
import { fetchProductsMap } from '../../../../../modules/products'
import Index from './../components/Index'

const mapDispatchtoProps = {
  fetchProductsMap,
  fetchWeapons,
  keepWeapon
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  products: state.products,
  weapon: state.weapon
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
