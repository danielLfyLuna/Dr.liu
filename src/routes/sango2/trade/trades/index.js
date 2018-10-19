import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'trades',
  breadcrumbName: '所有交易列表',
  intlId: '所有交易列表',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(100100)) {
      require.ensure([], (require) => {
        const trades = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        const tradeReducer = require('./modules/GoodsModule').default
        injectReducer(store, { key: 'tradeGoods', reducer: tradeReducer })
        injectReducer(store, { key: 'trade', reducer })
        cb(null, trades)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
