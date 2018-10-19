import flashsale from './flashsale'
import activities from './activities'
import cdkey from './cdkey'
import worldCup from './worldCup'
import general from './general'
import update from './general/update/index'

export default (store) => ({
  path: 'activity',
  breadcrumbName: '活动配置',
  intlId: 'APP.ACTIVITY',
  childRoutes: [
    flashsale(store),
    activities(store),
    cdkey(store),
    worldCup(store),
    general(store),
    update(store)
  ]
})
