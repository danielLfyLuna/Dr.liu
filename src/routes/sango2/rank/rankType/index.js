import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { browserHistory } from 'react-router'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'rankType',
  breadcrumbName: '排行榜查询',
  intlId: 'APP.RANK.RANKTYPE',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(110100)) {
      require.ensure([], (require) => {
        NProgress.start()
        const rankTypes = require('./containers/IndexContainer').default
        const reducer = require('./../Module').default
        injectReducer(store, { key: 'rank', reducer })
        cb(null, rankTypes)
        NProgress.done()
      })
    } else {
      browserHistory.push('/')
    }
  }
})
