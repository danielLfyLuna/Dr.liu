import {injectReducer} from '../../../../store/reducers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { browserHistory } from 'react-router'
export default(store) => ({
  path: 'resetarmy',
  breadcrumbName: '重置队伍状态',
  intlId: 'APP.PLAYER.RESETARMY',
  getComponent(nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(70300)) {
      require.ensure([], (require) => {
        NProgress.start()
        const resetArmy = require('./containers/ResetArmyContainer').default
        const reducer = require('./modules/ResetArmyModules').default
        injectReducer(store, {
          key: 'resetArmy',
          reducer
        })
        cb(null, resetArmy)
        NProgress.done()
      }, 'resetarmys')
    } else {
      browserHistory.push('/')
    }
  }
})
