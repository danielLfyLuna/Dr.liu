import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { browserHistory } from 'react-router'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'aqs',
  breadcrumbName: '问答页',
  intlId: '问答页',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(180100)) {
      require.ensure([], (require) => {
        NProgress.start()
        const notices = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'aq', reducer })
        cb(null, notices)
        NProgress.done()
      })
    } else {
      browserHistory.push('/')
    }
  }
})
