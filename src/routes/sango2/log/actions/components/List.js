import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import moment from 'moment'

export default class List extends Component {

  static propTypes = {
    data: PropTypes.array,
    fetching: PropTypes.bool
  }

  state = {
    currentItem: {},
    modalType: 'update',
    visible: false
  }

  constructor(props) {
    super(props)

    this.columns = [{
        title: '玩家ID',
        dataIndex: 'playerId',
        key: 'playerId'
      }, {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname'
      }, {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        render: (text) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: '等级',
        dataIndex: 'level',
        key: 'level'
      }, {
        title: '生产消耗操作类型',
        dataIndex: 'category',
        key: 'category'
      }, {
        title: '描述',
        dataIndex: 'description',
        key: 'description'
      }]

    this.data = {
      dataSource: []
    }
  }

  render() {
    const list = this.props.data
    let dataSource = []
    list.map(function(elem) {
      dataSource.push(elem)
    })

    this.data = {
      dataSource: [...dataSource]
    }

    return (
      <div>
        <Table
          bordered
          dataSource={this.data.dataSource}
          columns={this.columns}
          loading={this.props.fetching}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
      </div>
    )
  }

}
