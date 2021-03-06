import React, { Component } from 'react'
import { Card } from 'antd'
import PropTypes from 'prop-types'
import Filter from './Filter'
import List from './List'
import _ from 'lodash'

export default class TimingServers extends Component {

  state = {
    initials: {
      productId: 1
    }
  }

  onSearch = () => {
    this.props.fetchServers()
  }

  onCreate = (fieldsValue) => {
    this.props.createServers(fieldsValue)
  }

  onDelete = (fieldsValue) => {
    this.props.deleteServers(fieldsValue)
  }

  componentWillMount() {
    this.props.fetchProductsMap()
  }

  _reduce = (options) => {
    return _.reduce(options, (result, option) => {
      result.push({ value: option.value, label: option.label })
      return result
    }, [])
  }

  render() {
    let initials = this.state.initials
    let options = []
    options = this._reduce(this.props.products.options)
    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            onSearch={this.onSearch}
            onCreate={this.onCreate}
            initials={initials}

            {...this.state.fields}

            options={options}
          />
          <List
            data={this.props.timingservers.list}
            onDelete={this.onDelete}
           />
        </Card>
      </div>
    )
  }
}

TimingServers.propTypes = {
  fetchServers: PropTypes.func,
  createServers: PropTypes.func,
  deleteServers: PropTypes.func,
  timingservers: PropTypes.object,
  fetchProductsMap: PropTypes.func,
  products: PropTypes.object
}
