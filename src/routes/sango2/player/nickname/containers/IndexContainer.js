import { connect } from 'react-redux'
import { fetchProductsMap } from '../../../../../modules/products'
import {
  fetchNICK,
  clearNICK
} from './../modules/Module'
import Index from './../components/Index'


const mapDispatchtoProps = {
  fetchNICK,
  clearNICK,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  nickname: state.nickname,
  products: state.products
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
