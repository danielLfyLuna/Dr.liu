import { browserHistory } from 'react-router'
export default (store) => ({
  path: '420',
  breadcrumbName: '钻石进阶礼包',
  intlId: 'APP.ACTIVITY.ACTIVITIES.420',
  getComponent (nextState, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(90100)) {
      require.ensure([], (require) => {
        const Index = require('./components/Index').default
        cb(null, Index)
      })
    } else {
      browserHistory.push('/')
    }
  }
})
