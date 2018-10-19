import { connect } from 'react-redux'
import { itemsActionCreator } from '../../../../../modules/items'
import { fetchAdd, fetchGet, fetchDelete } from './../modules/BlackListModules'
import { fetchProductsMap } from '../../../../../modules/products'
import BlackListPage from './../components/BlackListPage'

const mapDispatchtoProps = {
  itemsActionCreator,
  fetchProductsMap,
  fetchAdd,
  fetchGet,
  fetchDelete
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  item: state.items,
  products: state.products,
  blacklist: state.blacklist
})

export default connect(mapStateToProps, mapDispatchtoProps)(BlackListPage)
