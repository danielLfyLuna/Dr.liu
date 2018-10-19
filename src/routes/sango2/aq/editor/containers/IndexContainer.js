import {connect} from 'react-redux'
import {fetchEDITOR, fetchDefault} from './../modules/Module'
import EditorPage from './../components/Editor'

const mapDispatchtoProps = {
  fetchEDITOR,
  fetchDefault
}

const mapStateToProps = state => ({
  editor: state.editor
})

export default connect(mapStateToProps, mapDispatchtoProps)(EditorPage)
