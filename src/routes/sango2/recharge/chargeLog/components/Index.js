import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'

export default class Recharge extends Component {
  constructor(props) {
    super(props)
    this.time = ['', '']
  }

  onSearch = (values) => {
    this.props.getChargeLog(values)
    this.time = [values.startTime, values.endTime]
  }
  onExport = (values) => {
    this.props.exportChargeLog(values)
  }

  render() {
    const { chargeLog, login } = this.props

    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            onSearch={this.onSearch}
            onExport={this.onExport}
            login={login}
          />
          <List
            chargeLog={chargeLog}
          />
        </Card>
      </div>
    )
  }
}

Recharge.propTypes = {
  chargeLog: PropTypes.object,
  login: PropTypes.object,
  getChargeLog: PropTypes.func,
  exportChargeLog: PropTypes.func
}
