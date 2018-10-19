import { injectReducer } from '../../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'templates',
  breadcrumbName: '活动模板列表',
  intlId: 'APP.ACTIVITY.ACTIVITIES.TEMPLATES',
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./allTemplates').default(store)
      ])
    })
  },
  getIndexRoute(location, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(90100)) {
      require.ensure([], (require) => {
        const Index = require('./components/Index').default
        const reducer = require('../index/modules/Module').default
        injectReducer(store, { key: 'activities', reducer })
        cb(null, {component: Index})
      })
    } else {
      browserHistory.push('/')
    }
  }
})
