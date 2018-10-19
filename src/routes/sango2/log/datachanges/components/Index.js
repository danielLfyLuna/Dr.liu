import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'

export default class LogProducesPage extends Component {

  static propTypes = {
    datachange: PropTypes.object,
    login: PropTypes.object,
    clearDatachange: PropTypes.func,
    fetchDatachange: PropTypes.func,
    exportDatachange: PropTypes.func,
    datachangeSources: PropTypes.func,
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
      'datachangeSourceList': {
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
    this.props.fetchDatachange(fieldsValue)
    this.setState({
      initial: {
        ...this.state.initial,
        products: fieldsValue.products
      }
    })
  }

  // 导出
  onSubmit = (fieldsValue) => {
    this.props.exportDatachange(fieldsValue)
  }

  // Table 和 Filter 数据组装一起，提交Fetch 查询
  onTableChange = (pagination) => {
    let newFilter = {
      list: {}
    }
    newFilter.list.nickname = this.state.fields.nickname.value
    newFilter.list.playerId = this.state.fields.playerId.value
    newFilter.products = this.state.fields.products.value
    newFilter.list.dataChangeType = this.state.fields.datachangeSourceList.value[0]
    newFilter.list.startTime = this.state.fields['range-time-picker'].value[0].format('YYYY-MM-DD HH:mm:ss')
    newFilter.list.endTime = this.state.fields['range-time-picker'].value[1].format('YYYY-MM-DD HH:mm:ss')
    newFilter.list.pageSize = pagination.pageSize
    newFilter.list.pageNum = pagination.current

    this.props.fetchDatachange(newFilter)
  }

  onRender = (initials) => {
    this.state.initials.renderState = initials.renderState
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    this.props.datachangeSources()
    this.setState({
      initial: {
        ...this.state.initial,
        ...this.props.datachange.keeping
      }
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.initials.renderState
  }

  componentWillUnmount() {
    this.props.keepInitial({
      ...this.state.initial
    })
    this.props.clearDatachange()
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
          datachange={this.props.datachange}
          datachangeSources={this.props.datachangeSources}
          onSubmit={this.onSubmit}
          onRender={this.onRender}
          initial={this.state.initial}
        />
        <List
          onTableChange={this.onTableChange}
          data={this.props.datachange}
        />
      </Card>
    )
  }

}
