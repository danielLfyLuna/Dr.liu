export default () => ({
  path: '404',
  breadcrumbName: '404',
  intlId: 'APP.404',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const PageNotFound = require('./components/PageNotFound').default
      cb(null, PageNotFound)
    }, 'PageNotFound')
  }
})
