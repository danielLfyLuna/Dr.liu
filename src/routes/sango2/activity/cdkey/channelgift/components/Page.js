import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'

let initials = {
  products: {
    productId: ''
  }
}
export default class NoticesLoginPage extends Component {

  state = {
      products: {}
  }

  // 双向数据绑定
  onChange = (fieldsValue) => {
    this.setState({
      fields: { ...this.state.fields, ...fieldsValue }
    })
  }

  onSearch = (fieldsValue) => {
    this.props.fetchChannelGifts(fieldsValue)
    initials.products.productId = fieldsValue.products[0]
  }

  onDelete = (fieldsValue) => {
    this.props.deleteChannelGift(fieldsValue)
  }

  onCreate = (fieldsValue) => {
    this.props.createChannelGift(fieldsValue)
  }

  componentWillMount() {
    this.props.fetchProductsMap()
  }
  render() {
    const {login: {curd}} = this.props
    let options = []
    if (this.props.products.options) {
      options = this.props.products.options
    }
    return (
      <Card style={{marginBottom: 6}}>
        <Filter
          curd={curd}
          {...this.state.fields}
          options={options}
          onChange={this.onChange}
          onSearch={this.onSearch}
          onCreate={this.onCreate}
        />
        <List
          initials={initials}
          options={options}
          onDelete={this.onDelete}
          onUpdate={this.onUpdate}
          data={this.props.cdkey}
        />
      </Card>
    )
  }

}

NoticesLoginPage.propTypes = {
  cdkey: PropTypes.object,
  login: PropTypes.object,
  products: PropTypes.object,
  fetchProductsMap: PropTypes.func,
  fetchChannelGifts: PropTypes.func,
  createChannelGift: PropTypes.func,
  deleteChannelGift: PropTypes.func
}
