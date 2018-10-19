import { connect } from 'react-redux'
import { keepEquipments, fetchEquipments } from './../modules/EquipmentsModules'
import { fetchProductsMap } from '../../../../../modules/products'
import SoldiersPage from './../components/SoldiersPage'

const mapDispatchtoProps = {
  fetchProductsMap,
  fetchEquipments,
  keepEquipments
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  products: state.products,
  equipment: state.equipments
})

export default connect(mapStateToProps, mapDispatchtoProps)(SoldiersPage)
