import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
// import _ from 'lodash'

import Filter from './Filter'
import List from './List'

export default class Index extends Component {

  static propTypes = {
    fetchUserForbid: PropTypes.func,
    addUserForbid: PropTypes.func,
    removeUserForbid: PropTypes.func,
    fetchProductsMap: PropTypes.func,
    products: PropTypes.object,
    userForbid: PropTypes.object,
    login: PropTypes.object
  }
  
  state = {
  }

  componentWillMount() {
    this.props.fetchProductsMap()
  }

  onSearch = (fields) => {
    this.props.fetchUserForbid(fields)
  }

  onAdd = (fields) => {
    this.props.addUserForbid(fields)
  }

  onRemove = (fields) => {
    this.props.removeUserForbid(fields)
  }

  render() {
    const { login: {curd} } = this.props

    let options = []
    if (this.props.products.options) {
      options = this.props.products.options
    }

    return (
      <Card style={{marginBottom: 6}}>
        <Filter
          curd={curd}
          options={options}
          onSearch={this.onSearch}
          onAdd={this.onAdd}
        />
        <List
          curd={curd}
          data={this.props.userForbid.list}
          onRemove={this.onRemove}
        />
      </Card>
    )
  }

}
