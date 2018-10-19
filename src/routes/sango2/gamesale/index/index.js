import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'index',
  breadcrumbName: '用户纳入列表',
  intlId: '用户纳入列表',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(160100)) {
      require.ensure([], (require) => {
        const Index = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'gamesale', reducer })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
