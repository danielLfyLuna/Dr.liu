export default store => ({
  path: 'answerQuestion',
  breadcrumbName: '问答',
  intlId: '问答',
  getChildRoutes(location, cb) {
    require.ensure([], require => {
      cb(null, [
        require('./index/index').default(store),
        require('./switch').default(store),
        require('./editor').default(store)
      ])
    })
  }
})
