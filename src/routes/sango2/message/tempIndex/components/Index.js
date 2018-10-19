import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'


export default class Index extends Component {

  componentWillMount() {
    this.props.fetchTemplate()
  }

  componentWillUnmount() {
    this.props.clearTemplate()
  }

  render() {
    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
          />
          <List
            data={this.props.temps}
          />
        </Card>
      </div>
    )
  }
}

Index.propTypes = {
  temps: PropTypes.object,
  fetchTemplate: PropTypes.func,
  clearTemplate: PropTypes.func
}
