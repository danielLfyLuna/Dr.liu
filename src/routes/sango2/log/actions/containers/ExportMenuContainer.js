import { connect } from 'react-redux'

import { fetchOperationType, fetchConsumeSources, fetchProduceSources, clearOperationType, clearConsumeSources, clearProduceSources } from './../modules/Module'
import ExportModal from '../components/Modal'


const mapDispatchtoProps = {
  fetchOperationType,
  fetchConsumeSources,
  fetchProduceSources,
  clearOperationType,
  clearConsumeSources,
  clearProduceSources
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  action: state.action
})

export default connect(mapStateToProps, mapDispatchtoProps)(ExportModal)
