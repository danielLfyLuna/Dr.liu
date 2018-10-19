import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'chargeLog',
  breadcrumbName: '后台充值日志',
  intlId: '后台充值日志',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(40400)) {
      require.ensure([], (require) => {
        const Index = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'chargeLog', reducer })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
