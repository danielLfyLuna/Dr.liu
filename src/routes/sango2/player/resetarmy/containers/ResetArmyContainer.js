import { connect } from 'react-redux'
import { resetArmyActionCreator, keepResetArmy } from './../modules/ResetArmyModules'
import { fetchProductsMap } from '../../../../../modules/products'
import ResetArmyPage from './../components/ResetArmyPage'

const mapDispatchtoProps = {
  resetArmyActionCreator,
  fetchProductsMap,
  keepResetArmy
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  products: state.products,
  resetArmy: state.resetArmy
})

export default connect(mapStateToProps, mapDispatchtoProps)(ResetArmyPage)
