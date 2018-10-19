import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'general',
  breadcrumbName: '集将活动',
  intlId: 'APP.ACTIVITY.GENERAL',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu) {
      require.ensure([], (require) => {
        const Index = require('./components/Index').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'general', reducer })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
