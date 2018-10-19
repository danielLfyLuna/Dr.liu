import {injectReducer} from '../../../../store/reducers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { browserHistory } from 'react-router'
export default(store) => ({
  path: 'mailMaxPrice',
  breadcrumbName: '邮件道具价格上限',
  intlId: 'APP.MAIL.MAILMAXPRICE',
  getComponent(nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(50100)) {
      require.ensure([], (require) => {
        NProgress.start()
        const Mails = require('./components/Index').default
        const reducer = require('./modules/Module').default
        injectReducer(store, {
          key: 'mailMaxPrice',
          reducer
        })
        cb(null, Mails)
        NProgress.done()
      }, 'mailMaxPrice')
    } else {
      browserHistory.push('/')
    }
  }
})
