import appLocaleData from 'react-intl/locale-data/zh'
import enMessages from './locales/zh-CN.json'

const appLocale = {
  messages: {
    ...enMessages,
  },
  antd: null,
  locale: 'zh-CN',
  data: appLocaleData
}

export default appLocale
