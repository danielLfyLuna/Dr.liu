import {injectReducer} from '../../../../store/reducers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { browserHistory } from 'react-router'
export default(store) => ({
  path: 'sync',
  breadcrumbName: '同步道具列表',
  intlId: '同步道具列表',
  getComponent(nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(120100)) {
      require.ensure([], (require) => {
        NProgress.start()
        const Sync = require('./containers/SyncContainer').default
        const reducer = require('./modules/SyncModules').default
        injectReducer(store, {
          key: 'sync',
          reducer
        })
        cb(null, Sync)
        NProgress.done()
      }, 'sync')
    } else {
      browserHistory.push('/')
    }
  }
})
