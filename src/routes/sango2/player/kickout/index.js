import {injectReducer} from '../../../../store/reducers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { browserHistory } from 'react-router'
export default(store) => ({
  path: 'kickout',
  breadcrumbName: '踢人',
  intlId: 'APP.PLAYER.KICKOUT',
  getComponent(nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(70900)) {
      require.ensure([], (require) => {
        NProgress.start()
        const infos = require('./containers/KickoutContainer').default
        const reducer = require('./modules/KickoutModules').default
        injectReducer(store, {
          key: 'kickouts',
          reducer
        })
        cb(null, infos)
        NProgress.done()
      }, 'kickouts')
    } else {
      browserHistory.push('/')
    }
  }
})
