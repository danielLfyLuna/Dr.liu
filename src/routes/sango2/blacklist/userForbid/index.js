import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'users',
  breadcrumbName: 'userId封号',
  intlId: 'APP.BLACKLIST.USERS',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Index = require('./containers/IndexContainer').default
      const reducer = require('./modules/Module').default
      injectReducer(store, { key: 'userForbid', reducer })
      cb(null, Index)
    })
  }
})
