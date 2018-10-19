import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import { LocaleProvider } from 'antd'

import appLocales, { transtion } from '../intl/locale'

let language = ''
const locale = localStorage.getItem('locale')
if (locale) {
  language = locale
} else {
  language = transtion.languages[transtion.transLocale(navigator.language)]
  localStorage.setItem('locale', language)
}
addLocaleData(appLocales[language].data)

export default class AppContainer extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      locale: language
    }
  }

  componentWillMount() {
  }

  render() {
    const { store, routes } = this.props
    const { locale } = this.state
    const appLocale = appLocales[locale]

    return (
      <LocaleProvider locale={appLocale.antd}>
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
          <Provider store={store}>
            <div className='AppContainer'>
              <Router history={browserHistory} children={routes} />
            </div>
          </Provider>
        </IntlProvider>
      </LocaleProvider>
    )
  }
}
