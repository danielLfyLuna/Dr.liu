import { connect } from 'react-redux'
import { fetchVersions, clearVersions, createVersion, updateVersion } from '../modules/Module'
import Index from '../components/Index'
import { fetchGroupsMap } from '../../../../../modules/groups'
import { fetchProductsMap } from '../../../../../modules/products'

const mapDispatchtoProps = {
  fetchVersions,
  clearVersions,
  createVersion,
  updateVersion,
  fetchGroupsMap,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  version: state.version,
  groups: state.groups,
  products: state.products,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
