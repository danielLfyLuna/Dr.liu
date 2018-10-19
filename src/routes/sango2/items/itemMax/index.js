import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'itemMax',
  breadcrumbName: '道具价格',
  intlId: '道具价格',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(120300)) {
      require.ensure([], (require) => {
        const trades = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'itemMax', reducer })
        cb(null, trades)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
