import React, { Component } from 'react'
import { intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'


export default class Index extends Component {
  static propTypes = {
    intl: intlShape,
    fetchSEN: PropTypes.func,
    addSEN: PropTypes.func,
    syncSEN: PropTypes.func,
    fetchProductsMap: PropTypes.func,
    sensitive: PropTypes.object,
    products: PropTypes.object,
    login: PropTypes.object
  }

  onSearch = (fieldsValue) => {
    this.props.fetchSEN(fieldsValue)
  }

  onAdd = (fieldsValue) => {
    this.props.addSEN(fieldsValue)
  }

  onSync = (fieldsValue) => {
    this.props.syncSEN(fieldsValue)
  }

  componentWillMount() {
    this.props.fetchProductsMap()
  }
  render() {
    const { login: { curd }, intl } = this.props
    let options = []
    if (this.props.products.options) {
      options = this.props.products.options
    }
    return (
      <div>
        <Card style={{marginBottom: 6}}>
          <Filter
            onSearch={this.onSearch}
            onAdd={this.onAdd}
            onSync={this.onSync}
            options={options}
            curd={curd}
            intl={intl}
          />
          <List
            data={this.props.sensitive}
          />
        </Card>
      </div>
    )
  }

}
