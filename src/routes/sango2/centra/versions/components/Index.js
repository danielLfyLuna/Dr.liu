import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import _ from 'lodash'

import Filter from './Filter'
import List from './List'
import {getCentraCascaderProductId} from '../../form/CentraProductCascader'


export default class Versions extends Component {
  state = {
    initials: {
      productId: 1
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
    if (fields.handle === 'SEARCH') {
      this.props.fetchVersions(fields)
    }
  }

  onClear = () => {
    this.props.clearVersions()
  }

  onCreate = (fields) => {
    this.props.createVersion(fields)
  }

  onUpdate = (fields) => {
    this.props.updateVersion(fields)
  }

  _reduce = (options) => {
    return _.reduce(options, (result, option) => {
      result.push({ value: option.value, label: option.label })
      return result
    }, [])
  }

  _reduceMap = (options) => {
    return _.reduce(options, (result, option, key) => {
      result.push({ value: key, label: option })
      return result
    }, [])
  }

  componentWillMount() {
    this.props.fetchGroupsMap()
    this.props.fetchProductsMap()
    let fields = {}
    fields.productId = getCentraCascaderProductId()
    this.props.fetchVersions(fields)
  }


  render() {
    let options = []
    let groupsMap = []
    options = this._reduce(this.props.products.options)
    groupsMap = this._reduceMap(this.props.groups.map)
    let initials = this.state.initials
    const {login: {curd}} = this.props
    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            curd={curd}
            options={options}
            maps={groupsMap}
            initials={initials}
            {...this.state.fields}
            data={this.props.version}
            onChange={this.onChange}
            onSearch={this.onSearch}
            onCreate={this.onCreate}
            onClear={this.onClear}
          />
          <List
            curd={curd}
            options={options}
            maps={groupsMap}
            data={this.props.version}
            onUpdate={this.onUpdate}
           />
        </Card>
      </div>
    )
  }
}

Versions.propTypes = {
  login: PropTypes.object.isRequired,
  products: PropTypes.object,
  groups: PropTypes.object,
  version: PropTypes.object,
  fetchVersions: PropTypes.func,
  clearVersions: PropTypes.func,
  createVersion: PropTypes.func,
  updateVersion: PropTypes.func,
  fetchGroupsMap: PropTypes.func,
  fetchProductsMap: PropTypes.func
}
