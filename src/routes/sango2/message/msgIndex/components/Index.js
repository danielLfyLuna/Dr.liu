import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'


export default class Message extends Component {

  onSearch = (value) => {
    this.props.fetchMessage(value)
  }

  onSend = (value) => {
    this.props.sendMessage(value)
  }

  render() {
    const { login, message } = this.props
    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            onSearch={this.onSearch}
            login={login}
          />
          <List
            data={message.list}
            onSend={this.onSend}
            login={login}
          />
        </Card>
      </div>
    )
  }
}

Message.propTypes = {
  login: PropTypes.object,
  message: PropTypes.object,
  fetchMessage: PropTypes.func,
  sendMessage: PropTypes.func
}
