import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import _ from 'lodash'
import { intlShape } from 'react-intl'

import Filter from './Filter'
import List from './List'


export default class NoticesLoginPage extends Component {

  state = {

  }

  onSearch = (fieldsValue) => {
    this.props.fetchNoticesLogin(fieldsValue)
  }

  onDeleteItem = (fieldsValue) => {
    this.props.deleteLoginNotice(fieldsValue)
  }

  onCreate = (fieldsValue) => {
    this.props.addLoginNotice(fieldsValue)
  }

  onUpdate = (fieldsValue) => {
    this.props.updateLoginNotice(fieldsValue)
  }

  onOpen = (fieldsValue) => {
    this.props.openLoginNotice(fieldsValue)
  }

  _reduceChannels = (options) => {
    return _.reduce(options, (result, option, key) => {
      result.push({ value: key, label: `${option}(${key})` })
      return result
    }, [])
  }

  componentWillMount() {
    this.props.fetchChannels()
    this.props.fetchProductsMap()
  }

  componentDidMount() {

  }

  render() {
    const {products: {options}, channel: {map}, login: {curd}, intl} = this.props

    const channels = this._reduceChannels(map)

    return (
      <Card style={{marginBottom: 6}}>
        <Filter
          intl={intl}
          curd={curd}
          options={options}
          onChange={this.onChange}
          onSearch={this.onSearch}
          onCreate={this.onCreate}
          channels={channels}
        />
        <List
          intl={intl}
          curd={curd}
          channels={channels}
          options={options}
          onDeleteItem={this.onDeleteItem}
          onUpdate={this.onUpdate}
          onOpen={this.onOpen}
          data={this.props.notice.notices}
        />
      </Card>
    )
  }

}

NoticesLoginPage.propTypes = {
  intl: intlShape,
  login: PropTypes.object.isRequired,
  notice: PropTypes.object,
  channel: PropTypes.object,
  updateLoginNotice: PropTypes.func,
  openLoginNotice: PropTypes.func,
  addLoginNotice: PropTypes.func,
  fetchNoticesLogin: PropTypes.func,
  deleteLoginNotice: PropTypes.func,
  fetchChannels: PropTypes.func,
  products: PropTypes.object.isRequired,
  fetchProductsMap: PropTypes.func.isRequired
}
