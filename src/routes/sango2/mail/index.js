import mails from './mails'
import batchmail from './batchmails'
import ownMail from './ownMails'
import serverMail from './serverMails'
import allianceMail from './allianceMails'
import skillMail from './skillMails'
import mailMaxPrice from './mailMax'

export default (store) => ({
  path: 'mail',
  breadcrumbName: '邮件',
  intlId: 'APP.MAIL',
  childRoutes: [
    mails(store),
    batchmail(store),
    ownMail(store),
    serverMail(store),
    allianceMail(store),
    skillMail(store),
    mailMaxPrice(store)
  ]
})
