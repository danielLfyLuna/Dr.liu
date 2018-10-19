import { injectReducer } from '../../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'list',
  breadcrumbName: '兑换码礼包列表',
  intlId: 'APP.CDKEY.LIST',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(30100)) {
      require.ensure([], (require) => {
        const Index = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'cdkey', reducer })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
