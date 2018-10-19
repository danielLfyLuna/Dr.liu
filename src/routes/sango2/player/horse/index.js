import {injectReducer} from '../../../../store/reducers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { browserHistory } from 'react-router'
export default(store) => ({
  path: 'horse',
  breadcrumbName: '坐骑背包',
  intlId: 'APP.PLAYER.HORSE',
  getComponent(nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(70500)) {
      require.ensure([], (require) => {
        NProgress.start()
        const horse = require('./containers/HorseContainer').default
        const reducer = require('./modules/HorseModules').default
        injectReducer(store, {
          key: 'horse',
          reducer
        })
        cb(null, horse)
        NProgress.done()
      }, 'horse')
    } else {
      browserHistory.push('/')
    }
  }
})
