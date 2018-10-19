import { injectReducer } from '../../../../../store/reducers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'index',
  breadcrumbName: '活动列表',
  intlId: 'APP.ACTIVITY.ACTIVITIES.INDEX',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(90100)) {
      require.ensure([], (require) => {
        NProgress.start()
        const index = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'activities', reducer })
        cb(null, index)
        NProgress.done()
      })
    } else {
      browserHistory.push('/')
    }
  }
})
