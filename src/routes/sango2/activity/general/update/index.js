import { injectReducer } from '../../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'update',
  breadcrumbName: '集将活动修改详情',
  intlId: 'APP.ACTIVITY.GENERALUPDATE',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))
    if (subMenu) {
      require.ensure([], (require) => {
        const Index = require('./Update').default
        const reducer = require('../modules/Module').default
        injectReducer(store, { key: 'general', reducer })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
