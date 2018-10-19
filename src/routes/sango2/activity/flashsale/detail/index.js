import { injectReducer } from '../../../../../store/reducers.js'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'action',
  breadcrumbName: '详情',
  intlId: '详情',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(90200)) {
      require.ensure([], (require) => {
        const DetailContainer = require('./containers/DetailContainer').default
        const reducer = require('./modules/DteailModules').default
        injectReducer(store, { key: 'flashSaleDetail', reducer })
        cb(null, DetailContainer)
      })
    } else {
      browserHistory.push('/')
    }
  },
  indexRoute: {
    onEnter (params, replace) { // nextState, replace, callback?
      console.log(params)
      if (!store.getState().islogin) {
        replace('/sango2/activity/flashsale/index')
      }
    }
  }
})
