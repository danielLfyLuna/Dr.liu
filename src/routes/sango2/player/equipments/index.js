import {injectReducer} from '../../../../store/reducers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { browserHistory } from 'react-router'
export default(store) => ({
  path: 'equipments',
  breadcrumbName: '装备数据',
  intlId: 'APP.PLAYER.EQUIPMENTS',
  getComponent(nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(70800)) {
      require.ensure([], (require) => {
        NProgress.start()
        const equipments = require('./containers/EquipmentsContainer').default
        const reducer = require('./modules/EquipmentsModules').default
        injectReducer(store, {
          key: 'equipments',
          reducer
        })
        cb(null, equipments)
        NProgress.done()
      }, 'equipments')
    } else {
      browserHistory.push('/')
    }
  }
})
