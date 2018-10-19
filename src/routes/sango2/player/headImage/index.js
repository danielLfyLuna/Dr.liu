import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'headImage',
  breadcrumbName: '头像审核',
  intlId: 'APP.PLAYER.HEADIMAGE',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(70900)) {
      require.ensure([], (require) => {
        const merges = require('./containers/IndexContainer').default
        const reducer = require('./modules/Module').default
        injectReducer(store, { key: 'headImage', reducer })
        cb(null, merges)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
