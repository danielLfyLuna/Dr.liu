import {injectReducer} from '../../../../../store/reducers'
import { browserHistory } from 'react-router'
export default(store) => ({
  path: 'details',
  breadcrumbName: '查看邮件详情',
  intlId: 'APP.MAIL.OWNMAIL.DETAILS',
  getComponent(nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(50300)) {
      require.ensure([], (require) => {
        const details = require('./containers/DetailsContainer').default
        const reducer = require('./modules/DetailsModule').default

        injectReducer(store, {
          key: 'ownMailDetail',
          reducer
        })
        cb(null, details)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
