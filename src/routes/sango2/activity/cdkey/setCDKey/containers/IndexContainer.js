import { connect } from 'react-redux'
import {
  fetchCD,
  setCD
} from './../modules/Module'
import Index from './../components/Index'


const mapDispatchtoProps = {
  fetchCD,
  setCD
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  setCDKey: state.setCDKey
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
