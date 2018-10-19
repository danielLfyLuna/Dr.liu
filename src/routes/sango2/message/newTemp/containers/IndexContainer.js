import { connect } from 'react-redux'
import {
  fetchTemp
} from '../../msgIndex/modules/Module'
import Index from '../components/MsgIndex'

const mapDispatchtoProps = {
  fetchTemp
}

const mapStateToProps = (state) => ({
  message: state.message,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
