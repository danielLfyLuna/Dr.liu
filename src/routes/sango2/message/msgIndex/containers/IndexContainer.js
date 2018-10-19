import { connect } from 'react-redux'
import {
  fetchMessage,
  clearMessage,
  fetchTemp,
  sendMessage
} from '../modules/Module'
import Index from '../components/Index'

const mapDispatchtoProps = {
  fetchMessage,
  clearMessage,
  fetchTemp,
  sendMessage
}

const mapStateToProps = (state) => ({
  message: state.message,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
