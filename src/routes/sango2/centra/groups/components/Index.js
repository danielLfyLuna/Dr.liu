import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'

export default class Groups extends Component {

  componentWillMount() {
    this.props.fetchGroups()
  }

  onSearch = () => {
    this.props.fetchGroups()
  }

  onDeleteItem = (fields) => {
    this.props.deleteGroup(fields)
  }

  onCreate = (fields) => {
    this.props.createGroup(fields)
  }

  onUpdate = (fields) => {
    this.props.updateGroup(fields)
  }

  render() {
    const {login: {curd}} = this.props
    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            curd={curd}
            onSearch={this.onSearch}
            onCreate={this.onCreate}
          />
          <List
            curd={curd}
            onUpdate={this.onUpdate}
            onDeleteItem={this.onDeleteItem}
            data={this.props.group}
           />
        </Card>
      </div>
    )
  }
}

Groups.propTypes = {
  login: PropTypes.object.isRequired,
  group: PropTypes.object,
  updateGroup: PropTypes.func,
  createGroup: PropTypes.func,
  deleteGroup: PropTypes.func,
  fetchGroups: PropTypes.func
}
