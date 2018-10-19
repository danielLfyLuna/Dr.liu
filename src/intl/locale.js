import enUS from './en-US'
import zhCN from './zh-CN'
import viVN from './vi-VN'

const appLocales = {
  'en-US': enUS,
  'zh-CN': zhCN,
  'vi-VN': viVN
}

const languages = {
  'zh': 'zh-CN',
  'en': 'en-US',
  'vi': 'vi-VN'
}

function transLocale(language) {
  return language.split('-')[0].split('_')[0]
}

export const transtion = {
  languages,
  transLocale
}

export default appLocales
