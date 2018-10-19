import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import _ from 'lodash'
import { intlShape, defineMessages } from 'react-intl'

import Filter from './Filter'
import List from './List'

const message = defineMessages({
  code_1: {
    id: 'CDKEY.CODE.1',
    defaultMessage: '普通兑换码(1)'
  },
  code_2: {
    id: 'CDKEY.CODE.2',
    defaultMessage: '通用兑换码(2)'
  },
  code_3: {
    id: 'CDKEY.CODE.3',
    defaultMessage: '每日通用码(3)'
  },
  code_4: {
    id: 'CDKEY.CODE.4',
    defaultMessage: '每周通用码(4)'
  },
  code_5: {
    id: 'CDKEY.CODE.5',
    defaultMessage: 'QQ充值通用码(5)'
  },
  code_6: {
    id: 'CDKEY.CODE.6',
    defaultMessage: '多次兑换(6)'
  },
  code_7: {
    id: 'CDKEY.CODE.7',
    defaultMessage: '周期类cdkey(通用)(7)'
  },
  receive: {
    id: 'CDKEY.STATE.RECEIVE',
    defaultMessage: '已领取'
  },
  unreceive: {
    id: 'CDKEY.STATE.UNRECEIVE',
    defaultMessage: '未领取'
  }
})


export default class Page extends Component {

  state = {
    fields: {
      products: {},
      cdkey: ''
    },
    initials: {
      params: {
        productId: '',
        cdkey: ''
      },
      products: {
        productId: ''
      },
      conf: {
        locale: false
      },
      map: {
        cdkeyTypes: { 1: this.props.intl.formatMessage(message.code_1), 2: this.props.intl.formatMessage(message.code_2), 3: this.props.intl.formatMessage(message.code_3), 4: this.props.intl.formatMessage(message.code_4), 5: this.props.intl.formatMessage(message.code_5), 6: this.props.intl.formatMessage(message.code_6), 7: this.props.intl.formatMessage(message.code_7) },
        cdkeyState: { 0: this.props.intl.formatMessage(message.unreceive), 1: this.props.intl.formatMessage(message.unreceive), 2: this.props.intl.formatMessage(message.receive) }
      }
    }
  }

  componentWillMount() {
    this.props.itemsActionCreator(['_'])
    this.props.fetchProductsMap()
    const { cdkey } = this.props
    this.setState({
      initials: {
        ...this.state.initials,
        ...cdkey.keeping.query
      }
    })
  }

  componentWillUnmount() {
    this.props.keepCDKey({
      query: {
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
    this.props.queryCDKey({
      path: fields.path
    })
    this.setState({
      initials: {
        ...this.state.initials,
        params: {...fields.path},
        products: { productId: fields.path.productId },
        conf: { locale: true }
      }
    })
  }

  _productReduce = (options) => {
    return _.reduce(options, (result, option) => {
      result.push({ value: option.value, label: option.label })
      return result
    }, [])
  }

  render() {
    const { cdkey, products, items, login, intl } = this.props
    let options = {
      cdkey: cdkey.query,
      products: this._productReduce(products.options),
      items: items,
      authorize: login.authorize
    }
    const initials = this.state.initials

    return (
      <Card style={{marginBottom: 6}}>
        <Filter
          intl={intl}
          options={options}
          initials={initials}
          {...this.state.fields}
          onChange={this.onChange}
          onSearch={this.onSearch}
        />
        <List
          intl={intl}
          options={options}
          initials={initials}
        />
      </Card>
    )
  }

}

Page.propTypes = {
  intl: intlShape,
  login: PropTypes.object.isRequired,
  cdkey: PropTypes.object,
  products: PropTypes.object,
  items: PropTypes.object,
  queryCDKey: PropTypes.func,
  keepCDKey: PropTypes.func,
  itemsActionCreator: PropTypes.func,
  fetchProductsMap: PropTypes.func
}
