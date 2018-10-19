import { browserHistory } from 'react-router'
export default (store) => ({
  path: '410',
  breadcrumbName: '幸运装备礼包',
  intlId: 'APP.ACTIVITY.ACTIVITIES.410',
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
