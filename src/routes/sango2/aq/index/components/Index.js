import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'


export default class Index extends Component {
  static propTypes = {
    fetchAQ: PropTypes.func,
    addAQ: PropTypes.func,
    deleteAQ: PropTypes.func,
    updateAQ: PropTypes.func,
    aq: PropTypes.object,
    login: PropTypes.object
  }

  onSearch = (fieldsValue) => {
    this.props.fetchAQ(fieldsValue)
  }
  onAdd = (fieldsValue) => {
    this.props.addAQ(fieldsValue)
  }
  onDelete = (fieldsValue) => {
    this.props.deleteAQ(fieldsValue)
  }
  onUpdate = (fieldsValue) => {
    this.props.updateAQ(fieldsValue)
  }

  render() {
    const { curd } = this.props.login

    return (
      <div>
        <Card style={{marginBottom: 6}}>
          <Filter
            onSearch={this.onSearch}
            onAdd={this.onAdd}
            curd={curd}
          />
          <List
            data={this.props.aq}
            onDelete={this.onDelete}
            onUpdate={this.onUpdate}
            curd={curd}
          />
        </Card>
      </div>
    )
  }

}
