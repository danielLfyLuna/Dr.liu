import { connect } from 'react-redux'

import { injectIntl } from 'react-intl'
import { fetchBatchmail, clearBatchmailFetch, addBatchmail, clearBatchmailAdd, updateBatchmail, fetchBatchmailPlayer, clearBatchmailPlayer } from '../modules/Module'
import Index from '../components/Index'
import { fetchProductsMap } from '../../../../../../modules/products'
import { fetchGoodsMap } from '../../../../../../modules/goods'
import { fetchItemPrice } from '../../../../../../modules/itemPrice'
import { fetchPriceMax } from '../../../../../../modules/mailMax'


const mapDispatchtoProps = {
  fetchProductsMap,
  fetchGoodsMap,
  fetchItemPrice,
  fetchPriceMax,
  fetchBatchmail,
  addBatchmail,
  clearBatchmailFetch,
  clearBatchmailAdd,
  updateBatchmail,
  fetchBatchmailPlayer,
  clearBatchmailPlayer

}

const mapStateToProps = (state) => ({
  login: state.islogin,
  mailMax: state.mailMax,
  batchmail: state.batchmail,
  products: state.products,
  goods: state.goods,
  itemPrice: state.itemPrice
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Index))
