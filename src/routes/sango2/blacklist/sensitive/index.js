import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { browserHistory } from 'react-router'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'sensitive',
  breadcrumbName: '敏感词',
  intlId: 'APP.BLACKLIST.SENSITIVE',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(80400)) {
      require.ensure([], (require) => {
        NProgress.start()
        const notices = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'sensitive', reducer })
        cb(null, notices)
        NProgress.done()
      })
    } else {
      browserHistory.push('/')
    }
  }
})
