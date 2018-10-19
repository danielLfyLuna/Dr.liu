import React, { Component } from 'react'
import { intlShape, defineMessages } from 'react-intl'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import _ from 'lodash'

import Filter from './Filter'
import List from './List'
import {getCentraCascaderProductId} from '../../form/CentraProductCascader'

let options = []
const message = defineMessages({
  zhengchang: {
    id: 'STATUS.NORMAL',
    defaultMessage: '正常'
  },
  weihu: {
    id: 'STATUS.SERVER.MAINTENANCE',
    defaultMessage: '维护'
  },
  bukeyong: {
    id: 'STATUS.CELLSTATUS.2',
    defaultMessage: '不可用'
  }
})


export default class Servers extends Component {
  state = {
    initials: {
      path: {
        productId: 1
      },
      conf: {
        renderState: true,
        status: { 1: this.props.intl.formatMessage(message.zhengchang), 2: this.props.intl.formatMessage(message.weihu), 3: this.props.intl.formatMessage(message.bukeyong) }
      },
      map: {
        status: { 1: this.props.intl.formatMessage(message.zhengchang), 2: this.props.intl.formatMessage(message.weihu), 3: this.props.intl.formatMessage(message.bukeyong) }
      },
      enum: {
        status: [
          { label: this.props.intl.formatMessage(message.zhengchang), value: 1 },
          { label: this.props.intl.formatMessage(message.weihu), value: 2 },
          { label: this.props.intl.formatMessage(message.bukeyong), value: 3 }
        ]
      }
    },
    fields: {
      products: {}
    }
  }

  onChange = (changedFields) => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields }
    })
  }

  onSearch = (fields) => {
    this.props.fetchServers(fields)
  }

  onClear = () => {
    this.props.clearServers()
  }

  onCreate = (fields) => {
    this.props.createServer(fields)
  }

  onUpdate = (fields) => {
    this.props.updateServer(fields)
  }

  onSwitch = (fields) => {
    this.props.switchServers(fields)
  }

  onRender = (initials) => {
    this.state.initials.conf.renderState = initials.renderState
  }

  _productReduce = (options) => {
    return _.reduce(options, (result, option) => {
      result.push({ value: option.value, label: option.label })
      return result
    }, [])
  }

  _serverReduce = (options) => {
    let status = _.uniq(_.map(options, 'status'))
    return _.reduce(status, (res, opt) => {
      let obj = {}
      obj.label = this.state.initials.conf.status[opt]
      obj.value = String(opt)
      obj.key = String(opt)
      obj.children = _.reduce(options.filter(o => o.status === opt), (result, option) => {
        let child = {}
        child.label = `${option.serverName}-(${option.serverId})-(${obj.label})`
        child.value = option.serverId
        child.key = option.serverId
        result.push(child)
        return result
      }, [])
      res.push(obj)
      return res
    }, [])
  }

  _groupReduce = (options) => {
    return _.reduce(options, (result, option, key) => {
      result.push({ value: key, label: option })
      return result
    }, [])
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    this.props.fetchGroupsMap()
    this.props.fetchServers({
      productId: getCentraCascaderProductId()
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.initials.conf.renderState
  }

  render() {
    options = {
      products: this._productReduce(this.props.products.options),
      servers: this._serverReduce(this.props.server.list),
      groups: this._groupReduce(this.props.groups.map)
    }
    let initials = this.state.initials
    const {login: {curd}, intl} = this.props
    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            intl={intl}
            curd={curd}
            options={options}
            initials={initials}
            {...this.state.fields}
            data={this.props.server}
            onChange={this.onChange}
            onSearch={this.onSearch}
            onCreate={this.onCreate}
            onSwitch={this.onSwitch}
            onClear={this.onClear}
            onRender={this.onRender}
          />
          <List
            intl={intl}
            curd={curd}
            options={options}
            data={this.props.server}
            onUpdate={this.onUpdate}
            onRender={this.onRender}
           />
        </Card>
      </div>
    )
  }
}

Servers.propTypes = {
  intl: intlShape,
  login: PropTypes.object,
  products: PropTypes.object,
  groups: PropTypes.object,
  server: PropTypes.object,
  fetchServers: PropTypes.func,
  clearServers: PropTypes.func,
  createServer: PropTypes.func,
  updateServer: PropTypes.func,
  switchServers: PropTypes.func,
  fetchProductsMap: PropTypes.func,
  fetchGroupsMap: PropTypes.func
}
