export default (store) => ({
  path: 'flashsale',
  breadcrumbName: '限时活动-热卖',
  intlId: '限时活动-热卖',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./index/index.js').default(store),
        require('./detail').default(store)
      ])
    })
  }
})
