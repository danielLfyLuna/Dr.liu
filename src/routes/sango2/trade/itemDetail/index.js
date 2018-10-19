import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'itemDetail',
  breadcrumbName: '交易行统计',
  intlId: 'APP.TRADE.ITEMDETAIL',
  getComponent(nxtSt, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(100200)) {
      require.ensure([], (require) => {
        const trades = require('./components/Index').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'itemDetails', reducer })
        cb(null, trades)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
