import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { browserHistory } from 'react-router'
import { injectReducer } from '../../../../../store/reducers'

export default (store) => ({
  path: 'setCDKey',
  breadcrumbName: '设置CDKEY',
  intlId: 'APP.CDKEY.SETCDKEY',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(30100)) {
      require.ensure([], (require) => {
        NProgress.start()
        const notices = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'setCDKey', reducer })
        cb(null, notices)
        NProgress.done()
      })
    } else {
      browserHistory.push('/')
    }
  }
})
