import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { browserHistory } from 'react-router'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'datachanges',
  breadcrumbName: '数据变化列表',
  intlId: 'APP.LOG.DATACHANGES',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(150600)) {
      require.ensure([], (require) => {
        NProgress.start()
        const produces = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'datachange', reducer })
        cb(null, produces)
        NProgress.done()
      })
    } else {
      browserHistory.push('/')
    }
  }
})
