import cells from './cells'
import groups from './groups'
import products from './products'
import servers from './servers'
import timingservers from './timingservers'
import versions from './versions'
import merge from './merge'

export default (store) => ({
  path: 'centra',
  breadcrumbName: '中控',
  intlId: 'APP.CENTRA',
  childRoutes: [
    cells(store),
    groups(store),
    products(store),
    servers(store),
    timingservers(store),
    versions(store),
    merge(store)
  ]
})
