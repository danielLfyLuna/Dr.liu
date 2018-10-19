import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import _ from 'lodash'

import Filter from './Filter'
import List from './List'
import {getCentraCascaderProductId} from '../../form/CentraProductCascader'


export default class Cells extends Component {
  state = {
    initials: {
      productId: 1,
      renderState: true
    },
    fields: {
      products: {}
    },
    map: {
      cellStatus: { 1: '开启', 2: '维护', 3: '不可用', 4: '初置阶段', 5: '部署完成', 6: '测试' },
      cellTypes: { 'cross': '国战服', 'sango': 'RPG服', 'audio': '语音服' }
    },
    enum: {
      cellStatus: [
        { label: '开启', value: 1 },
        { label: '维护', value: 2 },
        { label: '不可用', value: 3 },
        { label: '初置阶段', value: 4 },
        { label: '部署完成', value: 5 },
        { label: '测试', value: 6 }
      ]
    }
  }

  _reduce = (options) => {
    return _.reduce(options, (result, option) => {
      result.push({ value: option.value, label: option.label })
      return result
    }, [])
  }

  onChange = (changedFields) => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields }
    })
  }

  onSearch = (fields) => {
    if (fields.handle === 'SEARCH') {
      this.props.fetchCells(fields)
    } else if (fields.handle === 'UPDATE') {
      this.props.fetchCellTypes(fields)
    }
  }

  onUpdate = (fields) => {
    this.props.updateCell(fields)
  }

  onRender = (initials) => {
    this.state.initials.renderState = initials.renderState
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    let fields = {}
    fields.productId = getCentraCascaderProductId()
    this.props.fetchCells(fields)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.initials.renderState
  }


  render() {
    let options = []
    options = this._reduce(this.props.products.options)
    let initials = this.state.initials
    const {login: {curd}} = this.props
    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            curd={curd}
            options={options}
            initials={initials}
            {...this.state.fields}
            data={this.props.cell}
            onChange={this.onChange}
            onSearch={this.onSearch}
            onRender={this.onRender}
          />
          <List
            curd={curd}
            options={options}
            onSearch={this.onSearch}
            onUpdate={this.onUpdate}
            data={this.props.cell}
            map={this.state.map}
            enum={this.state.enum}
            onRender={this.onRender}
           />
        </Card>
      </div>
    )
  }
}

Cells.propTypes = {
  login: PropTypes.object.isRequired,
  cell: PropTypes.object.isRequired,
  fetchCells: PropTypes.func,
  fetchCellTypes: PropTypes.func,
  fetchProductsMap: PropTypes.func,
  updateCell: PropTypes.func,
  products: PropTypes.object
}
