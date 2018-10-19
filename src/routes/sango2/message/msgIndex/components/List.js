import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Table, Modal, Button } from 'antd'
import _ from 'lodash'

export default class List extends Component {

  static propTypes = {
    data: PropTypes.array,
    login: PropTypes.object,
    onSend: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'group',
        key: 'group'
      },
      {
        title: '模板ID',
        dataIndex: 'templateId',
        key: 'templateId'
      },
      {
        title: '模板内容',
        dataIndex: 'templateContent',
        key: 'templateContent'
      },
      {
        title: '发送人数',
        dataIndex: 'sendCount',
        key: 'sendCount'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => {
          const { curd } = this.props.login
          return (
            <div>
              {
                _.has(curd, '190102')
                ?
                  <Button type='primary' onClick={() => this.handleMenuClick(record)} style={{marginRight: 8}}>发送</Button>
                :
                  ''
              }
              {
                _.has(curd, '190104')
                ?
                  <Link to={{ pathname: '/sango2/message/msgCtx', query: { group: record.group } }}>
                    <Button type='primary'>详情</Button>
                  </Link>
                :
                  ''
              }


            </div>
          )
        }
      }
    ]

    this.exColumns = [
      {
        title: '模板内容',
        dataIndex: 'content',
        key: 'content'
      },
      {
        title: '参数',
        dataIndex: 'param',
        key: 'param'
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
          if (text === 0) { return <i style={{color: '#ff0000'}}>未发送</i> }
          if (text === 1) { return '已发送' }
        }
      }
    ]
  }

  state = {
    visible: false,
    groupId: ''
  }

  handleMenuClick = (value) => {
    this.setState({
      visible: true,
      groupId: value.group
    })
  }
  handleCancel = (value) => {
    this.setState({
      visible: false
    })
  }
  handleConfirm = () => {
    this.setState({
      visible: false
    })
    this.props.onSend({
      groupId: this.state.groupId
    })
  }

  expandedRowRender = (data) => {
    return (
      <Table
        rowKey='id'
        columns={this.exColumns}
        dataSource={data.messages}
        pagination={false}
      />
    )
  }

  render() {
    const data = this.props.data

    return (
      <div>
        <Table
          bordered
          rowKey='group'
          dataSource={data}
          columns={this.columns}
          expandedRowRender={record => this.expandedRowRender(record)}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
        <Modal
          width={700}
          maskClosable={false}
          key={Math.random()}
          title='确认发送吗？'
          visible={this.state.visible}
          onOk={this.handleConfirm}
          onCancel={this.handleCancel}
        >
          <p>确认发送点击‘确认’，取消请点击’取消‘</p>
        </Modal>
      </div>
    )
  }
}
