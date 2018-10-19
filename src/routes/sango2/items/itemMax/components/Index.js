import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
// import _ from 'lodash'

import Filter from './Filter'
import List from './List'

export default class Trades extends Component {
  state = {}

  onSearch = () => {
    this.props.fetchItemPrice()
  }

  onUpdate = (v) => {
    this.props.updateItemMax(v)
  }

  onUpload = (v) => {
    this.props.uploadItemMax(v)
  }

  componentWillMount() {
  }

  render() {
    const { itemPrice, login } = this.props
    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            onSearch={this.onSearch}
            onUpload={this.onUpload}
            login={login}
          />
          <List
            itemPrice={itemPrice}
            onUpdate={this.onUpdate}
            login={login}
           />
        </Card>
      </div>
    )
  }
}

Trades.propTypes = {
  itemPrice: PropTypes.object,
  fetchItemPrice: PropTypes.func,
  updateItemMax: PropTypes.func,
  uploadItemMax: PropTypes.func,
  login: PropTypes.object
}
