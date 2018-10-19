import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'
import _ from 'lodash'


export default class List extends Component {

  static propTypes = {
    curd: PropTypes.object.isRequired,
    data: PropTypes.array,
    onRemove: PropTypes.func
  }

  state = {
    dataSource: []
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
        title: '平台ID',
        dataIndex: 'userId',
        key: 'userId'
      },
      {
        title: '操作时间',
        dataIndex: 'operationTime',
        key: 'operationTime'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          const { curd } = this.props
          return (
            _.has(curd, '80303') ? <Button onClick={() => this.handleRemove(record)}>解封</Button> : ''
          )
        }
      }
    ]
  }

  handleRemove = (e) => {
    this.props.onRemove({productId: e.productId, userId: e.userId})
  }

  render() {
    console.log(this.props.curd)
    return (
      <div>
        <Table
          bordered
          dataSource={this.props.data}
          columns={this.columns}
          rowKey='userId'
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 200,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
      </div>
    )
  }
}
