import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import _ from 'lodash'
import { intlShape, defineMessages } from 'react-intl'

import Filter from './Filter'
import List from './List'

const message = defineMessages({
  item: {
    id: 'FORM.ITEM',
    defaultMessage: '道具'
  },
  skill: {
    id: 'STATUS.GOODS.1',
    defaultMessage: '技能'
  },
  person: {
    id: 'STATUS.GOODS.2',
    defaultMessage: '武将'
  },
  gudingshijian: {
    id: 'STATUS.OPENCONDITION.0',
    defaultMessage: '固定时间 (startTime, endTime)'
  },
  kaifu: {
    id: 'STATUS.OPENCONDITION.1',
    defaultMessage: '开服后天数 (afterDays  lastDays)'
  }
})


export default class Page extends Component {
  state = {
    fields: {
      products: {}
    },
    initials: {
      products: {
        productId: '',
        serverId: ''
      },
      conf: {
        openTypes: { 1001: 'fixed', 1002: 'after' }
      },
      map: {
        goodTypes: { 0: this.props.intl.formatMessage(message.item), 4: this.props.intl.formatMessage(message.skill), 5: this.props.intl.formatMessage(message.person) }
      },
      enum: {
        openTypes: [
          { label: this.props.intl.formatMessage(message.gudingshijian), value: 1001 },
          { label: this.props.intl.formatMessage(message.kaifu), value: 1002 }
        ]
      }
    }
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    const { activities } = this.props
    this.setState({
      initials: {
        ...this.state.initials,
        ...activities.keeping.templates
      }
    })
  }

  componentWillUnmount() {
    this.props.keepActivities({
      templates: {
        products: {...this.state.initials.products}
      }
    })
  }

  // 双向数据绑定
  onChange = (fieldsValue) => {
    this.setState({
      fields: { ...this.state.fields, ...fieldsValue }
    })
  }

  onCreate = (values) => {
    this.props.newCreateActivity(values)
  }

  onClear = () => {
    this.props.clearTemplateCreate()
  }

  onSearch = (values) => {
    if (values.handle === 'SEARCH') {
      this.props.fetchTemplates(values)
      this.props.fetchGoodsMap(values)
    }
    this.setState({
      initials: {
        ...this.state.initials,
        products: {
          productId: values.productId,
          serverId: values.serverId
        }
      }
    })
  }

  _productReduce = (options) => {
    return _.reduce(options, (result, option) => {
      result.push({ value: option.value, label: option.label })
      return result
    }, [])
  }

  _serverReduce = (options, productId) => {
    return _.reduce(options, (result, option) => {
      if (option.value === productId) {
        result = _.reduce(option.children, (res, opt) => {
          res.push({ value: opt.value, label: opt.label })
          return res
        }, [])
      }
      return result
    }, [])
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

  render() {
    const { activities, products, goods, login, intl } = this.props
    const initials = this.state.initials
    const options = {
      activities,
      login,
      products: {
        options: products.options,
        list: this._productReduce(products.options)
      },
      servers: {
        list: this._serverReduce(products.options, initials.products.productId)
      },
      goods: {
        list: this._goodReduce(goods.options, initials.map.goodTypes)
      },
      authorize: login.authorize
    }

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
          onCreate={this.onCreate}
          onClear={this.onClear}
        />
      </Card>
    )
  }
}

Page.propTypes = {
  intl: intlShape,
  activities: PropTypes.object,
  products: PropTypes.object,
  goods: PropTypes.object,
  login: PropTypes.object,
  fetchTemplates: PropTypes.func,
  fetchProductsMap: PropTypes.func,
  fetchGoodsMap: PropTypes.func,
  newCreateActivity: PropTypes.func,
  clearTemplateCreate: PropTypes.func,
  keepActivities: PropTypes.func
}
