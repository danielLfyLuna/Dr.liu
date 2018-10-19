import { injectReducer } from '../../../../store/reducers'
import { browserHistory } from 'react-router'
export default (store) => ({
  path: 'worldCup',
  breadcrumbName: '世界杯',
  intlId: 'APP.ACTIVITY.WORLDCUP',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(90200)) {
      require.ensure([], (require) => {
        const Index = require('./components/Index').default
        const reducer = require('./modules/Module').default
        const reducers = require('./modules/AmendModule').default
        injectReducer(store, { key: 'worldCup', reducer })
        injectReducer(store, { key: 'worldCupServer', reducer: reducers })
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
