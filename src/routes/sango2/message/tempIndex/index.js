import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'

export default (store) => ({
  path: 'tempIndex',
  breadcrumbName: '模板列表',
  intlId: '模板列表',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(190100)) {
      require.ensure([], (require) => {
        const Index = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'temps', reducer })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
