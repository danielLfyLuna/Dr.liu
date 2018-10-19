import { connect } from 'react-redux'
import {
  singleMsg,
  clearSingle
} from '../../msgIndex/modules/Module'
import Index from '../components/MsgIndex'

const mapDispatchtoProps = {
  singleMsg,
  clearSingle
}

const mapStateToProps = (state) => ({
  message: state.message,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
