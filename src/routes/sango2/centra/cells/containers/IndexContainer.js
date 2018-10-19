import { connect } from 'react-redux'
import { fetchCells, fetchCellTypes, updateCell } from '../modules/Module'
import Index from '../components/Index'
import { fetchProductsMap } from '../../../../../modules/products'

const mapDispatchtoProps = {
  fetchCells,
  fetchCellTypes,
  fetchProductsMap,
  updateCell
}

const mapStateToProps = (state) => ({
  cell: state.cell,
  products: state.products,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
