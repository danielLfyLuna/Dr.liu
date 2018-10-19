import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'products',
  breadcrumbName: '产品列表',
  intlId: '产品列表',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(20100)) {
      require.ensure([], (require) => {
        const products = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'product', reducer })
        cb(null, products)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
