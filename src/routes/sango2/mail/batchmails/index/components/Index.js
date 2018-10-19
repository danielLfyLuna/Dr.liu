import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { withRouter } from 'react-router'
import { intlShape } from 'react-intl'
import _ from 'lodash'

import Filter from './Filter'
import List from './List'


class Index extends Component {
  static propTypes = {
    intl: intlShape,
    fetchGoodsMap: PropTypes.func,
    fetchItemPrice: PropTypes.func,
    fetchPriceMax: PropTypes.func,
    login: PropTypes.object.isRequired,
    goods: PropTypes.object,
    mailMax: PropTypes.object,
    itemPrice: PropTypes.object,
    batchmail: PropTypes.object,
    fetchBatchmail: PropTypes.func,
    addBatchmail: PropTypes.func,
    // clearBatchmailFetch: PropTypes.func,
    clearBatchmailAdd: PropTypes.func,
    updateBatchmail: PropTypes.func,
    router: PropTypes.object
  }

  static childContextTypes = {
    router: PropTypes.object
  }

  getChildContext() {
    return { router: this.props.router }
  }

  componentWillMount() {
    this.props.fetchGoodsMap({productId: '_'})
    this.props.fetchItemPrice()
    this.props.fetchPriceMax({id: 4})
    // this.props.clearBatchmailFetch()
  }

  // 查询批量邮件
  onSearch = (value) => {
    this.props.fetchBatchmail(value)
  }

  // 添加批量邮件
  onCreate = (value) => {
    this.props.addBatchmail(value)
  }

  // 修改批量邮件
  onUpdate = (value) => {
    this.props.updateBatchmail(value)
  }

  render() {
    const { login: {curd}, itemPrice, mailMax, intl } = this.props
    let item = []
    if (this.props.goods.options[0]) {
      _.map(this.props.goods.options[0], (value, key) => {
          item.push(
            {value: key, label: `${value}(${key})`}
          )
      })
    }

    return (
      <Card style={{marginBottom: 6}}>
        <Filter
          curd={curd}
          intl={intl}
          onSearch={this.onSearch}
          onCreate={this.onCreate}
          clearBatchmailAdd={this.props.clearBatchmailAdd}
          item={item}
          itemPrice={itemPrice}
          mailMax={mailMax}
        />
        <List
          intl={intl}
          onUpdate={this.onUpdate}
          data={this.props.batchmail.batchmails}
          login={this.props.login}
          fetching={this.props.batchmail.fetching}
          item={item}
          itemPrice={itemPrice}
          mailMax={mailMax}
        />
      </Card>
    )
  }
}

export default withRouter(Index)
