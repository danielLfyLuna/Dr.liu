import { injectReducer } from '../../../../../store/reducers.js'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'index',
  breadcrumbName: '限时活动-热卖-列表',
  intlId: '限时活动-热卖-列表',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(90200)) {
      require.ensure([], (require) => {
        const FlashSaleContainer = require('./containers/FlashSaleContainer').default
        const reducer = require('./modules/FlashSaleModules').default
        injectReducer(store, { key: 'flashSale', reducer })
        cb(null, FlashSaleContainer)
      }, 'index')
    } else {
      browserHistory.push('/')
    }
  }
})
