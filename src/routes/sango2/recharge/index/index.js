import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'index',
  breadcrumbName: '后台充值',
  intlId: 'APP.RECHANGE.INDEX',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(40200)) {
      require.ensure([], (require) => {
        const Index = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'recharge', reducer })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
