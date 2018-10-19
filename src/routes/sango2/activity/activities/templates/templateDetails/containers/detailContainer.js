import { connect } from 'react-redux'
import {
  getDetail
} from '../modules/DetailModule'

import List from '../components/List'

const mapDispatchtoProps = {
  getDetail
}

const mapStateToProps = (state) => ({
  temDetail: state.temDetail,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(List)
