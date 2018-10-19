export default (store) => ({
  path: 'alliance',
  breadcrumbName: '联盟数据',
  intlId: 'APP.ALLIANCE',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./index/index').default(store),
        require('./member').default(store)
      ])
    })
  }
})
