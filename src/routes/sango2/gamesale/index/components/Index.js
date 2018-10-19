import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import _ from 'lodash'

import Filter from './Filter'
import List from './List'

export default class Players extends Component {
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
        locale: false
      },
      map: {
      },
      enum: {
        gsTypes: [
          { label: '红颜知己 (1)', value: 1 },
          { label: '倾城红颜 (2)', value: 2 },
          { label: '萌妹子 (3)', value: 3 },
          { label: '女汉子 (4)', value: 4 },
          { label: '傲娇女神 (5)', value: 5 }
        ]
      }
    }
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    const { gamesale } = this.props
    this.setState({
      initials: {
        ...this.state.initials,
        ...gamesale.keeping.index
      }
    })
    if (this.props.location.query.handle &&
        this.props.location.query.handle === 'join') {
          this.props.clearPlayers()
        }
  }

  componentWillReceiveProps(nextProps) {
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.initials.conf.renderState
  }

  componentWillUnmount() {
    this.props.keepGameSale({
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

  onRender = (nextInitials) => {
    this.state.initials.conf.renderState = nextInitials.renderState
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
      if (this.props.location.query.handle &&
          this.props.location.query.handle === 'join') {
        this.props.fetchManagerPlayer({
          ...values,
          path: {
            ...values.path,
            managerId: this.props.location.query.managerId
          }
        })
      } else {
        this.props.fetchGameSalePlayers(values)
      }
      this.state.initials.conf.locale = true
    }
  }

  onUpdate = (values) => {
    this.props.updateGameSalePlayer(values)
  }

  _usersReduce = (options) => {
    return _.reduce(options, (result, option) => {
      result.push({ value: option.adminUserId, label: `${option.userName} (${option.realName})` })
      return result
    }, [])
  }

  _userMap = (options) => {
    return _.reduce(options, (result, option) => {
      result[option.adminUserId] = option.userName
      return result
    }, {})
  }

  _joinReduce = (options) => {
    return _.reduce(options, (result, option) => {
      result.push({ value: option.id, label: `${option.name} (${option.id})` })
      return result
    }, [])
  }

  render() {
    const { gamesale, products, login, location } = this.props
    const options = {
      gamesale,
      login,
      authorize: login.authorize,
      products: {
        list: products.options
      },
      users: {
        list: this._usersReduce(gamesale.users),
        map: this._userMap(gamesale.users)
      },
      join: {
        list: []
      }
    }
    const initials = this.state.initials

    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            options={options}
            initials={initials}
            location={location}
            {...this.state.fields}
            onChange={this.onChange}
            onSearch={this.onSearch}
          />
          <List
            options={options}
            initials={initials}
            onUpdate={this.onUpdate}
            onRender={this.onRender}
          />
        </Card>
      </div>
    )
  }
}

Players.propTypes = {
  gamesale: PropTypes.object.isRequired,
  products: PropTypes.object,
  login: PropTypes.object,
  location: PropTypes.object,
  fetchGameSalePlayers: PropTypes.func,
  clearPlayers: PropTypes.func,
  fetchManagerPlayer: PropTypes.func,
  fetchProductsMap: PropTypes.func,
  updateGameSalePlayer: PropTypes.func,
  keepGameSale: PropTypes.func
}
