import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'

export default class Index extends Component {

  componentWillMount() {
    this.props.fetchProductsMap()
  }

  componentWillUnmount() {
    this.props.clearHeadImage()
  }

  onSearch = (values) => {
    this.props.fetchHeadImage(values)
  }

  render() {
    const {curd} = this.props.login

    let options = []
    if (this.props.products.options) {
      options = this.props.products.options
    }

    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            curd={curd}
            onSearch={this.onSearch}
            options={options}
            headImage={this.props.headImage}
            passHeadImage={this.props.passHeadImage}
          />
        </Card>
        <Card>
          <List
            curd={curd}
            headImage={this.props.headImage}
            banHeadImage={this.props.banHeadImage}
           />
        </Card>
      </div>
    )
  }
}

Index.propTypes = {
  login: PropTypes.object.isRequired,
  headImage: PropTypes.object,
  fetchHeadImage: PropTypes.func,
  banHeadImage: PropTypes.func,
  passHeadImage: PropTypes.func,
  clearHeadImage: PropTypes.func,
  products: PropTypes.object,
  fetchProductsMap: PropTypes.func
}
