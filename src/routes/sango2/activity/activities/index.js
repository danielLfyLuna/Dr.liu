export default (store) => ({
  path: 'activities',
  breadcrumbName: '所有活动',
  intlId: 'APP.ACTIVITY.ACTIVITIES',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./index/index.js').default(store),
        require('./templates').default(store),
        require('./108').default(store),
        require('./401').default(store),
        require('./402').default(store),
        require('./405').default(store),
        require('./406').default(store),
        require('./407').default(store),
        require('./408').default(store),
        require('./409').default(store),
        require('./410').default(store),
        require('./415').default(store),
        require('./417').default(store),
        require('./418').default(store),
        require('./420').default(store),
        require('./422').default(store),
        require('./429').default(store),
        require('./430').default(store),
        require('./431').default(store),
        require('./433').default(store),
        require('./434').default(store),
        require('./441').default(store),
        require('./442').default(store),
        require('./601').default(store),
        require('./602').default(store),
        require('./604').default(store),
        require('./607').default(store),
        require('./discountList').default(store)
      ])
    })
  }
})
