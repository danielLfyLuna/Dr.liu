import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'index',
  breadcrumbName: '黑名单列表',
  intlId: 'APP.BLACKLIST.INDEX',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(80100)) {
      require.ensure([], (require) => {
        const Index = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'blacklist', reducer })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
