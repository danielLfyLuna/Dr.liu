import login from './login'
import timing from './timing'
import update from './update'
import mergeNotice from './mergeNotice'
import maintenanceTip from './maintenance'

export default (store) => ({
  path: 'notices',
  breadcrumbName: '公告',
  intlId: 'APP.NOTICES',
  childRoutes: [
    login(store),
    timing(store),
    update(store),
    mergeNotice(store),
    maintenanceTip(store)
  ]
})
