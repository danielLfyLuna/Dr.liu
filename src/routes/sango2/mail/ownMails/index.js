export default (store) => ({
  path: 'ownMail',
  breadcrumbName: '个人邮件',
  intlId: 'APP.MAIL.OWNMAIL',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./index/index').default(store),
        require('./details').default(store)
      ])
    })
  }
})
