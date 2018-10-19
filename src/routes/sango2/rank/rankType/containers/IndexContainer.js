import { connect } from 'react-redux'

import {
  fetchRank, clearRank, keepInitial, fetchSpecialTypes
} from './../../Module'
import Index from './../components/Index'
import { fetchProductsMap } from '../../../../../modules/products'


const mapDispatchtoProps = {
  fetchRank,
  clearRank,
  keepInitial,
  fetchProductsMap,
  fetchSpecialTypes
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  rank: state.rank,
  products: state.products
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
