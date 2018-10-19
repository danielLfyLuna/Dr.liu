import { connect } from 'react-redux'

import {
  fetchUSERKEY,
  clearUSERKEY
} from '../modules/Module'
import Index from '../components/Index'


const mapDispatchtoProps = {
  fetchUSERKEY,
  clearUSERKEY
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  userkey: state.userkey
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
