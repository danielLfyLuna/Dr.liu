import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'


export default class Index extends Component {

  constructor(props) {
    super(props)
    this.types = {
      1: '配置完成',
      2: '正在同步到服务器',
      3: '将定时同步',
      4: '同步完成',
      5: '同步成功',
      6: '同步失败'
    }
    this.columns = [
      {
        title: 'id',
        dataIndex: 'groupId',
        key: 'groupId'
      }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '模板ID',
        dataIndex: 'templateId',
        key: 'templateId'
      }, {
        title: '产品ID',
        dataIndex: 'productId',
        key: 'productId'
      }, {
        title: '服务器',
        dataIndex: 'serverIds',
        key: 'serverIds'
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
      }, {
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime'
      }, {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime'
      }, {
        title: '操作人',
        dataIndex: 'adminUserName',
        key: 'adminUserName'
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          return this.types[text] ? this.types[text] : <div style={{ color: 'red' }}>未知状态码</div>
        }
      }
    ]
  }

  render() {
    const { data } = this.props
    let dataSource = data.list.domainObject ? data.list.domainObject : []

    return (
      <div>
        <Table
          bordered
          rowKey='groupId'
          dataSource={dataSource}
          columns={this.columns}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['50', '100', '200', '500']
          }}
          loading={data.loading}
        />
      </div>
    )
  }
}

Index.propTypes = {
  data: PropTypes.object
}
