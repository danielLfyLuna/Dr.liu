import consumes from './consumes'
import operations from './operations'
import produces from './produces'
import actions from './actions'
import sqls from './sqls'
import datachanges from './datachanges'
import logSource from './logSource'

export default (store) => ({
  path: 'log',
  breadcrumbName: '日志',
  intlId: 'APP.LOG',
  childRoutes: [
    consumes(store),
    operations(store),
    actions(store),
    produces(store),
    datachanges(store),
    sqls(store),
    logSource(store)
  ]
})
