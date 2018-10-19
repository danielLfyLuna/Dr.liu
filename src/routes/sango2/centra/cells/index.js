import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'cells',
  breadcrumbName: '节点列表',
  intlId: '节点列表',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(20200)) {
      require.ensure([], (require) => {
        const cells = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'cell', reducer })
        cb(null, cells)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
