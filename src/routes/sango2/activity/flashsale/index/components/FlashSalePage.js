import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
// import _ from 'lodash'

import List from './List'
import Filter from './Filter'

export default class FlashSalePage extends Component {

  static propTypes = {
    fetchFlashSales: PropTypes.func.isRequired,
    flashSales: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    fetchProductsMap: PropTypes.func.isRequired,
    keepFlash: PropTypes.func.isRequired
  }

  state = {
    fields: {
      products: this.props.flashSales.keeping
    }
  }

  // 双向数据绑定
  handleFormChange = (changedFields) => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields }
    })
  }

  handleSearch = (data) => {
    this.props.fetchFlashSales(data)
  }

  render() {
    const { products: {options}, flashSales: {keeping} } = this.props

    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            initialFiler={keeping}
            options={options}
            {...this.state.fields}
            onChange={this.handleFormChange}
            handleSearch={this.handleSearch}
          />
          <List
            data={this.props.flashSales}
          />
        </Card>
      </div>
    )
  }

  componentWillMount() {
    this.props.fetchProductsMap()
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.props.keepFlash(this.state.fields.products)
  }
}
