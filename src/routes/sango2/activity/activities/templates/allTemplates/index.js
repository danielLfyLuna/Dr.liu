import { injectReducer } from '../../../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'allTemplates',
  breadcrumbName: '批量配置活动',
  // intlId: 'APP.ACTIVITY.ACTIVITIES.TEMPLATES',
  intlId: '123454235',
  getComponent(nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(90100)) {
      require.ensure([], (require) => {
        const Index = require('./components/Index').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'allTemplates', reducer })

        const listReducer = require('../templateDetails/modules/Module').default
        injectReducer(store, { key: 'allTemplatesList', reducer: listReducer })

        const detailReducer = require('../templateDetails/modules/DetailModule').default
        injectReducer(store, { key: 'temDetail', reducer: detailReducer })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
