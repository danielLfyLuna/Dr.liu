import {injectReducer} from '../../../../../store/reducers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { browserHistory } from 'react-router'
export default(store) => ({
  path: 'index',
  breadcrumbName: '联盟邮件页',
  intlId: 'APP.MAIL.ALLIANCEMAIL.INDEX',
  getComponent(nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(50400)) {
      require.ensure([], (require) => {
        NProgress.start()
        const Mails = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default

        injectReducer(store, {
          key: 'allianceMail',
          reducer
        })
        cb(null, Mails)
        NProgress.done()
      }, 'allianceMail')
    } else {
      browserHistory.push('/')
    }
  }
})
