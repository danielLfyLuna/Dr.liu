import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'

export default class LogProducesPage extends Component {

  static propTypes = {
    produce: PropTypes.object,
    login: PropTypes.object,
    item: PropTypes.object,
    fetchLogProduces: PropTypes.func,
    exportLogProduces: PropTypes.func,
    clearLogProduces: PropTypes.func,
    fetchGoodsMap: PropTypes.func,
    produceSources: PropTypes.func,
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
      'produceSourcesList': {
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
    this.props.fetchLogProduces(fieldsValue)
    this.setState({
      initial: {
        ...this.state.initial,
        products: fieldsValue.products
      }
    })
  }

  // 导出
  onSubmit = (fieldsValue) => {
    this.props.exportLogProduces(fieldsValue)
  }

  // Table 和 Filter 数据组装一起，提交Fetch 查询
  onTableChange = (pagination) => {
    let newFilter = {}
    newFilter.nickname = this.state.fields.nickname.value
    newFilter.playerId = this.state.fields.playerId.value
    newFilter.produceSourcesList = this.state.fields.produceSourcesList.value
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
    this.props.fetchLogProduces(query)
  }

    onRender = (initials) => {
      this.state.initials.renderState = initials.renderState
    }

    componentWillMount() {
      this.props.fetchProductsMap()
      this.props.clearLogProduces()
      this.setState({
        initial: {
          ...this.state.initial,
          ...this.props.produce.keeping
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
    }

    // 道具接口
    getItems = (fieldsValue) => {
      const value = {
        productId: fieldsValue[0]
      }
      this.props.fetchGoodsMap(value)
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
          produce={this.props.produce}
          onSubmit={this.onSubmit}
          item={this.props.item}
          onRender={this.onRender}
          getItems={this.getItems}
          produceSources={this.props.produceSources}
          initial={this.state.initial}
        />
        <List
          data={this.props.produce.produces}
          onTableChange={this.onTableChange}
          produce={this.props.produce}
        />
      </Card>
    )
  }

}
