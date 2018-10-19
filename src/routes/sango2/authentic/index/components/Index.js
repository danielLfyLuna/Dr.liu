import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { intlShape } from 'react-intl'

import Filter from './Filter'
import List from './List'

export default class Authentics extends Component {

  onGet = () => {
    this.props.fetchAuthentics()
  }

  onCreate = (values) => {
    this.props.addAuthentic(values)
  }

  onDelete = (values) => {
    this.props.delAuthentic(values)
  }

  render() {
    const { authentic, login, intl } = this.props
    const options = {
      authentic,
      login,
      authorize: login.authorize
    }

    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            intl={intl}
            options={options}
            onCreate={this.onCreate}
            onGet={this.onGet}
          />
          <List
            intl={intl}
            options={options}
            onDelete={this.onDelete}
          />
        </Card>
      </div>
    )
  }
}

Authentics.propTypes = {
  intl: intlShape,
  authentic: PropTypes.object.isRequired,
  login: PropTypes.object,
  fetchAuthentics: PropTypes.func,
  addAuthentic: PropTypes.func,
  delAuthentic: PropTypes.func
}
