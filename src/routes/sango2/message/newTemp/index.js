import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'

export default (store) => ({
  path: 'newTemp',
  breadcrumbName: '新建模板',
  intlId: '新建模板',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(190100)) {
      require.ensure([], (require) => {
        const Index = require('./containers/IndexContainer').default
        const reducer = require('./../msgIndex/modules/Module').default
        injectReducer(store, { key: 'message', reducer })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
