import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path: 'menus',
  breadcrumbName: '菜单列表',
  intlId: 'APP.USER.MENUS',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Index = require('./components/Index').default
      const reducer = require('../permissions/modules/Module').default
      injectReducer(store, { key: 'permission', reducer })
      cb(null, Index)
    })
  }
})
