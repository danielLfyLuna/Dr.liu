import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'

export default class LogConsumesPage extends Component {

  static propTypes = {
    consume: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    fetchLogConsumes: PropTypes.func.isRequired,
    exportLogConsumes: PropTypes.func.isRequired,
    fetchGoodsMap: PropTypes.func.isRequired,
    clearLogConsumes: PropTypes.func.isRequired,
    consumeSources: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    keepInitial: PropTypes.func.isRequired,
    products: PropTypes.object,
    fetchProductsMap: PropTypes.func
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
      itemId0: {
        value: []
      },
      itemId4: {
        value: []
      },
      itemId5: {
        value: []
      },
      'range-time-picker': {},
      'products': {},
      'consumeSourcesList': {
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
    this.props.fetchLogConsumes(fieldsValue)
    this.setState({
      initial: {
        ...this.state.initial,
        products: fieldsValue.products
      }
    })
  }

  // 导出
  onSubmit = (fieldsValue) => {
    this.props.exportLogConsumes(fieldsValue)
  }

  onRender = (initials) => {
    this.state.initials.renderState = initials.renderState
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.initials.renderState
  }

  // 道具接口
  getItems = (fieldsValue) => {
    const value = {
      productId: fieldsValue[0]
    }
    this.props.fetchGoodsMap(value)
  }

  // Table 和 Filter 数据组装一起，提交Fetch 查询
  onTableChange = (pagination) => {
    let newFilter = {}
    newFilter.nickname = this.state.fields.nickname.value
    newFilter.playerId = this.state.fields.playerId.value
    newFilter.consumeSourcesList = this.state.fields.consumeSourcesList.value
    newFilter['products'] = this.state.fields['products'].value
    newFilter['range-time-picker'] = this.state.fields['range-time-picker'].value

    let itemIds = []
    if (this.state.fields.itemId0.value.length > 0) {
      itemIds = itemIds.concat(this.state.fields.itemId0.value)
    }
    if (this.state.fields.itemId4.value.length > 0) {
      itemIds = itemIds.concat(this.state.fields.itemId4.value)
    }
    if (this.state.fields.itemId5.value.length > 0) {
      itemIds = itemIds.concat(this.state.fields.itemId5.value)
    }
    newFilter.itemIds = itemIds.join(',')

    const query = Object.assign({}, newFilter, pagination)

    this.props.fetchLogConsumes(query)
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    this.props.clearLogConsumes()
    this.setState({
      initial: {
        ...this.state.initial,
        ...this.props.consume.keeping
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
          consume={this.props.consume}
          onSubmit={this.onSubmit}
          item={this.props.item}
          onRender={this.onRender}
          getItems={this.getItems}
          consumeSources={this.props.consumeSources}
          initial={this.state.initial}
        />
        <List
          data={this.props.consume.consumes}
          consume={this.props.consume}
          onTableChange={this.onTableChange}
        />
      </Card>
    )
  }

}
