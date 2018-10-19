import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { browserHistory } from 'react-router'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'operations',
  breadcrumbName: '操作列表',
  intlId: 'APP.LOG.OPERATIONS',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(150100)) {
      require.ensure([], (require) => {
        NProgress.start()
        const operations = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'operation', reducer })
        cb(null, operations)
        NProgress.done()
      })
    } else {
      browserHistory.push('/')
    }
  }
})
