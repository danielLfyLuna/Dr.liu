import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'

export default class Products extends Component {

  componentWillMount() {
    this.props.fetchProducts()
  }

  onSearch = () => {
    this.props.fetchProducts()
  }

  onClear = () => {
    this.props.clearProducts()
  }

  onReloadItem = (fields) => {
    this.props.reloadProduct(fields)
  }

  onCreate = (fields) => {
    this.props.createProduct(fields)
  }

  onUpdate = (fields) => {
    this.props.updateProduct(fields)
  }

  render() {
    const {login: {curd}} = this.props
    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            curd={curd}
            onSearch={this.onSearch}
            onCreate={this.onCreate}
            onClear={this.onClear}
          />
          <List
            curd={curd}
            onUpdate={this.onUpdate}
            onReloadItem={this.onReloadItem}
            data={this.props.product}
           />
        </Card>
      </div>
    )
  }
}

Products.propTypes = {
  fetchProducts: PropTypes.func,
  clearProducts: PropTypes.func,
  createProduct: PropTypes.func,
  updateProduct: PropTypes.func,
  login: PropTypes.object.isRequired,
  reloadProduct: PropTypes.func,
  product: PropTypes.object
}
