import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { browserHistory } from 'react-router'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'produces',
  breadcrumbName: '生产列表',
  intlId: 'APP.LOG.PRODUCES',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(150300)) {
      require.ensure([], (require) => {
        NProgress.start()
        const produces = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'produce', reducer })
        cb(null, produces)
        NProgress.done()
      })
    } else {
      browserHistory.push('/')
    }
  }
})
