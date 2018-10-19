import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import _ from 'lodash'

import { intlShape } from 'react-intl'

import Filter from './Filter'
import List from './List'


export default class Page extends Component {

  state = {
    fields: {
      products: {},
      times: [],
      nickname: '',
      playerId: '',
      orderId: '',
      platformId: ''
    },
    initials: {
      products: {
        productId: '',
        serverId: ''
      },
      params: {
        startTime: '',
        endTime: '',
        nickname: '',
        playerId: '',
        orderId: '',
        platformId: ''
      },
      conf: {
        locale: false
      },
      map: {
        orderStatus: { 0: '失败', 1: '成功' }
      },
      enum: {
      }
    }
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    const { recharge } = this.props
    this.setState({
      initials: {
        ...this.state.initials,
        ...recharge.keeping.orders
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const nextRepair = nextProps.recharge.repair
    const thisRepair = this.props.recharge.repair
    if (nextRepair.msg && nextRepair.msg.includes('补单成功') && nextRepair.msg !== thisRepair.msg) {
      this.props.fetchOrders({
        path: this.state.initials.products,
        params: this.state.initials.params
      })
    }
  }

  componentWillUnmount() {
    this.props.keepRecharge({
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

  onSearch = (fields) => {
    if (fields.handle === 'SEARCH') {
      this.setState({
        initials: {
          ...this.state.initials,
          products: fields.path,
          params: fields.params
        }
      })
      this.props.fetchOrders(fields)
      this.state.initials.conf.locale = true
    }
  }

  onExport = (values) => {
    this.props.orderExport(values)
  }

  onRepair = (values) => {
    this.props.orderRepair(values)
  }

  _productReduce = (options) => {
    return _.reduce(options, (result, option) => {
      result.push({ value: option.value, label: option.label })
      return result
    }, [])
  }

  render() {
    const { recharge, products, login } = this.props
    const options = {
      recharge,
      login,
      authorize: login.authorize,
      products: {
        list: products.options
      }
    }
    const initials = this.state.initials

    return (
      <Card style={{marginBottom: 6}}>
        <Filter
          intl={this.props.intl}
          options={options}
          initials={initials}
          {...this.state.fields}
          onChange={this.onChange}
          onSearch={this.onSearch}
          onExport={this.onExport}
          onRepair={this.onRepair}
        />
        <List
          intl={this.props.intl}
          options={options}
          initials={initials}
        />
      </Card>
    )
  }
}

Page.propTypes = {
  intl: intlShape,
  recharge: PropTypes.object,
  products: PropTypes.object,
  login: PropTypes.object,
  fetchOrders: PropTypes.func,
  fetchProductsMap: PropTypes.func,
  orderExport: PropTypes.func,
  orderRepair: PropTypes.func,
  keepRecharge: PropTypes.func
}
