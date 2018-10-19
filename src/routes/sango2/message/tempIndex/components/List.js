import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'


export default class List extends Component {

  static propTypes = {
    data: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '模板ID',
        dataIndex: 'templateId',
        key: 'templateId'
      },
      {
        title: '信息',
        dataIndex: 'message',
        key: 'message'
      }
    ]
  }

  render() {
    const data = this.props.data.list

    return (
      <div>
        <Table
          bordered
          rowKey='templateId'
          dataSource={data}
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
