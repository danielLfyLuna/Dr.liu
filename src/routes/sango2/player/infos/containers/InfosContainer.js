import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { infosSearchActionCreator, receiveInfos, kickoutActionCreator, clearHeadActionCreator, updateSkipnovice, updateNovices, keepInfos, updateNickName, resetPassword } from './../modules/InfosModules'
import { fetchProductsMap } from '../../../../../modules/products'
import InfosPage from './../components/InfosPage'

const mapDispatchtoProps = {
  infosSearchActionCreator,
  receiveInfos,
  clearHeadActionCreator,
  updateSkipnovice,
  updateNovices,
  kickoutActionCreator,
  fetchProductsMap,
  updateNickName,
  resetPassword,
  keepInfos
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  products: state.products,
  info: state.infos
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(InfosPage))
