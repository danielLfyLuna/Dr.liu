import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import _ from 'lodash'
import { intlShape, defineMessages } from 'react-intl'

import Filter from './Filter'
import List from './List'

const message = defineMessages({
  men: {
    id: 'STATUS.GENDER.MEN',
    defaultMessage: '男'
  },
  women: {
    id: 'STATUS.GENDER.WOMEN',
    defaultMessage: '女'
  },
  zhanshi: {
    id: 'STATUS.JOB.1',
    defaultMessage: '战士'
  },
  sheshou: {
    id: 'STATUS.JOB.2',
    defaultMessage: '射手'
  },
  fashi: {
    id: 'STATUS.JOB.3',
    defaultMessage: '法师'
  }
})

export default class Recharge extends Component {
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
        // renderState: true,
        locale: false,
        route: 'index',
        timeUnits: { 'second': 1, 'minute': 2, 'hour': 3, 'day': 4, 'lasting': 5 }
      },
      map: {
        jobTypes: { 1: this.props.intl.formatMessage(message.zhanshi), 2: this.props.intl.formatMessage(message.sheshou), 3: this.props.intl.formatMessage(message.fashi) },
        genderTypes: { 0: this.props.intl.formatMessage(message.women), 1: this.props.intl.formatMessage(message.men) }
      },
      enum: {}
    }
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    const { recharge } = this.props
    this.setState({
      initials: {
        ...this.state.initials,
        ...recharge.keeping.index
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const nextPayment = nextProps.recharge.payment
    const thisPayment = this.props.recharge.payment
    if (nextPayment.msg === 'OK' && nextPayment.msg !== thisPayment.msg) {
      // this.state.initials.conf.renderState = false
      this.props.fetchPlayers({
        path: this.state.initials.products,
        params: this.state.initials.params
      })
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.initials.conf.renderState
  // }

  componentWillUnmount() {
    this.props.keepRecharge({
      index: {
        products: {...this.state.initials.products},
        params: {...this.state.initials.params}
      }
    })
  }

  onChange = (changedFields) => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields }
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
      this.props.fetchPlayers(values)
      this.props.fetchRechargeMap(values)
      this.state.initials.conf.locale = true
    }
  }

  onRecharge = (values) => {
    this.props.sendRecharge(values)
  }

  onSendMonthCard = (values) => {
    this.props.sendMonthCard(values)
  }

  _purchaseReduce = (options) => {
    return _.reduce(options, (result, value, index) => {
      result.push({ value: index, label: `${value}-(${index})` })
      return result
    }, [])
  }

  render() {
    const { recharge, products, players, login, intl } = this.props
    const options = {
      recharge,
      players,
      login,
      authorize: login.authorize,
      products: {
        list: products.options
      },
      purchases: {
        list: this._purchaseReduce(recharge.remaps)
      }
    }
    const initials = this.state.initials

    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
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
            onRecharge={this.onRecharge}
            onSendMonthCard={this.onSendMonthCard}
          />
        </Card>
      </div>
    )
  }
}

Recharge.propTypes = {
  recharge: PropTypes.object.isRequired,
  intl: intlShape,
  products: PropTypes.object,
  players: PropTypes.object,
  login: PropTypes.object,
  fetchPlayers: PropTypes.func,
  fetchProductsMap: PropTypes.func,
  fetchRechargeMap: PropTypes.func,
  sendRecharge: PropTypes.func,
  sendMonthCard: PropTypes.func,
  keepRecharge: PropTypes.func
}
