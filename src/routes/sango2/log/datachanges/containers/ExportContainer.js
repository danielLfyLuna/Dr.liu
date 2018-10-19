import { connect } from 'react-redux'

import { produceSources } from './../modules/Module'
import Modal from './../components/Modal'
import { itemsActionCreator } from '../../../../../modules/items'
import { fetchGoodsMap } from '../../../../../modules/goods'


const mapDispatchtoProps = {
  produceSources,
  itemsActionCreator,
  fetchGoodsMap
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  produce: state.produce,
  item: state.goods
})

export default connect(mapStateToProps, mapDispatchtoProps)(Modal)
