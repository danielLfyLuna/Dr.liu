import { injectReducer } from '../../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'discountList',
  breadcrumbName: '查看折扣',
  intlId: 'APP.ACTIVITY.ACTIVITIES.DISCOUNTLIST',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(90100)) {
      require.ensure([], (require) => {
        const Index = require('./components/Index').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'discount', reducer })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
