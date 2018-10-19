import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'


export default class NoticesUpdatePage extends Component {

  static propTypes = {
    intl: intlShape,
    login: PropTypes.object.isRequired,
    notice: PropTypes.object.isRequired,
    fetchNoticesUpdate: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
    fetchProductsMap: PropTypes.func.isRequired,
    keepUpdate: PropTypes.func.isRequired
  }

  state = {
    fields: {
      'products': this.props.notice.keeping
    }
  }

  // 双向数据绑定
  onChange = (fieldsValue) => {
    this.setState({
      fields: { ...this.state.fields, ...fieldsValue }
    })
  }

  onSearch = (fieldsValue) => {
    this.props.fetchNoticesUpdate(fieldsValue)
  }

  render() {
    const {products: {options}, notice: {keeping}, login: {curd}, intl} = this.props

    return (
      <Card style={{marginBottom: 6}}>
        <Filter
          intl={intl}
          curd={curd}
          initialFiler={keeping}
          {...this.state.fields}
          options={options}
          onChange={this.onChange}
          onSearch={this.onSearch}
        />
        <List
          intl={intl}
          curd={curd}
          options={options}
          data={this.props.notice.notices}
        />
      </Card>
    )
  }

  componentWillMount() {
    this.props.fetchProductsMap()
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.props.keepUpdate(this.state.fields.products)
  }
}
