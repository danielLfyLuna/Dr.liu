import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

export default class List extends Component {
  state = {}

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      }, {
        title: '产品id',
        dataIndex: 'productId',
        key: 'productId'
      }, {
        title: '服务器id',
        dataIndex: 'serverId',
        key: 'serverId'
      }, {
        title: '玩家id',
        dataIndex: 'playerId',
        key: 'playerId'
      }, {
        title: '充值id',
        dataIndex: 'purchaseId',
        key: 'purchaseId'
      }, {
        title: '活动id',
        dataIndex: 'templateId',
        key: 'templateId'
      }, {
        title: '等级',
        dataIndex: 'level',
        key: 'level'
      }, {
        title: '充值时间',
        dataIndex: 'createTime',
        key: 'createTime'
      }, {
        title: '操作人',
        dataIndex: 'adminUserName',
        key: 'adminUserName'
      }, {
        title: '充值状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          return text ? '成功' : '失败'
        }
      }
    ]
  }

  render() {
    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 50,
      pageSizeOptions: ['20', '50', '100', '200', '500'],
      total: this.props.chargeLog.list.length
    }

    return (
      <div>
        <Table
          dataSource={this.props.chargeLog.list}
          columns={this.columns}
          pagination={pagination}
          rowKey='id'
          bordered
        />
      </div>
    )
  }
}

List.propTypes = {
  chargeLog: PropTypes.object
}
