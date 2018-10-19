export default (store) => ({
  path: 'cdkey',
  breadcrumbName: '兑换码礼包',
  intlId: 'APP.CDKEY',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./list/index').default(store),
        require('./query').default(store),
        require('./channelgift').default(store),
        require('./setCDKey').default(store)
      ])
    })
  }
})
