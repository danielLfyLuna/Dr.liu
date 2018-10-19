import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, defineMessages } from 'react-intl'
import { Card } from 'antd'
import _ from 'lodash'

import Filter from './Filter'
import List from './List'

const message = defineMessages({
  forbid_1: {
    id: 'STATUS.TYPE.FORBID.1',
    defaultMessage: '禁言'
  },
  forbid_2: {
    id: 'STATUS.TYPE.FORBID.2',
    defaultMessage: '禁用拍卖行'
  },
  forbid_3: {
    id: 'STATUS.TYPE.FORBID.3',
    defaultMessage: '封号'
  },
  sec: {
    id: 'STATUS.TYPE.TIME.SEC',
    defaultMessage: '秒'
  },
  min: {
    id: 'STATUS.TYPE.TIME.MIN',
    defaultMessage: '分钟'
  },
  hour: {
    id: 'STATUS.TYPE.TIME.HOUR',
    defaultMessage: '小时'
  },
  day: {
    id: 'STATUS.TYPE.TIME.DAY',
    defaultMessage: '天'
  },
  forever: {
    id: 'STATUS.TYPE.TIME.FOREVER',
    defaultMessage: '永久'
  },
  zhanshi: {
    id: 'STATUS.JOB.1',
    defaultMessage: '战士'
  },
  fashi: {
    id: 'STATUS.JOB.3',
    defaultMessage: '法师'
  },
  sheshou: {
    id: 'STATUS.JOB.2',
    defaultMessage: '射手'
  },
  men: {
    id: 'STATUS.GENDER.MEN',
    defaultMessage: '男'
  },
  women: {
    id: 'STATUS.GENDER.WOMEN',
    defaultMessage: '女'
  }
})


export default class Page extends Component {

  state = {
    fields: {
      products: {},
      nickname: '',
      playerId: ''
    },
    initials: {
      products: {
        productId: '',
        serverId: ''
      },
      params: {
        nickname: '',
        playerId: ''
      },
      conf: {
        locale: false,
        timeUnits: { 'second': 1, 'minute': 2, 'hour': 3, 'day': 4, 'lasting': 5 }
      },
      map: {
        forbidTypes: { 1: this.props.intl.formatMessage(message.forbid_1), 2: this.props.intl.formatMessage(message.forbid_2), 3: this.props.intl.formatMessage(message.forbid_3) },
        timeUnits: { 1: this.props.intl.formatMessage(message.sec), 2: this.props.intl.formatMessage(message.min), 3: this.props.intl.formatMessage(message.hour), 4: this.props.intl.formatMessage(message.day), 5: this.props.intl.formatMessage(message.forever) },
        jobTypes: { 1: this.props.intl.formatMessage(message.zhanshi), 2: this.props.intl.formatMessage(message.sheshou), 3: this.props.intl.formatMessage(message.fashi) },
        genderTypes: { 0: this.props.intl.formatMessage(message.women), 1: this.props.intl.formatMessage(message.men) }
      },
      enum: {
        timeUnits: [
          { label: this.props.intl.formatMessage(message.sec), value: 1 },
          { label: this.props.intl.formatMessage(message.min), value: 2 },
          { label: this.props.intl.formatMessage(message.hour), value: 3 },
          { label: this.props.intl.formatMessage(message.day), value: 4 },
          { label: this.props.intl.formatMessage(message.forever), value: 5 }
        ],
        forbidTypes: [
          { label: this.props.intl.formatMessage(message.forbid_1), value: 1 },
          { label: this.props.intl.formatMessage(message.forbid_2), value: 2 },
          { label: this.props.intl.formatMessage(message.forbid_3), value: 3 }
        ]
      }
    }
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    this.props.clearPlayers()
    const { blacklist } = this.props
    this.setState({
      initials: {
        ...this.state.initials,
        ...blacklist.keeping.forbid
      }
    })
  }

  componentWillUnmount() {
    this.props.keepBlacklist({
      forbid: {
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
      this.props.fetchPlayers(fields)
      this.state.initials.conf.locale = true
    }
  }

  onForbid = (values) => {
    this.props.addBlacklist(values)
  }

  _productReduce = (options) => {
    return _.reduce(options, (result, option) => {
      result.push({ value: option.value, label: option.label })
      return result
    }, [])
  }

  render() {
    const { blacklist, players, products, login, intl } = this.props
    const { curd } = this.props.login

    let options = {
      blacklist: blacklist,
      players: players,
      products: {
        list: products.options
      },
      login: login
    }
    let initials = this.state.initials

    return (
      <Card style={{marginBottom: 6}}>
        <Filter
          intl={intl}
          curd={curd}
          options={options}
          initials={initials}
          {...this.state.fields}
          onChange={this.onChange}
          onSearch={this.onSearch}
        />
        <List
          intl={intl}
          curd={curd}
          options={options}
          initials={initials}
          onForbid={this.onForbid}
        />
      </Card>
    )
  }

}

Page.propTypes = {
  intl: intlShape,
  players: PropTypes.object,
  products: PropTypes.object,
  login: PropTypes.object,
  blacklist: PropTypes.object,
  fetchPlayers: PropTypes.func,
  clearPlayers: PropTypes.func,
  fetchProductsMap: PropTypes.func,
  addBlacklist: PropTypes.func,
  keepBlacklist: PropTypes.func
}
