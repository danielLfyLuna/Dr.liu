import {injectReducer} from '../../../../store/reducers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { browserHistory } from 'react-router'
export default(store) => ({
  path: 'logs',
  breadcrumbName: '实时日志拉取',
  intlId: 'APP.PLAYER.LOGS',
  getComponent(nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(70400)) {
      require.ensure([], (require) => {
        NProgress.start()
        const playerLogs = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, {
          key: 'playerLogs',
          reducer
        })
        cb(null, playerLogs)
        NProgress.done()
      })
    } else {
      browserHistory.push('/')
    }
  }
})
