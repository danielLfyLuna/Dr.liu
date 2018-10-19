import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'


export default class Index extends Component {

  static propTypes = {
    globalPlayer: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    // clearGlobalPlayers: PropTypes.func.isRequired,
    fetchGlobalPlayers: PropTypes.func.isRequired
  }

  onSearch = (value) => {
    this.props.fetchGlobalPlayers(value)
  }


  render() {
    const { curd } = this.props.login
    return (
      <Card>
        <Filter
          onSearch={this.onSearch}
          curd={curd}
        />
        <List
          data={this.props.globalPlayer.globalPlayers}
          fetching={this.props.globalPlayer.fetching}
        />
      </Card>
    )
  }
}
