import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import _ from 'lodash'

import Filter from './Filter'
import List from './List'

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
      params: {
      },
      conf: {
        locale: false
      },
      map: {
        gsTypes: { 1: '红颜知己', 2: '倾城红颜', 3: '萌妹子', 4: '女汉子', 5: '傲娇女神' },
        gradeTypes: { 1: '一级', 2: '二级', 3: '三级' }
      },
      enum: {
        gsTypes: [
          { label: '红颜知己 (1)', value: 1 },
          { label: '倾城红颜 (2)', value: 2 },
          { label: '萌妹子 (3)', value: 3 },
          { label: '女汉子 (4)', value: 4 },
          { label: '傲娇女神 (5)', value: 5 }
        ],
        gradeTypes: [
          { label: '一级', value: 1 },
          { label: '二级', value: 2 },
          { label: '三级', value: 3 }
        ]
      }
    }
  }

  componentWillMount() {

  }

  // 双向数据绑定
  onChange = (fieldsValue) => {
    this.setState({
      fields: { ...this.state.fields, ...fieldsValue }
    })
  }

  onCreate = (values) => {
    this.props.createGameSaleManager(values)
  }

  onUpdate = (values) => {
    this.props.updateGameSaleManager(values)
  }

  onDelete = (values) => {
    this.props.deleteGameSaleManager(values)
  }

  onSearch = (values) => {
    if (values.handle === 'SEARCH') {
      this.props.fetchGameSaleManagers()
      this.props.fetchUsers()
      // this.props.fetchProductsMap()
    }
    // this.props.fetchManagerPlayer(values)
  }

  _usersReduce = (options) => {
    return _.reduce(options, (result, option) => {
      result.push({ value: option.id, label: `${option.name} (${option.realName})` })
      return result
    }, [])
  }

  _userMap = (options) => {
    return _.reduce(options, (result, option) => {
      result[option.id] = option.name
      return result
    }, {})
  }

  render() {
    const { gamesale, products, login } = this.props
    const options = {
      gamesale,
      login,
      products: {
        list: products.options
      },
      users: {
        list: this._usersReduce(gamesale.users),
        map: this._userMap(gamesale.users)
      },
      authorize: login.authorize
    }
    const initials = this.state.initials

    return (
      <Card style={{marginBottom: 6}}>
        <Filter
          options={options}
          initials={initials}
          {...this.state.fields}
          onChange={this.onChange}
          onCreate={this.onCreate}
          onSearch={this.onSearch}
        />
        <List
          options={options}
          initials={initials}
          onUpdate={this.onUpdate}
          onDelete={this.onDelete}
          onSearch={this.onSearch}
        />
      </Card>
    )
  }
}

Page.propTypes = {
  gamesale: PropTypes.object,
  products: PropTypes.object,
  login: PropTypes.object,
  // fetchProductsMap: PropTypes.func,
  fetchGameSaleManagers: PropTypes.func,
  createGameSaleManager: PropTypes.func,
  updateGameSaleManager: PropTypes.func,
  deleteGameSaleManager: PropTypes.func,
  // fetchManagerPlayer: PropTypes.func,
  fetchUsers: PropTypes.func
}
