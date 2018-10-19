import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import _ from 'lodash'
import { intlShape } from 'react-intl'

import Filter from './Filter'
import List from './List'


export default class Index extends Component {
  static propTypes = {
    intl: intlShape,
    login: PropTypes.object.isRequired,
    ownMail: PropTypes.object,
    fetchItemPrice: PropTypes.func,
    fetchPriceMax: PropTypes.func,
    mailMax: PropTypes.object,
    itemPrice: PropTypes.object,
    fetchOwnMail: PropTypes.func,
    addOwnMail: PropTypes.func,
    passOwnMail: PropTypes.func,
    sendOwnMail: PropTypes.func,
    products: PropTypes.object,
    fetchProductsMap: PropTypes.func,
    goods: PropTypes.object,
    fetchGoodsMap: PropTypes.func
  }

  onSearch = (fieldsValue) => {
    this.props.fetchOwnMail(fieldsValue)
  }

  onPass = (fieldsValue) => {
    this.props.passOwnMail(fieldsValue)
  }

  onAdd = (fieldsValue) => {
    this.props.addOwnMail(fieldsValue)
  }

  onSend = (fieldsValue) => {
    this.props.sendOwnMail(fieldsValue)
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    this.props.fetchGoodsMap({productId: '_'})
    this.props.fetchItemPrice()
    this.props.fetchPriceMax({id: 1})
  }

  render() {
    const {login: {curd}, intl, itemPrice, mailMax} = this.props
    let options = []
    if (this.props.products.options) {
      options = this.props.products.options
    }
    //
    // let channels = []
    // if (this.props.channel) {
    //   _.map(this.props.channel, (value, key) => {
    //     channels.push(
    //       {value: key, label: `${value}(${key})`, key: key}
    //     )
    //   })
    // }
    let goods = []
    if (this.props.goods.options[0]) {
      _.map(this.props.goods.options[0], (value, key) => {
        goods.push(
          {value: key, label: `${value}(${key})`}
        )
      })
    }

    return (
      <div>
        <Card style={{marginBottom: 6}}>
          <Filter
            intl={intl}
            curd={curd}
            options={options}
            goods={goods}
            onSearch={this.onSearch}
            onAdd={this.onAdd}
            itemPrice={itemPrice}
            mailMax={mailMax}
          />
          <List
            intl={intl}
            curd={curd}
            data={this.props.ownMail}
            options={options}
            goods={goods}
            onPass={this.onPass}
            onAdd={this.onAdd}
            onSend={this.onSend}
            itemPrice={itemPrice}
            mailMax={mailMax}
          />
        </Card>
      </div>
    )
  }

}
