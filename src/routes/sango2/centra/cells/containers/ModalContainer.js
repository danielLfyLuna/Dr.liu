import { connect } from 'react-redux'
import { fetchCellTypes, createCell } from '../modules/Module'

import Modal from '../components/Modal'

const mapDispatchtoProps = {
  fetchCellTypes,
  createCell
}

const mapStateToProps = (state, props) => ({
  enum: props.enum,
  cell: state.cell,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Modal)
