import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
// import _ from 'lodash'

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
        goodTypes: { item: 0, skill: 4, soldier: 5 },
        operationStatus: { before: 0, after: 1, pass: 2, fail: 3 },
        operationTypes: { pass: '通过', fail: '拒绝' }
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
        ...gamesale.keeping.approves
      }
    })
  }

  componentWillUnmount() {
    this.props.keepGameSale({
      approves: {
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
      this.props.fetchGameSaleApproves(values)
      this.props.fetchGoodsMap(values.path)
      this.state.initials.conf.locale = true
    }
  }

  onApprove = (values) => {
    this.props.approveGameSaleOrder(values)
  }

  render() {
    const { gamesale, products, goods, login } = this.props
    const initials = this.state.initials
    const options = {
      gamesale,
      login,
      authorize: login.authorize,
      products: {
        list: products.options
      },
      goods: {
        map: goods.options[initials.conf.goodTypes.item]
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
          onTakeOrder={this.onTakeOrder}
          onApprove={this.onApprove}
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
  fetchGameSaleApproves: PropTypes.func,
  approveGameSaleOrder: PropTypes.func,
  keepGameSale: PropTypes.func
}
