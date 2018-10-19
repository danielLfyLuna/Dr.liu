import { browserHistory } from 'react-router'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'logSource',
  breadcrumbName: '日志来源',
  intlId: 'APP.LOG.LOGSOURCE',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))
    if (subMenu) {
      require.ensure([], (require) => {
        const logSources = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'logSource', reducer })
        cb(null, logSources)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
