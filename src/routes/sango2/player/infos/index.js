import {injectReducer} from '../../../../store/reducers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { browserHistory } from 'react-router'
export default(store) => ({
  path: 'infos',
  breadcrumbName: '玩家基础信息',
  intlId: 'APP.PLAYER.INFOS',
  getComponent(location, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(70100)) {
      require.ensure([], (require) => {
        NProgress.start()
        const infos = require('./containers/InfosContainer').default
        const reducer = require('./modules/InfosModules').default
        injectReducer(store, {
          key: 'infos',
          reducer
        })
        cb(null, infos)
        NProgress.done()
      }, 'infos')
    } else {
      browserHistory.push('/')
    }
  }
})
