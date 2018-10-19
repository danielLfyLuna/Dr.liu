import { injectReducer } from '../../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: '602',
  breadcrumbName: '战力达人',
  intlId: 'APP.ACTIVITY.ACTIVITIES.602',
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
