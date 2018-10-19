import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { fetchServers, clearServers, createServer, updateServer, switchServers } from '../modules/Module'
import Index from '../components/Index'
import { fetchProductsMap } from '../../../../../modules/products'
import { fetchGroupsMap } from '../../../../../modules/groups'

const mapDispatchtoProps = {
  fetchServers,
  clearServers,
  createServer,
  updateServer,
  fetchGroupsMap,
  fetchProductsMap,
  switchServers
}

const mapStateToProps = (state) => ({
  server: state.server,
  groups: state.groups,
  products: state.products,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Index))
