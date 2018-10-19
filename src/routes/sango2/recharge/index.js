export default (store) => ({
  path: 'recharge',
  breadcrumbName: '充值管理',
  intlId: 'APP.RECHANGE',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./index/index').default(store),
        require('./orders').default(store),
        require('./rates').default(store),
        require('./reset').default(store),
        require('./chargeLog').default(store)
      ])
    })
  }
})
