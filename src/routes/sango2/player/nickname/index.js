import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { browserHistory } from 'react-router'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'nickname',
  breadcrumbName: '历史昵称',
  intlId: 'APP.PLAYER.NICKNAME',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(71000)) {
      require.ensure([], (require) => {
        NProgress.start()
        const notices = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'nickname', reducer })
        cb(null, notices)
        NProgress.done()
      })
    } else {
      browserHistory.push('/')
    }
  }
})
