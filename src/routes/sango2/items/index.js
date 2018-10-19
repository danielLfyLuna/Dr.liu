import sync from './sync'
import blackList from './blackList'
import itemMax from './itemMax'

export default (store) => ({
  path: 'items',
  breadcrumbName: '物品管理',
  intlId: '物品管理',
  childRoutes: [
    sync(store),
    blackList(store),
    itemMax(store)
  ]
})
