export default (store) => ({
  path: 'serverMail',
  breadcrumbName: '全服邮件',
  intlId: 'APP.MAIL.SERVERMAIL',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./index/index').default(store),
        require('./details').default(store)
      ])
    })
  }
})
