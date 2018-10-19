import { browserHistory } from 'react-router'
export default (store) => ({
  path: '401',
  breadcrumbName: '充值返利',
  intlId: 'APP.ACTIVITY.ACTIVITIES.401',
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
