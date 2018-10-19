import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'

export default (store) => ({
  path: 'batch',
  breadcrumbName: '批量禁言&封号',
  intlId: 'APP.BLACKLIST.BATCH',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(80200)) {
      require.ensure([], (require) => {
        const Batch = require('./containers/IndexContainer').default
        const reducer = require('../index/modules/Module').default
        injectReducer(store, { key: 'blacklist', reducer })
        cb(null, Batch)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
