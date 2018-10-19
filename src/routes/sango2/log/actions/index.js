import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { browserHistory } from 'react-router'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'actions',
  breadcrumbName: '行为列表',
  intlId: 'APP.LOG.ACTIONS',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))


    if (subMenu.includes(150400)) {
      require.ensure([], (require) => {
        NProgress.start()
        const actions = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'action', reducer })
        cb(null, actions)
        NProgress.done()
      })
    } else {
      browserHistory.push('/')
    }
  }
})
