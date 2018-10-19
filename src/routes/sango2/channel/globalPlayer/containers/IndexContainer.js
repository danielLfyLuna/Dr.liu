import { connect } from 'react-redux'
import { fetchGlobalPlayers, clearGlobalPlayers } from '../modules/Module'
import Index from '../components/Index'

const mapDispatchtoProps = {
  fetchGlobalPlayers,
  clearGlobalPlayers
}

const mapStateToProps = (state) => ({
  globalPlayer: state.globalPlayer,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
