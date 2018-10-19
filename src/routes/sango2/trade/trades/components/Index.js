import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import _ from 'lodash'

import Filter from './Filter'
import List from './List'

export default class Trades extends Component {
  state = {
    fields: {
      products: {},
      selectType: {},
      time: {},
      itemIds: {},
      status: {},
      buyer: {},
      seller: {},
      low: {
        value: 0
      },
      high: {
        value: 0
      }
    },
    pageFields: {
      products: [],
      selectType: [],
      startTime: [],
      endTime: [],
      itemIds: [],
      status: [],
      buyer: [],
      seller: [],
      low: [],
      high: []
    },
    initials: {
      params: {
        selectType: 0,
        startTime: 0,
        endTime: 0,
        items: {
          type: 0,
          itemId: 0
        },
        low: 0,
        high: 0,
        buyer: '',
        seller: '',
        status: ''
      },
      products: {
        productId: 0,
        serverId: 0
      },
      conf: {
        locale: false,
        tradeState: { 'none': 0, 'pass': 3, 'reject': 5 },
        tradeSign: { 'yes': true, 'no': false },
        select: { 'all': 0, 'sign': 1, 'item': 2, 'price': 3, 'num': 4, 'name': 5, 'status': 6 }
      },
      map: {
        tradeState: { 0: '全部 [NONE]', 3: '通过 [PASS]', 5: '驳回 [REJECT]' },
        selectTypes: { 1: '按标注', 2: '按道具', 3: '按价格', 4: '按数量', 5: '按昵称', 6: '按状态' },
        tradeStatus: { 1: '准备上架', 2: '上架(正在出售)', 3: '审核通过', 4: '交易审核中', 5: '审核未通过', 6: '已经领取钻石' },
        goodTypes: { 0: '道具', 4: '技能', 5: '武将' }
      },
      enum: {
        selectTypes: [
          { label: '全部', value: 0 },
          { label: '按状态', value: 6 },
          { label: '按标注', value: 1 },
          { label: '按道具', value: 2 },
          { label: '按价格', value: 3 },
          { label: '按数量', value: 4 },
          { label: '按昵称', value: 5 }
        ],
        statusState: [
          { label: '准备上架', value: 1 },
          { label: '上架(正在出售)', value: 2 },
          { label: '审核通过', value: 3 },
          { label: '交易审核中', value: 4 },
          { label: '审核未通过', value: 5 },
          { label: '已经领取钻石', value: 6 }
        ],
        tradeState: [
          { label: '全部 [NONE]', value: 0 },
          { label: '通过 [PASS]', value: 3 },
          { label: '驳回 [REJECT]', value: 5 }
        ],
        tradeSign: [
          { label: '标注', value: true },
          { label: '取消标注', value: false }
        ]
      }
    }
  }

  onChange = (changedFields) => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields }
    })
  }

  onSearch = (fields) => {
    if (fields.handle === 'GET_GOODS') {
      this.state.initials.products = Object.assign(this.state.initials.products, fields.products)
      if (this.state.initials.products.productId) {
        this.props.fetchGoodsMap(this.state.initials.products)
      } else if (this.state.initials.products.productId === 0) {
        this.props.fetchGoodsMap({productId: '_'})
      }
    } else if (fields.handle === 'GET_TRADES') {
      this.props.fetchTrades({
        products: this.state.initials.products,
        data: fields.data
        // search: fields.search ? `?${fields.search}` : fields.search
      })
      const value = {...fields.data, products: fields.tip}
      _.map(this.state.pageFields, (v, i) => {
        if (value[i] !== undefined) {
          this.state.pageFields[i] = value[i]
        }
        else {
          this.state.pageFields[i] = []
        }
      })
      this.setState({
        initials: {
          ...this.state.initials,
          params: {...fields.params},
          conf: {
            ...this.state.initials.conf,
            locale: true
          }
        }
      })
    }
  }

  onClear = () => {
    this.props.clearTrades()
  }

  onCheck = (fields) => {
    this.props.checkTrade(fields)
  }

  onExport = (fields) => {
    this.props.exportTrade(fields)
  }

  _reduce = (options) => {
    return _.reduce(options, (result, option) => {
      result.push({ value: option.value, label: option.label })
      return result
    }, [])
  }

  _reduceMap = (options) => {
    return _.reduce(options, (result, option, key) => {
      result.push({ value: key, label: option })
      return result
    }, [])
  }

  _goodReduce = (options, types) => {
    let goods = []
    _.reduce(options, (result, option, index) => {
      let gds = []
      _.reduce(option, (res, opt, idx) => {
        res.push({ value: idx, label: `${opt}(${idx})` })
        return res
      }, gds)
      result.push({ value: index, label: types[index], children: gds })
      return result
    }, goods)
    return goods
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    const { trade } = this.props
    this.setState({
      ...this.state.initials,
      ...trade.keeping.index
    })
  }

  componentWillUnmount() {
    this.props.keepTrade({
      index: {
        products: {...this.state.initials.products},
        params: {...this.state.initials.params}
      }
    })
  }


  render() {
    const { goods, products, login } = this.props
    let pros = products.options.concat()
    const initials = this.state.initials
    const options = {
      fields: this.state.fields,
      pageFields: this.state.pageFields,
      items: goods.list,
      // products: products.options,
      products: pros,
      productsNotAll: products.options,
      goods: {
        map: goods.options,
        list: this._goodReduce(goods.options, initials.map.goodTypes)
      },
      authorize: login.authorize
    }

    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            tradeGoods={this.props.tradeGoods}
            fetchTradeGoods={this.props.fetchTradeGoods}
            options={options}
            initials={initials}
            {...this.state.fields}
            data={this.props.trade}
            onChange={this.onChange}
            onSearch={this.onSearch}
            onClear={this.onClear}
            onExport={this.onExport}
            login={login}
          />
          <List
            options={options}
            initials={initials}
            data={this.props.trade}
            onCheck={this.onCheck}
            fetchTrades={this.props.fetchTrades}
           />
        </Card>
      </div>
    )
  }
}

Trades.propTypes = {
  goods: PropTypes.object,
  tradeGoods: PropTypes.object,
  trade: PropTypes.object,
  products: PropTypes.object,
  login: PropTypes.object,
  fetchTrades: PropTypes.func,
  clearTrades: PropTypes.func,
  checkTrade: PropTypes.func,
  keepTrade: PropTypes.func,
  exportTrade: PropTypes.func,
  fetchGoodsMap: PropTypes.func,
  fetchTradeGoods: PropTypes.func,
  fetchProductsMap: PropTypes.func
}
