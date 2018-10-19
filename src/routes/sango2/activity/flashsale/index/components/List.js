import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Table, Row } from 'antd'
import { Link } from 'react-router'
import moment from 'moment'
import _ from 'lodash'

import { handleStatusMap, handleUpdateTimeMap } from '../modules/Mapping'

export default class List extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  state = {
    currentItem: {},
    modalType: 'update',
    visible: false
  }
  data = {
    dataSource: []
  }
  columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    }, {
      title: '刷新间隔(分钟)',
      dataIndex: 'freshInterval'
    }, {
      title: ' 开启时间',
      dataIndex: 'openTime',
      width: 140
    }, {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 140
    }, {
      title: '状态',
      dataIndex: 'state'
    }, {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <div>
            <Row gutter={10}>
              <Link to={{pathname: '/sango2/activity/flashsale/action', query: {type: 'detail', id: record.id, product: record.productId, server: record.serverId}}}>
                <Button>详情</Button>
              </Link>
              <Link to={{pathname: '/sango2/activity/flashsale/action', query: {type: 'update', id: record.id, product: record.productId, server: record.serverId}}}>
                <Button>修改</Button>
              </Link>
            </Row>
          </div>
        )
      }
    }
  ]
  render() {
    let list = []
    const data = this.props.data
    _(data.list).forEach(function(value, index) {
      list.push({
        key: index,
        id: value.id,
        productId: data.productId,
        serverId: data.serverId,
        freshInterval: handleUpdateTimeMap(value.freshInterval),
        openTime: moment(value.startTime).format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment(value.endTime).format('YYYY-MM-DD HH:mm:ss'),
        state: handleStatusMap(value.state)
      })
    })
    this.data.dataSource = list
    return (
      <div>
        <Table
          bordered
          dataSource={this.data.dataSource}
          columns={this.columns}
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
