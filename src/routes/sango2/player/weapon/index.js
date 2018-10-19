import {injectReducer} from '../../../../store/reducers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { browserHistory } from 'react-router'
export default(store) => ({
  path: 'weapons',
  breadcrumbName: '神兵数据',
  intlId: 'APP.PLAYER.WEAPONS',
  getComponent(nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(71100)) {
      require.ensure([], (require) => {
        NProgress.start()
        const weapon = require('./containers/WeaponContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, {
          key: 'weapon',
          reducer
        })
        cb(null, weapon)
        NProgress.done()
      }, 'weapon')
    } else {
      browserHistory.push('/')
    }
  }
})
