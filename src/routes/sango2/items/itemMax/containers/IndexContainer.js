import { connect } from 'react-redux'
import { uploadItemMax, updateItemMax } from '../modules/Module'
import Index from '../components/Index'

import { fetchItemPrice } from '../../../../../modules/itemPrice'

const mapDispatchtoProps = {
  fetchItemPrice,
  uploadItemMax,
  updateItemMax
}

const mapStateToProps = (state) => ({
  itemPrice: state.itemPrice,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
