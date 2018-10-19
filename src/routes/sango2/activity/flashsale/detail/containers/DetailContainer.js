import { connect } from 'react-redux'
import { fetchDetail, updateFlashSale } from '../modules/DteailModules'
import { itemsActionCreator } from '../../../../../../modules/items'

import DetailPage from '../components/DetailPage.js'

const mapDispatchToProps = {
  itemsActionCreator,
  fetchDetail,
  updateFlashSale
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  item: state.items,
  detail: state.flashSaleDetail
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)
