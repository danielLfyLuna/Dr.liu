import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import _ from 'lodash'

import Filter from './Filter'
import List from './List'

export default class Page extends Component {
  state = {
    fields: {
      products: {},
      times: []
    },
    initials: {
      products: {
        productId: '',
        serverId: ''
      },
      params: {
        startTime: '',
        endTime: ''
      },
      conf: {
        renderState: true,
        locale: false,
        goodTypes: { 'item': 0, 'skill': 4, 'soldier': 5 }
      },
      map: {
        goodTypes: { 0: '道具', 4: '技能', 5: '武将' },
        orderStatus: { 0: '失败', 1: '成功' },
        operationStatus: { 0: '未提单', 1: '已提交', 2: '已通过', 3: '未通过' }
      },
      enum: {
      }
    }
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    const { gamesale } = this.props
    this.setState({
      initials: {
        ...this.state.initials,
        ...gamesale.keeping.orders
      }
    })
  }

  componentWillUnmount() {
    this.props.keepGameSale({
      orders: {
        products: {...this.state.initials.products},
        params: {...this.state.initials.params}
      }
    })
  }

  // 双向数据绑定
  onChange = (fieldsValue) => {
    this.setState({
      fields: { ...this.state.fields, ...fieldsValue }
    })
  }

  onSearch = (values) => {
    if (values.handle === 'SEARCH') {
      this.setState({
        initials: {
          ...this.state.initials,
          products: {...values.path},
          params: {...values.params}
        }
      })
      this.props.fetchGameSaleOrders(values)
      this.props.fetchGoodsMap({...values.path})
      this.state.initials.conf.locale = true
    }
  }

  onTakeOrders = (values) => {
    this.props.takeGameSaleOrders(values)
  }

  _goodReduce = (options, types) => {
    let goods = []
    _.reduce(options, (result, option, index) => {
      let gds = []
      _.reduce(option, (res, opt, idx) => {
        res.push({ value: Number(idx), label: `${opt} (${idx})` })
        return res
      }, gds)
      result.push({ value: Number(index), label: `${types[index]} (${index})`, children: gds })
      return result
    }, goods)
    return goods
  }

  _itemReduce = (options, types) => {
    return _.reduce(options, (result, option) => {
      if (types.includes(option.value)) {
        result = option.children
      }
      return result
    }, [])
  }

  render() {
    const { gamesale, products, goods, login } = this.props
    const initials = this.state.initials
    const goodOpt = this._goodReduce(goods.options, initials.map.goodTypes)
    const goodTypes = initials.conf.goodTypes
    const options = {
      gamesale,
      login,
      authorize: login.authorize,
      products: {
        list: products.options
      },
      goods: {
        list: this._itemReduce(goodOpt, [goodTypes.item])
      }
    }

    return (
      <Card style={{marginBottom: 6}}>
        <Filter
          options={options}
          initials={initials}
          {...this.state.fields}
          onChange={this.onChange}
          onSearch={this.onSearch}
        />
        <List
          options={options}
          initials={initials}
          onTakeOrders={this.onTakeOrders}
        />
      </Card>
    )
  }
}

Page.propTypes = {
  gamesale: PropTypes.object,
  products: PropTypes.object,
  goods: PropTypes.object,
  login: PropTypes.object,
  fetchProductsMap: PropTypes.func,
  fetchGoodsMap: PropTypes.func,
  fetchGameSaleOrders: PropTypes.func,
  takeGameSaleOrders: PropTypes.func,
  keepGameSale: PropTypes.func
}
