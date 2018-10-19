import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path: 'globalPlayer',
  breadcrumbName: '玩家所在服务器',
  intlId: 'APP.CHANNEL.GLOBALPLAYER',
  // 异步获取组件，getComponent仅在路由匹配时调用
  getComponent (nextState, cb) {
    // Webpack - 使用'require.ensure' 异步加载模块
    require.ensure([], (require) => {
      NProgress.start()
      // Webpack - 使用require回调来定义绑定的依赖关系
      const actions = require('./containers/IndexContainer').default
      const reducer = require('./modules/Module').default
      injectReducer(store, { key: 'globalPlayer', reducer })
      cb(null, actions)
      NProgress.done()
    })
  }
})
