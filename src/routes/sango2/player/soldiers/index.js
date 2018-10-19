import {injectReducer} from '../../../../store/reducers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { browserHistory } from 'react-router'
export default(store) => ({
  path: 'soldiers',
  breadcrumbName: '武将数据',
  intlId: 'APP.PLAYER.SOLDIERS',
  getComponent(nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(70700)) {
      require.ensure([], (require) => {
        NProgress.start()
        const soldiers = require('./containers/SoldiersContainer').default
        const reducer = require('./modules/SoldiersModules').default
        injectReducer(store, {
          key: 'soldiers',
          reducer
        })
        cb(null, soldiers)
        NProgress.done()
      }, 'soldiers')
    } else {
      browserHistory.push('/')
    }
  }
})
