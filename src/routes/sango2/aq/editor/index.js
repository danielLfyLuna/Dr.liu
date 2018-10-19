import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {injectReducer} from '../../../../store/reducers'

export default store => ({
  path: 'editor',
  breadcrumbName: 'editor',
  intlId: 'editor',
  getComponent(nextState, cb) {
    require.ensure([], require => {
      NProgress.start()
      const notices = require('./containers/IndexContainer').default
      const reducer = require('./modules/Module').default
      injectReducer(store, {key: 'editor', reducer})
      cb(null, notices)
      NProgress.done()
    })
  }
})
