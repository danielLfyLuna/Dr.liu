import centra from './centra'
import notices from './notices'
import mail from './mail'
import authentic from './authentic'
import channel from './channel'
import log from './log'
// import user from './user'
import recharge from './recharge'
import player from './player'
import blacklist from './blacklist'
import activity from './activity'
// import document from './document'
import trade from './trade'
import rank from './rank'
import items from './items'
import alliance from './alliance'
import gamesale from './gamesale'
import answerQuestion from './aq'
import message from './message'
import welfare from './welfare'

export default (store) => ({
  path: 'sango2',
  breadcrumbName: '三国2',
  intlId: 'APP.SANGO2',
  childRoutes: [
    centra(store),
    notices(store),
    mail(store),
    log(store),
    // user(store),
    recharge(store),
    channel(store),
    authentic(store),
    player(store),
    blacklist(store),
    activity(store),
    rank(store),
    items(store),
    // document(store)
    trade(store),
    alliance(store),
    gamesale(store),
    answerQuestion(store),
    message(store),
    welfare(store)
  ]
})
