import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { intlShape } from 'react-intl'

import Filter from './Filter'
import List from './List'


export default class NoticesTimingPage extends Component {

  static propTypes = {
    intl: intlShape,
    login: PropTypes.object.isRequired,
    notice: PropTypes.object.isRequired,
    deleteTimingNotice: PropTypes.func.isRequired,
    stopTimingNotice: PropTypes.func.isRequired,
    addTimingNotice: PropTypes.func.isRequired,
    fetchNoticesTiming: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
    fetchProductsMap: PropTypes.func.isRequired,
    keepNoticesTiming: PropTypes.func.isRequired
  }

  state = {
    fields: {
      'products': this.props.notice.keeping,
      'range-time-picker': {},
      'types': {}
    }
  }

  // 双向数据绑定
  onChange = (fieldsValue) => {
    this.setState({
      fields: { ...this.state.fields, ...fieldsValue }
    })
  }

  onSearch = (fieldsValue) => {
    this.props.fetchNoticesTiming(fieldsValue)
  }

  onCreate = (fieldsValue) => {
    this.props.addTimingNotice(fieldsValue)
  }

  onStopItem = (fieldsValue) => {
    this.props.stopTimingNotice(fieldsValue)
  }

  onDeleteItem = (fieldsValue) => {
    this.props.deleteTimingNotice(fieldsValue)
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
          onCreate={this.onCreate}
        />
        <List
          intl={intl}
          curd={curd}
          options={options}
          data={this.props.notice.notices}
          onStopItem={this.onStopItem}
          onDeleteItem={this.onDeleteItem}
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
    this.props.keepNoticesTiming(this.state.fields.products)
  }
}
