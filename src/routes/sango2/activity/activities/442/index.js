import { injectReducer } from '../../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: '442',
  breadcrumbName: '坐骑技能',
  intlId: 'APP.ACTIVITY.ACTIVITIES.442',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(90100)) {
      require.ensure([], (require) => {
        const Index = require('./components/Index').default
        const reducer = require('../index/modules/Module').default
        injectReducer(store, { key: 'activities', reducer })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
