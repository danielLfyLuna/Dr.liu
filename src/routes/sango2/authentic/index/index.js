import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'index',
  breadcrumbName: '白名单列表',
  intlId: 'APP.AUTHENTIC.INDEX',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(140100)) {
      require.ensure([], (require) => {
        const Index = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'authentic', reducer })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
