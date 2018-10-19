import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { itemsActionCreator } from '../../../../../modules/items'
import {
  addUpdateNotice,
  updateUpdateNotice
} from './../modules/Module'
import Modal from './../components/Modal'

const mapDispatchtoProps = {
  itemsActionCreator,
  addUpdateNotice,
  updateUpdateNotice
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  item: state.items,
  notice: state.updateNotice
})

export default connect(mapStateToProps, mapDispatchtoProps)(injectIntl(Modal))
