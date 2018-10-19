import { connect } from 'react-redux'
import { onLineSearchActionCreator, receiveOnLine, kickoutActionCreator, keepKickout } from './../modules/KickoutModules'
import { fetchProductsMap } from '../../../../../modules/products'
import KickoutPage from './../components/KickoutPage'

const mapDispatchtoProps = {
  onLineSearchActionCreator,
  receiveOnLine,
  kickoutActionCreator,
  fetchProductsMap,
  keepKickout
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  products: state.products,
  kickout: state.kickouts
})

export default connect(mapStateToProps, mapDispatchtoProps)(KickoutPage)
