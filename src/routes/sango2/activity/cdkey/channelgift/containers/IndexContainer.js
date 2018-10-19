import { connect } from 'react-redux'
import { fetchChannelGifts, createChannelGift, deleteChannelGift } from '../../list/modules/Module'
import Page from '../components/Page'
import { fetchProductsMap } from '../../../../../../modules/products'

const mapDispatchtoProps = {
  fetchChannelGifts,
  createChannelGift,
  fetchProductsMap,
  deleteChannelGift
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  products: state.products,
  cdkey: state.cdkey
})

export default connect(mapStateToProps, mapDispatchtoProps)(Page)
