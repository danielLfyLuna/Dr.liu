import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import _ from 'lodash'

import Filter from './Filter'
import List from '../containers/detailContainer'


export default class Page extends Component {
  state = {
    keys: []
  }

  componentWillMount() {
    this.props.fetchProductsMap()
  }

  onSearch = (values) => {
    this.props.fetchActivityLists(values)
  }

  onSync = (value) => {
    this.props.syncBatchActivity(value)
  }

  onUpdate = (value) => {
    this.props.updateBatchActivity(value)
  }

  onDelete = (value) => {
    this.props.deleteBatchActivity(value)
  }

  onChange = (values) => {
    this.setState({
      keys: values
    })
  }

  // _productReduce = (options) => {
  //   return _.reduce(options, (result, option) => {
  //     result.push({ value: option.value, label: option.label })
  //     return result
  //   }, [])
  // }


  render() {
    const { allTemplatesList, login, products } = this.props
    const options = {
      allTemplatesList,
      login,
      products,
      keys: this.state.keys,
      // products: {
      //   options: products.options,
      //   list: this._productReduce(products.options)
      // },
      authorize: login.authorize
    }

    return (
      <div>
        <Filter
          options={options}
          onSearch={this.onSearch}
          onSync={this.onSync}
        />
        <List
          options={options}
          onChange={this.onChange}
          onUpdate={this.onUpdate}
          onDelete={this.onDelete}
        />
      </div>
    )
  }
}

Page.propTypes = {
  allTemplatesList: PropTypes.object,
  login: PropTypes.object,
  products: PropTypes.object,
  fetchProductsMap: PropTypes.func,
  fetchActivityLists: PropTypes.func,
  updateBatchActivity: PropTypes.func,
  deleteBatchActivity: PropTypes.func,
  syncBatchActivity: PropTypes.func
}
