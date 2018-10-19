import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import _ from 'lodash'
import { intlShape, defineMessages } from 'react-intl'

import Filter from './Filter'
import List from './List'

let productOpt = []
let options = {}
let productIds = [{'value': '_', 'label': '全部（ _ )'}]

const message = defineMessages({
  code_1: {
    id: 'CDKEY.CODE.1',
    defaultMessage: '普通兑换码'
  },
  code_2: {
    id: 'CDKEY.CODE.2',
    defaultMessage: '通用兑换码'
  },
  code_3: {
    id: 'CDKEY.CODE.3',
    defaultMessage: '每日通用码'
  },
  code_4: {
    id: 'CDKEY.CODE.4',
    defaultMessage: '每周通用码'
  },
  code_5: {
    id: 'CDKEY.CODE.5',
    defaultMessage: 'QQ充值通用码'
  },
  code_6: {
    id: 'CDKEY.CODE.6',
    defaultMessage: '多次兑换'
  },
  code_7: {
    id: 'CDKEY.CODE.7',
    defaultMessage: '周期类cdkey(通用)'
  }
})


export default class CDKeys extends Component {
  state = {
    fields: {
      products: {}
    },
    initials: {
      products: {
        productId: 0
      },
      map: {
        cdkeyTypes: { 1: this.props.intl.formatMessage(message.code_1), 2: this.props.intl.formatMessage(message.code_2), 3: this.props.intl.formatMessage(message.code_3), 4: this.props.intl.formatMessage(message.code_4), 5: this.props.intl.formatMessage(message.code_5), 6: this.props.intl.formatMessage(message.code_6), 7: this.props.intl.formatMessage(message.code_7) },
        goodTypes: { 0: '道具', 4: '技能', 5: '武将' }
      },
      conf: {
        renderState: true
      },
      enum: {
        cdkeyTypes: [
          { label: this.props.intl.formatMessage(message.code_1), value: 1 },
          { label: this.props.intl.formatMessage(message.code_2), value: 2 },
          { label: this.props.intl.formatMessage(message.code_3), value: 3 },
          { label: this.props.intl.formatMessage(message.code_4), value: 4 },
          { label: this.props.intl.formatMessage(message.code_5), value: 5 },
          { label: this.props.intl.formatMessage(message.code_6), value: 6 },
          { label: this.props.intl.formatMessage(message.code_7), value: 7 }
        ]
      }
    }
  }

  _productReduce = (options) => {
    return _.reduce(options, (result, option) => {
      result.push({ value: option.value, label: option.label })
      return result
    }, [])
  }

  _goodReduce = (options, types) => {
    let goods = []
    _.reduce(options, (result, option, index) => {
      let gds = []
      _.reduce(option, (res, opt, idx) => {
        res.push({ value: idx, label: opt })
        return res
      }, gds)
      result.push({ value: index, label: types[index], children: gds })
      return result
    }, goods)
    return goods
  }

  _channelReduce = (options) => {
    let all = _.pick(options, ['_'])
    let other = _.omit(options, ['_'])
    let channels = []
    _.reduce(all, (result, option, index) => {
      result.push({ value: index, label: `${option}-(${index})` })
      return result
    }, channels)
    _.reduce(other, (result, option, index) => {
      result.push({ value: index, label: `${option}-(${index})` })
      return result
    }, channels)
    return channels
  }

  onChange = (changedFields) => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields }
    })
  }

  onSearch = (values) => {
    if (values.handle === 'SEARCH') {
      this.state.initials.products.productId = values.path.productId
      this.props.fetchCDKeys(values)
      this.props.itemsActionCreator([values.path.productId])
      this.props.fetchGoodsMap(this.state.initials.products)
    }
  }

  onUpdate = (fields) => {
    this.props.updateCDKey(fields)
  }

  onSwitch = (fields) => {
    this.props.switchActivity(fields)
  }

  onGenerate = (fields) => {
    this.props.generateCDKey(fields)
  }

  onRender = (nextInitials) => {
    this.state.initials.conf.renderState = nextInitials.renderState
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    this.props.fetchChannels()
    const { cdkey } = this.props
    this.setState({
      initials: {
        ...this.state.initials,
        ...cdkey.keeping.list
      }
    })
  }

  componentWillUnmount() {
    this.props.keepCDKey({
      list: {
        products: {...this.state.initials.products}
      }
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.initials.conf.renderState
  }


  render() {
    const { products, items, goods, channels, login, intl } = this.props
    const initials = this.state.initials
    productOpt = this._productReduce(products.options)
    options = {
      products: productOpt,
      productIds: productIds.concat(productOpt),
      items: items,
      goods: {
        map: goods,
        list: this._goodReduce(goods.options, initials.map.goodTypes)
      },
      channels: {
        map: channels,
        list: this._channelReduce(channels)
      },
      login: login,
      authorize: login.authorize
    }

    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            intl={intl}
            options={options}
            initials={initials}
            {...this.state.fields}
            data={this.props.cdkey}
            onChange={this.onChange}
            onSearch={this.onSearch}
            onRender={this.onRender}
          />
          <List
            intl={intl}
            options={options}
            initials={initials}
            onUpdate={this.onUpdate}
            onGenerate={this.onGenerate}
            data={this.props.cdkey}
            map={this.state.map}
            enum={this.state.enum}
            onRender={this.onRender}
            onSwitch={this.onSwitch}
           />
        </Card>
      </div>
    )
  }
}

CDKeys.propTypes = {
  intl: intlShape,
  cdkey: PropTypes.object.isRequired,
  products: PropTypes.object,
  items: PropTypes.object,
  goods: PropTypes.object,
  channels: PropTypes.object,
  login: PropTypes.object,
  fetchCDKeys: PropTypes.func,
  fetchProductsMap: PropTypes.func,
  itemsActionCreator: PropTypes.func,
  fetchGoodsMap: PropTypes.func,
  fetchChannels: PropTypes.func,
  updateCDKey: PropTypes.func,
  generateCDKey: PropTypes.func,
  keepCDKey: PropTypes.func,
  switchActivity: PropTypes.func
}
