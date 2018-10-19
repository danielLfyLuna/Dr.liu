import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { browserHistory } from 'react-router'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'consumes',
  breadcrumbName: '消耗列表',
  intlId: 'APP.LOG.CONSUMES',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(150200)) {
      require.ensure([], (require) => {
        NProgress.start()
        const consumes = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'consume', reducer })
        cb(null, consumes)
        NProgress.done()
      })
    } else {
      browserHistory.push('/')
    }
  }
})
