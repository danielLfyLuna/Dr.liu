export default (store) => ({
  path: 'authentic',
  breadcrumbName: '白名单管理',
  intlId: 'APP.AUTHENTIC',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./index/index').default(store),
        require('./noPass').default(store)
      ])
    })
  }
})
