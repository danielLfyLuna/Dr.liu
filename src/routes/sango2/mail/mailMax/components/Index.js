import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'

import { connect } from 'react-redux'
import {
  fetchMax,
  updateMax
 } from '../modules/Module'
// import { fetchProductsMap } from '../../../../../modules/products'

const mapDispatchtoProps = {
  fetchMax,
  updateMax
}
const mapStatetoProps = (state) => ({
  mailMaxPrice: state.mailMaxPrice,
  login: state.islogin
})

@connect(mapStatetoProps, mapDispatchtoProps)
export default class Index extends Component {
  static propTypes = {
    mailMaxPrice: PropTypes.object,
    login: PropTypes.object,
    fetchMax: PropTypes.func,
    updateMax: PropTypes.func
  }

  onSearch = (value) => {
    this.props.fetchMax(value)
  }

  onEdit = (value) => {
    this.props.updateMax(value)
  }

  render() {
    const { mailMaxPrice, login } = this.props
    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            login={login}
            onSearch={this.onSearch}
          />
          <List
            login={login}
            onEdit={this.onEdit}
            mailMaxPrice={mailMaxPrice}
          />
        </Card>
      </div>
    )
  }
}
