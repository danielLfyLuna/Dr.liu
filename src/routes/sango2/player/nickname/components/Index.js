import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'


export default class Index extends Component {
  static propTypes = {
    fetchNICK: PropTypes.func,
    fetchProductsMap: PropTypes.func,
    nickname: PropTypes.object,
    products: PropTypes.object,
    login: PropTypes.object
  }

  onSearch = (fieldsValue) => {
    this.props.fetchNICK(fieldsValue)
  }

  componentWillMount() {
    this.props.fetchProductsMap()
  }

  render() {
    const { curd } = this.props.login
    let options = []
    if (this.props.products.options) {
      options = this.props.products.options
    }

    return (
      <div>
        <Card style={{marginBottom: 6}}>
          <Filter
            onSearch={this.onSearch}
            options={options}
            curd={curd}
          />
          <List
            data={this.props.nickname.list}
          />
        </Card>
      </div>
    )
  }

}
