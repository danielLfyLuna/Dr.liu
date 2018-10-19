import {connect} from 'react-redux'

import {
  fetchSP,
  reloadSP
} from '../modules/Module'
import Home from './../components/HomeView.js'

const mapDispatchtoProps = {
  fetchSP,
  reloadSP
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  homes: state.homes
})

export default connect(mapStateToProps, mapDispatchtoProps)(Home)
