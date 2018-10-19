import {injectReducer} from '../../../../store/reducers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { browserHistory } from 'react-router'
export default(store) => ({
  path: 'skill',
  breadcrumbName: '技能数据',
  intlId: 'APP.PLAYER.SKILL',
  getComponent(nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(70600)) {
      require.ensure([], (require) => {
        NProgress.start()
        const skill = require('./containers/SkillContainer').default
        const reducer = require('./modules/SkillModules').default
        injectReducer(store, {
          key: 'skills',
          reducer
        })
        cb(null, skill)
        NProgress.done()
      }, 'skill')
    } else {
      browserHistory.push('/')
    }
  }
})
