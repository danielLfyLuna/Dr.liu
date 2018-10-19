import rankType from './rankType'

export default (store) => ({
  path: 'rank',
  breadcrumbName: '排行榜',
  intlId: 'APP.RANK',
  childRoutes: [
    rankType(store)
  ]
})
