export default (store) => ({
  path: 'gamesale',
  breadcrumbName: 'GS管理',
  intlId: 'APP.GAMESALE',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./index/index').default(store),
        require('./orders').default(store),
        require('./approves').default(store),
        require('./managers').default(store)
      ])
    })
  }
})
