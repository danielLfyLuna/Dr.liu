import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'


export default class LogActionsPage extends Component {

  static propTypes = {
    action: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    exportLogActions: PropTypes.func.isRequired,
    fetchLogActions: PropTypes.func.isRequired,
    clearLogActions: PropTypes.func.isRequired,
    fetchConsumeSources: PropTypes.func.isRequired,
    fetchOperationType: PropTypes.func.isRequired,
    fetchProduceSources: PropTypes.func.isRequired,
    keepInitial: PropTypes.func.isRequired,
    fetchProductsMap: PropTypes.func,
    products: PropTypes.object
  }

  state = {
    ini: { renderState: false },
    initial: {
      products: []
    }
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    this.props.clearLogActions()
    this.setState({
      initial: {
        ...this.state.initial,
        ...this.props.action.keeping
      }
    })
  }

  shouldComponentUpdate(nextProps) {
    if (
      // this.props.action.operationType !== nextProps.action.operationType ||
      // this.props.action.consumeSources !== nextProps.action.consumeSources ||
      // this.props.action.produceSources !== nextProps.action.produceSources
      this.state.ini.renderState
    ) {
      return false
    }
    return true
  }

  componentWillUnmount() {
    this.props.keepInitial({
      ...this.state.initial
    })
  }

  // 清空数据
  onRender = (initials) => {
    this.state.ini.renderState = initials.renderState
  }

  // 搜索
  onSearch = (fieldsValue) => {
    this.props.fetchLogActions(fieldsValue)
    this.setState({
      initial: {
        ...this.state.initial,
        products: fieldsValue.products
      }
    })
  }
  // 导出
  onSubmit = (fieldsValue) => {
    fieldsValue.startTime = fieldsValue.startTime.format('YYYY-MM-DD')
    const value = {
      list: {
        startTime: fieldsValue.startTime,
        nickname: fieldsValue.nickname,
        playerId: fieldsValue.playerId,
        produceSources: fieldsValue.produceSources,
        operationType: fieldsValue.operationType,
        consumeSources: fieldsValue.consumeSources,
        productId: fieldsValue.products[0],
        serverIds: fieldsValue.products[1]
      }
    }
    this.props.exportLogActions(value)
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
          curd={curd}
          options={options}
          onSearch={this.onSearch}
          onSubmit={this.onSubmit}
          onRender={this.onRender}
          action={this.props.action}
          fetchOperationType={this.props.fetchOperationType}
          fetchConsumeSources={this.props.fetchConsumeSources}
          fetchProduceSources={this.props.fetchProduceSources}
          initial={this.state.initial}
        />
        <List
          data={this.props.action.actions}
          fetching={this.props.action.fetching}
        />
      </Card>
    )
  }

}
