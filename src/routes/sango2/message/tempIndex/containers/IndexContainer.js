import { connect } from 'react-redux'
import {
  fetchTemplate,
  clearTemplate
} from '../modules/Module'
import Index from '../components/Index'

const mapDispatchtoProps = {
  fetchTemplate,
  clearTemplate
}

const mapStateToProps = (state) => ({
  temps: state.temps,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
