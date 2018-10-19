import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'

export default class LogOperationsPage extends Component {

  static propTypes = {
    operation: PropTypes.object,
    login: PropTypes.object,
    fetchLogOperations: PropTypes.func,
    exportLogOperations: PropTypes.func,
    clearLogOperations: PropTypes.func,
    operationSources: PropTypes.func,
    keepInitial: PropTypes.func.isRequired,
    fetchProductsMap: PropTypes.func,
    products: PropTypes.object
  }

  state = {
    initial: {
      products: []
    },
    initials: {
      productId: 1,
      renderState: true
    },
    fields: {
      nickname: {
        value: ''
      },
      playerId: {
        value: ''
      },
      'range-time-picker': {},
      'products': {},
      'operationSourcesList': {
        value: []
      }
    }
  }

  // 双向数据绑定
  onChange = (fieldsValue) => {
    this.setState({
      fields: { ...this.state.fields, ...fieldsValue }
    })
  }

  // 搜索
  onSearch = (fieldsValue) => {
    this.props.fetchLogOperations(fieldsValue)
    this.setState({
      initial: {
        ...this.state.initial,
        products: fieldsValue.products
      }
    })
  }

  // 导出
  onSubmit = (fieldsValue) => {
    this.props.exportLogOperations(fieldsValue)
  }

  // Table 和 Filter 数据组装一起，提交Fetch 查询
  onTableChange = (pagination) => {
    let newFilter = {}
    newFilter.nickname = this.state.fields.nickname.value
    newFilter.playerId = this.state.fields.playerId.value
    newFilter.operationSourcesList = this.state.fields.operationSourcesList.value
    newFilter['products'] = this.state.fields['products'].value
    newFilter['range-time-picker'] = this.state.fields['range-time-picker'].value
    const query = Object.assign({}, newFilter, pagination)
    this.props.fetchLogOperations(query)
  }

  onRender = (initials) => {
    this.state.initials.renderState = initials.renderState
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.initials.renderState
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    this.props.clearLogOperations()
    this.setState({
      initial: {
        ...this.state.initial,
        ...this.props.operation.keeping
      }
    })
  }

  componentWillUnmount() {
    this.props.keepInitial({
      ...this.state.initial
    })
  }

  render() {
    const {login: {curd}} = this.props

    let options = []
    if (this.props.products.options) {
      options = this.props.products.options
    }

    return (
      <Card>
        <Filter
          {...this.state.fields}
          curd={curd}
          options={options}
          onSearch={this.onSearch}
          onChange={this.onChange}
          operation={this.props.operation}
          onSubmit={this.onSubmit}
          onRender={this.onRender}
          operationSources={this.props.operationSources}
          initial={this.state.initial}
        />
        <List
          operation={this.props.operation}
          onTableChange={this.onTableChange}
          data={this.props.operation.operations}
        />
      </Card>
    )
  }

}
