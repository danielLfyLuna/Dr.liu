import { connect } from 'react-redux'
import { clearUserForbid, fetchUserForbid, removeUserForbid, addUserForbid } from '../modules/Module'
import { fetchProductsMap } from '../../../../../modules/products'

import Index from '../components/Index'


const mapDispatchtoProps = {
  fetchUserForbid,
  clearUserForbid,
  removeUserForbid,
  addUserForbid,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  userForbid: state.userForbid,
  products: state.products,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
