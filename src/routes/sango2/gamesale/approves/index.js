import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'approves',
  breadcrumbName: '提单列表',
  intlId: '提单列表',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(160300)) {
      require.ensure([], (require) => {
        const Index = require('./components/Index').default
        const reducer = require('../index/modules/Module').default
        injectReducer(store, { key: 'gamesale', reducer })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
