import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'noPass',
  breadcrumbName: '免密白名单',
  intlId: 'APP.AUTHENTIC.NOPASS',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(140200)) {
      require.ensure([], (require) => {
        const Index = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'noPass', reducer })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
