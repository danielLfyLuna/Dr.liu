import { connect } from 'react-redux'
import { fetchGameSaleJoinTypes } from '../modules/Module'
import Modal from '../components/Modal'

const mapDispatchtoProps = {
  fetchGameSaleJoinTypes
}

const mapStateToProps = (state) => ({
  gamesale: state.gamesale,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Modal)
