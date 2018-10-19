import { connect } from 'react-redux'
import { fetchGroups, createGroup, updateGroup, deleteGroup } from '../modules/Module'
import Index from '../components/Index'

const mapDispatchtoProps = {
  fetchGroups,
  createGroup,
  updateGroup,
  deleteGroup
}

const mapStateToProps = (state) => ({
  group: state.group,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
