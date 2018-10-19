import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { browserHistory } from 'react-router'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'sqls',
  breadcrumbName: '查询列表',
  intlId: 'APP.LOG.SQLS',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(150500)) {
      require.ensure([], (require) => {
        NProgress.start()
        const sqls = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'sql', reducer })
        cb(null, sqls)
        NProgress.done()
      })
    } else {
      browserHistory.push('/')
    }
  }
})
