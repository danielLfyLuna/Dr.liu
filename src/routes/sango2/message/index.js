import msgIndex from './msgIndex'
import newTemp from './newTemp'
import msgCtx from './msgCtx'
import tempIndex from './tempIndex'

export default (store) => ({
  path: 'message',
  breadcrumbName: '短信',
  intlId: '短信',
  childRoutes: [
    msgIndex(store),
    newTemp(store),
    msgCtx(store),
    tempIndex(store)
  ]
})
