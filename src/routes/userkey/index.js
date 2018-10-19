import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { browserHistory } from 'react-router'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'userkey',
  breadcrumbName: 'userkey',
  intlId: 'APP.USER_KEY',
  getComponent (nextState, cb) {
    // const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    require.ensure([], (require) => {
      NProgress.start()
      const userkey = require('./containers/IndexContainer').default
      const reducer = require('./modules/Module').default
      injectReducer(store, { key: 'userkey', reducer })
      cb(null, userkey)
      NProgress.done()
    }, 'userkey')
    // if (subMenu.includes(10500)) {
    //   require.ensure([], (require) => {
    //     NProgress.start()
    //     const adminLog = require('./containers/IndexContainer').default
    //     const reducer = require('./modules/Module').default
    //     injectReducer(store, { key: 'adminLog', reducer })
    //     cb(null, adminLog)
    //     NProgress.done()
    //   })
    // } else {
    //   browserHistory.push('/')
    // }
  }
})
