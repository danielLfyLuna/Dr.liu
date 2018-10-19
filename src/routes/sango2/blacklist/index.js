import users from './userForbid'
import sensitive from './sensitive'
import batch from './batch'

export default (store) => ({
  path: 'blacklist',
  breadcrumbName: '黑名单',
  intlId: 'APP.BLACKLIST',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./index/index').default(store),
        require('./forbid').default(store),
        users(store),
        sensitive(store),
        batch(store)
      ])
    })
  }
})
