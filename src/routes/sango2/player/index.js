import infos from './infos'
import kickout from './kickout'
import baseInfos from './baseinfos'
import resetarmy from './resetarmy'
import logs from './logs'
import horse from './horse'
import skill from './skill'
import soldiers from './soldiers'
import equipments from './equipments'
import headImage from './headImage'
import nickname from './nickname'
import weapon from './weapon'


export default (store) => ({
  path: 'player',
  breadcrumbName: '玩家数据',
  intlId: 'APP.PLAYER',
  childRoutes: [
    infos(store),
    kickout(store),
    baseInfos(store),
    resetarmy(store),
    logs(store),
    skill(store),
    equipments(store),
    soldiers(store),
    headImage(store),
    horse(store),
    nickname(store),
    weapon(store)
  ]
})
