import { browserHistory } from 'react-router'
export default (store) => ({
  path: '405',
  breadcrumbName: '每日充值',
  intlId: 'APP.ACTIVITY.ACTIVITIES.405',
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
