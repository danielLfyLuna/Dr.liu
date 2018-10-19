// 我们只需要导入初始渲染所需的模块
import moment from 'moment'
import 'moment/locale/zh-cn'

import LayoutsContainer from '../containers/LayoutsContainer.js'
import HomeContainer from './Home/containers/HomeContainer.js'

import sango2 from './sango2'
import users from './user'
import PageNotFound from './PageNotFound'
import pwdChange from './pwdChange'
import userkey from './userkey'
import Redirect from './PageNotFound/redirect'

import {injectReducer} from '../store/reducers'
import {default as loginReducer} from './../modules/login.js'
import { default as globalsReducer } from './../modules/globals'
import {default as itemsReducer} from './../modules/items.js'
import {default as visibleReducer} from './../modules/visible.js'
import {default as groupsReducer} from '../modules/groups'
import {default as productsReducer} from '../modules/products'
import {default as productsCellReducer} from '../modules/productsCell'
import {default as channelsReducer} from '../modules/channels'
import {default as goodsReducer} from '../modules/goods'
import {default as playersReducer} from '../modules/players'
import {default as homeReducer} from './Home/modules/Module'
import {default as priceReducer} from '../modules/itemPrice'
import {default as mailMaxReducer} from '../modules/mailMax'

moment.locale('zh-cn')
moment.updateLocale('zh-cn', {
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_')
})

export default (store) => ({
  path: '/',
  breadcrumbName: '主页',
  intlId: 'APP.HOME',
  getComponent(nextState, cb) {
    injectReducer(store, {
      key: 'islogin',
      reducer: loginReducer
    })
    injectReducer(store, {
      key: 'globals',
      reducer: globalsReducer
    })
    injectReducer(store, {
      key: 'items',
      reducer: itemsReducer
    })
    injectReducer(store, {
      key: 'visible',
      reducer: visibleReducer
    })
    injectReducer(store, {
      key: 'groups',
      reducer: groupsReducer
    })
    injectReducer(store, {
      key: 'products',
      reducer: productsReducer
    })
    injectReducer(store, {
      key: 'productsCell',
      reducer: productsCellReducer
    })
    injectReducer(store, {
      key: 'channels',
      reducer: channelsReducer
    })
    injectReducer(store, {
      key: 'goods',
      reducer: goodsReducer
    })
    injectReducer(store, {
      key: 'players',
      reducer: playersReducer
    })
    injectReducer(store, {
      key: 'itemPrice',
      reducer: priceReducer
    })
    injectReducer(store, {
      key: 'mailMax',
      reducer: mailMaxReducer
    })
    injectReducer(store, {
      key: 'homes',
      reducer: homeReducer
    })
    cb(null, LayoutsContainer)
  },
  getIndexRoute(location, callback) {
    callback(null, {component: HomeContainer})
  },
  childRoutes: [
    sango2(store),
    users(store),
    PageNotFound(),
    pwdChange(store),
    userkey(store),
    Redirect
  ]
})
