import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'


export default class List extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    fetching: PropTypes.bool
  }

  state = {

  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '产品ID',
        dataIndex: 'productId',
        key: 'productId'
      },
      {
        title: '服务器',
        dataIndex: 'serverId',
        key: 'serverId'
      },
      {
        title: '玩家ID',
        dataIndex: 'playerId',
        key: 'playerId'
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname'
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender'
      },
      {
        title: '等级',
        dataIndex: 'level',
        key: 'level'
      },
      {
        title: '职业',
        dataIndex: 'job',
        key: 'job'
      },
      {
        title: 'VIP等级',
        dataIndex: 'vipLevel',
        key: 'vipLevel'
      },
      {
        title: '是否在线',
        dataIndex: 'online',
        key: 'online'
      }
    ]

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
          loading={this.props.fetching}
          columns={this.columns}
          dataSource={this.data.dataSource}
          rowKey={record => record.playerId}
          style={{
              marginTop: '24px'
            }}
        />
      </div>
    )
  }
}
