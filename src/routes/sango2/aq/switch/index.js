import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'switch',
  breadcrumbName: '问答开关',
  intlId: '问答开关',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      NProgress.start()
      const notices = require('./containers/IndexContainer').default
      const reducer = require('./modules/Module').default
      injectReducer(store, { key: 'aqSwitch', reducer })
      cb(null, notices)
      NProgress.done()
    })
  }
})
