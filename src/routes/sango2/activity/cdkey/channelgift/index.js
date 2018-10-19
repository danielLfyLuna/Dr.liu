import { injectReducer } from '../../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'channelgift',
  breadcrumbName: '渠道兑换码对应CDKey',
  intlId: 'APP.CDKEY.CHANNELGIFT',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(30300)) {
      require.ensure([], (require) => {
        const Index = require('./components/Index').default
        const reducer = require('../list/modules/Module').default
        injectReducer(store, { key: 'cdkey', reducer })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
