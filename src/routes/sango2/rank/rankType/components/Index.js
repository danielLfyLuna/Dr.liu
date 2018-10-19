import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import _map from 'lodash/map'

import Filter from './Filter'
import List from './List'


export default class RanksPage extends Component {

  state = {
    rankName: '',
    initial: {
      products: []
    }
  }

  onSearch = (fieldsValue) => {
    if (fieldsValue.handle === 'GET_TYPES') {
      this.props.fetchSpecialTypes(fieldsValue)
    } else if (fieldsValue.handle === 'SEARCH') {
      this.props.fetchRank(fieldsValue)
    }
    this.setState({
      initial: {
        ...this.state.initial,
        products: fieldsValue.products
      }
    })
  }

  _setRankName = (e) => {
    this.setState({
      rankName: e
    })
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    this.props.clearRank()
    this.setState({
      initial: {
        ...this.state.initial,
        ...this.props.rank.keeping
      }
    })
  }

  componentWillUnmount() {
    this.props.keepInitial({
      ...this.state.initial
    })
  }

  render() {
    const { login: {curd}, rank } = this.props

    let options = {
      rank,
      types: _map(rank.types, (val, key) => ({ label: `${val}(${key})`, value: key }))
    }
    if (this.props.products.options) {
      options = {
        ...options,
        products: this.props.products.options
      }
    }

    return (
      <Card style={{marginBottom: 8}}>
        <Filter
          curd={curd}
          options={options}
          onSearch={this.onSearch}
          _setRankName={this._setRankName}
          initial={this.state.initial}
        />
        <List
          curd={curd}
          data={this.props.rank.ranks}
          fetching={this.props.rank.fetching}
          rankName={this.state.rankName}
        />
      </Card>
    )
  }

}

RanksPage.propTypes = {
  rank: PropTypes.object,
  login: PropTypes.object,
  products: PropTypes.object,
  fetchRank: PropTypes.func,
  clearRank: PropTypes.func,
  keepInitial: PropTypes.func,
  fetchProductsMap: PropTypes.func,
  fetchSpecialTypes: PropTypes.func
}
