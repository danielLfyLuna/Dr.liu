import { connect } from 'react-redux'

import { consumeSources } from './../modules/Module'
import Modal from './../components/Modal'
import { itemsActionCreator } from '../../../../../modules/items'
import { fetchGoodsMap } from '../../../../../modules/goods'


const mapDispatchtoProps = {
  consumeSources,
  itemsActionCreator,
  fetchGoodsMap
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  consume: state.consume,
  item: state.goods
})

export default connect(mapStateToProps, mapDispatchtoProps)(Modal)
