import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'forbid',
  breadcrumbName: '禁言&封号',
  intlId: 'APP.BLACKLIST.FORBID',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(80200)) {
      require.ensure([], (require) => {
        const Index = require('./components/Index').default
        const reducer = require('../index/modules/Module').default
        injectReducer(store, { key: 'blacklist', reducer })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
