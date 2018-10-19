import globalPlayer from './globalPlayer'

export default (store) => ({
  path: 'channel',
  breadcrumbName: '全渠道查询',
  intlId: 'APP.CHANNEL',
  childRoutes: [
    globalPlayer(store)
  ]
})
